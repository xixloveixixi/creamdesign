import { UploadAdapter, UploadControl, ProgressInfo } from './hooks/useLargeFileUpload/types';
/**
 * Upload 组件 Props
 */
export interface UploadProps {
    /** 上传接口 URL（必填） */
    action: string;
    /** 默认文件列表 */
    defaultFileList?: FileItem[];
    /** 自定义请求头 */
    headers?: Record<string, string>;
    /** 文件字段名 */
    name?: string;
    /** 附加数据 */
    data?: Record<string, any>;
    /** 是否携带 cookie */
    withCredentials?: boolean;
    /** 接受的文件类型 */
    accept?: string;
    /** 是否支持多选 */
    multiple?: boolean;
    /** 上传前校验/转换函数 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 上传进度回调 */
    onProgress?: (progress: number, file: File) => void;
    /** 上传成功回调 */
    onSuccess?: (response: any, file: File) => void;
    /** 上传失败回调 */
    onError?: (error: any, file: File) => void;
    /** 文件变化回调 */
    onChange?: (file: File) => void;
    /** beforeUpload 成功后回调 */
    onBeforeUploadSuccess?: (originalFile: File, processedFile: File) => void;
    /** 删除文件回调 */
    onRemoved?: (file: FileItem) => void;
    /** 自定义上传区域内容 */
    children?: React.ReactNode;
    /** 是否启用拖拽上传 */
    drag?: boolean;
    /** 是否启用大文件分片上传（默认 true） */
    enableLargeFileUpload?: boolean;
    /** 分片大小（默认 5MB） */
    chunkSize?: number;
    /** 启用分片的文件大小阈值（默认 10MB） */
    chunkThreshold?: number;
    /** 并发上传数（默认 3） */
    concurrent?: number;
    /** 最大重试次数（默认 3） */
    maxRetries?: number;
    /** 重试延迟 ms（默认 1000） */
    retryDelay?: number;
    /** 自定义适配器 */
    adapter?: UploadAdapter;
    /** 秒传检查接口 URL */
    checkUrl?: string;
    /** 初始化上传接口 URL */
    initUrl?: string;
    /** 分片上传接口 URL */
    chunkUrl?: string;
    /** 合并分片接口 URL */
    mergeUrl?: string;
    /** 是否启用断点续传（默认 true） */
    enableResume?: boolean;
    /** Hash 计算进度回调 */
    onHashProgress?: (percent: number) => void;
}
/**
 * 文件列表项
 */
export interface FileItem {
    uid: string;
    size: number;
    name: string;
    status: 'ready' | 'uploading' | 'success' | 'error';
    percent: number;
    raw: File;
    response?: any;
    error?: any;
}
/**
 * Upload 组件 Ref —— 外部可通过 ref 控制上传
 */
export interface UploadRef {
    /** 暂停当前上传 */
    pause: () => void;
    /** 恢复当前上传 */
    resume: () => void;
    /** 取消当前上传 */
    cancel: () => void;
    /** 获取上传控制器信息 */
    getControl: () => UploadControl;
    /** 获取当前进度 */
    getProgress: () => ProgressInfo | null;
    /** 获取文件列表 */
    getFileList: () => FileItem[];
}
export declare const Upload: import("react").ForwardRefExoticComponent<UploadProps & import("react").RefAttributes<UploadRef>>;
//# sourceMappingURL=Upload.d.ts.map