import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';

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
const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  const { index = 0, disabled = false, className, style, children } = props;
  const context = useContext(MenuContext);
  const { activeIndex, onSelect, childActiveIndex } = context;
  //添加默认索引类名
  const menuItemClassName = classNames('menu-item', className, {
    'menu-item-disabled': disabled,
    'menu-item-active': activeIndex === index,
  });
  // 菜单项点击事件处理函数
  const handleClick = () => {
    // 只有当菜单项不是禁用状态且index存在时才触发点击事件
    if (!disabled && onSelect && index !== undefined) {
      onSelect(index);
    }
  };
  return (
    <li className={menuItemClassName} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem'; //在判断是否是MenuItem时需要使用displayName
export default MenuItem;
// 总结一下：
// MenuItem组件的主要功能是创建一个菜单项组件，支持自定义索引、禁用状态和自定义样式类名。
// 它通过context获取选中项索引和点击回调函数，当点击时会触发回调函数并传递当前索引。
// 渲染时，会根据索引和禁用状态添加相应的类名，同时渲染子元素。
