import React from 'react';
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
export declare const Card: React.FC<CardProps>;
export default Card;
//# sourceMappingURL=Card.d.ts.map