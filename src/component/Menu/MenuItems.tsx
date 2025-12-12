import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu.tsx';

// MenuItemProps接口
// index: 菜单项唯一标识
// disabled: 是否禁用该菜单项
// className: 自定义样式类名
export interface MenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const { activeIndex, onSelect } = context;
  //添加默认索引类名
  const menuItemClassName = classNames('menu-item', className, {
    'menu-item-disabled': disabled,
    'menu-item-active': activeIndex === index,
  });
  const handleClick = () => {
    if (!disabled && onSelect) {
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
  index: 0,
  disabled: false,
};

export default MenuItem;
