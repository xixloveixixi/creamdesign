import React from 'react';
/**
 * MenuItem组件的属性接口
 */
export interface MenuItemProps {
    /** 菜单项的唯一标识，用于与activeIndex比较确定是否激活 */
    index?: string | number;
    /** 是否禁用该菜单项，禁用状态下点击无效 */
    disabled?: boolean;
    /** 自定义样式类名 */
    className?: string;
    /** 内联样式对象 */
    style?: React.CSSProperties;
    /** 菜单项显示的内容 */
    children?: React.ReactNode;
}
/**
 * MenuItem菜单组件的子项组件
 * 用于显示单个菜单项，支持禁用和激活状态
 * @param {MenuItemProps} props - 组件属性
 * @returns {JSX.Element} 菜单项组件
 */
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
//# sourceMappingURL=MenuItems.d.ts.map