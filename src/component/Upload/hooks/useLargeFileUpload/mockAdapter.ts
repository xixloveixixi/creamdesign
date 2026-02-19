/**
 * 大文件上传 Mock 适配器
 * 用于 Storybook 和开发测试，模拟分片上传流程
 */

import { UploadAdapter } from './types';

export interface MockAdapterConfig {
  // 模拟上传延迟（ms）
  uploadDelay?: number;
  // 模拟合并延迟（ms）
  mergeDelay?: number;
  // 模拟失败的分片索引（用于测试错误处理）
  failChunks?: number[];
  // 模拟失败概率（0-1）
  failProbability?: number;
  // 是否启用进度模拟
  enableProgress?: boolean;
  // 模拟秒传（指定 Hash 列表视为已存在）
  instantUploadHashes?: string[];
  // 初始化上传
  initUpload?: (fileInfo: {
    fileName: string;
    fileSize: number;
    fileHash?: string;
    chunkSize: number;
    totalChunks: number;
  }) => Promise<string>;
  // 合并分片
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
export const createMockAdapter = (
  config: MockAdapterConfig = {}
): UploadAdapter => {
  const {
    uploadDelay = 500, // 默认每个分片上传延迟 500ms
    mergeDelay = 1000, // 默认合并延迟 1s
    failChunks = [], // 默认不失败
    failProbability = 0, // 默认失败概率 0%
    enableProgress = true, // 默认启用进度模拟
    instantUploadHashes = [], // 默认不模拟秒传
  } = config;

  // 存储上传任务信息（模拟服务端）
  const uploadTasks = new Map<
    string,
    {
      chunks: Map<number, Blob>;
      totalChunks: number;
      fileName: string;
      fileSize: number;
    }
  >();

  return {
    /**
     * 秒传检查（可选）
     * 如果文件 Hash 在 instantUploadHashes 列表中，模拟秒传成功
     */
    checkFileExists: async (params: {
      fileHash: string;
      fileName: string;
      fileSize: number;
    }) => {
      await new Promise(resolve => setTimeout(resolve, 100));

      if (instantUploadHashes.includes(params.fileHash)) {
        console.log(
          `[Mock] 秒传命中: ${params.fileName} (hash: ${params.fileHash})`
        );
        return {
          exists: true,
          fileUrl: `https://mock-storage.example.com/files/${params.fileName}`,
          fileId: `instant-${params.fileHash.slice(0, 8)}`,
        };
      }

      return { exists: false };
    },

    /**
     * 初始化上传（可选）
     */
    initUpload: async (fileInfo: {
      fileName: string;
      fileSize: number;
      fileHash?: string;
      chunkSize: number;
      totalChunks: number;
    }) => {
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 100));

      const uploadId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // 初始化任务
      uploadTasks.set(uploadId, {
        chunks: new Map(),
        totalChunks: fileInfo.totalChunks,
        fileName: fileInfo.fileName,
        fileSize: fileInfo.fileSize,
      });

      console.log(`[Mock] 初始化上传: ${uploadId}`, fileInfo);
      return uploadId;
    },

    /**
     * 上传分片
     */
    uploadChunk: async (params: {
      uploadId: string | null;
      chunkIndex: number;
      chunk: Blob;
      fileName: string;
      fileSize: number;
      totalChunks: number;
      fileHash?: string;
      onProgress?: (progress: number) => void;
      signal?: AbortSignal;
    }) => {
      const uploadId = params.uploadId || `mock-${params.fileName}`;
      const task = uploadTasks.get(uploadId);

      // 检查取消
      if (params.signal?.aborted) {
        throw new DOMException('上传已取消', 'AbortError');
      }

      if (!task) {
        throw new Error(`上传任务不存在: ${uploadId}`);
      }

      // 检查是否应该失败
      const shouldFail =
        failChunks.includes(params.chunkIndex) ||
        (failProbability > 0 && Math.random() < failProbability);

      if (shouldFail) {
        await new Promise(resolve => setTimeout(resolve, uploadDelay));
        throw new Error(`分片 ${params.chunkIndex} 上传失败（模拟错误）`);
      }

      // 模拟上传进度（支持取消）
      if (enableProgress && params.onProgress) {
        const steps = 5;
        for (let i = 1; i <= steps; i++) {
          if (params.signal?.aborted) {
            throw new DOMException('上传已取消', 'AbortError');
          }
          await new Promise(resolve =>
            setTimeout(resolve, uploadDelay / steps)
          );
          params.onProgress((i / steps) * 100);
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, uploadDelay));
      }

      // 保存分片（模拟服务端存储）
      task.chunks.set(params.chunkIndex, params.chunk);

      console.log(
        `[Mock] 分片上传完成: ${params.chunkIndex + 1}/${params.totalChunks}`,
        {
          chunkSize: params.chunk.size,
          uploadedChunks: task.chunks.size,
          totalChunks: params.totalChunks,
        }
      );

      return {
        success: true,
        chunkIndex: params.chunkIndex,
      };
    },

    /**
     * 合并分片
     */
    mergeChunks: async (params: {
      uploadId: string | null;
      fileName: string;
      fileSize: number;
      totalChunks: number;
      fileHash?: string;
    }) => {
      const uploadId = params.uploadId || `mock-${params.fileName}`;
      const task = uploadTasks.get(uploadId);

      if (!task) {
        throw new Error(`上传任务不存在: ${uploadId}`);
      }

      // 验证所有分片是否都已上传
      const missingChunks: number[] = [];
      for (let i = 0; i < params.totalChunks; i++) {
        if (!task.chunks.has(i)) {
          missingChunks.push(i);
        }
      }

      if (missingChunks.length > 0) {
        throw new Error(`缺少分片: ${missingChunks.join(', ')}`);
      }

      // 模拟合并过程
      console.log(`[Mock] 开始合并分片: ${params.totalChunks} 个分片`);
      await new Promise(resolve => setTimeout(resolve, mergeDelay));

      // 计算合并后的文件大小（验证）
      let totalSize = 0;
      for (let i = 0; i < params.totalChunks; i++) {
        totalSize += task.chunks.get(i)!.size;
      }

      // 清理任务
      uploadTasks.delete(uploadId);

      const fileUrl = `https://mock-storage.example.com/files/${params.fileName}`;
      const fileId = uploadId;

      console.log(`[Mock] 合并完成:`, {
        fileName: params.fileName,
        fileSize: totalSize,
        fileUrl,
        fileId,
      });

      return {
        fileUrl,
        fileId,
        fileSize: totalSize,
        uploadedAt: new Date().toISOString(),
      };
    },
  };
};

/**
 * 默认 Mock 适配器（快速测试）
 */
export const defaultMockAdapter = createMockAdapter();

/**
 * 慢速 Mock 适配器（用于测试进度显示）
 */
export const slowMockAdapter = createMockAdapter({
  uploadDelay: 2000, // 每个分片 2s
  mergeDelay: 3000, // 合并 3s
});

/**
 * 错误测试 Mock 适配器（用于测试错误处理）
 */
export const errorMockAdapter = createMockAdapter({
  uploadDelay: 500,
  mergeDelay: 1000,
  failChunks: [2, 5], // 第 3 和第 6 个分片会失败
  failProbability: 0.1, // 10% 的随机失败率
});
