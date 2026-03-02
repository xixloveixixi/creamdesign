/**
 * IndexedDB 分片上传持久化工具
 * 用于断点续传：记录已上传的分片，刷新/断网后可恢复
 */
/** 持久化记录 */
export interface ChunkRecord {
    /** 文件 Hash 作为主键 */
    fileHash: string;
    /** 文件名 */
    fileName: string;
    /** 文件大小 */
    fileSize: number;
    /** 分片大小 */
    chunkSize: number;
    /** 总分片数 */
    totalChunks: number;
    /** 已上传的分片索引集合 */
    uploadedChunks: number[];
    /** 上传 ID（后端返回） */
    uploadId: string | null;
    /** 最后更新时间 */
    updatedAt: number;
}
/**
 * 获取分片上传记录
 */
export declare const getChunkRecord: (fileHash: string) => Promise<ChunkRecord | null>;
/**
 * 保存/更新分片上传记录
 */
export declare const saveChunkRecord: (record: ChunkRecord) => Promise<void>;
/**
 * 标记某个分片已上传
 */
export declare const markChunkUploaded: (fileHash: string, chunkIndex: number) => Promise<void>;
/**
 * 删除分片上传记录（上传完成后清理）
 */
export declare const deleteChunkRecord: (fileHash: string) => Promise<void>;
/**
 * 清理过期记录（超过指定天数的记录）
 */
export declare const cleanExpiredRecords: (maxAgeDays?: number) => Promise<void>;
//# sourceMappingURL=chunkStore.d.ts.map