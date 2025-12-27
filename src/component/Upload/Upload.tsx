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

import { useRef } from 'react';
import Button, { ButtonType } from '../Button';
import axios from 'axios';

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
  onProgress?: (progress: number, file: File) => void;
  onSuccess?: (response: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onChange?: (file: File) => void;
}

export const Upload = ({
  action,
  onProgress,
  onSuccess,
  onError,
  onChange,
}: UploadProps) => {
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
  //   文件上传函数
  const handelFileUpload = (files: FileList) => {
    // 1、把文件列表转换为数组
    const fileArray = Array.from(files);
    // 2、遍历文件数组，对每个文件进行上传
    fileArray.forEach(file => {
      // 3、创建FormData对象
      const formData = new FormData();
      // 4、追加文件到FormData
      formData.append('file', file);
      // 5、发送POST请求
      axios
        .post(action, formData, {
          // 6、设置请求头为multipart/form-data
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          // 7、设置上传进度回调
          onUploadProgress: e => {
            // 计算上传进度
            const progress = Math.round((e.loaded * 100) / e.total!);
            if (progress < 100) {
              if (onProgress) {
                onProgress(progress, file);
              }
            }
          },
        })
        .then(response => {
          console.log(response);
          if (onSuccess) {
            // 调用成功回调
            onSuccess?.(response.data, file);
          }
        })
        .catch(error => {
          console.log(error);
          if (onError) {
            // 调用失败回调
            onError?.(error, file);
          }
        });
    });
  };
  return (
    <div style={{ margin: '20px' }}>
      <Button btnType={ButtonType.Primary} onClick={handelFileChange}>
        上传文件
      </Button>
      <input
        type="file"
        className="upload-input"
        style={{ display: 'none' }}
        ref={uploadInputRef}
        onChange={handelChange}
      />
    </div>
  );
};
