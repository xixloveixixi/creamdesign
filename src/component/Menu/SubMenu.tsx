import React, { useContext, ReactNode } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu.tsx';
import { MenuItemProps } from './MenuItems.tsx';

// SubMenuProps接口
export interface SubMenuProps {
  index: string | number;
  title: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props: SubMenuProps) => {
  const { index, title, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const { activeIndex, expandedIndex, onToggleSubMenu } = context;

  // 子菜单是否展开，由MenuContext的expandedIndex控制
  const expanded = expandedIndex === index;

  // 处理子菜单标题点击事件
  const handleTitleClick = () => {
    if (!disabled && onToggleSubMenu) {
      onToggleSubMenu(index);
    }
  };

  // 渲染子菜单
  const renderChildren = () => {
    return React.Children.map(
      children,
      (child: React.ReactElement, childIndex: number) => {
        if (!React.isValidElement(child)) return null;

        const childElement = child as React.ReactElement<
          MenuItemProps | SubMenuProps
        >;
        const { displayName } = childElement.type;

        // 为子菜单项生成新的索引，格式为：父索引-子索引
        const newIndex = `${index}-${childIndex}`;

        if (displayName === 'MenuItem' || displayName === 'SubMenu') {
          return React.cloneElement(childElement, {
            key: newIndex,
            index: newIndex,
          });
        } else {
          console.warn(
            `SubMenu only accepts MenuItem or SubMenu as children, but got ${displayName}`
          );
          return null;
        }
      }
    );
  };

  // 生成子菜单类名
  const subMenuClassName = classNames('submenu', {
    'submenu-expanded': expanded,
  });

  // 生成菜单项类名
  const menuItemClassName = classNames('menu-item', className, {
    'menu-item-active': activeIndex === index,
    'menu-item-disabled': disabled,
  });

  return (
    <li className={menuItemClassName} style={style}>
      <div className="menu-item-title" onClick={handleTitleClick}>
        {title} {/* 使用title属性作为菜单标题 */}
        <span className="submenu-arrow">{expanded ? '▼' : '▶'}</span>
      </div>
      <ul className={subMenuClassName}>
        {renderChildren()} {/* 渲染所有子菜单项 */}
      </ul>
    </li>
  );
};

SubMenu.defaultProps = {
  disabled: false,
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
// 总结一下：
// SubMenu组件的主要功能是创建一个子菜单组件，支持自定义索引、禁用状态和自定义样式类名。
// 它通过context获取选中项索引和展开项索引，同时支持自定义回调函数。
// 渲染时，会根据索引和禁用状态添加相应的类名，同时渲染子元素。
