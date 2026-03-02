/**
 * 默认适配器创建工具
 * 基于 Upload 组件的配置创建适配器
 */
import axios from 'axios';
import { UploadAdapter } from './types';

interface DefaultAdapterConfig {
  action: string;
  /** 秒传检查接口 URL（可选） */
  checkUrl?: string;
  initUrl?: string;
  chunkUrl?: string;
  mergeUrl?: string;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  withCredentials?: boolean;
  name?: string;
}

/**
 * 创建默认适配器
 * 基于标准的后端接口规范
 */
export const createDefaultAdapter = (
  config: DefaultAdapterConfig
): UploadAdapter => {
  const {
    action,
    checkUrl,
    initUrl,
    chunkUrl,
    mergeUrl,
    headers,
    data,
    withCredentials,
    name = 'file',
  } = config;

  return {
    // 秒传检查（可选）
    checkFileExists: checkUrl
      ? async params => {
          try {
            const response = await axios.post(
              checkUrl,
              {
                fileHash: params.fileHash,
                fileName: params.fileName,
                fileSize: params.fileSize,
                ...data,
              },
              { headers, withCredentials }
            );

            return {
              exists: !!response.data.exists,
              fileUrl: response.data.fileUrl || response.data.file_url,
              fileId: response.data.fileId || response.data.file_id,
              uploadedChunks:
                response.data.uploadedChunks ||
                response.data.uploaded_chunks ||
                [],
            };
          } catch {
            // 检查失败时视为文件不存在，继续正常上传
            return { exists: false };
          }
        }
      : undefined,

    // 初始化上传（可选）
    initUpload: initUrl
      ? async fileInfo => {
          try {
            const response = await axios.post(
              initUrl || `${action}/init`,
              {
                fileName: fileInfo.fileName,
                fileSize: fileInfo.fileSize,
                fileHash: fileInfo.fileHash,
                chunkSize: fileInfo.chunkSize,
                totalChunks: fileInfo.totalChunks,
                ...data,
              },
              {
                headers,
                withCredentials,
              }
            );
            return response.data.uploadId || response.data.upload_id || null;
          } catch (error) {
            // 如果初始化失败，返回 null，继续使用文件名作为 uploadId
            console.warn('初始化上传失败，将使用文件名作为标识:', error);
            return null;
          }
        }
      : undefined,

    // 上传分片
    uploadChunk: async params => {
      const formData = new FormData();

      // 添加 uploadId（如果有）
      if (params.uploadId) {
        formData.append('uploadId', params.uploadId);
      }

      // 添加分片信息
      formData.append('chunkIndex', params.chunkIndex.toString());
      formData.append(name || 'chunk', params.chunk);
      formData.append('fileName', params.fileName);
      formData.append('fileSize', params.fileSize.toString());
      formData.append('totalChunks', params.totalChunks.toString());

      if (params.fileHash) {
        formData.append('fileHash', params.fileHash);
      }

      // 添加额外数据
      if (data) {
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        });
      }

      const response = await axios.post(
        chunkUrl || `${action}/chunk`,
        formData,
        {
          headers: {
            ...headers,
          },
          withCredentials,
          // 传递 AbortSignal（axios >= 0.22 支持）
          signal: params.signal,
          onUploadProgress: e => {
            if (params.onProgress && e.total) {
              const progress = Math.round((e.loaded * 100) / e.total);
              params.onProgress(progress);
            }
          },
        }
      );

      return {
        success: response.data.success !== false,
        chunkIndex: params.chunkIndex,
      };
    },

    // 合并分片
    mergeChunks: async params => {
      const response = await axios.post(
        mergeUrl || `${action}/merge`,
        {
          uploadId: params.uploadId,
          fileName: params.fileName,
          fileSize: params.fileSize,
          totalChunks: params.totalChunks,
          fileHash: params.fileHash,
          ...data,
        },
        {
          headers,
          withCredentials,
        }
      );

      return {
        fileUrl: response.data.fileUrl || response.data.file_url,
        fileId:
          response.data.fileId ||
          response.data.file_id ||
          params.uploadId ||
          '',
        ...response.data,
      };
    },
  };
};
