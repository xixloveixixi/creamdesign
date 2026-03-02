import { useState, useCallback, useRef } from 'react';
import {
  UploadAdapter,
  UploadResult,
  ProgressInfo,
  UploadState,
  UploadControl,
} from './types';
import { calculateFileHash } from './utils/calculateFileHash';
import { splitFile } from './utils/splitFile';
import { uploadChunks } from './utils/uploadChunks';
import {
  getChunkRecord,
  saveChunkRecord,
  deleteChunkRecord,
  cleanExpiredRecords,
} from './utils/chunkStore';

/**
 * Hook 配置接口
 */
interface UseLargeFileUploadProps {
  /** 适配器（必需） */
  adapter: UploadAdapter;
  /** 分片大小，默认 5MB */
  chunkSize?: number;
  /** 并发数，默认 3 */
  concurrent?: number;
  /** 最大重试次数，默认 3 */
  maxRetries?: number;
  /** 重试延迟（ms），默认 1000 */
  retryDelay?: number;
  /** 是否启用断点续传（IndexedDB 持久化），默认 true */
  enableResume?: boolean;
  /** 回调：上传进度 */
  onProgress?: (progress: ProgressInfo) => void;
  /** 回调：Hash 计算进度 */
  onHashProgress?: (percent: number) => void;
  /** 回调：上传成功 */
  onSuccess?: (result: UploadResult) => void;
  /** 回调：上传失败 */
  onError?: (error: Error, file: File) => void;
  /** 回调：单个分片完成 */
  onChunkComplete?: (chunkIndex: number, totalChunks: number) => void;
}

/**
 * Hook 返回值接口
 */
interface UseLargeFileUploadReturn {
  /** 开始上传 */
  upload: (file: File) => Promise<UploadResult>;
  /** 获取当前进度 */
  getProgress: () => ProgressInfo | null;
  /** 获取上传控制器（暂停/恢复/取消） */
  getControl: () => UploadControl;
}

/**
 * 大文件上传 Hook
 *
 * 功能特性：
 * - Web Worker 计算文件 Hash（不阻塞 UI）
 * - 秒传：Hash 查后端是否已存在
 * - 断点续传：IndexedDB 持久化分片记录
 * - 上传控制：pause / resume / cancel
 * - 并发上传 + 指数退避重试
 */
export const useLargeFileUpload = (
  props: UseLargeFileUploadProps
): UseLargeFileUploadReturn => {
  const {
    adapter,
    chunkSize = 5 * 1024 * 1024,
    concurrent = 3,
    maxRetries = 3,
    retryDelay = 1000,
    enableResume = true,
    onProgress,
    onHashProgress,
    onSuccess,
    onError,
    onChunkComplete,
  } = props;

  // 当前上传进度
  const [currentProgress, setCurrentProgress] = useState<ProgressInfo | null>(
    null
  );

  // 上传状态
  const stateRef = useRef<UploadState>('idle');
  // AbortController 用于取消
  const abortControllerRef = useRef<AbortController | null>(null);
  // 暂停控制
  const pausedRef = useRef(false);
  const resumeResolverRef = useRef<(() => void) | null>(null);

  /**
   * 暂停上传
   */
  const pause = useCallback(() => {
    if (stateRef.current === 'uploading') {
      pausedRef.current = true;
      stateRef.current = 'paused';
    }
  }, []);

  /**
   * 恢复上传
   */
  const resume = useCallback(() => {
    if (stateRef.current === 'paused') {
      pausedRef.current = false;
      stateRef.current = 'uploading';
      // 释放等待中的 Promise
      resumeResolverRef.current?.();
      resumeResolverRef.current = null;
    }
  }, []);

  /**
   * 取消上传
   */
  const cancel = useCallback(() => {
    stateRef.current = 'error';
    pausedRef.current = false;
    // 释放暂停等待
    resumeResolverRef.current?.();
    resumeResolverRef.current = null;
    // 中止所有正在进行的请求
    abortControllerRef.current?.abort();
  }, []);

  /**
   * 检查是否暂停
   */
  const isPaused = () => pausedRef.current;

  /**
   * 等待恢复（返回一个 Promise，恢复时 resolve）
   */
  const waitForResume = (): Promise<void> => {
    return new Promise(resolve => {
      if (!pausedRef.current) {
        resolve();
        return;
      }
      resumeResolverRef.current = resolve;
    });
  };

  // 上传函数
  const upload = useCallback(
    async (file: File): Promise<UploadResult> => {
      const startTime = Date.now();

      // 初始化控制器
      abortControllerRef.current = new AbortController();
      pausedRef.current = false;
      stateRef.current = 'hashing';

      try {
        // 清理过期的断点续传记录
        if (enableResume) {
          cleanExpiredRecords().catch(() => {});
        }

        // ===== 阶段 1：计算文件 Hash（Web Worker） =====
        stateRef.current = 'hashing';
        const fileHash = await calculateFileHash(file, chunkSize, percent => {
          onHashProgress?.(percent);
          setCurrentProgress({
            percent: 0,
            uploadedChunks: 0,
            totalChunks: 0,
            uploadedSize: 0,
            totalSize: file.size,
            state: 'hashing',
            hashPercent: percent,
          });
        });

        // 检查是否已取消
        if (abortControllerRef.current.signal.aborted) {
          throw new DOMException('上传已取消', 'AbortError');
        }

        // ===== 阶段 2：秒传检查 =====
        if (adapter.checkFileExists) {
          const checkResult = await adapter.checkFileExists({
            fileHash,
            fileName: file.name,
            fileSize: file.size,
          });

          if (checkResult.exists && checkResult.fileUrl) {
            // 秒传成功！
            const result: UploadResult = {
              fileId: checkResult.fileId || fileHash,
              fileUrl: checkResult.fileUrl,
              fileName: file.name,
              fileSize: file.size,
              uploadTime: Date.now() - startTime,
              instantUpload: true,
            };

            stateRef.current = 'success';
            onSuccess?.(result);
            return result;
          }

          // 后端返回已上传的分片列表（用于断点续传）
          if (
            checkResult.uploadedChunks &&
            checkResult.uploadedChunks.length > 0 &&
            enableResume
          ) {
            const record = await getChunkRecord(fileHash);
            if (!record) {
              const defaultChunkSize = chunkSize || 5 * 1024 * 1024;
              await saveChunkRecord({
                fileHash,
                fileName: file.name,
                fileSize: file.size,
                chunkSize: defaultChunkSize,
                totalChunks: Math.ceil(file.size / defaultChunkSize),
                uploadedChunks: checkResult.uploadedChunks,
                uploadId: null,
                updatedAt: Date.now(),
              });
            }
          }
        }

        // ===== 阶段 3：划分文件 =====
        const defaultChunkSize = chunkSize || 5 * 1024 * 1024;
        const fileChunks = splitFile(file, defaultChunkSize);
        const totalChunks = fileChunks.length;

        // ===== 阶段 4：加载断点续传记录 =====
        let uploadedChunkIndices: number[] = [];
        let uploadId: string | null = null;

        if (enableResume) {
          const record = await getChunkRecord(fileHash);
          if (
            record &&
            record.fileSize === file.size &&
            record.chunkSize === defaultChunkSize &&
            record.totalChunks === totalChunks
          ) {
            uploadedChunkIndices = record.uploadedChunks;
            uploadId = record.uploadId;
          }
        }

        // ===== 阶段 5：初始化上传 =====
        if (!uploadId && adapter.initUpload) {
          uploadId = await adapter.initUpload({
            fileName: file.name,
            fileSize: file.size,
            fileHash,
            chunkSize: defaultChunkSize,
            totalChunks,
          });
        }

        // 保存断点记录
        if (enableResume) {
          await saveChunkRecord({
            fileHash,
            fileName: file.name,
            fileSize: file.size,
            chunkSize: defaultChunkSize,
            totalChunks,
            uploadedChunks: uploadedChunkIndices,
            uploadId,
            updatedAt: Date.now(),
          });
        }

        // ===== 阶段 6：上传分片 =====
        stateRef.current = 'uploading';

        await uploadChunks({
          chunks: fileChunks,
          adapter,
          uploadId,
          fileHash,
          fileName: file.name,
          fileSize: file.size,
          totalChunks,
          concurrent,
          maxRetries,
          retryDelay,
          uploadedChunkIndices,
          signal: abortControllerRef.current.signal,
          isPaused,
          waitForResume,
          onProgress: progress => {
            setCurrentProgress(progress);
            onProgress?.(progress);
          },
          onChunkComplete,
        });

        // ===== 阶段 7：合并分片 =====
        stateRef.current = 'merging';
        const result = await adapter.mergeChunks({
          uploadId,
          fileHash,
          fileName: file.name,
          fileSize: file.size,
          totalChunks,
        });

        // 上传完成，清理断点记录
        if (enableResume) {
          await deleteChunkRecord(fileHash);
        }

        // ===== 阶段 8：返回结果 =====
        const uploadResult: UploadResult = {
          fileId: result.fileId,
          fileUrl: result.fileUrl,
          fileName: file.name,
          fileSize: file.size,
          uploadTime: Date.now() - startTime,
          instantUpload: false,
          response: result,
        };

        stateRef.current = 'success';
        onSuccess?.(uploadResult);
        return uploadResult;
      } catch (error) {
        const err = error as Error;
        stateRef.current = 'error';
        onError?.(err, file);
        throw err;
      }
    },
    [
      adapter,
      chunkSize,
      concurrent,
      maxRetries,
      retryDelay,
      enableResume,
      onProgress,
      onHashProgress,
      onSuccess,
      onError,
      onChunkComplete,
    ]
  );

  return {
    upload,
    getProgress: () => currentProgress,
    getControl: () => ({
      pause,
      resume,
      cancel,
      state: stateRef.current,
    }),
  };
};
