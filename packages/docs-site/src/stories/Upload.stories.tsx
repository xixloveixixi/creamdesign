import { Upload } from 'creamdesign-lib';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'creamdesign-lib';

const uploadMeta: Meta<typeof Upload> = {
  title: 'Upload',
  component: Upload,
};
export default uploadMeta;

export const UploadStory: StoryObj<typeof Upload> = {
  args: {
    action: 'https://jsonplaceholder.typicode.com/posts',
    onSuccess: action('success'),
    onError: action('error'),
    onProgress: action('progress'),
    onChange: action('changed'),
    name: 'file',
    data: {
      token: '123456',
    },
    headers: {
      'X-Powered-By': 'CreamDesign',
    },
    withCredentials: true,
    multiple: true,
    drag: true,
    enableLargeFileUpload: false,
  },
  render: args => (
    <Upload {...args}>
      <Button>点击上传</Button>
    </Upload>
  ),
};
UploadStory.storyName = '基础上itcho';

export const LargeFileUploadDefault: StoryObj<typeof Upload> = {
  args: {
    action: 'https://jsonplaceholder.typicode.com/posts',
    onSuccess: action('success'),
    onError: action('error'),
    onProgress: (progress: number, file: File) => {
      action('progress')(progress, file);
      console.log(`上传进度: ${progress}%`);
    },
    onChange: action('changed'),
    name: 'file',
    multiple: true,
    drag: true,
    enableLargeFileUpload: true,
    chunkSize: 2 * 1024 * 1024,
    chunkThreshold: 5 * 1024 * 1024,
    concurrent: 3,
    maxRetries: 3,
  },
  render: args => (
    <Upload {...args}>
      <Button>上传大文件（测试分片）</Button>
    </Upload>
  ),
};
LargeFileUploadDefault.storyName = '大文件分片上传';

export const CustomChunkConfig: StoryObj<typeof Upload> = {
  args: {
    action: '/api/upload',
    onSuccess: action('success'),
    onError: action('error'),
    onProgress: (progress: number) => {
      console.log(`上传进度: ${progress}%`);
    },
    onChange: action('changed'),
    name: 'file',
    multiple: true,
    drag: true,
    enableLargeFileUpload: true,
    chunkSize: 1 * 1024 * 1024,
    chunkThreshold: 3 * 1024 * 1024,
    concurrent: 2,
    maxRetries: 5,
    retryDelay: 500,
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
          <li>分片阈值：3MB</li>
          <li>并发数：2</li>
          <li>最大重试：5 次</li>
        </ul>
      </div>
    </div>
  ),
};
CustomChunkConfig.storyName = '自定义分片配置';
