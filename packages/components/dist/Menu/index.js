import { jsx, jsxs } from 'react/jsx-runtime';
import React, { createContext, useState, useContext } from 'react';
import classNames from 'classnames';
import { I as Icon } from '../chunks/Icon-DLU6rUc2.js';
import '@fortawesome/react-fontawesome';

// 创建MenuContext
const MenuContext = createContext({
    onSelect: () => { }, //默认空函数，防止undefined调用
    activeIndex: 0, //默认高亮项的索引
    setActiveIndex: () => { }, //默认空函数，防止undefined调用
    childActiveIndex: 0, //默认子项高亮项的索引
});
/**
 * Menu菜单组件
 * 支持水平/垂直布局，菜单项选中，子菜单展开/收起等功能
 * @param {MenuProps} props - 组件属性
 * @returns {JSX.Element} 菜单组件
 */
const Menu = (props) => {
    const { mode = 'horizontal', onSelect, className, defaultIndex = 0, style, children, } = props;
    const [activeIndex, setActiveIndex] = useState(defaultIndex || 0); //默认高亮项的索引
    const [expandedIndex, setExpandedIndex] = useState(undefined); //默认展开项的索引
    // 创建回调函数，用于更新activeIndex，同时调用外部onSelect回调
    const handleSelect = selectedIndex => {
        setActiveIndex(selectedIndex);
        if (onSelect) {
            onSelect(selectedIndex);
        }
    };
    // 处理子菜单展开/收起：点击子菜单时，展开当前点击的子菜单，收起其他子菜单
    const handleToggleSubMenu = index => {
        // 如果点击的是当前展开的子菜单，则收起
        if (expandedIndex === index) {
            setExpandedIndex(undefined);
        }
        else {
            // 否则展开点击的子菜单，同时收起其他子菜单
            setExpandedIndex(index);
        }
    };
    //添加默认索引类名
    const menuClassName = classNames('menu', `menu-${mode}`, className);
    // 创建传给子组件的context值
    const menuContextValue = {
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
        if (!children)
            return null;
        return React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child))
                return null;
            const childElement = child;
            // 检查是否是React组件（函数组件或类组件）
            const isComponent = typeof childElement.type === 'function';
            // 支持MenuItem和SubMenu组件
            if (isComponent) {
                const { displayName } = childElement.type;
                if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                    // 为菜单项添加index属性，仅当子元素没有index属性时
                    return React.cloneElement(childElement, {
                        index: childElement.props.index || index,
                    });
                }
                else {
                    console.warn(`Menu only accepts MenuItem or SubMenu as children, but got ${displayName}`);
                    return null;
                }
            }
            else {
                console.warn(`Menu only accepts MenuItem or SubMenu as children, but got a ${typeof childElement.type}`);
                return null;
            }
        });
    };
    return (jsx("ul", { className: menuClassName, style: style, "data-testid": "menu-list", children: jsx(MenuContext.Provider, { value: menuContextValue, children: renderChild() }) }));
};

/**
 * MenuItem菜单组件的子项组件
 * 用于显示单个菜单项，支持禁用和激活状态
 * @param {MenuItemProps} props - 组件属性
 * @returns {JSX.Element} 菜单项组件
 */
const MenuItem = (props) => {
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
    return (jsx("li", { className: menuItemClassName, style: style, onClick: handleClick, children: children }));
};
MenuItem.displayName = 'MenuItem'; //在判断是否是MenuItem时需要使用displayName

/**
 * SubMenu菜单组件的子菜单组件
 * 用于创建可展开/收起的子菜单，支持嵌套子菜单
 * @param {SubMenuProps} props - 组件属性
 * @returns {JSX.Element} 子菜单组件
 */
const SubMenu = (props) => {
    const { index = 0, title, disabled = false, className, style, children, } = props;
    const context = useContext(MenuContext);
    const { activeIndex, setActiveIndex, expandedIndex, onToggleSubMenu, mode } = context;
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
        if (!children)
            return null;
        return React.Children.map(children, (child, childIndex) => {
            if (!React.isValidElement(child))
                return null;
            const childElement = child;
            // 检查是否是React组件
            const isComponent = typeof childElement.type === 'function';
            if (isComponent) {
                const { displayName } = childElement.type;
                if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                    // 为子菜单添加index属性，当index是undefined时，只使用childIndex
                    const newIndex = index !== undefined ? `${index}-${childIndex}` : childIndex;
                    return React.cloneElement(childElement, {
                        key: newIndex,
                        index: newIndex,
                    });
                }
                else {
                    console.warn(`SubMenu only accepts MenuItem or SubMenu as children, but got ${displayName}`);
                    return null;
                }
            }
            else {
                console.warn(`SubMenu only accepts MenuItem or SubMenu as children, but got a ${typeof childElement.type}`);
                return null;
            }
        });
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
    return (jsxs("li", { className: menuItemClassName, style: style, children: [jsxs("div", { className: "menu-item-title", onClick: handleTitleClick, children: [title, jsx("span", { className: "submenu-arrow", children: mode === 'vertical' ? (jsx(Icon, { icon: "caret-right", className: "submenu-arrow-icon" })) : (jsx(Icon, { icon: "caret-down", className: "submenu-arrow-icon" })) })] }), jsxs("ul", { className: subMenuClassName, children: [renderChildren(), " "] })] }));
};
SubMenu.displayName = 'SubMenu';

const TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export { TransMenu as default };
//# sourceMappingURL=index.js.map
