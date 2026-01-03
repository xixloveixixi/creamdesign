/**
 * 适配器接口定义
 */
export interface UploadAdapter {
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
}
