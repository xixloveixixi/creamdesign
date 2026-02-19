/**
 * 并发分片上传
 * 支持：跳过已上传分片（断点续传）、AbortSignal 取消、暂停恢复
 */

import { UploadAdapter, ProgressInfo } from '../types';
import { uploadChunkWithRetry } from './uploadChunkWithRetry';
import { markChunkUploaded } from './chunkStore';

interface UploadChunksParams {
  chunks: Blob[];
  adapter: UploadAdapter;
  uploadId: string | null;
  fileHash: string;
  fileName: string;
  fileSize: number;
  totalChunks: number;
  concurrent: number;
  maxRetries: number;
  retryDelay: number;
  /** 已上传的分片索引（用于断点续传，跳过这些分片） */
  uploadedChunkIndices?: number[];
  /** 用于取消上传的 AbortSignal */
  signal?: AbortSignal;
  /** 暂停状态检查函数 */
  isPaused?: () => boolean;
  /** 等待恢复的 Promise 工厂 */
  waitForResume?: () => Promise<void>;
  onProgress?: (progress: ProgressInfo) => void;
  onChunkComplete?: (chunkIndex: number, totalChunks: number) => void;
}

/**
 * 并发上传所有分片
 */
export const uploadChunks = async (params: UploadChunksParams) => {
  const {
    chunks,
    adapter,
    uploadId,
    fileHash,
    fileName,
    fileSize,
    totalChunks,
    concurrent,
    maxRetries,
    retryDelay,
    uploadedChunkIndices = [],
    signal,
    isPaused,
    waitForResume,
    onProgress,
    onChunkComplete,
  } = params;

  // 构建待上传的分片索引列表（跳过已上传的）
  const uploadedSet = new Set(uploadedChunkIndices);
  const pendingIndices = Array.from(
    { length: chunks.length },
    (_, i) => i
  ).filter(i => !uploadedSet.has(i));

  let uploadedChunks = uploadedChunkIndices.length;

  // 报告初始进度（已有断点续传的进度）
  if (uploadedChunks > 0) {
    onProgress?.({
      percent: Math.round((uploadedChunks / totalChunks) * 100),
      uploadedChunks,
      totalChunks,
      uploadedSize: (uploadedChunks / totalChunks) * fileSize,
      totalSize: fileSize,
      state: 'uploading',
    });
  }

  // 分批上传
  for (let i = 0; i < pendingIndices.length; i += concurrent) {
    // 检查是否已取消
    if (signal?.aborted) {
      throw new DOMException('上传已取消', 'AbortError');
    }

    // 检查是否暂停，等待恢复
    if (isPaused?.() && waitForResume) {
      await waitForResume();
    }

    const batch = pendingIndices.slice(i, i + concurrent);

    // 并发上传当前批次
    await Promise.all(
      batch.map(async chunkIndex => {
        // 再次检查暂停
        if (isPaused?.() && waitForResume) {
          await waitForResume();
        }

        await uploadChunkWithRetry({
          chunk: chunks[chunkIndex],
          chunkIndex,
          adapter,
          uploadId,
          fileHash,
          fileName,
          fileSize,
          totalChunks,
          maxRetries,
          retryDelay,
          signal,
        });

        uploadedChunks++;
        onChunkComplete?.(chunkIndex, totalChunks);

        // 持久化已上传分片记录（断点续传）
        markChunkUploaded(fileHash, chunkIndex).catch(() => {
          // 静默失败，不影响上传
        });

        // 更新进度
        onProgress?.({
          percent: Math.round((uploadedChunks / totalChunks) * 100),
          uploadedChunks,
          totalChunks,
          uploadedSize: (uploadedChunks / totalChunks) * fileSize,
          totalSize: fileSize,
          state: 'uploading',
        });
      })
    );
  }
};
