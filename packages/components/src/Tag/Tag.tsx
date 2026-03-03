// Tag 标签组件
import React from 'react';
import './Tag.scss';

export enum TagColor {
  Default = 'default',
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Info = 'info',
}

export enum TagSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type TagColorValue =
  | TagColor
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
export type TagSizeValue = TagSize | 'small' | 'medium' | 'large';

export interface TagProps {
  /** 标签内容 */
  children: React.ReactNode;
  /** 标签颜色 */
  color?: TagColorValue;
  /** 标签尺寸 */
  size?: TagSizeValue;
  /** 是否可点击 */
  clickable?: boolean;
  /** 是否可删除 */
  closable?: boolean;
  /** 点击回调 */
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  /** 删除回调 */
  onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  /** 样式类名 */
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  color = TagColor.Default,
  size = TagSize.Medium,
  clickable = false,
  closable = false,
  onClick,
  onClose,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (clickable && onClick) {
      onClick(e);
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    onClose?.(e);
  };

  return (
    <span
      className={`cream-tag cream-tag--${color} cream-tag--${size} ${clickable ? 'cream-tag--clickable' : ''} ${className || ''}`}
      onClick={handleClick}
    >
      <span className="cream-tag__text">{children}</span>
      {closable && (
        <span
          className="cream-tag__close"
          onClick={handleClose}
          role="button"
          tabIndex={0}
          aria-label="关闭"
        >
          ×
        </span>
      )}
    </span>
  );
};

export default Tag;
