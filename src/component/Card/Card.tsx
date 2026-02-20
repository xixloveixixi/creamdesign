// Card 组件
// 支持标题、封面图、内容、操作按钮等功能
// 核心参数：
// title：卡片标题，支持 ReactNode
// children：卡片内容（body 区域）
// actions：操作按钮区域，接受 ReactNode 数组
// extra：标题栏右侧附加内容
// cover：卡片封面，位于头部上方
// bordered：是否显示边框，默认 true
// hoverable：是否开启悬停效果，默认 false
// size：卡片尺寸，'default' | 'small'，默认 'default'
// loading：是否为加载中状态，默认 false
import React from 'react';
import classNames from 'classnames';
import './Card.scss';

export type CardSize = 'default' | 'small';

export interface CardProps {
  /** 卡片标题 */
  title?: React.ReactNode;
  /** 卡片标题栏右侧的附加内容 */
  extra?: React.ReactNode;
  /** 卡片封面（渲染在头部上方） */
  cover?: React.ReactNode;
  /** 操作按钮列表，渲染在卡片底部 */
  actions?: React.ReactNode[];
  /** 是否有边框 */
  bordered?: boolean;
  /** 鼠标悬停时是否显示阴影效果 */
  hoverable?: boolean;
  /** 卡片尺寸 */
  size?: CardSize;
  /** 是否显示骨架加载状态 */
  loading?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义内联样式 */
  style?: React.CSSProperties;
  /** 卡片内容 */
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  extra,
  cover,
  actions,
  bordered = true,
  hoverable = false,
  size = 'default',
  loading = false,
  className,
  style,
  children,
}) => {
  const cardClassName = classNames(
    'cream-card',
    {
      'cream-card--bordered': bordered,
      'cream-card--hoverable': hoverable,
      'cream-card--small': size === 'small',
      'cream-card--loading': loading,
    },
    className
  );

  const hasHeader = title !== undefined || extra !== undefined;

  return (
    <div className={cardClassName} style={style} role="article">
      {/* 封面图 */}
      {cover && (
        <div className="cream-card__cover" aria-hidden="true">
          {cover}
        </div>
      )}

      {/* 卡片头部 */}
      {hasHeader && (
        <div className="cream-card__header">
          {title && (
            <div className="cream-card__title">
              {typeof title === 'string' ? (
                <h4 className="cream-card__title-text">{title}</h4>
              ) : (
                title
              )}
            </div>
          )}
          {extra && <div className="cream-card__extra">{extra}</div>}
        </div>
      )}

      {/* 卡片内容区 */}
      <div className="cream-card__body">
        {loading ? (
          <div className="cream-card__skeleton" aria-label="加载中">
            <div className="cream-card__skeleton-row cream-card__skeleton-row--title" />
            <div className="cream-card__skeleton-row" />
            <div className="cream-card__skeleton-row" />
            <div className="cream-card__skeleton-row cream-card__skeleton-row--short" />
          </div>
        ) : (
          children
        )}
      </div>

      {/* 操作按钮区 */}
      {actions && actions.length > 0 && (
        <div className="cream-card__actions" role="group" aria-label="卡片操作">
          {actions.map((action, index) => (
            <div key={index} className="cream-card__action-item">
              {action}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
