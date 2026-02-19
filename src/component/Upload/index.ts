import { Upload } from './Upload';

export default Upload;
export type { UploadProps, FileItem, UploadRef } from './Upload';
export type {
  UploadAdapter,
  UploadControl,
  UploadState,
  ProgressInfo,
} from './hooks/useLargeFileUpload/types';
export { createDefaultAdapter } from './hooks/useLargeFileUpload/adapter';
export { createMockAdapter } from './hooks/useLargeFileUpload/mockAdapter';
