import { useState, useCallback } from 'react';
import { UploadAdapter, UploadResult, ProgressInfo } from './types';
import { calculateFileHash } from './utils/calculateFileHash';
import { splitFile } from './utils/splitFile';
import { uploadChunks } from './utils/uploadChunks';

/**
 * Hook 配置接口
 */
interface UseLargeFileUploadProps {
  // 适配器（必需）
  adapter: UploadAdapter;
  // 分片大小
  chunkSize?: number;
  // 并发控制
  concurrent?: number;
  // 重试配置
  maxRetries?: number;
  retryDelay?: number;
  // 回调函数
  onProgress?: (progress: ProgressInfo) => void;
  onSuccess?: (result: UploadResult) => void;
  onError?: (error: Error, file: File) => void;
  onChunkComplete?: (chunkIndex: number, totalChunks: number) => void;
}

/**
 * Hook 返回值接口
 */
interface UseLargeFileUploadReturn {
  upload: (file: File) => Promise<UploadResult>;
  getProgress: () => ProgressInfo | null;
}

/**
 * 大文件上传 Hook
 */
export const useLargeFileUpload = (
  props: UseLargeFileUploadProps
): UseLargeFileUploadReturn => {
  const {
    adapter,
    chunkSize = 5 * 1024 * 1024, // 默认 5MB
    concurrent = 3,
    maxRetries = 3,
    retryDelay = 1000,
    onProgress,
    onSuccess,
    onError,
    onChunkComplete,
  } = props;

  // 当前上传进度
  const [currentProgress, setCurrentProgress] = useState<ProgressInfo | null>(
    null
  );

  // 上传函数
  const upload = useCallback(
    async (file: File): Promise<UploadResult> => {
      const startTime = Date.now();

      try {
        // 1. 计算文件的 hash 值
        const fileHash = await calculateFileHash(file, chunkSize);

        // 2. 划分文件
        const defaultChunkSize = chunkSize || 5 * 1024 * 1024;
        const fileChunks = splitFile(file, defaultChunkSize);
        const totalChunks = fileChunks.length;

        // 3. 初始化上传
        let uploadId: string | null = null;
        if (adapter.initUpload) {
          uploadId = await adapter.initUpload({
            fileName: file.name,
            fileSize: file.size,
            fileHash,
            chunkSize: defaultChunkSize,
            totalChunks,
          });
        }

        // 4. 上传所有的分片
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
          onProgress: progress => {
            setCurrentProgress(progress);
            onProgress?.(progress);
          },
          onChunkComplete,
        });

        // 5. 合并分片
        const result = await adapter.mergeChunks({
          uploadId,
          fileHash,
          fileName: file.name,
          fileSize: file.size,
          totalChunks,
        });

        // 6. 返回结果
        const uploadResult: UploadResult = {
          fileId: result.fileId,
          fileUrl: result.fileUrl,
          fileName: file.name,
          fileSize: file.size,
          uploadTime: Date.now() - startTime,
          response: result,
        };

        onSuccess?.(uploadResult);
        return uploadResult;
      } catch (error) {
        const err = error as Error;
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
      onProgress,
      onSuccess,
      onError,
      onChunkComplete,
    ]
  );

  return {
    upload,
    getProgress: () => currentProgress,
  };
};
