/**
 * 并发分片上传
 * 支持：跳过已上传分片（断点续传）、AbortSignal 取消、暂停恢复
 */
import { UploadAdapter, ProgressInfo } from '../types';
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
export declare const uploadChunks: (params: UploadChunksParams) => Promise<void>;
export {};
//# sourceMappingURL=uploadChunks.d.ts.map