/**
 * 上传状态枚举
 */
export type UploadState =
  | 'idle'
  | 'hashing'
  | 'uploading'
  | 'merging'
  | 'paused'
  | 'success'
  | 'error';

/**
 * 秒传检查结果
 */
export interface FileExistsResult {
  /** 文件是否已存在 */
  exists: boolean;
  /** 已存在时的文件 URL */
  fileUrl?: string;
  /** 已存在时的文件 ID */
  fileId?: string;
  /** 已上传的分片索引列表（用于断点续传） */
  uploadedChunks?: number[];
}

/**
 * 适配器接口定义
 */
export interface UploadAdapter {
  /**
   * 秒传检查：查询后端文件是否已存在（可选）
   * 返回文件存在信息，支持秒传和断点续传
   */
  checkFileExists?: (params: {
    fileHash: string;
    fileName: string;
    fileSize: number;
  }) => Promise<FileExistsResult>;

  /**
   * 初始化上传（可选）
   */
  initUpload?: (fileInfo: {
    fileName: string;
    fileSize: number;
    fileHash?: string;
    chunkSize: number;
    totalChunks: number;
  }) => Promise<string | null>;

  /**
   * 上传分片（必需）
   */
  uploadChunk: (params: {
    uploadId: string | null;
    chunkIndex: number;
    chunk: Blob;
    fileName: string;
    fileSize: number;
    totalChunks: number;
    fileHash?: string;
    onProgress?: (progress: number) => void;
    /** 用于取消上传的 AbortSignal */
    signal?: AbortSignal;
  }) => Promise<{
    success: boolean;
    chunkIndex: number;
  }>;

  /**
   * 合并分片（必需）
   */
  mergeChunks: (params: {
    uploadId: string | null;
    fileName: string;
    fileSize: number;
    totalChunks: number;
    fileHash?: string;
  }) => Promise<{
    fileUrl: string;
    fileId: string;
    [key: string]: any;
  }>;
}

/**
 * 上传结果接口
 */
export interface UploadResult {
  fileId: string;
  fileUrl?: string;
  fileName: string;
  fileSize: number;
  uploadTime: number;
  /** 是否通过秒传完成 */
  instantUpload?: boolean;
  response?: any;
}

/**
 * 进度信息接口
 */
export interface ProgressInfo {
  percent: number;
  uploadedChunks: number;
  totalChunks: number;
  uploadedSize: number;
  totalSize: number;
  /** 当前上传状态 */
  state?: UploadState;
  /** Hash 计算进度（0-100） */
  hashPercent?: number;
}

/**
 * 上传控制接口 - 暴露给外部的控制方法
 */
export interface UploadControl {
  /** 暂停上传 */
  pause: () => void;
  /** 恢复上传 */
  resume: () => void;
  /** 取消上传 */
  cancel: () => void;
  /** 当前上传状态 */
  state: UploadState;
}
