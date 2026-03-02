import { UploadAdapter, UploadResult, ProgressInfo, UploadControl } from './types';
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
export declare const useLargeFileUpload: (props: UseLargeFileUploadProps) => UseLargeFileUploadReturn;
export {};
//# sourceMappingURL=index.d.ts.map