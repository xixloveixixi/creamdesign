/**
 * Web Worker 内联代码 - 在子线程中计算文件 MD5 Hash
 * 包含完整的 MD5 算法实现（基于 RFC 1321），无需外部依赖
 * 使用 Blob URL 方式创建 Worker，避免额外的打包配置
 */
export const HASH_WORKER_CODE = `
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
