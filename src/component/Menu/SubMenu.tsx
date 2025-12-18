import React, { useContext, ReactNode } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';
import { MenuItemProps } from './MenuItems';
import Icon from '../Icon/icon';

// SubMenuProps接口
export interface SubMenuProps {
  index?: string | number;
  title: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props: SubMenuProps) => {
  const { index, title, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const {
    activeIndex,
    setActiveIndex,
    expandedIndex,
    onToggleSubMenu,
    mode,
    childActiveIndex,
  } = context;

  // 子菜单是否展开，由MenuContext的expandedIndex控制
  const expanded = expandedIndex === index;

  // 点击子菜单标题，展开/收起子菜单
  const handleTitleClick = () => {
    if (index !== undefined && setActiveIndex) {
      setActiveIndex(index);
    }
    if (!disabled && onToggleSubMenu && index !== undefined) {
      onToggleSubMenu(index);
    }
  };

  // 渲染子菜单内容
  const renderChildren = () => {
    if (!children) return null;
    return React.Children.map(
      children as React.ReactElement[],
      (child: React.ReactElement, childIndex: number) => {
        if (!React.isValidElement(child)) return null;

        const childElement = child as React.ReactElement<
          MenuItemProps | SubMenuProps
        >;

        // 检查是否是React组件
        const isComponent = typeof childElement.type === 'function';

        if (isComponent) {
          const { displayName } = childElement.type as React.ComponentType;

          if (displayName === 'MenuItem' || displayName === 'SubMenu') {
            // 为子菜单添加index属性，当index是undefined时，只使用childIndex
            const newIndex =
              index !== undefined ? `${index}-${childIndex}` : childIndex;
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
        } else {
          console.warn(
            `SubMenu only accepts MenuItem or SubMenu as children, but got a ${typeof childElement.type}`
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
        {title}
        <span className="submenu-arrow">
          {mode === 'vertical' ? (
            <Icon icon="caret-right" className="submenu-arrow-icon" />
          ) : (
            <Icon icon="caret-down" className="submenu-arrow-icon" />
          )}
        </span>
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
