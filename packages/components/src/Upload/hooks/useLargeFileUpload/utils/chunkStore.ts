/**
 * IndexedDB 分片上传持久化工具
 * 用于断点续传：记录已上传的分片，刷新/断网后可恢复
 */

const DB_NAME = 'cream_upload_store';
const DB_VERSION = 1;
const STORE_NAME = 'chunk_records';

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
 * 打开 IndexedDB 数据库
 */
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    // 检查 IndexedDB 是否可用
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB 不可用'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'fileHash' });
        store.createIndex('updatedAt', 'updatedAt', { unique: false });
      }
    };

    request.onsuccess = event => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = () => {
      reject(new Error('无法打开 IndexedDB'));
    };
  });
};

/**
 * 获取分片上传记录
 */
export const getChunkRecord = async (
  fileHash: string
): Promise<ChunkRecord | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(fileHash);

      request.onsuccess = () => {
        resolve(request.result || null);
      };
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  } catch {
    return null;
  }
};

/**
 * 保存/更新分片上传记录
 */
export const saveChunkRecord = async (record: ChunkRecord): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ ...record, updatedAt: Date.now() });

      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  } catch {
    // IndexedDB 不可用时静默失败，不影响上传流程
  }
};

/**
 * 标记某个分片已上传
 */
export const markChunkUploaded = async (
  fileHash: string,
  chunkIndex: number
): Promise<void> => {
  try {
    const record = await getChunkRecord(fileHash);
    if (record) {
      if (!record.uploadedChunks.includes(chunkIndex)) {
        record.uploadedChunks.push(chunkIndex);
        await saveChunkRecord(record);
      }
    }
  } catch {
    // 静默失败
  }
};

/**
 * 删除分片上传记录（上传完成后清理）
 */
export const deleteChunkRecord = async (fileHash: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(fileHash);

      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  } catch {
    // 静默失败
  }
};

/**
 * 清理过期记录（超过指定天数的记录）
 */
export const cleanExpiredRecords = async (
  maxAgeDays: number = 7
): Promise<void> => {
  try {
    const db = await openDB();
    const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000;

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const index = store.index('updatedAt');
      const range = IDBKeyRange.upperBound(cutoff);
      const request = index.openCursor(range);

      request.onsuccess = event => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };

      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  } catch {
    // 静默失败
  }
};
