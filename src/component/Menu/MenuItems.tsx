import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';

// MenuItemProps接口
// index: 菜单项唯一标识
// disabled: 是否禁用该菜单项
// className: 自定义样式类名
export interface MenuItemProps {
  index?: string | number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  const { index, disabled, className, style, children } = props;
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

MenuItem.defaultProps = {
  disabled: false,
};
MenuItem.displayName = 'MenuItem'; //在判断是否是MenuItem时需要使用displayName
export default MenuItem;
// 总结一下：
// MenuItem组件的主要功能是创建一个菜单项组件，支持自定义索引、禁用状态和自定义样式类名。
// 它通过context获取选中项索引和点击回调函数，当点击时会触发回调函数并传递当前索引。
// 渲染时，会根据索引和禁用状态添加相应的类名，同时渲染子元素。
