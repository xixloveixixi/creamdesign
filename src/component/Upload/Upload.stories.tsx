import { Upload } from './Upload';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../Button';
import { defaultMockAdapter } from './hooks/useLargeFileUpload/mockAdapter';

const uploadMeta: Meta<typeof Upload> = {
  title: 'Upload',
  component: Upload,
};
export default uploadMeta;

// 1、handleBeforeUpload是返回的Promise对象
// const handleBeforeUpload = (file: File) => {
//   //   修改文件名字 - 创建新的File对象而不是直接修改
//   const newFile = new File([file], `new-${file.name}`, {
//     type: file.type,
//     lastModified: file.lastModified,
//   });
//   return Promise.resolve(newFile);
// };
/**
 * 基础上传示例
 * 小文件使用普通上传，大文件自动使用分片上传
 */
export const UploadStory: StoryObj<typeof Upload> = {
  args: {
    action: 'https://jsonplaceholder.typicode.com/posts',
    onSuccess: action('success'),
    onError: action('error'),
    onProgress: action('progress'),
    onChange: action('changed'),
    // beforeUpload: handleBeforeUpload,
    name: 'file',
    data: {
      token: '123456',
    },
    headers: {
      'X-Powered-By': 'CreamDesign',
    },
    withCredentials: true,
    // accept: '.jpg,.jpeg,.png',
    multiple: true,
    drag: true,
    // defaultFileList: mockFileList,
    // 大文件上传配置
    // 注意：jsonplaceholder.typicode.com 不支持分片上传接口，所以禁用大文件上传功能
    enableLargeFileUpload: false, // 禁用大文件上传，使用普通上传
    // chunkThreshold: 10 * 1024 * 1024, // 10MB 以上使用分片上传
  },
  render: args => (
    <Upload {...args}>
      <Button>点击上传</Button>
    </Upload>
  ),
};

/**
 * 大文件上传 - 使用 Mock 适配器（默认）
 * 快速测试，每个分片延迟 500ms
 * 注意：上传大于 10MB 的文件才会触发分片上传
 */
export const LargeFileUploadDefault: StoryObj<typeof Upload> = {
  args: {
    action: 'https://jsonplaceholder.typicode.com/posts',
    adapter: defaultMockAdapter,
    onSuccess: action('success'),
    onError: action('error'),
    onProgress: (progress, file) => {
      action('progress')(progress, file);
      console.log(`上传进度: ${progress}%`);
    },
    onChange: action('changed'),
    name: 'file',
    multiple: true,
    drag: true,
    // 大文件上传配置
    enableLargeFileUpload: true,
    chunkSize: 2 * 1024 * 1024, // 2MB 分片
    chunkThreshold: 5 * 1024 * 1024, // 5MB 以上使用分片上传（降低阈值便于测试）
    concurrent: 3,
    maxRetries: 3,
  },
  render: args => (
    <Upload {...args}>
      <Button>上传大文件（使用 Mock 适配器）</Button>
    </Upload>
  ),
};

/**
 * 自定义分片配置
 * 展示如何自定义分片大小、阈值等参数
 */
export const CustomChunkConfig: StoryObj<typeof Upload> = {
  args: {
    action: '/api/upload',
    adapter: defaultMockAdapter,
    onSuccess: action('success'),
    onError: action('error'),
    onProgress: (progress, file) => {
      action('progress')(progress, file);
      console.log(`上传进度: ${progress}%`);
    },
    onChange: action('changed'),
    name: 'file',
    multiple: true,
    drag: true,
    enableLargeFileUpload: true,
    chunkSize: 1 * 1024 * 1024, // 1MB 分片（更小的分片，便于测试）
    chunkThreshold: 3 * 1024 * 1024, // 3MB 以上使用分片上传
    concurrent: 2, // 2 个并发
    maxRetries: 5, // 重试 5 次
    retryDelay: 500, // 重试延迟 500ms
  },
  render: args => (
    <div>
      <Upload {...args}>
        <Button>自定义配置上传</Button>
      </Upload>
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>配置说明：</p>
        <ul>
          <li>分片大小：1MB</li>
          <li>分片阈值：3MB（3MB 以上文件使用分片上传）</li>
          <li>并发数：2</li>
          <li>最大重试：5 次</li>
        </ul>
      </div>
    </div>
  ),
};
