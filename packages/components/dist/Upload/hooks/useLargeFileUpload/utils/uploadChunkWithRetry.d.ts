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
export declare const uploadChunkWithRetry: (params: UploadChunkWithRetryParams, retryCount?: number) => Promise<void>;
export {};
//# sourceMappingURL=uploadChunkWithRetry.d.ts.map