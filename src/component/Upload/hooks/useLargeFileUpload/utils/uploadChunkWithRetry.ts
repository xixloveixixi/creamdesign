import { UploadAdapter } from '../types';

interface UploadChunkWithRetryParams {
  chunk: Blob;
  chunkIndex: number;
  adapter: UploadAdapter;
  uploadId: string | null;
  fileHash: string;
  fileName: string;
  fileSize: number;
  totalChunks: number;
  maxRetries: number;
  retryDelay: number;
}

/**
 * 上传单个分片（带重试机制）
 */
export const uploadChunkWithRetry = async (
  params: UploadChunkWithRetryParams,
  retryCount = 0
): Promise<void> => {
  const {
    chunk,
    chunkIndex,
    adapter,
    uploadId,
    fileHash,
    fileName,
    fileSize,
    totalChunks,
    maxRetries,
    retryDelay,
  } = params;

  try {
    await adapter.uploadChunk({
      uploadId,
      chunkIndex,
      chunk,
      fileName,
      fileSize,
      totalChunks,
      fileHash,
    });
  } catch (error) {
    // 如果还有重试次数，则重试
    if (retryCount < maxRetries) {
      // 指数退避：延迟时间 = retryDelay * 2^retryCount
      const delay = retryDelay * Math.pow(2, retryCount);
      await new Promise(resolve => setTimeout(resolve, delay));

      // 递归重试
      return uploadChunkWithRetry(params, retryCount + 1);
    }

    // 超过最大重试次数，抛出错误
    throw error;
  }
};
