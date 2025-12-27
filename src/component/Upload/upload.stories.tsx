import { Upload } from '../Upload/Upload';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

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
  },
};
