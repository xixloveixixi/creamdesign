// 初始状态：普通上传区域
// dragOver事件：文件进入区域时触发，添加is-dragover类
// dragLeave事件：文件离开区域时触发，移除is-dragover类
// drop事件：文件释放时触发，获取FileList并上传

import classNames from 'classnames';
import { FC, ReactNode, useState } from 'react';
import './Dragger.scss';

// 接口：
interface DraggerProps {
  onFile: (files: FileList) => void;
  children?: ReactNode;
}

export const Dragger: FC<DraggerProps> = props => {
  const { onFile, children } = props;
  const [isDragover, setIsDragover] = useState(false);
  const klass = classNames('upload-dragger', {
    'is-dragover': isDragover,
  });
  const handelDrag = (e: React.DragEvent<HTMLElement>, isOver: boolean) => {
    e.preventDefault();
    setIsDragover(isOver);
  };

  // 默认内容
  const defaultContent = (
    <div className="dragger-content">
      <div className="dragger-icon">📁</div>
      <div className="dragger-text">点击或拖拽文件到此区域</div>
      <div className="dragger-hint">支持多文件上传</div>
    </div>
  );

  return (
    <div
      className={klass}
      onDragOver={e => handelDrag(e, true)}
      onDragLeave={e => {
        e.preventDefault();
        handelDrag(e, false);
      }}
      onDrop={e => {
        e.preventDefault();
        handelDrag(e, false);
        onFile(e.dataTransfer.files);
      }}
    >
      {children || defaultContent}
    </div>
  );
};
