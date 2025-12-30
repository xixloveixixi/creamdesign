import { FileItem } from '../Upload';
import './fileList.scss';
import Progress from '../../Progress/index';
import Icon from '../../Icon/icon';
import {
  faFile,
  faCircleCheck,
  faCircleXmark,
  faSpinner,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
// 展示文件列表
interface FileListProps {
  fileList: FileItem[];
  // 删除文件回调，可选
  onRemoved?: (file: FileItem) => void;
  // 切换文件状态回调，可选
  onToggleStatus?: (file: FileItem) => void;
}

export const FileList = ({
  fileList,
  onRemoved,
  onToggleStatus,
}: FileListProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const getStatusIcon = (status: string, isHovered: boolean = false) => {
    // 如果悬浮在success状态上，显示error图标
    if (status === 'success' && isHovered) {
      return faXmark;
    }

    switch (status) {
      case 'uploading':
        return faSpinner;
      case 'success':
        return faCircleCheck;
      case 'error':
        return faCircleXmark;
      default:
        return faCircleCheck;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'uploading':
        return 'status-uploading';
      case 'success':
        return 'status-success';
      case 'error':
        return 'status-error';
      default:
        return 'status-uploading';
    }
  };

  return (
    <div className="file-list-container">
      <div className="file-list">
        {fileList.map(item => (
          <div
            key={item.uid}
            className={`file-item ${getStatusClass(item.status)}`}
          >
            <div className="file-content">
              <div className="file-left">
                <Icon icon={faFile} className="file-main-icon" />
                <div className="file-info">
                  <span className="file-name" title={item.name}>
                    {item.name}
                  </span>
                </div>
              </div>

              <div className="file-right">
                <div className="status-section">
                  <div className="status-with-remove">
                    <button
                      className="status-icon-btn"
                      disabled={item.status === 'uploading'}
                      onMouseEnter={() => setHoveredItem(item.uid)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => {
                        // 如果是success状态悬浮时显示error图标，此时点击就是删除
                        // 如果是error状态，直接点击删除
                        if (
                          item.status === 'success' &&
                          hoveredItem === item.uid
                        ) {
                          onRemoved?.(item);
                        } else if (item.status === 'error') {
                          onRemoved?.(item);
                        }
                      }}
                    >
                      <Icon
                        icon={getStatusIcon(
                          item.status,
                          hoveredItem === item.uid
                        )}
                        className={`status-icon ${getStatusClass(item.status)}`}
                      />
                    </button>
                  </div>
                  <span className="file-status">
                    {item.status === 'uploading' && '上传中...'}
                    {item.status === 'success' && '上传成功'}
                    {item.status === 'error' && '上传失败'}
                  </span>
                </div>
              </div>
            </div>

            {item.status === 'uploading' && (
              <div className="progress-section">
                <Progress percent={item.percent} showText={false} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
