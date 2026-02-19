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
  /** 用于取消上传的 AbortSignal */
  signal?: AbortSignal;
}

/**
 * 上传单个分片（带重试机制 + 取消支持）
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
    signal,
  } = params;

  // 检查是否已取消
  if (signal?.aborted) {
    throw new DOMException('上传已取消', 'AbortError');
  }

  try {
    await adapter.uploadChunk({
      uploadId,
      chunkIndex,
      chunk,
      fileName,
      fileSize,
      totalChunks,
      fileHash,
      signal,
    });
  } catch (error) {
    // 如果是取消操作，直接抛出不重试
    if (
      signal?.aborted ||
      (error instanceof DOMException && error.name === 'AbortError')
    ) {
      throw new DOMException('上传已取消', 'AbortError');
    }

    // 如果还有重试次数，则重试
    if (retryCount < maxRetries) {
      // 指数退避：延迟时间 = retryDelay * 2^retryCount
      const delay = retryDelay * Math.pow(2, retryCount);

      // 等待时也支持取消
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, delay);
        if (signal) {
          const onAbort = () => {
            clearTimeout(timer);
            reject(new DOMException('上传已取消', 'AbortError'));
          };
          if (signal.aborted) {
            clearTimeout(timer);
            reject(new DOMException('上传已取消', 'AbortError'));
            return;
          }
          signal.addEventListener('abort', onAbort, { once: true });
        }
      });

      // 递归重试
      return uploadChunkWithRetry(params, retryCount + 1);
    }

    // 超过最大重试次数，抛出错误
    throw error;
  }
};
