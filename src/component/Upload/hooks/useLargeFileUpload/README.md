# useLargeFileUpload Hook

大文件上传 Hook，支持分片上传、断点续传等功能。

## Mock 适配器使用

在 Storybook 和开发测试中，可以使用 Mock 适配器模拟分片上传流程。

### 快速开始

```typescript
import { defaultMockAdapter } from './hooks/useLargeFileUpload/mockAdapter';

// 使用默认 Mock 适配器
const { upload } = useLargeFileUpload({
  adapter: defaultMockAdapter,
  chunkSize: 2 * 1024 * 1024, // 2MB
  concurrent: 3,
  onProgress: progress => {
    console.log('上传进度:', progress.percent);
  },
  onSuccess: result => {
    console.log('上传成功:', result);
  },
});

// 上传文件
await upload(file);
```

### 可用的 Mock 适配器

#### 1. defaultMockAdapter（默认）

快速测试适配器，每个分片延迟 500ms，合并延迟 1s。

```typescript
import { defaultMockAdapter } from './hooks/useLargeFileUpload/mockAdapter';
```

#### 2. slowMockAdapter（慢速）

用于测试进度显示，每个分片延迟 2s，合并延迟 3s。

```typescript
import { slowMockAdapter } from './hooks/useLargeFileUpload/mockAdapter';
```

#### 3. errorMockAdapter（错误测试）

用于测试错误处理，部分分片会失败。

```typescript
import { errorMockAdapter } from './hooks/useLargeFileUpload/mockAdapter';
```

#### 4. createMockAdapter（自定义）

创建自定义 Mock 适配器。

```typescript
import { createMockAdapter } from './hooks/useLargeFileUpload/mockAdapter';

const customAdapter = createMockAdapter({
  uploadDelay: 1000, // 每个分片延迟 1s
  mergeDelay: 2000, // 合并延迟 2s
  failChunks: [2, 5], // 第 3 和第 6 个分片会失败
  failProbability: 0.1, // 10% 的随机失败率
  enableProgress: true, // 启用进度模拟
});
```

### Mock 适配器配置

```typescript
interface MockAdapterConfig {
  uploadDelay?: number; // 模拟上传延迟（ms），默认 500
  mergeDelay?: number; // 模拟合并延迟（ms），默认 1000
  failChunks?: number[]; // 模拟失败的分片索引
  failProbability?: number; // 模拟失败概率（0-1）
  enableProgress?: boolean; // 是否启用进度模拟，默认 true
}
```

### 在 Storybook 中使用

```typescript
// upload.stories.tsx
import { defaultMockAdapter } from './hooks/useLargeFileUpload/mockAdapter';

export const LargeFileUploadStory: StoryObj = {
  render: () => {
    const { upload } = useLargeFileUpload({
      adapter: defaultMockAdapter,
      chunkSize: 2 * 1024 * 1024,
      onProgress: action('progress'),
      onSuccess: action('success'),
      onError: action('error'),
    });

    return (
      <Upload
        // ... 其他 props
        customUpload={upload}
      />
    );
  },
};
```

### 注意事项

1. **仅用于测试**：Mock 适配器不会真正上传文件，仅用于 UI 测试和开发调试。

2. **控制台日志**：Mock 适配器会在控制台输出详细的日志，方便调试。

3. **真实环境**：生产环境需要使用真实的后端适配器，参考 `createDefaultAdapter` 实现。

4. **文件大小**：Mock 适配器会验证文件大小和分片完整性，但不实际存储文件。

### 查看日志

Mock 适配器会在浏览器控制台输出以下日志：

- `[Mock] 初始化上传`: 上传任务初始化
- `[Mock] 分片上传完成`: 每个分片上传完成
- `[Mock] 开始合并分片`: 开始合并所有分片
- `[Mock] 合并完成`: 合并完成，返回文件信息

打开浏览器开发者工具的控制台即可查看。
