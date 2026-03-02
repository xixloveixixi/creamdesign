/**
 * 计算文件的 MD5 哈希值
 * 优先使用 Web Worker（不阻塞主线程），失败时回退到主线程计算
 *
 * @param file 要计算哈希的文件
 * @param chunkSize 读取文件时的分块大小，默认 2MB
 * @param onProgress 进度回调函数（可选）
 * @returns Promise<string> 文件的 MD5 哈希值
 */
export declare const calculateFileHash: (file: File, chunkSize?: number, onProgress?: (progress: number) => void) => Promise<string>;
//# sourceMappingURL=calculateFileHash.d.ts.map