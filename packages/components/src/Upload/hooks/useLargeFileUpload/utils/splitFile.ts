// 进行文件的切分
export const splitFile = (file: File, chunkSize: number | null = null) => {
  // 思路：
  // 1. 计算总分片数：Math.ceil(file.size / chunkSize)
  // 2. 循环切分：file.slice(start, end)
  // 3. 返回 Blob 数组
  const totalChunks = chunkSize ? Math.ceil(file.size / chunkSize) : 1;
  const chunks: Blob[] = [];
  for (let i = 0; i < totalChunks; i++) {
    const start = chunkSize ? i * chunkSize : 0;
    const end = chunkSize ? Math.min(start + chunkSize, file.size) : file.size;
    chunks.push(file.slice(start, end));
  }
  return chunks;
};
