// 文件上传需求分析：
// 1、通过AJAX实现异步上传，支持进度显示和预览功能
// 2、支持点击/拖拽两种方式，提供可视化进度条(限制示例)
// 3、生命周期：
// 开始阶段:
// 触发条件: 用户点击按钮选择文件
// beforeUpload: 接收file对象，可进行格式/大小校验(示例)
// 异步处理: 支持返回Promise实现服务端校验
// 传输阶段:
// onProgress: 接收event对象包含上传百分比
// onChange: 无论成功失败都会触发(含file对象)
// 结束阶段:
// onSuccess: 接收response和file对象
// onError: 接收error和file对象(示例)
// 附加阶段:
// onRemoved: 点击删除按钮时触发(示例)
// todo:
// 1、添加拖拽区域，用户可以将文件拖拽到区域内
// 2、onPreview: 点击文件预览时触发
import { useRef, useState, useMemo } from 'react';
import axios from 'axios';
import { FileList } from './component/FileList';
import { Dragger } from './component/Dragger';
import { useLargeFileUpload } from './hooks/useLargeFileUpload';
import { createDefaultAdapter } from './hooks/useLargeFileUpload/adapter';
import { UploadAdapter } from './hooks/useLargeFileUpload/types';
// 属性列表：
// action: 上传接口URL，必填
// children: 自定义上传按钮内容，可选
// beforeUpload: 上传前校验函数，可选
// onProgress: 上传进度回调，可选
// onChange: 上传完成回调，可选
// onSuccess: 上传成功回调，可选
// onError: 上传失败回调，可选
// onRemoved: 删除文件回调，可选
// 拓展功能
// 1、defaultFileList: 默认文件列表，可选
// 2、theme style: 自定义主题样式，可选

// 定义接口：
// 必填属性：
// action：字符串类型，指定上传接口地址
// 可选回调：
// onProgress：接收(number, File)参数，返回void
// onSuccess：接收(any, File)参数，返回void
// onError：接收(any, File)参数，返回void
interface UploadProps {
  action: string;
  // 默认文件列表，可选
  defaultFileList?: FileItem[];
  // 自定义请求头，可选
  headers?: Record<string, string>;
  // 文件选择字段名，可选
  name?: string;
  // 自定义上传字段名，可选
  data?: Record<string, any>;
  // 是否携带cookie，可选
  withCredentials?: boolean;
  // 接受的文件类型，可选
  accept?: string;
  // 是否支持多选，可选
  multiple?: boolean;
  //   用户可以自定义上传前校验或者转换函数，可选
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (progress: number, file: File) => void;
  onSuccess?: (response: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onChange?: (file: File) => void;
  // 添加beforeUpload处理后的文件对象回调
  onBeforeUploadSuccess?: (originalFile: File, processedFile: File) => void;
  // 删除文件回调，可选
  onRemoved?: (file: FileItem) => void;
  // 自定义上传按钮内容，可选
  children?: React.ReactNode;
  // 是否支持拖拽上传，可选
  drag?: boolean;

  // 大文件上传配置（新增）
  enableLargeFileUpload?: boolean; // 是否启用大文件上传，默认 true
  chunkSize?: number; // 分片大小，默认 5MB
  chunkThreshold?: number; // 启用分片的文件大小阈值，默认 10MB
  concurrent?: number; // 并发数，默认 3
  maxRetries?: number; // 重试次数，默认 3
  retryDelay?: number; // 重试延迟（ms），默认 1000

  // 适配器配置（新增）
  adapter?: UploadAdapter; // 自定义适配器（可选）
  initUrl?: string; // 初始化接口，默认 ${action}/init
  chunkUrl?: string; // 分片上传接口，默认 ${action}/chunk
  mergeUrl?: string; // 合并接口，默认 ${action}/merge
}
// 创建文件列表接口
export interface FileItem {
  uid: string;
  size: number;
  name: string;
  status: 'ready' | 'uploading' | 'success' | 'error';
  percent: number;
  raw: File;
  response?: any;
  error?: any;
  // todo:添加data属性，用于存储上传接口返回的数据
}
export const Upload = ({
  action,
  defaultFileList,
  headers,
  name,
  data,
  withCredentials,
  accept,
  multiple,
  //   用户可以自定义上传前校验或者转换函数，可选
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
  chunkSize = 5 * 1024 * 1024, // 默认 5MB
  chunkThreshold = 10 * 1024 * 1024, // 默认 10MB
  concurrent = 3,
  maxRetries = 3,
  retryDelay = 1000,
  adapter,
  initUrl,
  chunkUrl,
  mergeUrl,
}: UploadProps) => {
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
    initUrl,
    chunkUrl,
    mergeUrl,
    headers,
    data,
    withCredentials,
    name,
  ]);

  // 大文件上传 Hook
  const largeFileUpload = useLargeFileUpload({
    adapter: defaultAdapter,
    chunkSize,
    concurrent,
    maxRetries,
    retryDelay,
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
    onSuccess: result => {
      // 大文件上传成功的处理在 uploadLargeFile 中完成
    },
    onError: (error, file) => {
      // 大文件上传失败的处理在 uploadLargeFile 中完成
    },
  });
  // 创建一个更新文件列表的函数
  const updateFileList = (targetUid: string, updateObj: Partial<FileItem>) => {
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
          } else {
            console.log(`✅ 上传完成 ${file.name}`);
          }
        },
      })
      .then(response => {
        console.log('上传成功:', file.name, response);
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
        console.log('上传失败:', file.name, error);
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
  // 大文件上传函数
  const uploadLargeFile = async (file: File) => {
    console.log('🚀 开始大文件上传:', file.name, file.size);
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
      console.log('🚀 开始大文件上传:', file.name, file.size);
      // 更新状态为上传中
      updateFileList(fileId, { status: 'uploading' });

      // 调用大文件上传
      const result = await largeFileUpload.upload(file);

      // 上传成功
      updateFileList(fileId, {
        status: 'success',
        percent: 100,
        response: result.response || result,
      });

      if (onSuccess) {
        onSuccess(result.response || result, file);
      }
      if (onChange) {
        onChange(file);
      }
      console.log('🚀 大文件上传成功:', file.name, file.size);
    } catch (error) {
      console.log('🚀 大文件上传失败:', file.name, file.size);
      // 上传失败
      updateFileList(fileId, {
        status: 'error',
        error: error,
      });

      if (onError) {
        onError(error as any, file);
      }
      if (onChange) {
        onChange(file);
      }
    } finally {
      // 清除当前上传的文件信息
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
          console.log('beforeUpload校验失败');
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
};
// 添加默认值
Upload.defaultProps = {
  name: 'file',
};
