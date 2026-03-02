import React from 'react';
import './Timeline.scss';
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
export declare const Timeline: React.FC<TimelineProps>;
export default Timeline;
//# sourceMappingURL=Timeline.d.ts.map