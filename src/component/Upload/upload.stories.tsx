import { Upload } from '../Upload/Upload';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const uploadMeta: Meta<typeof Upload> = {
  title: 'Upload',
  component: Upload,
};
export default uploadMeta;

// 创建模拟文件列表，包含uploading状态的文件以显示进度条
const mockFileList = [
  {
    uid: '1',
    size: 1024,
    name: 'file1.txt',
    status: 'success' as const,
    percent: 100,
    raw: new File([''], 'file1.txt'),
    response: { message: 'success' },
  },
  {
    uid: '2',
    size: 2048,
    name: 'file2.txt',
    status: 'uploading' as const,
    percent: 65,
    raw: new File([''], 'file2.txt'),
  },
  {
    uid: '3',
    size: 3072,
    name: 'file3.txt',
    status: 'error' as const,
    percent: 0,
    raw: new File([''], 'file3.txt'),
    error: { message: 'upload failed' },
  },
];
// 1、handleBeforeUpload是返回的Promise对象
// const handleBeforeUpload = (file: File) => {
//   //   修改文件名字 - 创建新的File对象而不是直接修改
//   const newFile = new File([file], `new-${file.name}`, {
//     type: file.type,
//     lastModified: file.lastModified,
//   });
//   return Promise.resolve(newFile);
// };
// 2、测试返回的是boolean类型
const handleBeforeUpload = (file: File) => {
  // 简单校验文件大小是否超过1MB
  if (file.size > 1024 * 1024) {
    return false;
  }
  return true;
};
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
    // defaultFileList: mockFileList,
  },
};
