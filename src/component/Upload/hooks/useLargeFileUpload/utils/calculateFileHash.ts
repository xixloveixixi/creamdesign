import SparkMD5 from 'spark-md5';
/**
 * 计算文件的 MD5 哈希值
 * 支持两种实现方式：
 * 1. 使用 spark-md5 库（推荐，性能好，支持 MD5）- 优先在主线程使用
 * 2. 使用 Web Crypto API（原生，不需要额外依赖，但只支持 SHA-256）
 *
 * @param file 要计算哈希的文件
 * @param chunkSize 读取文件时的分块大小，默认 2MB
 * @param onProgress 进度回调函数（可选）
 * @param useSparkMD5 是否使用 spark-md5，默认尝试使用
 * @returns Promise<string> 文件的哈希值（MD5 或 SHA-256）
 */
export const calculateFileHash = async (
  file: File,
  chunkSize: number = 2 * 1024 * 1024, // 默认 2MB
  onProgress?: (progress: number) => void,
  useSparkMD5: boolean = true
): Promise<string> => {
  console.log('🚀 开始计算文件哈希:', file.name, file.size);

  return calculateFileHashWithSparkMD5(file, chunkSize, onProgress, SparkMD5);
};

/**
 * 使用 spark-md5 在主线程计算文件哈希（流式处理）
 * 参考：https://blog.csdn.net/wenmin1987/article/details/142974150
 *
 * @param file 要计算哈希的文件
 * @param chunkSize 读取文件时的分块大小
 * @param onProgress 进度回调函数（可选）
 * @param SparkMD5 spark-md5 库的引用
 * @returns Promise<string> 文件的 MD5 哈希值
 */
const calculateFileHashWithSparkMD5 = async (
  file: File,
  chunkSize: number,
  onProgress: ((progress: number) => void) | undefined,
  SparkMD5: any
): Promise<string> => {
  const totalChunks = Math.ceil(file.size / chunkSize);
  console.log(
    `📦 文件将分为 ${totalChunks} 个分块，每块 ${(chunkSize / 1024 / 1024).toFixed(2)}MB`
  );

  return new Promise((resolve, reject) => {
    // 创建 sparkMD5 实例
    const spark = new SparkMD5.ArrayBuffer();
    let processedChunks = 0;

    // 递归函数，逐个处理分块
    function _read(i: number) {
      // 如果所有分块都已处理完毕
      if (i >= totalChunks) {
        // 计算最终哈希值
        const hash = spark.end();
        console.log('✅ 文件哈希计算完成:', hash);
        resolve(hash);
        return;
      }

      // 获取当前分块
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const blob = file.slice(start, end);

      // 创建 FileReader 读取分块
      const reader = new FileReader();

      // 读取完成回调
      reader.onload = e => {
        try {
          // 获取读取到的字节数组
          const bytes = e.target?.result as ArrayBuffer;

          // 将字节数组添加到 sparkMD5 实例中
          spark.append(bytes);
          processedChunks++;

          // 更新进度
          if (onProgress) {
            const progress = Math.round((processedChunks / totalChunks) * 100);
            onProgress(progress);
          }

          // 递归处理下一个分块
          _read(i + 1);
        } catch (error) {
          reject(new Error(`处理分块失败: ${error}`));
        }
      };

      // 读取错误回调
      reader.onerror = () => {
        reject(new Error('文件读取失败'));
      };

      // 以 ArrayBuffer 格式异步读取当前分块
      reader.readAsArrayBuffer(blob);
    }

    // 从索引 0 开始处理
    _read(0);
  });
};
