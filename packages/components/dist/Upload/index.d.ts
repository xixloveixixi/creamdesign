import { Upload } from './Upload';
export default Upload;
export type { UploadProps, FileItem, UploadRef } from './Upload';
export type { UploadAdapter, UploadControl, UploadState, ProgressInfo, } from './hooks/useLargeFileUpload/types';
export { createDefaultAdapter } from './hooks/useLargeFileUpload/adapter';
export { createMockAdapter } from './hooks/useLargeFileUpload/mockAdapter';
//# sourceMappingURL=index.d.ts.mapimport SparkMD5 from 'spark-md5';
import '@fortawesome/react-fontawesome';

const FileList = ({ fileList, onRemoved, onToggleStatus, }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const getStatusIcon = (status, isHovered = false) => {
        // 如果悬浮在success状态上，显示error图标
        if (status === 'success' && isHovered) {
            return faXmark;
        }
        switch (status) {
            case 'uploading':
                return faSpinner;
            case 'success':
                return faCircleCheck;
            case 'error':
                return faCircleXmark;
            default:
                return faCircleCheck;
        }
    };
    const getStatusClass = (status) => {
        switch (status) {
            case 'uploading':
                return 'status-uploading';
            case 'success':
                return 'status-success';
            case 'error':
                return 'status-error';
            default:
                return 'status-uploading';
        }
    };
    return (jsx("div", { className: "file-list-container", children: jsx("div", { className: "file-list", children: fileList.map(item => (jsxs("div", { className: `file-item ${getStatusClass(item.status)}`, children: [jsxs("div", { className: "file-content", children: [jsxs("div", { className: "file-left", children: [jsx(Icon, { icon: faFile, className: "file-main-icon" }), jsx("div", { className: "file-info", children: jsx("span", { className: "file-name", title: item.name, children: item.name }) })] }), jsx("div", { className: "file-right", children: jsxs("div", { className: "status-section", children: [jsx("div", { className: "status-with-remove", children: jsx("button", { className: "status-icon-btn", disabled: item.status === 'uploading', onMouseEnter: () => setHoveredItem(item.uid), onMouseLeave: () => setHoveredItem(null), onClick: () => {
                                                    // 如果是success状态悬浮时显示error图标，此时点击就是删除
                                                    // 如果是error状态，直接点击删除
                                                    if (item.status === 'success' &&
                                                        hoveredItem === item.uid) {
                                                        onRemoved === null || onRemoved === void 0 ? void 0 : onRemoved(item);
                                                    }
                                                    else if (item.status === 'error') {
                                                        onRemoved === null || onRemoved === void 0 ? void 0 : onRemoved(item);
                                                    }
                                                }, children: jsx(Icon, { icon: getStatusIcon(item.status, hoveredItem === item.uid), className: `status-icon ${getStatusClass(item.status)}` }) }) }), jsxs("span", { className: "file-status", children: [item.status === 'uploading' && '上传中...', item.status === 'success' && '上传成功', item.status === 'error' && '上传失败'] })] }) })] }), item.status === 'uploading' && (jsx("div", { className: "progress-section", children: jsx(Progress, { percent: item.percent, showText: false }) }))] }, item.uid))) }) }));
};

const Dragger = props => {
    const { onFile, children } = props;
    const [isDragover, setIsDragover] = useState(false);
    const klass = classNames('upload-dragger', {
        'is-dragover': isDragover,
    });
    const handelDrag = (e, isOver) => {
        e.preventDefault();
        setIsDragover(isOver);
    };
    // 默认内容
    const defaultContent = (jsxs("div", { className: "dragger-content", children: [jsx("div", { className: "dragger-icon", children: "\uD83D\uDCC1" }), jsx("div", { className: "dragger-text", children: "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u533A\u57DF" }), jsx("div", { className: "dragger-hint", children: "\u652F\u6301\u591A\u6587\u4EF6\u4E0A\u4F20" })] }));
    return (jsx("div", { className: klass, onDragOver: e => handelDrag(e, true), onDragLeave: e => {
            e.preventDefault();
            handelDrag(e, false);
        }, onDrop: e => {
            e.preventDefault();
            handelDrag(e, false);
            onFile(e.dataTransfer.files);
        }, children: children || defaultContent }));
};

/**
 * Web Worker 内联代码 - 在子线程中计算文件 MD5 Hash
 * 包含完整的 MD5 算法实现（基于 RFC 1321），无需外部依赖
 * 使用 Blob URL 方式创建 Worker，避免额外的打包配置
 */
const HASH_WORKER_CODE = `
'use strict';

// ========== MD5 Algorithm (RFC 1321) ==========

// T[i] = floor(abs(sin(i + 1)) * 2^32)
var T = [
  0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
  0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
  0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
  0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
  0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
  0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
  0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
  0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
  0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
  0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
  0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
  0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
  0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
  0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
  0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
  0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
];

// 每轮移位量
var S = [
  7,12,17,22, 7,12,17,22, 7,12,17,22, 7,12,17,22,
  5, 9,14,20, 5, 9,14,20, 5, 9,14,20, 5, 9,14,20,
  4,11,16,23, 4,11,16,23, 4,11,16,23, 4,11,16,23,
  6,10,15,21, 6,10,15,21, 6,10,15,21, 6,10,15,21
];

// MD5 内部状态
var _state, _buffer, _bufLen, _totalLen;

function md5Init() {
  _state = new Int32Array([0x67452301, -271733879, -1732584194, 271733878]);
  _buffer = new Uint8Array(64);
  _bufLen = 0;
  _totalLen = 0;
}

// 处理一个 64 字节块
function md5Transform(block) {
  var x = new Int32Array(16);
  for (var i = 0; i < 16; i++) {
    var o = i * 4;
    x[i] = block[o] | (block[o+1] << 8) | (block[o+2] << 16) | (block[o+3] << 24);
  }

  var a = _state[0], b = _state[1], c = _state[2], d = _state[3];

  for (var i = 0; i < 64; i++) {
    var f, g;
    if (i < 16) {
      f = (b & c) | ((~b) & d);
      g = i;
    } else if (i < 32) {
      f = (d & b) | ((~d) & c);
      g = (5 * i + 1) % 16;
    } else if (i < 48) {
      f = b ^ c ^ d;
      g = (3 * i + 5) % 16;
    } else {
      f = c ^ (b | (~d));
      g = (7 * i) % 16;
    }

    var temp = d;
    d = c;
    c = b;
    var sum = (a + f + T[i] + x[g]) | 0;
    b = (b + ((sum << S[i]) | (sum >>> (32 - S[i])))) | 0;
    a = temp;
  }

  _state[0] = (_state[0] + a) | 0;
  _state[1] = (_state[1] + b) | 0;
  _state[2] = (_state[2] + c) | 0;
  _state[3] = (_state[3] + d) | 0;
}

// 增量添加数据
function md5Update(arrayBuffer) {
  var input = new Uint8Array(arrayBuffer);
  var len = input.length;
  _totalLen += len;
  var pos = 0;

  if (_bufLen > 0) {
    var need = 64 - _bufLen;
    var copy = Math.min(need, len);
    _buffer.set(input.subarray(0, copy), _bufLen);
    _bufLen += copy;
    pos = copy;
    if (_bufLen === 64) {
      md5Transform(_buffer);
      _bufLen = 0;
    }
  }

  while (pos + 64 <= len) {
    md5Transform(input.subarray(pos, pos + 64));
    pos += 64;
  }

  if (pos < len) {
    _buffer.set(input.subarray(pos), 0);
    _bufLen = len - pos;
  }
}

// 完成计算，返回 Hash 十六进制字符串
function md5Finalize() {
  var totalBits = _totalLen * 8;
  var lo = totalBits % 4294967296;
  var hi = Math.floor(totalBits / 4294967296);

  // 计算填充长度：填充至 56 mod 64
  var padLen = ((_bufLen < 56) ? 56 : 120) - _bufLen;
  var padding = new Uint8Array(padLen + 8);
  padding[0] = 0x80;

  // 追加原始消息长度（64-bit LE）
  padding[padLen]     = lo & 0xff;
  padding[padLen + 1] = (lo >>> 8) & 0xff;
  padding[padLen + 2] = (lo >>> 16) & 0xff;
  padding[padLen + 3] = (lo >>> 24) & 0xff;
  padding[padLen + 4] = hi & 0xff;
  padding[padLen + 5] = (hi >>> 8) & 0xff;
  padding[padLen + 6] = (hi >>> 16) & 0xff;
  padding[padLen + 7] = (hi >>> 24) & 0xff;

  // 直接处理填充块（不更新 _totalLen）
  var input = padding;
  var pos = 0;

  if (_bufLen > 0) {
    var need = 64 - _bufLen;
    _buffer.set(input.subarray(0, need), _bufLen);
    md5Transform(_buffer);
    pos = need;
    _bufLen = 0;
  }

  while (pos + 64 <= input.length) {
    md5Transform(input.subarray(pos, pos + 64));
    pos += 64;
  }

  var hex = '';
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var byte = (_state[i] >>> (j * 8)) & 0xff;
      hex += ('0' + byte.toString(16)).slice(-2);
    }
  }
  return hex;
}

// ========== Worker 消息处理 ==========

self.onmessage = function(e) {
  var data = e.data;

  if (data.type === 'hash') {
    try {
      var file = data.file;
      var chunkSize = data.chunkSize || 2 * 1024 * 1024;
      var totalChunks = Math.ceil(file.size / chunkSize);

      md5Init();

      var reader = new FileReaderSync();

      for (var i = 0; i < totalChunks; i++) {
        var start = i * chunkSize;
        var end = Math.min(start + chunkSize, file.size);
        var blob = file.slice(start, end);
        var buffer = reader.readAsArrayBuffer(blob);
        md5Update(buffer);

        self.postMessage({
          type: 'progress',
          progress: Math.round(((i + 1) / totalChunks) * 100)
        });
      }

      var hash = md5Finalize();
      self.postMessage({ type: 'complete', hash: hash });
    } catch (err) {
      self.postMessage({ type: 'error', error: err.message || 'Hash 计算失败' });
    }
  }
};
`;

/**
 * 计算文件的 MD5 哈希值
 * 优先使用 Web Worker（不阻塞主线程），失败时回退到主线程计算
 *
 * @param file 要计算哈希的文件
 * @param chunkSize 读取文件时的分块大小，默认 2MB
 * @param onProgress 进度回调函数（可选）
 * @returns Promise<string> 文件的 MD5 哈希值
 */
const calculateFileHash = async (file, chunkSize = 2 * 1024 * 1024, onProgress) => {
    // 优先尝试 Web Worker
    try {
        return await calculateFileHashWithWorker(file, chunkSize, onProgress);
    }
    catch (_a) {
        // Worker 不可用或执行失败，回退到主线程
        return calculateFileHashOnMainThread(file, chunkSize, onProgress);
    }
};
/**
 * 使用 Web Worker 计算文件 Hash（不阻塞 UI）
 */
const calculateFileHashWithWorker = (file, chunkSize, onProgress) => {
    return new Promise((resolve, reject) => {
        let worker = null;
        try {
            // 通过 Blob URL 创建内联 Worker
            const blob = new Blob([HASH_WORKER_CODE], {
                type: 'application/javascript',
            });
            const workerUrl = URL.createObjectURL(blob);
            worker = new Worker(workerUrl);
            worker.onmessage = (e) => {
                const { type, hash, progress, error } = e.data;
                switch (type) {
                    case 'progress':
                        onProgress === null || onProgress === void 0 ? void 0 : onProgress(progress);
                        break;
                    case 'complete':
                        worker === null || worker === void 0 ? void 0 : worker.terminate();
                        URL.revokeObjectURL(workerUrl);
                        resolve(hash);
                        break;
                    case 'error':
                        worker === null || worker === void 0 ? void 0 : worker.terminate();
                        URL.revokeObjectURL(workerUrl);
                        reject(new Error(error));
                        break;
                }
            };
            worker.onerror = (e) => {
                worker === null || worker === void 0 ? void 0 : worker.terminate();
                URL.revokeObjectURL(workerUrl);
                reject(new Error(e.message || 'Worker 执行失败'));
            };
            // 发送文件到 Worker
            worker.postMessage({ type: 'hash', file, chunkSize });
        }
        catch (err) {
            worker === null || worker === void 0 ? void 0 : worker.terminate();
            reject(err);
        }
    });
};
/**
 * 主线程回退方案：使用 SparkMD5 计算文件 Hash
 * 通过 FileReader 异步读取，在 onload 回调间隙让出主线程
 */
const calculateFileHashOnMainThread = (file, chunkSize, onProgress) => {
    const totalChunks = Math.ceil(file.size / chunkSize);
    return new Promise((resolve, reject) => {
        const spark = new SparkMD5.ArrayBuffer();
        let processedChunks = 0;
        function readChunk(i) {
            if (i >= totalChunks) {
                resolve(spark.end());
                return;
            }
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const reader = new FileReader();
            reader.onload = e => {
                var _a;
                try {
                    spark.append((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
                    processedChunks++;
                    onProgress === null || onProgress === void 0 ? void 0 : onProgress(Math.round((processedChunks / totalChunks) * 100));
                    readChunk(i + 1);
                }
                catch (error) {
                    reject(new Error(`处理分块失败: ${error}`));
                }
            };
            reader.onerror = () => reject(new Error('文件读取失败'));
            reader.readAsArrayBuffer(file.slice(start, end));
        }
        readChunk(0);
    });
};

// 进行文件的切分
const splitFile = (file, chunkSize = null) => {
    // 思路：
    // 1. 计算总分片数：Math.ceil(file.size / chunkSize)
    // 2. 循环切分：file.slice(start, end)
    // 3. 返回 Blob 数组
    const totalChunks = chunkSize ? Math.ceil(file.size / chunkSize) : 1;
    const chunks = [];
    for (let i = 0; i < totalChunks; i++) {
        const start = chunkSize ? i * chunkSize : 0;
        const end = chunkSize ? Math.min(start + chunkSize, file.size) : file.size;
        chunks.push(file.slice(start, end));
    }
    return chunks;
};

/**
 * 上传单个分片（带重试机制 + 取消支持）
 */
const uploadChunkWithRetry = async (params, retryCount = 0) => {
    const { chunk, chunkIndex, adapter, uploadId, fileHash, fileName, fileSize, totalChunks, maxRetries, retryDelay, signal, } = params;
    // 检查是否已取消
    if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
        throw new DOMException('上传已取消', 'AbortError');
    }
    try {
        await adapter.uploadChunk({
            uploadId,
            chunkIndex,
            chunk,
            fileName,
            fileSize,
            totalChunks,
            fileHash,
            signal,
        });
    }
    catch (error) {
        // 如果是取消操作，直接抛出不重试
        if ((signal === null || signal === void 0 ? void 0 : signal.aborted) ||
            (error instanceof DOMException && error.name === 'AbortError')) {
            throw new DOMException('上传已取消', 'AbortError');
        }
        // 如果还有重试次数，则重试
        if (retryCount < maxRetries) {
            // 指数退避：延迟时间 = retryDelay * 2^retryCount
            const delay = retryDelay * Math.pow(2, retryCount);
            // 等待时也支持取消
            await new Promise((resolve, reject) => {
                const timer = setTimeout(resolve, delay);
                if (signal) {
                    const onAbort = () => {
                        clearTimeout(timer);
                        reject(new DOMException('上传已取消', 'AbortError'));
                    };
                    if (signal.aborted) {
                        clearTimeout(timer);
                        reject(new DOMException('上传已取消', 'AbortError'));
                        return;
                    }
                    signal.addEventListener('abort', onAbort, { once: true });
                }
            });
            // 递归重试
            return uploadChunkWithRetry(params, retryCount + 1);
        }
        // 超过最大重试次数，抛出错误
        throw error;
    }
};

/**
 * IndexedDB 分片上传持久化工具
 * 用于断点续传：记录已上传的分片，刷新/断网后可恢复
 */
const DB_NAME = 'cream_upload_store';
const DB_VERSION = 1;
const STORE_NAME = 'chunk_records';
/**
 * 打开 IndexedDB 数据库
 */
const openDB = () => {
    return new Promise((resolve, reject) => {
        // 检查 IndexedDB 是否可用
        if (typeof indexedDB === 'undefined') {
            reject(new Error('IndexedDB 不可用'));
            return;
        }
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'fileHash' });
                store.createIndex('updatedAt', 'updatedAt', { unique: false });
            }
        };
        request.onsuccess = event => {
            resolve(event.target.result);
        };
        request.onerror = () => {
            reject(new Error('无法打开 IndexedDB'));
        };
    });
};
/**
 * 获取分片上传记录
 */
const getChunkRecord = async (fileHash) => {
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
    }
    catch (_a) {
        return null;
    }
};
/**
 * 保存/更新分片上传记录
 */
const saveChunkRecord = async (record) => {
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
    }
    catch (_a) {
        // IndexedDB 不可用时静默失败，不影响上传流程
    }
};
/**
 * 标记某个分片已上传
 */
const markChunkUploaded = async (fileHash, chunkIndex) => {
    try {
        const record = await getChunkRecord(fileHash);
        if (record) {
            if (!record.uploadedChunks.includes(chunkIndex)) {
                record.uploadedChunks.push(chunkIndex);
                await saveChunkRecord(record);
            }
        }
    }
    catch (_a) {
        // 静默失败
    }
};
/**
 * 删除分片上传记录（上传完成后清理）
 */
const deleteChunkRecord = async (fileHash) => {
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
    }
    catch (_a) {
        // 静默失败
    }
};
/**
 * 清理过期记录（超过指定天数的记录）
 */
const cleanExpiredRecords = async (maxAgeDays = 7) => {
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
                const cursor = event.target.result;
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
    }
    catch (_a) {
        // 静默失败
    }
};

/**
 * 并发分片上传
 * 支持：跳过已上传分片（断点续传）、AbortSignal 取消、暂停恢复
 */
/**
 * 并发上传所有分片
 */
const uploadChunks = async (params) => {
    const { chunks, adapter, uploadId, fileHash, fileName, fileSize, totalChunks, concurrent, maxRetries, retryDelay, uploadedChunkIndices = [], signal, isPaused, waitForResume, onProgress, onChunkComplete, } = params;
    // 构建待上传的分片索引列表（跳过已上传的）
    const uploadedSet = new Set(uploadedChunkIndices);
    const pendingIndices = Array.from({ length: chunks.length }, (_, i) => i).filter(i => !uploadedSet.has(i));
    let uploadedChunks = uploadedChunkIndices.length;
    // 报告初始进度（已有断点续传的进度）
    if (uploadedChunks > 0) {
        onProgress === null || onProgress === void 0 ? void 0 : onProgress({
            percent: Math.round((uploadedChunks / totalChunks) * 100),
            uploadedChunks,
            totalChunks,
            uploadedSize: (uploadedChunks / totalChunks) * fileSize,
            totalSize: fileSize,
            state: 'uploading',
        });
    }
    // 分批上传
    for (let i = 0; i < pendingIndices.length; i += concurrent) {
        // 检查是否已取消
        if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
            throw new DOMException('上传已取消', 'AbortError');
        }
        // 检查是否暂停，等待恢复
        if ((isPaused === null || isPaused === void 0 ? void 0 : isPaused()) && waitForResume) {
            await waitForResume();
        }
        const batch = pendingIndices.slice(i, i + concurrent);
        // 并发上传当前批次
        await Promise.all(batch.map(async (chunkIndex) => {
            // 再次检查暂停
            if ((isPaused === null || isPaused === void 0 ? void 0 : isPaused()) && waitForResume) {
                await waitForResume();
            }
            await uploadChunkWithRetry({
                chunk: chunks[chunkIndex],
                chunkIndex,
                adapter,
                uploadId,
                fileHash,
                fileName,
                fileSize,
                totalChunks,
                maxRetries,
                retryDelay,
                signal,
            });
            uploadedChunks++;
            onChunkComplete === null || onChunkComplete === void 0 ? void 0 : onChunkComplete(chunkIndex, totalChunks);
            // 持久化已上传分片记录（断点续传）
            markChunkUploaded(fileHash, chunkIndex).catch(() => {
                // 静默失败，不影响上传
            });
            // 更新进度
            onProgress === null || onProgress === void 0 ? void 0 : onProgress({
                percent: Math.round((uploadedChunks / totalChunks) * 100),
                uploadedChunks,
                totalChunks,
                uploadedSize: (uploadedChunks / totalChunks) * fileSize,
                totalSize: fileSize,
                state: 'uploading',
            });
        }));
    }
};

/**
 * 大文件上传 Hook
 *
 * 功能特性：
 * - Web Worker 计算文件 Hash（不阻塞 UI）
 * - 秒传：Hash 查后端是否已存在
 * - 断点续传：IndexedDB 持久化分片记录
 * - 上传控制：pause / resume / cancel
 * - 并发上传 + 指数退避重试
 */
const useLargeFileUpload = (props) => {
    const { adapter, chunkSize = 5 * 1024 * 1024, concurrent = 3, maxRetries = 3, retryDelay = 1000, enableResume = true, onProgress, onHashProgress, onSuccess, onError, onChunkComplete, } = props;
    // 当前上传进度
    const [currentProgress, setCurrentProgress] = useState(null);
    // 上传状态
    const stateRef = useRef('idle');
    // AbortController 用于取消
    const abortControllerRef = useRef(null);
    // 暂停控制
    const pausedRef = useRef(false);
    const resumeResolverRef = useRef(null);
    /**
     * 暂停上传
     */
    const pause = useCallback(() => {
        if (stateRef.current === 'uploading') {
            pausedRef.current = true;
            stateRef.current = 'paused';
        }
    }, []);
    /**
     * 恢复上传
     */
    const resume = useCallback(() => {
        var _a;
        if (stateRef.current === 'paused') {
            pausedRef.current = false;
            stateRef.current = 'uploading';
            // 释放等待中的 Promise
            (_a = resumeResolverRef.current) === null || _a === void 0 ? void 0 : _a.call(resumeResolverRef);
            resumeResolverRef.current = null;
        }
    }, []);
    /**
     * 取消上传
     */
    const cancel = useCallback(() => {
        var _a, _b;
        stateRef.current = 'error';
        pausedRef.current = false;
        // 释放暂停等待
        (_a = resumeResolverRef.current) === null || _a === void 0 ? void 0 : _a.call(resumeResolverRef);
        resumeResolverRef.current = null;
        // 中止所有正在进行的请求
        (_b = abortControllerRef.current) === null || _b === void 0 ? void 0 : _b.abort();
    }, []);
    /**
     * 检查是否暂停
     */
    const isPaused = () => pausedRef.current;
    /**
     * 等待恢复（返回一个 Promise，恢复时 resolve）
     */
    const waitForResume = () => {
        return new Promise(resolve => {
            if (!pausedRef.current) {
                resolve();
                return;
            }
            resumeResolverRef.current = resolve;
        });
    };
    // 上传函数
    const upload = useCallback(async (file) => {
        const startTime = Date.now();
        // 初始化控制器
        abortControllerRef.current = new AbortController();
        pausedRef.current = false;
        stateRef.current = 'hashing';
        try {
            // 清理过期的断点续传记录
            if (enableResume) {
                cleanExpiredRecords().catch(() => { });
            }
            // ===== 阶段 1：计算文件 Hash（Web Worker） =====
            stateRef.current = 'hashing';
            const fileHash = await calculateFileHash(file, chunkSize, percent => {
                onHashProgress === null || onHashProgress === void 0 ? void 0 : onHashProgress(percent);
                setCurrentProgress({
                    percent: 0,
                    uploadedChunks: 0,
                    totalChunks: 0,
                    uploadedSize: 0,
                    totalSize: file.size,
                    state: 'hashing',
                    hashPercent: percent,
                });
            });
            // 检查是否已取消
            if (abortControllerRef.current.signal.aborted) {
                throw new DOMException('上传已取消', 'AbortError');
            }
            // ===== 阶段 2：秒传检查 =====
            if (adapter.checkFileExists) {
                const checkResult = await adapter.checkFileExists({
                    fileHash,
                    fileName: file.name,
                    fileSize: file.size,
                });
                if (checkResult.exists && checkResult.fileUrl) {
                    // 秒传成功！
                    const result = {
                        fileId: checkResult.fileId || fileHash,
                        fileUrl: checkResult.fileUrl,
                        fileName: file.name,
                        fileSize: file.size,
                        uploadTime: Date.now() - startTime,
                        instantUpload: true,
                    };
                    stateRef.current = 'success';
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(result);
                    return result;
                }
                // 后端返回已上传的分片列表（用于断点续传）
                if (checkResult.uploadedChunks &&
                    checkResult.uploadedChunks.length > 0 &&
                    enableResume) {
                    const record = await getChunkRecord(fileHash);
                    if (!record) {
                        const defaultChunkSize = chunkSize || 5 * 1024 * 1024;
                        await saveChunkRecord({
                            fileHash,
                            fileName: file.name,
                            fileSize: file.size,
                            chunkSize: defaultChunkSize,
                            totalChunks: Math.ceil(file.size / defaultChunkSize),
                            uploadedChunks: checkResult.uploadedChunks,
                            uploadId: null,
                            updatedAt: Date.now(),
                        });
                    }
                }
            }
            // ===== 阶段 3：划分文件 =====
            const defaultChunkSize = chunkSize || 5 * 1024 * 1024;
            const fileChunks = splitFile(file, defaultChunkSize);
            const totalChunks = fileChunks.length;
            // ===== 阶段 4：加载断点续传记录 =====
            let uploadedChunkIndices = [];
            let uploadId = null;
            if (enableResume) {
                const record = await getChunkRecord(fileHash);
                if (record &&
                    record.fileSize === file.size &&
                    record.chunkSize === defaultChunkSize &&
                    record.totalChunks === totalChunks) {
                    uploadedChunkIndices = record.uploadedChunks;
                    uploadId = record.uploadId;
                }
            }
            // ===== 阶段 5：初始化上传 =====
            if (!uploadId && adapter.initUpload) {
                uploadId = await adapter.initUpload({
                    fileName: file.name,
                    fileSize: file.size,
                    fileHash,
                    chunkSize: defaultChunkSize,
                    totalChunks,
                });
            }
            // 保存断点记录
            if (enableResume) {
                await saveChunkRecord({
                    fileHash,
                    fileName: file.name,
                    fileSize: file.size,
                    chunkSize: defaultChunkSize,
                    totalChunks,
                    uploadedChunks: uploadedChunkIndices,
                    uploadId,
                    updatedAt: Date.now(),
                });
            }
            // ===== 阶段 6：上传分片 =====
            stateRef.current = 'uploading';
            await uploadChunks({
                chunks: fileChunks,
                adapter,
                uploadId,
                fileHash,
                fileName: file.name,
                fileSize: file.size,
                totalChunks,
                concurrent,
                maxRetries,
                retryDelay,
                uploadedChunkIndices,
                signal: abortControllerRef.current.signal,
                isPaused,
                waitForResume,
                onProgress: progress => {
                    setCurrentProgress(progress);
                    onProgress === null || onProgress === void 0 ? void 0 : onProgress(progress);
                },
                onChunkComplete,
            });
            // ===== 阶段 7：合并分片 =====
            stateRef.current = 'merging';
            const result = await adapter.mergeChunks({
                uploadId,
                fileHash,
                fileName: file.name,
                fileSize: file.size,
                totalChunks,
            });
            // 上传完成，清理断点记录
            if (enableResume) {
                await deleteChunkRecord(fileHash);
            }
            // ===== 阶段 8：返回结果 =====
            const uploadResult = {
                fileId: result.fileId,
                fileUrl: result.fileUrl,
                fileName: file.name,
                fileSize: file.size,
                uploadTime: Date.now() - startTime,
                instantUpload: false,
                response: result,
            };
            stateRef.current = 'success';
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(uploadResult);
            return uploadResult;
        }
        catch (error) {
            const err = error;
            stateRef.current = 'error';
            onError === null || onError === void 0 ? void 0 : onError(err, file);
            throw err;
        }
    }, [
        adapter,
        chunkSize,
        concurrent,
        maxRetries,
        retryDelay,
        enableResume,
        onProgress,
        onHashProgress,
        onSuccess,
        onError,
        onChunkComplete,
    ]);
    return {
        upload,
        getProgress: () => currentProgress,
        getControl: () => ({
            pause,
            resume,
            cancel,
            state: stateRef.current,
        }),
    };
};

/**
 * 默认适配器创建工具
 * 基于 Upload 组件的配置创建适配器
 */
/**
 * 创建默认适配器
 * 基于标准的后端接口规范
 */
const createDefaultAdapter = (config) => {
    const { action, checkUrl, initUrl, chunkUrl, mergeUrl, headers, data, withCredentials, name = 'file', } = config;
    return {
        // 秒传检查（可选）
        checkFileExists: checkUrl
            ? async (params) => {
                try {
                    const response = await axios.post(checkUrl, {
                        fileHash: params.fileHash,
                        fileName: params.fileName,
                        fileSize: params.fileSize,
                        ...data,
                    }, { headers, withCredentials });
                    return {
                        exists: !!response.data.exists,
                        fileUrl: response.data.fileUrl || response.data.file_url,
                        fileId: response.data.fileId || response.data.file_id,
                        uploadedChunks: response.data.uploadedChunks ||
                            response.data.uploaded_chunks ||
                            [],
                    };
                }
                catch (_a) {
                    // 检查失败时视为文件不存在，继续正常上传
                    return { exists: false };
                }
            }
            : undefined,
        // 初始化上传（可选）
        initUpload: initUrl
            ? async (fileInfo) => {
                try {
                    const response = await axios.post(initUrl || `${action}/init`, {
                        fileName: fileInfo.fileName,
                        fileSize: fileInfo.fileSize,
                        fileHash: fileInfo.fileHash,
                        chunkSize: fileInfo.chunkSize,
                        totalChunks: fileInfo.totalChunks,
                        ...data,
                    }, {
                        headers,
                        withCredentials,
                    });
                    return response.data.uploadId || response.data.upload_id || null;
                }
                catch (error) {
                    // 如果初始化失败，返回 null，继续使用文件名作为 uploadId
                    console.warn('初始化上传失败，将使用文件名作为标识:', error);
                    return null;
                }
            }
            : undefined,
        // 上传分片
        uploadChunk: async (params) => {
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
            const response = await axios.post(chunkUrl || `${action}/chunk`, formData, {
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
            });
            return {
                success: response.data.success !== false,
                chunkIndex: params.chunkIndex,
            };
        },
        // 合并分片
        mergeChunks: async (params) => {
            const response = await axios.post(mergeUrl || `${action}/merge`, {
                uploadId: params.uploadId,
                fileName: params.fileName,
                fileSize: params.fileSize,
                totalChunks: params.totalChunks,
                fileHash: params.fileHash,
                ...data,
            }, {
                headers,
                withCredentials,
            });
            return {
                fileUrl: response.data.fileUrl || response.data.file_url,
                fileId: response.data.fileId ||
                    response.data.file_id ||
                    params.uploadId ||
                    '',
                ...response.data,
            };
        },
    };
};

const Upload = forwardRef(({ action, defaultFileList, headers, name, data, withCredentials, accept, multiple, beforeUpload, onProgress, onSuccess, onError, onChange, onBeforeUploadSuccess, onRemoved, children, drag, 
// 大文件上传配置
enableLargeFileUpload = true, chunkSize = 5 * 1024 * 1024, chunkThreshold = 10 * 1024 * 1024, concurrent = 3, maxRetries = 3, retryDelay = 1000, adapter, checkUrl, initUrl, chunkUrl, mergeUrl, enableResume = true, onHashProgress, }, ref) => {
    // 创建文件列表状态
    const [fileList, setFileList] = useState(defaultFileList || []);
    // 存储当前上传的文件信息（用于进度更新）
    const currentUploadingFileIdRef = useRef(null);
    const currentUploadingFileRef = useRef(null);
    // 创建默认适配器（如果未提供自定义适配器）
    const defaultAdapter = useMemo(() => {
        if (adapter) {
            return adapter;
        }
        return createDefaultAdapter({
            action,
            checkUrl,
            initUrl,
            chunkUrl,
            mergeUrl,
            headers,
            data,
            withCredentials,
            name,
        });
    }, [
        adapter,
        action,
        checkUrl,
        initUrl,
        chunkUrl,
        mergeUrl,
        headers,
        data,
        withCredentials,
        name,
    ]);
    // 大文件上传 Hook（集成秒传 / 断点续传 / 暂停恢复取消 / Web Worker Hash）
    const largeFileUpload = useLargeFileUpload({
        adapter: defaultAdapter,
        chunkSize,
        concurrent,
        maxRetries,
        retryDelay,
        enableResume,
        onHashProgress,
        onProgress: progress => {
            // 更新文件列表中的进度
            if (currentUploadingFileIdRef.current) {
                updateFileList(currentUploadingFileIdRef.current, {
                    status: 'uploading',
                    percent: progress.percent,
                });
                // 调用原有的 onProgress 回调（兼容原有 API）
                if (onProgress && currentUploadingFileRef.current) {
                    onProgress(progress.percent, currentUploadingFileRef.current);
                }
            }
        },
        onSuccess: _result => {
            // 上传成功的处理在 uploadLargeFile 中完成
        },
        onError: (_error, _file) => {
            // 上传失败的处理在 uploadLargeFile 中完成
        },
    });
    // 通过 ref 暴露上传控制能力
    useImperativeHandle(ref, () => ({
        pause: () => largeFileUpload.getControl().pause(),
        resume: () => largeFileUpload.getControl().resume(),
        cancel: () => largeFileUpload.getControl().cancel(),
        getControl: () => largeFileUpload.getControl(),
        getProgress: () => largeFileUpload.getProgress(),
        getFileList: () => fileList,
    }));
    // 创建一个更新文件列表的函数
    const updateFileList = (targetUid, updateObj) => {
        setFileList(prevList => {
            const newList = prevList.map(item => item.uid === targetUid ? { ...item, ...updateObj } : item);
            return newList;
        });
    };
    const handelFileChange = () => {
        //触发文件选择对话框
        if (uploadInputRef.current) {
            uploadInputRef.current.click();
        }
    };
    const uploadInputRef = useRef(null);
    // 值变化的时候添加文件
    const handelChange = (e) => {
        const file = e.target.files;
        // 如果文件不存在，直接返回
        if (!file) {
            return;
        }
        // 如果文件存在，调用handelFileUpload函数
        if (file) {
            handelFileUpload(file);
        }
        // 最后清空当前文件选择
        if (uploadInputRef.current) {
            uploadInputRef.current.value = '';
        }
    };
    const post = (file) => {
        // 文件对象创建
        const fileItem = {
            uid: Date.now() + '-' + file.name,
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file,
        };
        // 更新文件列表状态
        setFileList(prevList => [...prevList, fileItem]);
        // 1、创建FormData对象
        const formData = new FormData();
        // 2、追加文件到FormData
        // todo:添加name属性，解决后端接收文件名问题
        formData.append(name || 'file', file);
        // todo:添加data属性，解决后端接收自定义字段问题
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
        }
        // 3、发送POST请求
        axios
            .post(action, formData, {
            // 4、设置请求头为multipart/form-data
            // todo:自定义请求头
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // },
            // todo:自定义请求头
            headers: headers || {},
            withCredentials: withCredentials || false,
            // 5、设置上传进度回调
            onUploadProgress: e => {
                // 6、计算上传进度
                const progress = Math.round((e.loaded * 100) / e.total);
                if (progress < 100) {
                    // 在这个地方需要更新文件列表，在setState中更新
                    // 打印当前文件项的详细信息
                    updateFileList(fileItem.uid, {
                        status: 'uploading',
                        percent: progress,
                    });
                    if (onProgress) {
                        onProgress(progress, file);
                    }
                }
            },
        })
            .then(response => {
            // 更新文件状态为成功
            updateFileList(fileItem.uid, {
                status: 'success',
                percent: 100,
                response: response.data,
            });
            if (onSuccess) {
                // 7、调用成功回调
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(response.data, file);
            }
            if (onChange) {
                // 9、调用onChange回调
                onChange === null || onChange === void 0 ? void 0 : onChange(file);
            }
        })
            .catch(error => {
            // 更新文件状态为失败
            updateFileList(fileItem.uid, {
                status: 'error',
                error: error,
            });
            if (onError) {
                // 8、调用失败回调
                onError === null || onError === void 0 ? void 0 : onError(error, file);
            }
            if (onChange) {
                // 10、调用onChange回调
                onChange === null || onChange === void 0 ? void 0 : onChange(file);
            }
        });
    };
    // 大文件上传函数（集成秒传 / 断点续传 / 暂停恢复取消）
    const uploadLargeFile = async (file) => {
        const fileId = Date.now() + '-' + file.name;
        currentUploadingFileIdRef.current = fileId;
        currentUploadingFileRef.current = file;
        // 创建文件项
        const fileItem = {
            uid: fileId,
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file,
        };
        // 添加到文件列表
        setFileList(prevList => [...prevList, fileItem]);
        try {
            updateFileList(fileId, { status: 'uploading' });
            const result = await largeFileUpload.upload(file);
            updateFileList(fileId, {
                status: 'success',
                percent: 100,
                response: result.response || result,
            });
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(result.response || result, file);
            onChange === null || onChange === void 0 ? void 0 : onChange(file);
        }
        catch (error) {
            updateFileList(fileId, {
                status: 'error',
                error: error,
            });
            onError === null || onError === void 0 ? void 0 : onError(error, file);
            onChange === null || onChange === void 0 ? void 0 : onChange(file);
        }
        finally {
            currentUploadingFileIdRef.current = null;
            currentUploadingFileRef.current = null;
        }
    };
    //   文件上传函数
    const handelFileUpload = (files) => {
        // 1、把文件列表转换为数组
        const fileArray = Array.from(files);
        // 2、遍历文件数组，对每个文件进行上传
        fileArray.forEach(file => {
            // 3、如果beforeUpload存在，调用beforeUpload函数
            if (beforeUpload) {
                const result = beforeUpload(file);
                // 4、判断结果的类型
                if (result instanceof Promise) {
                    result
                        .then(res => {
                        // 使用返回的新文件对象而不是原始文件
                        if (res) {
                            // 调用beforeUpload成功回调
                            if (onBeforeUploadSuccess) {
                                onBeforeUploadSuccess(file, res);
                            }
                            // 判断是否需要分片上传
                            const shouldChunk = enableLargeFileUpload && res.size >= chunkThreshold;
                            if (shouldChunk) {
                                uploadLargeFile(res);
                            }
                            else {
                                post(res);
                            }
                        }
                    })
                        .catch(err => {
                        if (onError) {
                            onError === null || onError === void 0 ? void 0 : onError(err, file);
                        }
                    });
                }
                else if (result) {
                    // 5、如果结果为true，调用post函数，传递原始文件
                    if (onBeforeUploadSuccess) {
                        onBeforeUploadSuccess(file, file);
                    }
                    // 判断是否需要分片上传
                    const shouldChunk = enableLargeFileUpload && file.size >= chunkThreshold;
                    if (shouldChunk) {
                        uploadLargeFile(file);
                    }
                    else {
                        post(file);
                    }
                }
                else {
                    // 如果beforeUpload返回false，不上传文件
                    if (onError) {
                        onError === null || onError === void 0 ? void 0 : onError(new Error('beforeUpload校验失败'), file);
                    }
                }
            }
            else {
                // 如果没有beforeUpload，直接上传文件
                // 判断是否需要分片上传
                const shouldChunk = enableLargeFileUpload && file.size >= chunkThreshold;
                if (shouldChunk) {
                    uploadLargeFile(file);
                }
                else {
                    post(file);
                }
            }
        });
    };
    const handelRemove = (file) => {
        // console.log('删除文件:', file);
        // 1、从文件列表中删除该文件项
        setFileList(prevList => prevList.filter(item => item.uid !== file.uid));
        // 2、调用onRemoved回调
        onRemoved === null || onRemoved === void 0 ? void 0 : onRemoved(file);
    };
    return (jsxs("div", { style: { margin: '20px' }, children: [jsxs("div", { className: "upload-container", onClick: handelFileChange, children: [drag ? (jsx(Dragger, { onFile: handelFileUpload, children: children })) : (children), jsx("input", { type: "file", className: "upload-input", style: { display: 'none' }, ref: uploadInputRef, onChange: handelChange, accept: accept, multiple: multiple })] }), jsx(FileList, { fileList: fileList, onRemoved: handelRemove })] }));
});
// 设置显示名称，便于调试
Upload.displayName = 'Upload';

/**
 * 大文件上传 Mock 适配器
 * 用于 Storybook 和开发测试，模拟分片上传流程
 */
/**
 * 创建 Mock 适配器
 * 模拟真实的分片上传流程，包括进度更新、延迟、错误处理等
 */
const createMockAdapter = (config = {}) => {
    const { uploadDelay = 500, // 默认每个分片上传延迟 500ms
    mergeDelay = 1000, // 默认合并延迟 1s
    failChunks = [], // 默认不失败
    failProbability = 0, // 默认失败概率 0%
    enableProgress = true, // 默认启用进度模拟
    instantUploadHashes = [], // 默认不模拟秒传
     } = config;
    // 存储上传任务信息（模拟服务端）
    const uploadTasks = new Map();
    return {
        /**
         * 秒传检查（可选）
         * 如果文件 Hash 在 instantUploadHashes 列表中，模拟秒传成功
         */
        checkFileExists: async (params) => {
            await new Promise(resolve => setTimeout(resolve, 100));
            if (instantUploadHashes.includes(params.fileHash)) {
                console.log(`[Mock] 秒传命中: ${params.fileName} (hash: ${params.fileHash})`);
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
        initUpload: async (fileInfo) => {
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
        uploadChunk: async (params) => {
            var _a, _b;
            const uploadId = params.uploadId || `mock-${params.fileName}`;
            const task = uploadTasks.get(uploadId);
            // 检查取消
            if ((_a = params.signal) === null || _a === void 0 ? void 0 : _a.aborted) {
                throw new DOMException('上传已取消', 'AbortError');
            }
            if (!task) {
                throw new Error(`上传任务不存在: ${uploadId}`);
            }
            // 检查是否应该失败
            const shouldFail = failChunks.includes(params.chunkIndex) ||
                (failProbability > 0 && Math.random() < failProbability);
            if (shouldFail) {
                await new Promise(resolve => setTimeout(resolve, uploadDelay));
                throw new Error(`分片 ${params.chunkIndex} 上传失败（模拟错误）`);
            }
            // 模拟上传进度（支持取消）
            if (enableProgress && params.onProgress) {
                const steps = 5;
                for (let i = 1; i <= steps; i++) {
                    if ((_b = params.signal) === null || _b === void 0 ? void 0 : _b.aborted) {
                        throw new DOMException('上传已取消', 'AbortError');
                    }
                    await new Promise(resolve => setTimeout(resolve, uploadDelay / steps));
                    params.onProgress((i / steps) * 100);
                }
            }
            else {
                await new Promise(resolve => setTimeout(resolve, uploadDelay));
            }
            // 保存分片（模拟服务端存储）
            task.chunks.set(params.chunkIndex, params.chunk);
            console.log(`[Mock] 分片上传完成: ${params.chunkIndex + 1}/${params.totalChunks}`, {
                chunkSize: params.chunk.size,
                uploadedChunks: task.chunks.size,
                totalChunks: params.totalChunks,
            });
            return {
                success: true,
                chunkIndex: params.chunkIndex,
            };
        },
        /**
         * 合并分片
         */
        mergeChunks: async (params) => {
            const uploadId = params.uploadId || `mock-${params.fileName}`;
            const task = uploadTasks.get(uploadId);
            if (!task) {
                throw new Error(`上传任务不存在: ${uploadId}`);
            }
            // 验证所有分片是否都已上传
            const missingChunks = [];
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
                totalSize += task.chunks.get(i).size;
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
createMockAdapter();
/**
 * 慢速 Mock 适配器（用于测试进度显示）
 */
createMockAdapter({
    uploadDelay: 2000, // 每个分片 2s
    mergeDelay: 3000, // 合并 3s
});
/**
 * 错误测试 Mock 适配器（用于测试错误处理）
 */
createMockAdapter({
    uploadDelay: 500,
    mergeDelay: 1000,
    failChunks: [2, 5], // 第 3 和第 6 个分片会失败
    failProbability: 0.1, // 10% 的随机失败率
});

export { createDefaultAdapter, createMockAdapter, Upload as default };
