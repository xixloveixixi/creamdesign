import SparkMD5 from 'spark-md5';
import { HASH_WORKER_CODE } from './hashWorkerCode';

/**
 * 计算文件的 MD5 哈希值
 * 优先使用 Web Worker（不阻塞主线程），失败时回退到主线程计算
 *
 * @param file 要计算哈希的文件
 * @param chunkSize 读取文件时的分块大小，默认 2MB
 * @param onProgress 进度回调函数（可选）
 * @returns Promise<string> 文件的 MD5 哈希值
 */
export const calculateFileHash = async (
  file: File,
  chunkSize: number = 2 * 1024 * 1024,
  onProgress?: (progress: number) => void
): Promise<string> => {
  // 优先尝试 Web Worker
  try {
    return await calculateFileHashWithWorker(file, chunkSize, onProgress);
  } catch {
    // Worker 不可用或执行失败，回退到主线程
    return calculateFileHashOnMainThread(file, chunkSize, onProgress);
  }
};

/**
 * 使用 Web Worker 计算文件 Hash（不阻塞 UI）
 */
const calculateFileHashWithWorker = (
  file: File,
  chunkSize: number,
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let worker: Worker | null = null;

    try {
      // 通过 Blob URL 创建内联 Worker
      const blob = new Blob([HASH_WORKER_CODE], {
        type: 'application/javascript',
      });
      const workerUrl = URL.createObjectURL(blob);
      worker = new Worker(workerUrl);

      worker.onmessage = (e: MessageEvent) => {
        const { type, hash, progress, error } = e.data;

        switch (type) {
          case 'progress':
            onProgress?.(progress);
            break;
          case 'complete':
            worker?.terminate();
            URL.revokeObjectURL(workerUrl);
            resolve(hash);
            break;
          case 'error':
            worker?.terminate();
            URL.revokeObjectURL(workerUrl);
            reject(new Error(error));
            break;
        }
      };

      worker.onerror = (e: ErrorEvent) => {
        worker?.terminate();
        URL.revokeObjectURL(workerUrl);
        reject(new Error(e.message || 'Worker 执行失败'));
      };

      // 发送文件到 Worker
      worker.postMessage({ type: 'hash', file, chunkSize });
    } catch (err) {
      worker?.terminate();
      reject(err);
    }
  });
};

/**
 * 主线程回退方案：使用 SparkMD5 计算文件 Hash
 * 通过 FileReader 异步读取，在 onload 回调间隙让出主线程
 */
const calculateFileHashOnMainThread = (
  file: File,
  chunkSize: number,
  onProgress?: (progress: number) => void
): Promise<string> => {
  const totalChunks = Math.ceil(file.size / chunkSize);

  return new Promise((resolve, reject) => {
    const spark = new SparkMD5.ArrayBuffer();
    let processedChunks = 0;

    function readChunk(i: number) {
      if (i >= totalChunks) {
        resolve(spark.end());
        return;
      }

      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const reader = new FileReader();

      reader.onload = e => {
        try {
          spark.append(e.target?.result as ArrayBuffer);
          processedChunks++;
          onProgress?.(Math.round((processedChunks / totalChunks) * 100));
          readChunk(i + 1);
        } catch (error) {
          reject(new Error(`处理分块失败: ${error}`));
        }
      };

      reader.onerror = () => reject(new Error('文件读取失败'));
      reader.readAsArrayBuffer(file.slice(start, end));
    }

    readChunk(0);
  });
};
