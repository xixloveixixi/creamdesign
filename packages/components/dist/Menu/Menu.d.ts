import React from 'react';
import './Menu.scss';
/**
 * 应用中常用的菜单组件，支持水平和垂直两种布局方式
 * 可包含MenuItem和SubMenu子组件，支持菜单项选中和子菜单展开/收起功能
 */
/**
 * 菜单选中回调函数类型
 * @param selectedIndex 选中菜单项的索引
 */
type MenuSelectType = (selectedIndex: string | number) => void;
/**
 * Menu组件的属性接口
 */
export interface MenuProps {
    /** 控制菜单布局方向，可选值：'vertical'（垂直）或'horizontal'（水平），默认值：'horizontal' */
    mode?: 'vertical' | 'horizontal';
    /** 菜单项选中时的回调函数 */
    onSelect?: MenuSelectType;
    /** 自定义样式类名 */
    className?: string;
    /** 默认选中菜单项的索引 */
    defaultIndex?: string | number;
    /** 内联样式对象 */
    style?: React.CSSProperties;
    /** 菜单项内容，仅支持MenuItem和SubMenu组件 */
    children?: React.ReactNode;
}
interface MenuContextProps {
    onSelect?: MenuSelectType;
    activeIndex?: string | number;
    setActiveIndex?: (index: string | number) => void;
    childActiveIndex?: string | number;
    mode?: 'vertical' | 'horizontal';
    expandedIndex?: string | number;
    onToggleSubMenu?: (index: string | number) => void;
}
export declare const MenuContext: React.Context<MenuContextProps>;
/**
 * Menu菜单组件
 * 支持水平/垂直布局，菜单项选中，子菜单展开/收起等功能
 * @param {MenuProps} props - 组件属性
 * @returns {JSX.Element} 菜单组件
 */
declare const Menu: React.FC<MenuProps>;
export default Menu;
//# sourceMappingURL=Menu.d.ts.map