import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import './style.scss';

type MenuSelectType = (selectedIndex: number) => void;
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
  defaultIndex?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
interface MenuContextProps {
  onSelect?: MenuSelectType;
  activeIndex?: number;
}
// 创建MenuContext
export const MenuContext = createContext<MenuContextProps>({
  onSelect: () => {},
  activeIndex: 0,
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
  const [activeIndex, setActiveIndex] = useState(defaultIndex || 0);
  // 创建回调函数，用于更新activeIndex
  const handleSelect: MenuSelectType = selectedIndex => {
    setActiveIndex(selectedIndex);
    if (onSelect) {
      onSelect(selectedIndex);
    }
  };
  //添加默认索引类名
  const menuClassName = classNames('menu', `menu-${mode}`, className);
  // 创建传给子组件的context值
  const menuContextValue: MenuContextProps = {
    onSelect: handleSelect,
    activeIndex,
  };
  return (
    <ul className={menuClassName} style={style} data-testid="menu-list">
      <MenuContext.Provider value={menuContextValue}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: 0,
};

export default Menu;
