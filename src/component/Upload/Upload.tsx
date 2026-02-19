import {
  useRef,
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import axios from 'axios';
import { FileList } from './component/FileList';
import { Dragger } from './component/Dragger';
import { useLargeFileUpload } from './hooks/useLargeFileUpload';
import { createDefaultAdapter } from './hooks/useLargeFileUpload/adapter';
import {
  UploadAdapter,
  UploadControl,
  UploadState,
  ProgressInfo,
} from './hooks/useLargeFileUpload/types';

/**
 * Upload 组件 Props
 */
export interface UploadProps {
  /** 上传接口 URL（必填） */
  action: string;
  /** 默认文件列表 */
  defaultFileList?: FileItem[];
  /** 自定义请求头 */
  headers?: Record<string, string>;
  /** 文件字段名 */
  name?: string;
  /** 附加数据 */
  data?: Record<string, any>;
  /** 是否携带 cookie */
  withCredentials?: boolean;
  /** 接受的文件类型 */
  accept?: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 上传前校验/转换函数 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 上传进度回调 */
  onProgress?: (progress: number, file: File) => void;
  /** 上传成功回调 */
  onSuccess?: (response: any, file: File) => void;
  /** 上传失败回调 */
  onError?: (error: any, file: File) => void;
  /** 文件变化回调 */
  onChange?: (file: File) => void;
  /** beforeUpload 成功后回调 */
  onBeforeUploadSuccess?: (originalFile: File, processedFile: File) => void;
  /** 删除文件回调 */
  onRemoved?: (file: FileItem) => void;
  /** 自定义上传区域内容 */
  children?: React.ReactNode;
  /** 是否启用拖拽上传 */
  drag?: boolean;

  // ===== 大文件上传配置 =====
  /** 是否启用大文件分片上传（默认 true） */
  enableLargeFileUpload?: boolean;
  /** 分片大小（默认 5MB） */
  chunkSize?: number;
  /** 启用分片的文件大小阈值（默认 10MB） */
  chunkThreshold?: number;
  /** 并发上传数（默认 3） */
  concurrent?: number;
  /** 最大重试次数（默认 3） */
  maxRetries?: number;
  /** 重试延迟 ms（默认 1000） */
  retryDelay?: number;

  /** 自定义适配器 */
  adapter?: UploadAdapter;
  /** 秒传检查接口 URL */
  checkUrl?: string;
  /** 初始化上传接口 URL */
  initUrl?: string;
  /** 分片上传接口 URL */
  chunkUrl?: string;
  /** 合并分片接口 URL */
  mergeUrl?: string;

  /** 是否启用断点续传（默认 true） */
  enableResume?: boolean;
  /** Hash 计算进度回调 */
  onHashProgress?: (percent: number) => void;
}

/**
 * 文件列表项
 */
export interface FileItem {
  uid: string;
  size: number;
  name: string;
  status: 'ready' | 'uploading' | 'success' | 'error';
  percent: number;
  raw: File;
  response?: any;
  error?: any;
}

/**
 * Upload 组件 Ref —— 外部可通过 ref 控制上传
 */
export interface UploadRef {
  /** 暂停当前上传 */
  pause: () => void;
  /** 恢复当前上传 */
  resume: () => void;
  /** 取消当前上传 */
  cancel: () => void;
  /** 获取上传控制器信息 */
  getControl: () => UploadControl;
  /** 获取当前进度 */
  getProgress: () => ProgressInfo | null;
  /** 获取文件列表 */
  getFileList: () => FileItem[];
}

export const Upload = forwardRef<UploadRef, UploadProps>(
  (
    {
      action,
      defaultFileList,
      headers,
      name,
      data,
      withCredentials,
      accept,
      multiple,
      beforeUpload,
      onProgress,
      onSuccess,
      onError,
      onChange,
      onBeforeUploadSuccess,
      onRemoved,
      children,
      drag,
      // 大文件上传配置
      enableLargeFileUpload = true,
      chunkSize = 5 * 1024 * 1024,
      chunkThreshold = 10 * 1024 * 1024,
      concurrent = 3,
      maxRetries = 3,
      retryDelay = 1000,
      adapter,
      checkUrl,
      initUrl,
      chunkUrl,
      mergeUrl,
      enableResume = true,
      onHashProgress,
    },
    ref
  ) => {
    // 创建文件列表状态
    const [fileList, setFileList] = useState<FileItem[]>(defaultFileList || []);

    // 存储当前上传的文件信息（用于进度更新）
    const currentUploadingFileIdRef = useRef<string | null>(null);
    const currentUploadingFileRef = useRef<File | null>(null);

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
    const updateFileList = (
      targetUid: string,
      updateObj: Partial<FileItem>
    ) => {
      setFileList(prevList => {
        const newList = prevList.map(item =>
          item.uid === targetUid ? { ...item, ...updateObj } : item
        );
        return newList;
      });
    };
    const handelFileChange = () => {
      //触发文件选择对话框
      if (uploadInputRef.current) {
        uploadInputRef.current.click();
      }
    };
    const uploadInputRef = useRef<HTMLInputElement>(null);
    // 值变化的时候添加文件
    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const post = (file: File) => {
      // 文件对象创建
      const fileItem: FileItem = {
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
            const progress = Math.round((e.loaded * 100) / e.total!);
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
            onSuccess?.(response.data, file);
          }
          if (onChange) {
            // 9、调用onChange回调
            onChange?.(file);
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
            onError?.(error, file);
          }
          if (onChange) {
            // 10、调用onChange回调
            onChange?.(file);
          }
        });
    };
    // 大文件上传函数（集成秒传 / 断点续传 / 暂停恢复取消）
    const uploadLargeFile = async (file: File) => {
      const fileId = Date.now() + '-' + file.name;
      currentUploadingFileIdRef.current = fileId;
      currentUploadingFileRef.current = file;

      // 创建文件项
      const fileItem: FileItem = {
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

        onSuccess?.(result.response || result, file);
        onChange?.(file);
      } catch (error) {
        updateFileList(fileId, {
          status: 'error',
          error: error,
        });

        onError?.(error as any, file);
        onChange?.(file);
      } finally {
        currentUploadingFileIdRef.current = null;
        currentUploadingFileRef.current = null;
      }
    };

    //   文件上传函数
    const handelFileUpload = (files: FileList) => {
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
                  const shouldChunk =
                    enableLargeFileUpload && res.size >= chunkThreshold;
                  if (shouldChunk) {
                    uploadLargeFile(res);
                  } else {
                    post(res);
                  }
                }
              })
              .catch(err => {
                if (onError) {
                  onError?.(err, file);
                }
              });
          } else if (result) {
            // 5、如果结果为true，调用post函数，传递原始文件
            if (onBeforeUploadSuccess) {
              onBeforeUploadSuccess(file, file);
            }
            // 判断是否需要分片上传
            const shouldChunk =
              enableLargeFileUpload && file.size >= chunkThreshold;
            if (shouldChunk) {
              uploadLargeFile(file);
            } else {
              post(file);
            }
          } else {
            // 如果beforeUpload返回false，不上传文件
            if (onError) {
              onError?.(new Error('beforeUpload校验失败'), file);
            }
          }
        } else {
          // 如果没有beforeUpload，直接上传文件
          // 判断是否需要分片上传
          const shouldChunk =
            enableLargeFileUpload && file.size >= chunkThreshold;
          if (shouldChunk) {
            uploadLargeFile(file);
          } else {
            post(file);
          }
        }
      });
    };
    const handelRemove = (file: FileItem) => {
      // console.log('删除文件:', file);
      // 1、从文件列表中删除该文件项
      setFileList(prevList => prevList.filter(item => item.uid !== file.uid));
      // 2、调用onRemoved回调
      onRemoved?.(file);
    };
    return (
      <div style={{ margin: '20px' }}>
        <div className="upload-container" onClick={handelFileChange}>
          {/* 用child代替原本固定的button */}
          {/* 将handleClick事件移动到上层包裹的div中
        保留原有input元素作为文件选择的核心组件 */}
          {drag ? (
            <Dragger onFile={handelFileUpload}>{children}</Dragger>
          ) : (
            children
          )}
          {/* <Button btnType={ButtonType.Primary} onClick={handelFileChange}>
        上传文件
      </Button> */}
          {/* todo:添加input本身的file约束属性 */}
          {/* 
      multiple属性：支持多文件选择，允许用户同时选中多个文件
      accept属性：限制允许上传的文件类型，支持多种格式： 完整MIME类型：image/png
      文件扩展名：.png 通配符：image/*表示所有图片类型
      */}
          <input
            type="file"
            className="upload-input"
            style={{ display: 'none' }}
            ref={uploadInputRef}
            onChange={handelChange}
            accept={accept}
            multiple={multiple}
          />
        </div>
        <FileList fileList={fileList} onRemoved={handelRemove} />
      </div>
    );
  }
);

// 设置显示名称，便于调试
Upload.displayName = 'Upload';
