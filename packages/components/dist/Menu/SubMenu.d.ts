import React, { ReactNode } from 'react';
/**
 * SubMenu组件的属性接口
 */
export interface SubMenuProps {
    /** 子菜单的唯一标识，用于与activeIndex比较确定是否激活 */
    index?: string | number;
    /** 子菜单的标题内容 */
    title: ReactNode;
    /** 是否禁用该子菜单，禁用状态下点击无效 */
    disabled?: boolean;
    /** 自定义样式类名 */
    className?: string;
    /** 内联样式对象 */
    style?: React.CSSProperties;
    /** 子菜单项内容，仅支持MenuItem和SubMenu组件 */
    children?: React.ReactNode;
}
/**
 * SubMenu菜单组件的子菜单组件
 * 用于创建可展开/收起的子菜单，支持嵌套子菜单
 * @param {SubMenuProps} props - 组件属性
 * @returns {JSX.Element} 子菜单组件
 */
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
//# sourceMappingURL=SubMenu.d.ts.map