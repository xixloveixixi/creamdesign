import React from 'react';
import './Tag.scss';
export declare enum TagColor {
    Default = "default",
    Primary = "primary",
    Success = "success",
    Warning = "warning",
    Danger = "danger",
    Info = "info"
}
export declare enum TagSize {
    Small = "small",
    Medium = "medium",
    Large = "large"
}
export type TagColorValue = TagColor | 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
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
export declare const Tag: React.FC<TagProps>;
export default Tag;
//# sourceMappingURL=Tag.d.ts.map