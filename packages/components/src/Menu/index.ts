import { FC } from 'react';
import Menu, { MenuProps } from './Menu';
import MenuItem, { MenuItemProps } from './MenuItems';
import SubMenu, { SubMenuProps } from './SubMenu';
// 类型“FC<MenuProps>”上不存在属性“Item”:使用交叉类型
export type MenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
};
const TransMenu = Menu as MenuComponent;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;
