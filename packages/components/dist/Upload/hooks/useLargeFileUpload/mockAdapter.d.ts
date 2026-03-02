/**
 * 大文件上传 Mock 适配器
 * 用于 Storybook 和开发测试，模拟分片上传流程
 */
import { UploadAdapter } from './types';
export interface MockAdapterConfig {
    uploadDelay?: number;
    mergeDelay?: number;
    failChunks?: number[];
    failProbability?: number;
    enableProgress?: boolean;
    instantUploadHashes?: string[];
    initUpload?: (fileInfo: {
        fileName: string;
        fileSize: number;
        fileHash?: string;
        chunkSize: number;
        totalChunks: number;
    }) => Promise<string>;
    mergeChunks?: (params: {
        uploadId: string | null;
        fileName: string;
        fileSize: number;
        totalChunks: number;
        fileHash?: string;
    }) => Promise<{
        fileUrl: string;
        fileId: string;
        fileSize: number;
        uploadedAt: string;
    }>;
}
/**
 * 创建 Mock 适配器
 * 模拟真实的分片上传流程，包括进度更新、延迟、错误处理等
 */
export declare const createMockAdapter: (config?: MockAdapterConfig) => UploadAdapter;
/**
 * 默认 Mock 适配器（快速测试）
 */
export declare const defaultMockAdapter: UploadAdapter;
/**
 * 慢速 Mock 适配器（用于测试进度显示）
 */
export declare const slowMockAdapter: UploadAdapter;
/**
 * 错误测试 Mock 适配器（用于测试错误处理）
 */
export declare const errorMockAdapter: UploadAdapter;
//# sourceMappingURL=mockAdapter.d.ts.map