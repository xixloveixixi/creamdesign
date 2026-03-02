/**
 * Mock 适配器演示组件
 * 用于在 Storybook 中展示大文件上传的 Mock 功能
 */
import React, { useState } from 'react';
import {
  defaultMockAdapter,
  slowMockAdapter,
  errorMockAdapter,
  createMockAdapter,
} from './mockAdapter';

interface UploadProgress {
  loaded: number;
  total: number;
  percent: number;
  speed: number;
  remainingTime: number;
}

// 简化的上传函数（用于演示）
const mockUpload = async (
  file: File,
  adapter: ReturnType<typeof createMockAdapter>,
  onProgress?: (progress: UploadProgress) => void
) => {
  const chunkSize = 2 * 1024 * 1024; // 2MB
  const totalChunks = Math.ceil(file.size / chunkSize);

  // 初始化
  const uploadId = await adapter.initUpload!({
    fileName: file.name,
    fileSize: file.size,
    chunkSize,
    totalChunks,
  });

  // 上传所有分片
  const startTime = Date.now();
  let uploadedSize = 0;

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    try {
      await adapter.uploadChunk({
        uploadId,
        chunkIndex: i,
        chunk,
        fileName: file.name,
        fileSize: file.size,
        totalChunks,
        onProgress: chunkProgress => {
          // 计算总体进度
          const chunkUploaded = (chunkProgress / 100) * chunk.size;
          const currentUploaded = uploadedSize + chunkUploaded;
          const elapsed = (Date.now() - startTime) / 1000;
          const speed = currentUploaded / elapsed;
          const remaining = (file.size - currentUploaded) / speed;

          onProgress?.({
            loaded: currentUploaded,
            total: file.size,
            percent: Math.round((currentUploaded / file.size) * 100),
            speed,
            remainingTime: remaining,
          });
        },
      });

      uploadedSize += chunk.size;
    } catch (error) {
      console.error(`分片 ${i} 上传失败:`, error);
      throw error;
    }
  }

  // 合并分片
  const result = await adapter.mergeChunks!({
    uploadId,
    fileName: file.name,
    fileSize: file.size,
    totalChunks,
  });

  return result;
};

export const MockUploadDemo: React.FC<{
  adapterType?: 'default' | 'slow' | 'error' | 'custom';
}> = ({ adapterType = 'default' }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  const getAdapter = () => {
    switch (adapterType) {
      case 'slow':
        return slowMockAdapter;
      case 'error':
        return errorMockAdapter;
      case 'custom':
        return createMockAdapter({
          uploadDelay: 800,
          mergeDelay: 1500,
          failProbability: 0.05,
        });
      default:
        return defaultMockAdapter;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProgress(null);
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(null);
    setResult(null);
    setError(null);

    try {
      const adapter = getAdapter();
      const result = await mockUpload(file, adapter, progress => {
        setProgress(progress);
      });
      setResult(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setUploading(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatSpeed = (bytesPerSecond: number) => {
    return formatBytes(bytesPerSecond) + '/s';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h3 style={{ marginTop: 0 }}>Mock 适配器演示</h3>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          选择文件：
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ marginBottom: '12px' }}
        />
        {file && (
          <div style={{ fontSize: '14px', color: '#666' }}>
            文件: {file.name} ({formatBytes(file.size)})
          </div>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        style={{
          padding: '8px 16px',
          backgroundColor: uploading ? '#ccc' : '#1890ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: uploading ? 'not-allowed' : 'pointer',
          marginBottom: '20px',
        }}
      >
        {uploading ? '上传中...' : '开始上传'}
      </button>

      {progress && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>上传进度:</strong> {progress.percent}%
          </div>
          <div
            style={{
              width: '100%',
              height: '20px',
              backgroundColor: '#f0f0f0',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress.percent}%`,
                height: '100%',
                backgroundColor: '#1890ff',
                transition: 'width 0.3s',
              }}
            />
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
            {formatBytes(progress.loaded)} / {formatBytes(progress.total)} ·
            速度: {formatSpeed(progress.speed)} · 剩余:{' '}
            {Math.round(progress.remainingTime)}s
          </div>
        </div>
      )}

      {result && (
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f6ffed',
            border: '1px solid #b7eb8f',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          <strong>✅ 上传成功！</strong>
          <pre style={{ marginTop: '8px', fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div
          style={{
            padding: '12px',
            backgroundColor: '#fff2f0',
            border: '1px solid #ffccc7',
            borderRadius: '4px',
            color: '#ff4d4f',
          }}
        >
          <strong>❌ 上传失败:</strong> {error.message}
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>
        💡 提示：打开浏览器控制台可以查看详细的 Mock 日志
      </div>
    </div>
  );
};
