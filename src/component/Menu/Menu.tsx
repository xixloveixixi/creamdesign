import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import './style.scss';
import { MenuItemProps } from './MenuItems';
import { SubMenuProps } from './SubMenu';

// 更新MenuSelectType以支持字符串索引
type MenuSelectType = (selectedIndex: string | number) => void;
// MenuProps接口
// mode: 控制菜单方向(vertical/horizontal)
// onSelect: 菜单项选中回调函数
// className: 自定义样式类名
// defaultIndex: 默认高亮项的索引
// activeIndex: 当前高亮项的索引
export interface MenuProps {
  mode?: 'vertical' | 'horizontal';
  onSelect?: MenuSelectType;
  className?: string;
  defaultIndex?: string | number;
  style?: React.CSSProperties;
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
// 创建MenuContext
export const MenuContext = createContext<MenuContextProps>({
  onSelect: () => {}, //默认空函数，防止undefined调用
  activeIndex: 0, //默认高亮项的索引
  setActiveIndex: () => {}, //默认空函数，防止undefined调用
  childActiveIndex: 0, //默认子项高亮项的索引
});

const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  const {
    mode = 'horizontal',
    onSelect,
    className,
    defaultIndex,
    style,
    children,
  } = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex || 0); //默认高亮项的索引
  const [expandedIndex, setExpandedIndex] = useState<
    string | number | undefined
  >(undefined); //默认展开项的索引
  // 创建回调函数，用于更新activeIndex，同时调用外部onSelect回调
  const handleSelect: MenuSelectType = selectedIndex => {
    setActiveIndex(selectedIndex);
    if (onSelect) {
      onSelect(selectedIndex);
    }
  };
  // 处理子菜单展开/收起：点击子菜单时，展开当前点击的子菜单，收起其他子菜单
  const handleToggleSubMenu: (index: string | number) => void = index => {
    // 如果点击的是当前展开的子菜单，则收起
    if (expandedIndex === index) {
      setExpandedIndex(undefined);
    } else {
      // 否则展开点击的子菜单，同时收起其他子菜单
      setExpandedIndex(index);
    }
  };
  //添加默认索引类名
  const menuClassName = classNames('menu', `menu-${mode}`, className);
  // 创建传给子组件的context值
  const menuContextValue: MenuContextProps = {
    onSelect: handleSelect,
    activeIndex,
    setActiveIndex, // 传递setActiveIndex给子组件
    mode,
    expandedIndex, //默认展开项的索引
    onToggleSubMenu: handleToggleSubMenu, //处理子菜单展开/收起的回调函数
  };
  // 直接使用React.Children.map遍历children的话如果子元素不是React元素，会报错
  // 所以需要判断是否是React元素，不是的话就直接返回null
  const renderChild = () => {
    if (!children) return null;
    return React.Children.map(
      children as React.ReactElement[],
      (child: React.ReactElement, index: any) => {
        if (!React.isValidElement(child)) return null;

        const childElement = child as React.ReactElement<
          MenuItemProps | SubMenuProps
        >;

        // 检查是否是React组件（函数组件或类组件）
        const isComponent = typeof childElement.type === 'function';

        // 支持MenuItem和SubMenu组件
        if (isComponent) {
          const { displayName } = childElement.type as React.ComponentType;
          if (displayName === 'MenuItem' || displayName === 'SubMenu') {
            // 为菜单项添加index属性，仅当子元素没有index属性时
            return React.cloneElement(childElement, {
              index: childElement.props.index || index,
            });
          } else {
            console.warn(
              `Menu only accepts MenuItem or SubMenu as children, but got ${displayName}`
            );
            return null;
          }
        } else {
          console.warn(
            `Menu only accepts MenuItem or SubMenu as children, but got a ${typeof childElement.type}`
          );
          return null;
        }
      }
    );
  };
  return (
    <ul className={menuClassName} style={style} data-testid="menu-list">
      <MenuContext.Provider value={menuContextValue}>
        {renderChild()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: 0,
};

export default Menu;
// 总结一下：
// Menu组件的主要功能是创建一个菜单组件，支持水平和垂直方向的菜单显示。
// 它通过context传递选中项索引和展开项索引，同时支持自定义回调函数。
// 渲染时，会遍历children中的子元素，支持MenuItem和SubMenu组件。
