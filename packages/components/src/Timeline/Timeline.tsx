import React from 'react';
import classNames from 'classnames';
import './Timeline.scss';

// ===== 类型定义 =====

export type TimelineStatus = 'completed' | 'processing' | 'pending';
export type TimelineDirection = 'vertical' | 'horizontal';
export type TimelineMode = 'left' | 'right' | 'alternate';

export interface TimelineItemProps {
  /** 节点标题 */
  title?: React.ReactNode;
  /** 节点正文内容 */
  content?: React.ReactNode;
  /** 时间戳文本 */
  timestamp?: string;
  /** 节点状态：已完成 / 进行中 / 待处理 */
  status?: TimelineStatus;
  /** 自定义节点图标，覆盖默认状态图标 */
  icon?: React.ReactNode;
  /** 自定义节点圆点颜色（CSS 颜色值） */
  color?: string;
  /** 自定义类名 */
  className?: string;
}

export interface TimelineProps {
  /** 时间轴节点数据列表 */
  items: TimelineItemProps[];
  /** 排列方向，垂直或水平 */
  direction?: TimelineDirection;
  /** 内容排列模式（仅垂直模式生效） */
  mode?: TimelineMode;
  /** 自定义根元素类名 */
  className?: string;
  /** 自定义内联样式 */
  style?: React.CSSProperties;
}

// ===== 默认状态图标 =====

const DefaultIcon: React.FC<{ status: TimelineStatus }> = ({ status }) => {
  if (status === 'completed') {
    return (
      <svg
        viewBox="0 0 16 16"
        width="10"
        height="10"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 8l4 4 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (status === 'processing') {
    return (
      <span className="cream-timeline__processing-dot" aria-hidden="true" />
    );
  }
  return null;
};

// ===== TimelineItem 内部渲染 =====

interface InternalItemProps extends TimelineItemProps {
  isLast: boolean;
  mode: TimelineMode;
  direction: TimelineDirection;
  index: number;
}

const TimelineItem: React.FC<InternalItemProps> = ({
  title,
  content,
  timestamp,
  status = 'pending',
  icon,
  color,
  className,
  isLast,
  mode,
  direction,
  index,
}) => {
  const isAlternateRight =
    direction === 'vertical' && mode === 'alternate' && index % 2 !== 0;

  const itemClassName = classNames(
    'cream-timeline__item',
    `cream-timeline__item--${status}`,
    {
      'cream-timeline__item--last': isLast,
      'cream-timeline__item--alternate-right': isAlternateRight,
      'cream-timeline__item--mode-right':
        direction === 'vertical' && mode === 'right',
    },
    className
  );

  const nodeStyle: React.CSSProperties = color
    ? { backgroundColor: color, borderColor: color }
    : {};

  const statusLabel =
    status === 'completed'
      ? '已完成'
      : status === 'processing'
        ? '进行中'
        : '待处理';

  return (
    <li className={itemClassName} aria-label={`时间节点：${statusLabel}`}>
      {/* 连接线 */}
      {!isLast && <div className="cream-timeline__tail" aria-hidden="true" />}

      {/* 节点圆点/图标 */}
      <div
        className={classNames('cream-timeline__node', {
          'cream-timeline__node--custom': !!icon,
        })}
        style={nodeStyle}
        aria-hidden="true"
      >
        {icon ? (
          <span className="cream-timeline__node-inner">{icon}</span>
        ) : (
          <span className="cream-timeline__node-inner">
            <DefaultIcon status={status} />
          </span>
        )}
      </div>

      {/* 内容区域 */}
      <div className="cream-timeline__content">
        {/* 时间戳 */}
        {timestamp && (
          <time className="cream-timeline__timestamp" dateTime={timestamp}>
            {timestamp}
          </time>
        )}

        {/* 标题 */}
        {title && (
          <div className="cream-timeline__title">
            {typeof title === 'string' ? (
              <span className="cream-timeline__title-text">{title}</span>
            ) : (
              title
            )}
          </div>
        )}

        {/* 正文内容 */}
        {content && <div className="cream-timeline__body">{content}</div>}
      </div>
    </li>
  );
};

// ===== Timeline 主组件 =====

export const Timeline: React.FC<TimelineProps> = ({
  items = [],
  direction = 'vertical',
  mode = 'left',
  className,
  style,
}) => {
  const rootClassName = classNames(
    'cream-timeline',
    `cream-timeline--${direction}`,
    {
      [`cream-timeline--mode-${mode}`]: direction === 'vertical',
    },
    className
  );

  return (
    <ol className={rootClassName} style={style} aria-label="时间轴">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          {...item}
          isLast={index === items.length - 1}
          mode={mode}
          direction={direction}
          index={index}
        />
      ))}
    </ol>
  );
};

export default Timeline;
