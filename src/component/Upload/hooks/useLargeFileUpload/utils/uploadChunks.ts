// 思路：
// 1. 将 chunks 数组分批（每批 concurrent 个）
// 2. 使用 Promise.all 并发上传一批
// 3. 等待一批完成后再上传下一批
// 4. 实时更新进度

import { UploadAdapter, ProgressInfo } from '../types';
import { uploadChunkWithRetry } from './uploadChunkWithRetry';

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
    onProgress,
    onChunkComplete,
  } = params;

  let uploadedChunks = 0;

  // 分批上传
  for (let i = 0; i < chunks.length; i += concurrent) {
    const batch = chunks.slice(i, i + concurrent);

    // 并发上传当前批次
    await Promise.all(
      batch.map(async (chunk, batchIndex) => {
        const chunkIndex = i + batchIndex;

        await uploadChunkWithRetry({
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
        });

        uploadedChunks++;
        onChunkComplete?.(chunkIndex, totalChunks);

        // 更新进度
        const progress: ProgressInfo = {
          percent: Math.round((uploadedChunks / totalChunks) * 100),
          uploadedChunks,
          totalChunks,
          uploadedSize: (uploadedChunks / totalChunks) * fileSize,
          totalSize: fileSize,
        };

        onProgress?.(progress);
      })
    );
  }
};
