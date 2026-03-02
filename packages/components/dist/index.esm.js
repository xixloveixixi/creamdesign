import { jsxs, jsx } from 'react/jsx-runtime';
import React, { createContext, useState, useContext, useCallback, memo, useMemo, useRef, useEffect, useLayoutEffect, useReducer, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquare, faCircle, faCircleCheck, faFile, faXmark, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Schema from 'async-validator';
import { mapValues, each } from 'lodash-es';
import axios from 'axios';
import SparkMD5 from 'spark-md5';

// 创建枚举：type和size
var ButtonType;
(function (ButtonType) {
    ButtonType["Primary"] = "primary";
    ButtonType["Secondary"] = "secondary";
    ButtonType["Danger"] = "danger";
    ButtonType["Warning"] = "warning";
    ButtonType["Info"] = "info";
    ButtonType["Success"] = "success";
    ButtonType["Outline"] = "outline";
    ButtonType["Ghost"] = "ghost";
    ButtonType["Text"] = "text";
})(ButtonType || (ButtonType = {}));
var ButtonSize;
(function (ButtonSize) {
    ButtonSize["Large"] = "large";
    ButtonSize["Normal"] = "normal";
    ButtonSize["Small"] = "small";
})(ButtonSize || (ButtonSize = {}));
// 3、创建Button组件
const Button = ({ btnType = ButtonType.Primary, size = ButtonSize.Normal, disabled = false, loading = false, icon, children, className, onClick, ...rest }) => {
    const isDisabled = disabled || loading;
    const buttonClassName = `btn btn-${btnType} btn-${size} ${isDisabled ? 'btn-disabled' : ''} ${loading ? 'btn-loading' : ''} ${className || ''}`.trim();
    // 为无障碍访问添加ARIA属性
    const ariaProps = {
        'aria-disabled': isDisabled,
        'aria-busy': loading,
    };
    // 如果按钮只有图标没有文字，则必须提供aria-label
    const hasOnlyIcon = !children && icon;
    const buttonProps = {
        ...ariaProps,
        ...rest,
    };
    return (jsxs("button", { className: buttonClassName, disabled: isDisabled, onClick: onClick, ...buttonProps, children: [loading && (jsx("span", { className: "btn-loading-spinner", "aria-hidden": "true" })), icon && !loading && (jsx("span", { className: "btn-icon", "aria-hidden": !hasOnlyIcon, children: icon })), children] }));
};

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

const Icon = props => {
    const { className, theme, ...rest } = props;
    const classnames = classNames('cream-icon', className, {
        [`icon-${theme}`]: theme,
    });
    return jsx(FontAwesomeIcon, { ...rest, className: classnames });
};

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

// 主要是完成表头的渲染
const TableHeader = () => {
    // 获取columns数据：
    const context = useContext(TableContext);
    // 获取数据（可能为 undefined）
    const columns = (context === null || context === void 0 ? void 0 : context.columns) || [];
    const rowSelection = context === null || context === void 0 ? void 0 : context.rowSelection;
    const isAllRowsSelected = context === null || context === void 0 ? void 0 : context.isAllRowsSelected;
    const isSomeRowsSelected = context === null || context === void 0 ? void 0 : context.isSomeRowsSelected;
    const toggleAllRowsSelection = context === null || context === void 0 ? void 0 : context.toggleAllRowsSelection;
    const isRowSelectionEnabled = !!rowSelection;
    const selectionType = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.type) || 'checkbox';
    const hideSelectAll = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.hideSelectAll) || false;
    const columnWidth = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.columnWidth) || 80;
    const columnTitle = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.columnTitle;
    // 处理全选/反选（必须在早期返回之前定义）
    const handleSelectAll = useCallback(() => {
        if (toggleAllRowsSelection) {
            const allSelected = (isAllRowsSelected === null || isAllRowsSelected === void 0 ? void 0 : isAllRowsSelected()) || false;
            toggleAllRowsSelection(!allSelected);
        }
    }, [toggleAllRowsSelection, isAllRowsSelected]);
    // 渲染选择列表头
    const renderSelectionHeader = () => {
        if (!isRowSelectionEnabled || hideSelectAll) {
            return null;
        }
        const allSelected = (isAllRowsSelected === null || isAllRowsSelected === void 0 ? void 0 : isAllRowsSelected()) || false;
        const someSelected = (isSomeRowsSelected === null || isSomeRowsSelected === void 0 ? void 0 : isSomeRowsSelected()) || false;
        return (jsx("th", { className: "cream-table-selection-column", style: {
                width: `${columnWidth}px`,
                minWidth: `${columnWidth}px`,
                maxWidth: `${columnWidth}px`,
                textAlign: 'center',
                padding: '0.75rem',
            }, children: columnTitle || (jsx("div", { onClick: handleSelectAll, onMouseDown: e => e.preventDefault(), style: {
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                    width: '100%',
                    height: '100%',
                    minHeight: '40px',
                    minWidth: '40px',
                }, title: allSelected ? '取消全选' : '全选', children: selectionType === 'checkbox' ? (someSelected ? (jsx(Icon, { icon: faSquareCheck, style: {
                        color: 'var(--color-primary-500)',
                        fontSize: '20px',
                    } })) : allSelected ? (jsx(Icon, { icon: faSquareCheck, style: {
                        color: 'var(--color-primary-500)',
                        fontSize: '20px',
                    } })) : (jsx(Icon, { icon: faSquare, style: { color: '#d9d9d9', fontSize: '20px' } }))) : (jsx(Icon, { icon: faCircle, style: { color: '#d9d9d9', fontSize: '20px' } })) })) }));
    };
    // 早期返回必须在所有 Hooks 之后
    if (!context) {
        return null;
    }
    return (jsx("thead", { children: jsxs("tr", { children: [renderSelectionHeader(), columns.map(column => {
                    const alignClass = column.align
                        ? `text-${column.align === 'center' ? 'center' : column.align === 'right' ? 'right' : 'left'}`
                        : 'text-left';
                    const fixedClass = column.fixed ? `fixed-${column.fixed}` : '';
                    const className = [alignClass, fixedClass].filter(Boolean).join(' ');
                    return (jsx("th", { className: className || undefined, style: column.width ? { width: column.width } : undefined, children: column.title }, column.key));
                })] }) }));
};

// 使用reactmemo优化
const TableBody = memo(() => {
    // 从context中获取数据
    const context = useContext(TableContext);
    // 使用分页后的数据（可能为 undefined）
    const paginatedData = (context === null || context === void 0 ? void 0 : context.paginatedData) || [];
    const columns = (context === null || context === void 0 ? void 0 : context.columns) || [];
    const rowSelection = context === null || context === void 0 ? void 0 : context.rowSelection;
    const isRowSelected = context === null || context === void 0 ? void 0 : context.isRowSelected;
    const toggleRowSelection = context === null || context === void 0 ? void 0 : context.toggleRowSelection;
    const isRowSelectionEnabled = !!rowSelection;
    const selectionType = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.type) || 'checkbox';
    const columnWidth = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.columnWidth) || 80;
    const getCheckboxProps = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.getCheckboxProps;
    // 渲染选择列单元格（必须在早期返回之前定义）
    const renderSelectionCell = useCallback((record) => {
        if (!isRowSelectionEnabled) {
            return null;
        }
        const selected = (isRowSelected === null || isRowSelected === void 0 ? void 0 : isRowSelected(record)) || false;
        const checkboxProps = (getCheckboxProps === null || getCheckboxProps === void 0 ? void 0 : getCheckboxProps(record)) || {};
        const disabled = checkboxProps.disabled || false;
        const handleClick = (e) => {
            e.stopPropagation();
            if (!disabled && toggleRowSelection) {
                toggleRowSelection(record);
            }
        };
        return (jsx("td", { className: "cream-table-selection-column", style: {
                width: `${columnWidth}px`,
                minWidth: `${columnWidth}px`,
                maxWidth: `${columnWidth}px`,
                textAlign: 'center',
                padding: '0.75rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                position: 'relative',
            }, onClick: handleClick, onMouseDown: e => {
                if (!disabled) {
                    e.preventDefault(); // 防止拖拽选中文本
                }
            }, children: jsx("div", { style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                    minHeight: '40px',
                    minWidth: '40px',
                }, children: selectionType === 'checkbox' ? (selected ? (jsx(Icon, { icon: faSquareCheck, style: {
                        color: 'var(--color-primary-500)',
                        fontSize: '20px',
                    } })) : (jsx(Icon, { icon: faSquare, style: { color: '#d9d9d9', fontSize: '20px' } }))) : selected ? (jsx(Icon, { icon: faCircleCheck, style: { color: 'var(--color-primary-500)', fontSize: '20px' } })) : (jsx(Icon, { icon: faCircle, style: { color: '#d9d9d9', fontSize: '20px' } })) }) }));
    }, [
        isRowSelectionEnabled,
        selectionType,
        columnWidth,
        isRowSelected,
        toggleRowSelection,
        getCheckboxProps,
    ]);
    // 早期返回必须在所有 Hooks 之后
    if (!context) {
        return null;
    }
    return (jsx("tbody", { children: paginatedData.map((item, rowIndex) => {
            const selected = (isRowSelected === null || isRowSelected === void 0 ? void 0 : isRowSelected(item)) || false;
            return (jsxs("tr", { className: selected ? 'selected' : undefined, children: [renderSelectionCell(item), columns.map(column => {
                        const alignClass = column.align
                            ? `text-${column.align === 'center' ? 'center' : column.align === 'right' ? 'right' : 'left'}`
                            : 'text-left';
                        const fixedClass = column.fixed ? `fixed-${column.fixed}` : '';
                        const className = [alignClass, fixedClass]
                            .filter(Boolean)
                            .join(' ');
                        // 获取单元格值：优先使用 dataIndex，否则使用 key
                        const getCellValue = (record, column) => {
                            if (column.dataIndex) {
                                if (Array.isArray(column.dataIndex)) {
                                    // 支持嵌套路径，如 ['user', 'name']
                                    return column.dataIndex.reduce((obj, key) => obj === null || obj === void 0 ? void 0 : obj[key], record);
                                }
                                else {
                                    return record[column.dataIndex];
                                }
                            }
                            return record[column.key];
                        };
                        const cellValue = getCellValue(item, column);
                        // 使用 render 函数或直接显示值
                        const cellContent = column.render
                            ? column.render(cellValue, item, rowIndex)
                            : cellValue;
                        return (jsx("td", { className: className || undefined, style: column.width ? { width: column.width } : undefined, children: cellContent }, column.key));
                    })] }, item.key || rowIndex));
        }) }));
});

const Pagination = ({ current: controlledCurrent, total, pageSize: controlledPageSize = 10, onChange, onPageSizeChange, showSizeChanger = false, pageSizeOptions = [10, 20, 50, 100], showTotal = false, showPrevNext = true, className = '', disabled = false, }) => {
    // 内部状态
    const [internalCurrent, setInternalCurrent] = useState(1);
    const [internalPageSize, setInternalPageSize] = useState(controlledPageSize);
    // 使用受控或非受控模式
    const current = controlledCurrent !== null && controlledCurrent !== void 0 ? controlledCurrent : internalCurrent;
    const pageSize = controlledPageSize !== null && controlledPageSize !== void 0 ? controlledPageSize : internalPageSize;
    // 计算总页数
    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(total / pageSize));
    }, [total, pageSize]);
    // 更新当前页
    const updateCurrent = (newPage) => {
        const validPage = Math.max(1, Math.min(newPage, totalPages));
        if (validPage !== current) {
            if (controlledCurrent === undefined) {
                setInternalCurrent(validPage);
            }
            onChange === null || onChange === void 0 ? void 0 : onChange(validPage, pageSize);
        }
    };
    // 更新每页条数
    const updatePageSize = (newPageSize) => {
        if (newPageSize !== pageSize) {
            const newTotalPages = Math.max(1, Math.ceil(total / newPageSize));
            const newCurrent = Math.min(current, newTotalPages);
            if (controlledPageSize === undefined) {
                setInternalPageSize(newPageSize);
            }
            if (controlledCurrent === undefined) {
                setInternalCurrent(newCurrent);
            }
            onPageSizeChange === null || onPageSizeChange === void 0 ? void 0 : onPageSizeChange(newPageSize);
            onChange === null || onChange === void 0 ? void 0 : onChange(newCurrent, newPageSize);
        }
    };
    // 生成页码数组
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 7; // 最多显示7个页码按钮
        if (totalPages <= maxVisible) {
            // 如果总页数少于等于7，显示所有页码
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        else {
            // 总是显示第一页
            pages.push(1);
            if (current <= 4) {
                // 当前页在前4页
                for (let i = 2; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            }
            else if (current >= totalPages - 3) {
                // 当前页在后4页
                pages.push('ellipsis');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            }
            else {
                // 当前页在中间
                pages.push('ellipsis');
                for (let i = current - 1; i <= current + 1; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }
        return pages;
    };
    const pageNumbers = getPageNumbers();
    return (jsxs("div", { className: `cream-pagination ${disabled ? 'cream-pagination-disabled' : ''} ${className}`.trim(), role: "navigation", "aria-label": "\u5206\u9875\u5BFC\u822A", children: [showTotal && (jsxs("div", { className: "cream-pagination-total", children: ["\u5171 ", jsx("strong", { children: total }), " \u6761"] })), jsxs("div", { className: "cream-pagination-pages", children: [showPrevNext && (jsx("button", { className: "cream-pagination-item cream-pagination-prev", disabled: disabled || current === 1, onClick: () => updateCurrent(current - 1), "aria-label": "\u4E0A\u4E00\u9875", children: "\u2190" })), pageNumbers.map((page, index) => {
                        if (page === 'ellipsis') {
                            return (jsx("span", { className: "cream-pagination-ellipsis", children: "..." }, `ellipsis-${index}`));
                        }
                        const pageNum = page;
                        const isActive = pageNum === current;
                        return (jsx("button", { className: `cream-pagination-item ${isActive ? 'cream-pagination-item-active' : ''}`.trim(), disabled: disabled, onClick: () => updateCurrent(pageNum), "aria-label": `第 ${pageNum} 页`, "aria-current": isActive ? 'page' : undefined, children: pageNum }, pageNum));
                    }), showPrevNext && (jsx("button", { className: "cream-pagination-item cream-pagination-next", disabled: disabled || current === totalPages, onClick: () => updateCurrent(current + 1), "aria-label": "\u4E0B\u4E00\u9875", children: "\u2192" }))] }), showSizeChanger && (jsx("div", { className: "cream-pagination-options", children: jsx("select", { className: "cream-pagination-size-selector", value: pageSize, onChange: e => updatePageSize(Number(e.target.value)), disabled: disabled, "aria-label": "\u6BCF\u9875\u663E\u793A\u6761\u6570", children: pageSizeOptions.map(size => (jsxs("option", { value: size, children: [size, " \u6761/\u9875"] }, size))) }) }))] }));
};

// 分页器
const TableFoot = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const context = useContext(TableContext);
    const { pagination } = context !== null && context !== void 0 ? context : {};
    // 1、处理分页配置：类似 antd 的逻辑
    // pagination === false: 禁用分页
    // pagination === true 或 undefined: 使用默认配置（启用分页）
    // pagination === 对象: 使用配置对象
    const isPaginationDisabled = pagination === false;
    const paginationConfig = (() => {
        if (isPaginationDisabled) {
            return undefined;
        }
        if (pagination === true || pagination === undefined) {
            return {};
        }
        return pagination;
    })();
    // 2、计算 total：优先使用 pagination.total（服务端分页），否则使用 dataSource.length（客户端分页）
    const initialTotal = (_a = context === null || context === void 0 ? void 0 : context.total) !== null && _a !== void 0 ? _a : 0;
    const total = (_b = paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.total) !== null && _b !== void 0 ? _b : initialTotal;
    // 获取初始分页参数（类似 antd）
    // 受控模式：使用 curren`t/pageSize
    // 非受控模式：使用 defaultCurrent/defaultPageSize 或默认值
    const initialPageSize = (_d = (_c = paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.pageSize) !== null && _c !== void 0 ? _c : paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.defaultPageSize) !== null && _d !== void 0 ? _d : 10;
    const initialCurrent = (_f = (_e = paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.current) !== null && _e !== void 0 ? _e : paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.defaultCurrent) !== null && _f !== void 0 ? _f : 1;
    const [current, setInternalCurrent] = useState(initialCurrent);
    const [pageSize, setInternalPageSize] = useState(initialPageSize);
    // 受控模式：如果 pagination 配置中有 current 或 pageSize，使用受控模式（类似 antd）
    const isCurrentControlled = (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.current) !== undefined;
    const isPageSizeControlled = (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.pageSize) !== undefined;
    const finalCurrent = isCurrentControlled
        ? paginationConfig.current
        : current;
    const finalPageSize = isPageSizeControlled
        ? paginationConfig.pageSize
        : pageSize;
    // 计算分页数据（类似 antd）
    const tableData = (_g = context === null || context === void 0 ? void 0 : context.tableData) !== null && _g !== void 0 ? _g : [];
    const paginatedData = useMemo(() => {
        if (!context) {
            return [];
        }
        if (isPaginationDisabled) {
            // 如果分页被禁用，返回所有数据
            return tableData;
        }
        // 如果提供了 pagination.total（服务端分页），不进行客户端切片
        if ((paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.total) !== undefined) {
            return tableData;
        }
        // 客户端分页：进行数据切片
        const startIndex = (finalCurrent - 1) * finalPageSize;
        const endIndex = startIndex + finalPageSize;
        return tableData.slice(startIndex, endIndex);
    }, [
        context,
        tableData,
        finalCurrent,
        finalPageSize,
        isPaginationDisabled,
        paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.total,
    ]);
    // 更新 Context 中的 paginatedData，供 TableBody 使用
    // 使用 useRef 来避免 setPaginatedData 变化导致的无限循环
    const setPaginatedDataRef = useRef(context === null || context === void 0 ? void 0 : context.setPaginatedData);
    const prevPaginatedDataRef = useRef([]);
    const prevPaginatedDataLengthRef = useRef(0);
    useEffect(() => {
        setPaginatedDataRef.current = context === null || context === void 0 ? void 0 : context.setPaginatedData;
    }, [context === null || context === void 0 ? void 0 : context.setPaginatedData]);
    useEffect(() => {
        // 只有当 paginatedData 真的变化时才更新
        // 比较长度和每个元素的引用（浅比较）
        const prevData = prevPaginatedDataRef.current;
        const prevLength = prevPaginatedDataLengthRef.current;
        const currentLength = paginatedData.length;
        const hasChanged = prevLength !== currentLength ||
            (currentLength > 0 &&
                prevData.some((item, index) => item !== paginatedData[index]));
        if (hasChanged && setPaginatedDataRef.current) {
            setPaginatedDataRef.current(paginatedData);
            prevPaginatedDataRef.current = paginatedData;
            prevPaginatedDataLengthRef.current = currentLength;
        }
    }, [paginatedData]);
    // 处理页码变化（类似 antd）
    const handlePageChange = (newPage, newPageSize) => {
        const finalNewPageSize = newPageSize !== null && newPageSize !== void 0 ? newPageSize : finalPageSize;
        // 更新内部状态（非受控模式）
        if (!isCurrentControlled) {
            setInternalCurrent(newPage);
        }
        if (newPageSize !== undefined && !isPageSizeControlled) {
            setInternalPageSize(newPageSize);
        }
        // 调用回调（类似 antd：onChange 在页码或 pageSize 改变时都会触发）
        if (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.onChange) {
            paginationConfig.onChange(newPage, finalNewPageSize);
        }
    };
    // 处理每页条数变化（类似 antd）
    const handlePageSizeChange = (newPageSize) => {
        // 计算新的总页数和当前页（确保不超出范围）
        const newTotalPages = Math.max(1, Math.ceil(total / newPageSize));
        const newCurrent = Math.min(finalCurrent, newTotalPages);
        // 更新内部状态（非受控模式）
        if (!isPageSizeControlled) {
            setInternalPageSize(newPageSize);
        }
        if (!isCurrentControlled) {
            setInternalCurrent(newCurrent);
        }
        // 调用回调（类似 antd：onShowSizeChange 优先触发，然后触发 onChange）
        if (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.onShowSizeChange) {
            paginationConfig.onShowSizeChange(newCurrent, newPageSize);
        }
        if (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.onChange) {
            paginationConfig.onChange(newCurrent, newPageSize);
        }
    };
    // 同步受控的 current 和 pageSize（类似 antd）
    useEffect(() => {
        if (isCurrentControlled && (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.current) !== undefined) {
            setInternalCurrent(paginationConfig.current);
        }
    }, [paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.current, isCurrentControlled]);
    useEffect(() => {
        if (isPageSizeControlled && (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.pageSize) !== undefined) {
            setInternalPageSize(paginationConfig.pageSize);
        }
    }, [paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.pageSize, isPageSizeControlled]);
    // 早期返回必须在所有 Hooks 之后
    if (!context) {
        return null;
    }
    // 如果 pagination 为 false，不显示分页器
    if (pagination === false) {
        return null;
    }
    // 从 pagination 配置中获取选项，使用默认值（类似 antd）
    const showTotal = (_h = paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.showTotal) !== null && _h !== void 0 ? _h : true;
    const showSizeChanger = (_j = paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.showSizeChanger) !== null && _j !== void 0 ? _j : true;
    const columns = context.columns;
    const isRowSelectionEnabled = !!context.rowSelection;
    const colSpan = isRowSelectionEnabled ? columns.length + 1 : columns.length;
    return (jsx("tfoot", { className: "cream-table-foot", children: jsx("tr", { children: jsx("td", { colSpan: colSpan, children: jsx("div", { className: "cream-table-foot-content", children: jsx(Pagination, { total: total, current: finalCurrent, pageSize: finalPageSize, showTotal: showTotal, showSizeChanger: showSizeChanger, onChange: (page, newPageSize) => {
                            // 类似 antd：onChange 在页码或 pageSize 改变时都会触发
                            handlePageChange(page, newPageSize);
                        }, onPageSizeChange: newPageSize => {
                            // 类似 antd：onShowSizeChange 专门处理 pageSize 变化
                            handlePageSizeChange(newPageSize);
                        } }) }) }) }) }));
};

// hooks/useVirtualScroll.ts
function useVirtualScroll({ data, estimateSize, containerHeight, overscan = 3, onScroll, }) {
    const [scrollTop, setScrollTop] = useState(0);
    // 使用 useRef 存储状态
    const containerRef = useRef(null);
    const scrollTopRef = useRef(0);
    const rafRef = useRef(null);
    // 查找起始索引（固定高度，直接计算）
    const findStartIndex = useCallback((scrollTop) => {
        // 固定高度时，直接通过除法计算起始索引
        const index = Math.floor(scrollTop / estimateSize);
        return Math.max(0, index - 1); // 稍微提前一点开始渲染
    }, [estimateSize]);
    // ==================== 计算虚拟列表项（固定高度） ====================
    const { startIndex, endIndex, startOffset, virtualItems, totalHeight } = useMemo(() => {
        // 计算总高度（固定高度，直接计算）
        const totalHeight = data.length * estimateSize;
        // 计算起始索引
        const rawStartIndex = findStartIndex(scrollTop);
        const actualStartIndex = Math.max(0, rawStartIndex - overscan);
        // 计算可见项数量
        const actualContainerHeight = Math.max(containerHeight, 1);
        const visibleCount = Math.ceil(actualContainerHeight / estimateSize);
        // 计算结束索引
        const actualEndIndex = Math.min(actualStartIndex + visibleCount + overscan * 2, // 前后都要有 overscan
        data.length);
        // 获取虚拟列表项
        const virtualItems = data.slice(actualStartIndex, actualEndIndex);
        // 计算起始偏移量（固定高度，直接计算）
        const startOffset = actualStartIndex * estimateSize;
        return {
            startIndex: actualStartIndex,
            endIndex: actualEndIndex,
            startOffset,
            virtualItems,
            totalHeight,
        };
    }, [
        scrollTop,
        data,
        estimateSize,
        containerHeight,
        overscan,
        findStartIndex,
    ]);
    // ==================== 测量元素（固定高度，仅用于 ref 绑定） ====================
    // 固定高度模式下，不需要实际测量，只需要提供 ref 绑定函数
    const measureElement = useCallback((node, index) => {
        // 固定高度模式下，不需要做任何处理
        // 保留此函数是为了保持 API 兼容性
    }, []);
    // ==================== 6. 滚动处理（使用 requestAnimationFrame 节流） ====================
    const handleScroll = useCallback((e) => {
        const top = e.currentTarget.scrollTop;
        scrollTopRef.current = top;
        // 使用 requestAnimationFrame 节流
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(() => {
            setScrollTop(top);
            onScroll === null || onScroll === void 0 ? void 0 : onScroll(top);
        });
    }, [onScroll]);
    // ==================== 7. 设置滚动位置 ====================
    const setScrollTopValue = useCallback((top) => {
        scrollTopRef.current = top;
        setScrollTop(top);
        onScroll === null || onScroll === void 0 ? void 0 : onScroll(top);
        if (containerRef.current) {
            containerRef.current.scrollTop = top;
        }
    }, [onScroll]);
    // ==================== 清理 ====================
    useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);
    return {
        virtualItems,
        totalHeight,
        startOffset,
        containerRef,
        scrollTop,
        setScrollTop: setScrollTopValue,
        measureElement, // 保留以保持 API 兼容性，但固定高度模式下不需要实际测量
        startIndex,
        endIndex,
        handleScroll,
    };
}

const TableVirtualBody = () => {
    const context = useContext(TableContext);
    // 必须无条件地调用所有 Hook
    const containerRef = useRef(null);
    // 无条件地调用 useCallback
    const getCellValue = useCallback((record, column) => {
        if (column.dataIndex) {
            if (Array.isArray(column.dataIndex)) {
                return column.dataIndex.reduce((obj, key) => obj === null || obj === void 0 ? void 0 : obj[key], record);
            }
            else {
                return record[column.dataIndex];
            }
        }
        return record[column.key];
    }, []);
    // 检查是否有有效的 context
    const hasValidContext = !!context;
    const columns = (context === null || context === void 0 ? void 0 : context.columns) || [];
    const paginatedData = (context === null || context === void 0 ? void 0 : context.paginatedData) || [];
    const virtual = context === null || context === void 0 ? void 0 : context.virtual;
    const rowSelection = context === null || context === void 0 ? void 0 : context.rowSelection;
    const isRowSelected = context === null || context === void 0 ? void 0 : context.isRowSelected;
    const toggleRowSelection = context === null || context === void 0 ? void 0 : context.toggleRowSelection;
    const isRowSelectionEnabled = !!rowSelection;
    const selectionType = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.type) || 'checkbox';
    const columnWidth = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.columnWidth) || 80;
    const getCheckboxProps = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.getCheckboxProps;
    // 解析虚拟滚动配置
    const virtualConfig = useMemo(() => {
        if (!virtual)
            return { enabled: false };
        if (typeof virtual === 'boolean') {
            return {
                enabled: true,
                rowHeight: 50,
                containerHeight: 400,
                overscan: 5,
            };
        }
        return {
            enabled: true,
            rowHeight: 50,
            containerHeight: 400,
            overscan: 5,
            ...virtual,
        };
    }, [virtual]);
    // 使用虚拟滚动 Hook - 必须无条件调用，但可以根据条件传入数据
    const { virtualItems, totalHeight, startOffset, setScrollTop, measureElement, startIndex, } = useVirtualScroll({
        data: virtualConfig.enabled ? paginatedData : [],
        estimateSize: virtualConfig.enabled && 'rowHeight' in virtualConfig
            ? virtualConfig.rowHeight || 50
            : 50,
        containerHeight: virtualConfig.enabled && 'containerHeight' in virtualConfig
            ? virtualConfig.containerHeight || 400
            : 400,
        overscan: virtualConfig.enabled && 'overscan' in virtualConfig
            ? virtualConfig.overscan
            : 2,
    });
    // 处理滚动
    const handleScroll = useCallback((e) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, [setScrollTop]);
    // 渲染选择列单元格（必须在早期返回之前定义）
    const renderSelectionCell = useCallback((record) => {
        if (!isRowSelectionEnabled) {
            return null;
        }
        const selected = (isRowSelected === null || isRowSelected === void 0 ? void 0 : isRowSelected(record)) || false;
        const checkboxProps = (getCheckboxProps === null || getCheckboxProps === void 0 ? void 0 : getCheckboxProps(record)) || {};
        const disabled = checkboxProps.disabled || false;
        const handleClick = (e) => {
            e.stopPropagation();
            if (!disabled && toggleRowSelection) {
                toggleRowSelection(record);
            }
        };
        return (jsx("td", { className: "cream-table-selection-column", style: {
                width: `${columnWidth}px`,
                minWidth: `${columnWidth}px`,
                maxWidth: `${columnWidth}px`,
                textAlign: 'center',
                padding: '0.75rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                position: 'relative',
            }, onClick: handleClick, onMouseDown: e => {
                if (!disabled) {
                    e.preventDefault(); // 防止拖拽选中文本
                }
            }, children: jsx("div", { style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                    minHeight: '40px',
                    minWidth: '40px',
                }, children: selectionType === 'checkbox' ? (selected ? (jsx(Icon, { icon: faSquareCheck, style: {
                        color: 'var(--color-primary-500)',
                        fontSize: '20px',
                    } })) : (jsx(Icon, { icon: faSquare, style: { color: '#d9d9d9', fontSize: '20px' } }))) : selected ? (jsx(Icon, { icon: faCircleCheck, style: { color: 'var(--color-primary-500)', fontSize: '20px' } })) : (jsx(Icon, { icon: faCircle, style: { color: '#d9d9d9', fontSize: '20px' } })) }) }));
    }, [
        isRowSelectionEnabled,
        selectionType,
        columnWidth,
        isRowSelected,
        toggleRowSelection,
        getCheckboxProps,
    ]);
    // 早期返回必须在所有 Hooks 之后
    if (!hasValidContext) {
        return null;
    }
    // 计算 colSpan（包括选择列）
    const colSpan = isRowSelectionEnabled ? columns.length + 1 : columns.length;
    if (!paginatedData || paginatedData.length === 0) {
        return (jsx("tbody", { children: jsx("tr", { children: jsx("td", { colSpan: colSpan, style: { textAlign: 'center' }, children: "\u6682\u65E0\u6570\u636E" }) }) }));
    }
    return (jsx("tbody", { children: jsx("tr", { className: "cream-table-virtual-row", children: jsx("td", { colSpan: colSpan, style: {
                    padding: 0,
                    border: 0,
                    height: virtualConfig.enabled && 'containerHeight' in virtualConfig
                        ? virtualConfig.containerHeight || '100%'
                        : '100%',
                }, children: jsxs("div", { ref: containerRef, className: "cream-table-virtual-container", style: {
                        height: '100%',
                        overflow: 'auto',
                        position: 'relative',
                    }, onScroll: handleScroll, children: [jsx("div", { style: { height: totalHeight } }), jsx("div", { style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                transform: `translateY(${startOffset}px)`,
                            }, children: jsx("table", { className: "cream-table", style: { width: '100%', scrollbarWidth: 'none' }, children: jsx("tbody", { children: virtualItems.map((item, idx) => {
                                        const actualIndex = startIndex + idx;
                                        const selected = (isRowSelected === null || isRowSelected === void 0 ? void 0 : isRowSelected(item)) || false;
                                        return (jsxs("tr", { ref: node => measureElement(node, actualIndex), "data-index": actualIndex, className: selected ? 'selected' : undefined, children: [renderSelectionCell(item), columns.map(column => {
                                                    const alignClass = column.align
                                                        ? `text-${column.align === 'center' ? 'center' : column.align === 'right' ? 'right' : 'left'}`
                                                        : 'text-left';
                                                    const fixedClass = column.fixed
                                                        ? `fixed-${column.fixed}`
                                                        : '';
                                                    const className = [alignClass, fixedClass]
                                                        .filter(Boolean)
                                                        .join(' ');
                                                    const cellValue = getCellValue(item, column);
                                                    const cellContent = column.render
                                                        ? column.render(cellValue, item, actualIndex)
                                                        : cellValue;
                                                    return (jsx("td", { className: className || undefined, style: column.width
                                                            ? { width: column.width }
                                                            : undefined, children: cellContent }, column.key));
                                                })] }, item.key || actualIndex));
                                    }) }) }) })] }) }) }) }));
};

// 创建 Context
const TableContext = createContext(undefined);
const TableContainer = (props) => {
    const { columns, dataSource, pagination, virtual, rowSelection } = props;
    const [tableData, setTableData] = useState(dataSource !== null && dataSource !== void 0 ? dataSource : []);
    const [paginatedData, setPaginatedData] = useState(dataSource !== null && dataSource !== void 0 ? dataSource : []);
    // 同步 dataSource 变化
    useEffect(() => {
        if (dataSource !== undefined) {
            setTableData(dataSource);
        }
    }, [dataSource]);
    // 容器和表头的 ref
    const containerRef = useRef(null); //容器ref
    const tableRef = useRef(null);
    const [containerHeight, setContainerHeight] = useState(400);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [footerHeight, setFooterHeight] = useState(0);
    // 计算实际可视区域高度（容器高度 - 表头高度 - 表尾高度）
    const calculateVisibleHeight = useCallback(() => {
        if (!containerRef.current || !tableRef.current)
            return;
        const container = containerRef.current;
        const table = tableRef.current;
        const thead = table.querySelector('thead');
        const tfoot = table.querySelector('tfoot');
        const totalHeight = container.clientHeight;
        const header = (thead === null || thead === void 0 ? void 0 : thead.offsetHeight) || 0;
        const footer = (tfoot === null || tfoot === void 0 ? void 0 : tfoot.offsetHeight) || 0;
        const visibleHeight = Math.max(0, totalHeight - header - footer);
        setContainerHeight(visibleHeight);
        setHeaderHeight(header);
        setFooterHeight(footer);
        return visibleHeight;
    }, []);
    // 在布局完成后计算高度
    useLayoutEffect(() => {
        if (!virtual)
            return;
        // 延迟一帧确保 DOM 已渲染
        requestAnimationFrame(() => {
            calculateVisibleHeight();
        });
    }, [virtual, calculateVisibleHeight, columns]);
    // 监听容器尺寸变化
    useEffect(() => {
        if (!virtual || !containerRef.current)
            return;
        const resizeObserver = new ResizeObserver(() => {
            calculateVisibleHeight();
        });
        resizeObserver.observe(containerRef.current);
        return () => {
            resizeObserver.disconnect();
        };
    }, [virtual, calculateVisibleHeight]);
    // 解析虚拟滚动配置
    const virtualConfig = useMemo(() => {
        var _a;
        // 如果用户明确禁用，则禁用
        if (!virtual)
            return { enabled: false };
        // 计算可视区域高度（容器高度 - 表头高度 - 表尾高度）
        const visibleHeight = Math.max(0, containerHeight - headerHeight - footerHeight);
        const effectiveHeight = visibleHeight > 0 ? visibleHeight : 400; // 如果还没计算出来，使用默认值
        const defaultConfig = {
            enabled: true,
            rowHeight: 50,
            containerHeight: effectiveHeight,
            overscan: 2,
        };
        if (typeof virtual === 'boolean') {
            return defaultConfig;
        }
        return {
            ...defaultConfig,
            ...virtual,
            containerHeight: (_a = virtual.containerHeight) !== null && _a !== void 0 ? _a : effectiveHeight,
        };
    }, [virtual, containerHeight, headerHeight, footerHeight]);
    // 使用虚拟滚动 Hook（固定高度模式）
    const virtualScroll = useVirtualScroll({
        data: paginatedData,
        estimateSize: virtualConfig.rowHeight || 50, // 固定行高
        containerHeight: virtualConfig.containerHeight || 400, // 使用计算出的容器高度
        overscan: virtualConfig.overscan || 2,
    });
    // 计算 total
    const total = tableData.length;
    // ==================== 行选择相关逻辑 ====================
    const isRowSelectionEnabled = !!rowSelection;
    const selectionType = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.type) || 'checkbox';
    const isControlled = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys) !== undefined;
    // 选中状态管理
    const [internalSelectedRowKeys, setInternalSelectedRowKeys] = useState((rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.defaultSelectedRowKeys) || []);
    const selectedRowKeys = isControlled
        ? rowSelection.selectedRowKeys
        : internalSelectedRowKeys;
    const setSelectedRowKeys = useCallback((keys) => {
        if (!isControlled) {
            setInternalSelectedRowKeys(keys);
        }
        // 获取选中的行数据
        const selectedRows = tableData.filter(item => {
            const key = item.key;
            return keys.includes(key);
        });
        // 触发 onChange 回调
        if (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onChange) {
            rowSelection.onChange(keys, selectedRows);
        }
    }, [isControlled, tableData, rowSelection]);
    // 判断某行是否被选中
    const isRowSelected = useCallback((record) => {
        const key = record.key;
        return selectedRowKeys.includes(key);
    }, [selectedRowKeys]);
    // 切换某行的选中状态
    const toggleRowSelection = useCallback((record, selected) => {
        const key = record.key;
        const currentSelected = isRowSelected(record);
        const newSelected = selected !== undefined ? selected : !currentSelected;
        let newSelectedRowKeys;
        if (selectionType === 'radio') {
            // 单选模式：只能选中一个
            newSelectedRowKeys = newSelected ? [key] : [];
        }
        else {
            // 复选模式
            if (newSelected) {
                newSelectedRowKeys = [...selectedRowKeys, key];
            }
            else {
                newSelectedRowKeys = selectedRowKeys.filter(k => k !== key);
            }
        }
        setSelectedRowKeys(newSelectedRowKeys);
        // 触发 onSelect 回调
        if (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onSelect) {
            const selectedRows = tableData.filter(item => {
                const itemKey = item.key;
                return newSelectedRowKeys.includes(itemKey);
            });
            rowSelection.onSelect(record, newSelected, selectedRows);
        }
    }, [
        selectedRowKeys,
        selectionType,
        tableData,
        rowSelection,
        isRowSelected,
        setSelectedRowKeys,
    ]);
    // 切换所有行的选中状态
    const toggleAllRowsSelection = useCallback((selected) => {
        if (selectionType === 'radio') {
            // 单选模式不支持全选
            return;
        }
        const currentData = paginatedData;
        const allKeys = currentData.map(item => item.key);
        const allSelected = allKeys.every(key => selectedRowKeys.includes(key));
        const newSelected = selected !== undefined ? selected : !allSelected;
        let newSelectedRowKeys;
        if (newSelected) {
            // 合并当前选中和当前页的所有 key
            newSelectedRowKeys = Array.from(new Set([...selectedRowKeys, ...allKeys]));
        }
        else {
            // 移除当前页的所有 key
            newSelectedRowKeys = selectedRowKeys.filter(key => !allKeys.includes(key));
        }
        const changeRows = currentData.filter(item => {
            const key = item.key;
            return newSelected
                ? !selectedRowKeys.includes(key)
                : selectedRowKeys.includes(key);
        });
        setSelectedRowKeys(newSelectedRowKeys);
        // 触发 onSelectAll 回调
        if (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onSelectAll) {
            const selectedRows = tableData.filter(item => {
                const itemKey = item.key;
                return newSelectedRowKeys.includes(itemKey);
            });
            rowSelection.onSelectAll(newSelected, selectedRows, changeRows);
        }
    }, [
        selectedRowKeys,
        paginatedData,
        selectionType,
        tableData,
        rowSelection,
        setSelectedRowKeys,
    ]);
    // 判断是否所有行都被选中
    const isAllRowsSelected = useCallback(() => {
        if (selectionType === 'radio') {
            return false;
        }
        const currentData = paginatedData;
        if (currentData.length === 0)
            return false;
        return currentData.every(item => {
            const key = item.key;
            return selectedRowKeys.includes(key);
        });
    }, [paginatedData, selectedRowKeys, selectionType]);
    // 判断是否部分行被选中
    const isSomeRowsSelected = useCallback(() => {
        if (selectionType === 'radio') {
            return false;
        }
        const currentData = paginatedData;
        if (currentData.length === 0)
            return false;
        const selectedCount = currentData.filter(item => {
            const key = item.key;
            return selectedRowKeys.includes(key);
        }).length;
        return selectedCount > 0 && selectedCount < currentData.length;
    }, [paginatedData, selectedRowKeys, selectionType]);
    // 同步受控的 selectedRowKeys
    useEffect(() => {
        if (isControlled && (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys)) {
            setInternalSelectedRowKeys(rowSelection.selectedRowKeys);
        }
    }, [isControlled, rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys]);
    // 通过 context 传递数据
    const contextValue = {
        columns,
        tableData,
        setTableData,
        total,
        paginatedData,
        setPaginatedData,
        pagination,
        virtual: virtualConfig,
        // 虚拟滚动相关
        virtualItems: virtualScroll.virtualItems,
        totalHeight: virtualScroll.totalHeight,
        startOffset: virtualScroll.startOffset,
        measureRowElement: virtualScroll.measureElement,
        containerRef: virtualScroll.containerRef,
        handleScroll: virtualScroll.handleScroll,
        // 行选择相关
        rowSelection: isRowSelectionEnabled ? rowSelection : undefined,
        selectedRowKeys,
        setSelectedRowKeys,
        isRowSelected,
        toggleRowSelection,
        toggleAllRowsSelection,
        isAllRowsSelected,
        isSomeRowsSelected,
    };
    const tableClassName = 'cream-table';
    return (jsx(TableContext.Provider, { value: contextValue, children: jsx("div", { ref: containerRef, className: "cream-table-container", style: virtualConfig.enabled ? { overflow: 'hidden' } : undefined, children: jsxs("table", { ref: tableRef, className: tableClassName, children: [jsx(TableHeader, {}), virtualConfig.enabled ? jsx(TableVirtualBody, {}) : jsx(TableBody, {}), jsx(TableFoot, {})] }) }) }));
};

// name: 字段名称，对应表单控件的唯一标识
// value: 字段当前值，初始为空字符串
// rules: 验证规则数组，类型为any[]以便灵活扩展
// isValid: 字段验证状态，布尔类型
function fieldsReducer(state, action) {
    switch (action.type) {
        case 'addField':
            return {
                ...state,
                [action.name]: { ...action.value },
            };
        case 'updateField':
            return {
                ...state,
                [action.name]: { ...state[action.name], ...action.value },
            };
        case 'updateValidateResult':
            return {
                ...state,
                [action.name]: { ...state[action.name], ...action.value },
            };
        default:
            return state;
    }
}
function useStore(initialValues) {
    const [form, setForm] = useState({
        isValid: true,
    });
    //   创建Reducer:返回更新的数据和dispatch函数
    const [fields, dispatchFields] = useReducer(fieldsReducer, {});
    const getFieldValue = (name) => {
        var _a;
        return (_a = fields[name]) === null || _a === void 0 ? void 0 : _a.value;
    };
    // 因为descriptor的类型是{ [x: string]: CustomRule[]; }，所以需要转换为{ [x: string]: RuleItem[]; }
    const transformedRules = function (rules) {
        // 如果 rules 为空或 undefined，返回空数组
        if (!rules || rules.length === 0) {
            return [];
        }
        const result = []; // 结果数组
        rules.forEach(rule => {
            // 过滤掉 null 或 undefined 的规则
            if (rule == null) {
                return;
            }
            if (typeof rule === 'function') {
                const customRule = rule({ getFieldValue });
                // 如果转换后的规则是 null 或 undefined，跳过
                if (customRule != null) {
                    result.push(customRule);
                }
            }
            else {
                // 如果规则是 RuleItem，直接添加
                result.push(rule);
            }
        }); // 遍历规则数组，如果规则是函数，则转换为 RuleItem，否则直接添加到结果数组
        return result;
    };
    const validateField = async (name) => {
        const field = fields[name];
        if (!field)
            return;
        const { value, rules } = field;
        const valueMap = { [name]: value };
        // 转换规则并包装成 descriptor 对象格式
        // 注意！！！而 Schema 需要对象格式的 descriptor
        const transformedRuleItems = transformedRules(rules);
        const descriptor = { [name]: transformedRuleItems };
        // 创建 Schema 实例并验证
        const validator = new Schema(descriptor);
        let isValid = true;
        let errors = [];
        try {
            await validator.validate(valueMap);
            isValid = true;
            errors = [];
        }
        catch (e) {
            isValid = false;
            // async-validator 的错误对象有 errors 属性
            errors = e.errors || [];
        }
        dispatchFields({
            type: 'updateValidateResult',
            name,
            value: { isValid, errors },
        });
    };
    // 整体表单验证函数
    const validateAllFields = async () => {
        let fieldErrors = {};
        // 获取值和规则，我们使用lodash-es的mapValues方法
        // 注意：这里直接使用 fields，因为 useReducer 返回的 fields 总是最新的
        const valueMap = mapValues(fields, field => field.value);
        // 进行转换：将CustomRule[]转换为RuleItem[]
        // 只处理有规则的字段
        const rulesMap = {};
        each(fields, (field, name) => {
            if (field.rules && field.rules.length > 0) {
                const transformedRuleItems = transformedRules(field.rules);
                if (transformedRuleItems.length > 0) {
                    rulesMap[name] = transformedRuleItems;
                }
            }
        });
        // 如果没有需要验证的字段，直接返回
        if (Object.keys(rulesMap).length === 0) {
            return {
                isValid: true,
                errors: {},
                values: valueMap,
            };
        }
        // 创建Schema实例进行验证
        const validator = new Schema(rulesMap);
        // 设置表单状态为开始验证
        // 使用函数式更新，避免闭包问题
        setForm(prevForm => ({ ...prevForm, isSubmitting: true }));
        try {
            await validator.validate(valueMap);
            // 验证通过，清除所有字段的错误
            each(fields, (field, name) => {
                if (field.rules && field.rules.length > 0) {
                    dispatchFields({
                        type: 'updateField',
                        name,
                        value: {
                            isValid: true,
                            errors: [],
                        },
                    });
                }
            });
            // 没有错误
            fieldErrors = {};
        }
        catch (e) {
            // async-validator 的错误对象格式
            const errorFields = e.fields || {};
            fieldErrors = errorFields;
            // 遍历所有字段，更新错误状态
            each(fields, (field, name) => {
                const fieldErrorList = errorFields[name] || [];
                if (fieldErrorList.length > 0) {
                    dispatchFields({
                        type: 'updateField',
                        name,
                        value: {
                            isValid: false,
                            errors: fieldErrorList,
                        },
                    });
                }
                else if (field.rules && field.rules.length > 0) {
                    dispatchFields({
                        type: 'updateField',
                        name,
                        value: {
                            isValid: true,
                            errors: [],
                        },
                    });
                }
            });
        }
        finally {
            // 基于 fieldErrors 计算最终是否有效
            const finalIsValid = Object.keys(fieldErrors).length === 0;
            // 确保使用函数式更新，避免状态合并问题
            setForm(prevForm => ({
                ...prevForm,
                isSubmitting: false,
                isValid: finalIsValid,
            }));
        }
        // 返回信息
        return {
            isValid: Object.keys(fieldErrors).length === 0, // 基于错误计算
            errors: fieldErrors,
            values: valueMap,
        };
    };
    // 获取所有值
    const getAllFields = () => {
        return mapValues(fields, field => field.value);
    };
    // 设置值
    const setFieldValue = (name, value) => {
        if (fields[name]) {
            dispatchFields({
                type: 'updateField',
                name,
                value,
            });
        }
    };
    // 重置字段值
    const resetFields = () => {
        // 重置所有字段的值和错误状态
        each(fields, (field, name) => {
            // 如果有 initialValues，使用 initialValues 中的值，否则使用空值
            const resetValue = initialValues && initialValues[name] !== undefined
                ? initialValues[name]
                : '';
            dispatchFields({
                type: 'updateField',
                name,
                value: {
                    value: resetValue,
                    isValid: true,
                    errors: [],
                },
            });
        });
        // 重置表单状态
        setForm({ isValid: true, isSubmitting: false });
    };
    return {
        form,
        setForm,
        fields,
        dispatchFields,
        validateField,
        getFieldValue,
        validateAllFields,
        resetFields,
        getAllFields,
        setFieldValue,
    };
}

const FormContext = createContext({
    dispatchFields: () => { },
    fields: {},
    validateField: async (name) => { },
    initialValues: {},
});
// 注意这里的类型要使用泛型来定义，因为ref是React.RefObject<HTMLFormElement>类型
const Form = forwardRef((props, ref) => {
    const { name = 'form', children, className, style, initialValues, onFinish, onFinishFailed, } = props;
    // 初始化store
    const { form, setForm, fields, dispatchFields, ...restProps } = useStore(initialValues);
    const { validateField, validateAllFields } = restProps;
    // 创建内部 ref 用于 DOM 元素
    const formRef = useRef(null);
    // 使用 useImperativeHandle 暴露表单方法给外部 ref
    useImperativeHandle(ref, () => ({
        ...restProps,
        setForm, // 添加 setForm，因为 FormRefType 需要它
    }));
    // filedItem挂载之后需要修改store的状态，使用dispatchFields进行修改
    // 父传子显然是行不通的
    // 我们采用context进行状态管理
    const contextValue = {
        dispatchFields,
        fields,
        validateField,
        initialValues,
    };
    async function onFormSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        // 执行表单验证
        const { isValid, errors, values } = await validateAllFields();
        // 根据验证结果调用相应的回调
        if (isValid) {
            if (onFinish) {
                onFinish(values);
            }
        }
        else {
            if (onFinishFailed) {
                onFinishFailed(values, errors);
            }
        }
    }
    let childrenNode = null;
    if (typeof children === 'function') {
        childrenNode = children(form);
    }
    else {
        childrenNode = children;
    }
    return (jsx("form", { className: "cream-form", style: style, onSubmit: onFormSubmit, ref: formRef, children: jsx(FormContext.Provider, { value: contextValue, children: childrenNode }) }));
});

const FormItem = props => {
    var _a, _b;
    const { name = 'form-item', valuePropsName = 'value', trigger = 'onChange', getValueFormEvent = (e) => {
        return e.target.value;
    }, validateTrigger = 'onBlur', rules = [], children, label, error, className, } = props;
    const rowClassName = classNames('cream-row', label ? '' : 'cream-row-no-label', className);
    // 构造标签样式
    const labelClassName = classNames('cream-form-item-label', label ? 'cream-form-item-required' : '', className);
    // 构造控件样式
    const controlClassName = classNames('cream-form-item', error ? 'cream-form-item-has-error' : '', className);
    // 从context中获取dispatchFields和fields
    const { dispatchFields, fields, initialValues, validateField } = useContext(FormContext);
    // 通过name获取fields中的字段-就是value
    const field = fields[name || 'form'];
    // 使用空字符串作为默认值，避免 uncontrolled -> controlled 警告
    const value = (_a = field === null || field === void 0 ? void 0 : field.value) !== null && _a !== void 0 ? _a : '';
    const errors = (_b = field === null || field === void 0 ? void 0 : field.errors) !== null && _b !== void 0 ? _b : [];
    const onValueUpdate = (e) => {
        const value = getValueFormEvent(e);
        // console.log('newValue', value);
        // console.log('newValue e.target', e.target);
        dispatchFields({
            type: 'updateField',
            name: name || 'form',
            value: {
                value,
            },
        });
    };
    // 1.手动创建一个列表,需要有value和onChange属性
    const propsList = {};
    // Q:需要适应不同的事件和value属性名称
    // 需要验证children类型并显示警告
    // 目前仅支持单一表单元素作为children
    // 使用默认值确保这些属性不为 undefined
    const finalValuePropsName = valuePropsName || 'value';
    const finalTrigger = trigger || 'onChange';
    propsList[finalValuePropsName] = value;
    propsList[finalTrigger] = onValueUpdate;
    // 2.我们要获取children数组的第一个元素
    const childList = React.Children.toArray(children);
    // 对childList进行判断，只有一个元素才行
    if (childList.length !== 1) {
        console.warn('FormItem组件只能有一个子元素');
    }
    const child = childList[0];
    // 默认在onBlur事件触发验证
    // 可通过validateTrigger属性自定义触发事件
    // 验证规则rules作为可选属性传递给FormItem
    // 使用默认值确保 validateTrigger 不为 undefined
    const finalValidateTrigger = validateTrigger || 'onBlur';
    if (rules && rules.length > 0) {
        const existingHandler = child.props[finalValidateTrigger];
        // 合并事件处理函数，避免覆盖原有的处理函数
        propsList[finalValidateTrigger] = async (e) => {
            // 先执行原有的事件处理函数
            if (existingHandler) {
                existingHandler(e);
            }
            // 然后执行验证
            await validateField(name);
        };
    }
    // 3.使用cloneElement,混合这个child以及手动的属性列表
    // 过滤掉 undefined 值，避免 React 警告
    const filteredPropsList = Object.fromEntries(Object.entries(propsList).filter(([_, value]) => value !== undefined));
    const clonedChild = React.cloneElement(child, {
        ...child.props,
        ...filteredPropsList,
        id: name,
    });
    // 在挂载的时候挂载一次form-item
    useEffect(() => {
        if (!name)
            return;
        // 检查字段是否已存在，避免重复初始化
        // if (fields[name]) return;
        // 从 initialValues 中获取初始值
        let value = '';
        if (initialValues && initialValues[name]) {
            value = initialValues[name];
        }
        dispatchFields({
            type: 'addField',
            name,
            // 传入字段基本信息：name、label、rules等
            value: {
                label,
                name,
                value,
                rules: rules,
                isValid: true,
                errors: [],
            },
        });
        // 只在挂载时执行一次，所以依赖数组为空
        // 注意：由于闭包，这里读取的 initialValues 和 name 是挂载时的值
        // 如果 initialValues 在挂载时已经传入，应该能正常工作
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (jsxs("div", { className: rowClassName, children: [label && (jsx("div", { className: labelClassName, children: jsx("label", { htmlFor: name, children: label }) })), jsxs("div", { className: controlClassName, children: [jsx("div", { className: "cream-input-wrapper", children: clonedChild }), errors.length > 0 ? (jsx("div", { className: "cream-form-item-explain", children: errors[0].message })) : (error && jsx("div", { className: "cream-form-item-explain", children: error }))] })] }));
};

// 组件需求：
// 元素多样性：支持Input、Radio、Checkbox、Select等多种表单元素类型
// 布局灵活性：可自定义表单元素的排列方式，支持无label或添加辅助文本
// 提交区域定制：完全自定义提交区域的按钮样式、文本和排列方式
// 单个元素验证：默认在blur事件触发，可配置为input事件实时验证
// 全局验证：点击提交按钮时触发所有表单元素的验证
// 验证规则
// 内置规则：支持非空检查、字符串类型验证、长度限制等常见规则
// 自定义规则：可实现跨字段验证（如密码一致性检查）
// 异步验证：支持发送请求后根据返回结果进行验证
// 多规则组合：单个字段可配置多条验证规则
// 重置功能：支持一键重置所有表单元素到初始状态
// 组件结构设计：
// 最简单的是使用json进行配置，每个表单元素对应一个json对象，包含类型、名称、标签、验证规则等信息。
// 缺点：不够语义化，布局灵活性差，组件属性扩展困难
// 所以使用语义化方案：
// <Form>
//   <FormItem name="username" label="用户名">
//     <Input />
//   </FormItem>
//   <FormItem name="gender" label="性别">
//     <RadioGroup>
//       <Radio value="male">男</Radio>
//       <Radio value="female">女</Radio>
//     </RadioGroup>
//   </FormItem>
//   <FormItem name="hobbies" label="爱好">
//     <CheckboxGroup>
//       <Checkbox value="reading">阅读</Checkbox>
//       <Checkbox value="travel">旅行</Checkbox>
//       <Checkbox value="sports">运动</Checkbox>
//     </CheckboxGroup>
//   </FormItem>
//   <FormItem name="city" label="城市">
//     <Select>
//       <SelectOption value="beijing">北京</SelectOption>
//       <SelectOption value="shanghai">上海</SelectOption>
//       <SelectOption value="guangzhou">广州</SelectOption>
//     </Select>
//    <FormItem/>
// </Form>
// 开发的步骤：
// 实现基础布局和静态展示
// 添加数据初始化和更新功能
// 实现验证功能（包括时机和规则）
// 处理后续衍生需求
// 关于数据交互：
// 表单数据在父子组件间的流转需要解决三个关键问题：
// 表单值存储位置
// 单个输入项的验证触发机制
// 整体表单的验证触发方式
// 方法1：
// 值存储：采用受控组件模式，每个Item组件内部使用useState管理value
// 验证机制：
// 每个Item内部实现validateInput函数
// 在blur等特定时机触发验证
// 验证时结合当前value和rules属性进行校验
// 但是：Form组件无法通过ref获取children中的Item实例
// 无法在onSubmit时调用所有Item的validateInput函数
// 法2：引入中央存储store作为数据中介，统一管理表单状态和验证逻辑
// Form组件初始化store
// store结构：
// {
//     files: {
//         username: {
//             value: '',
//             rules: [],
//             error: '',
//             name: 'username',
//         }
//     },
//     // 整个表单的验证状态
//     form: {
//         isValid: false
//     }
// }
// Item组件注册字段到store
// Item组件在初始化时，将自身的name、value、rules等属性注册到store的files对象中
// 输入的时候，Item组件监听input事件，更新store中对应字段的value
// 在blur事件触发时，调用validateInput函数进行验证，更新error字段
// 两者共享store中的数据和验证方法
// 在Form组件中，监听submit事件，调用validateAllInputs函数进行验证
// 遍历所有fields执行validateInput
// 汇总结果更新form.isValid
// 拓展方法：clearInputs：清空所有字段值
// 自动更新store中的数据：
// 采用受控组件设计模式，每个表单元素的value都由store管理，输入时实时更新store中的数据。
// 因为是受控组件，所以我们是要修改children中的value属性
// 先创建一个新的propsList对象，将value属性和onChange事件添加到其中
// 使用cloneElement进行创建新的元素，将新的propsList合并到其中
// 但是目前还有一个问题，value和onChange事件是手动创建的，需要适应不同的事件和value属性名称
// 我们多添加三个属性：valuePropsName、trgger、getValueFormEvent
// valuePropsName：value属性的名称
// trgger：触发事件
// getValueFormEvent：获取value的函数
// export interface FormItemProps {
//     name?: string;
//     children?: ReactNode;
//     label?: string;
//     required?: boolean;
//     error?: string;
//     labelWidth?: string; // 可选：自定义标签宽度
//     controlWidth?: string; // 可选：自定义控件宽度
//     className?: string;
//     // 添加三个属性来适应不同的事件和value属性名称
//     valuePropsName?: string;
//     trigger?: string;
//     getValueFormEvent?: (e: any) => any;
//   }
// const onValueUpdate = (e: any) => {
//     const value = getValueFormEvent!(e);
//     // console.log('newValue', value);
//     // console.log('newValue e.target', e.target);
//     dispatchFields({
//       type: 'updateField',
//       name: name || 'form',
//       value: {
//         value,
//       },
//     });
//   };
//   // 1.手动创建一个列表,需要有value和onChange属性
//   const propsList: Record<string, any> = {};
//   // Q:需要适应不同的事件和value属性名称
//   // 需要验证children类型并显示警告
//   // 目前仅支持单一表单元素作为children
//   propsList[valuePropsName!] = value;
//   propsList[trigger!] = onValueUpdate;
//   // 2.我们要获取children数组的第一个元素
//   const childList = React.Children.toArray(children);
//   const child = childList[0] as ReactElement<any, string>;
//   // 3.使用cloneElement,混合这个child以及手动的属性列表
//   const clonedChild = React.cloneElement(child, {
//     ...child.props,
//     ...propsList,
//   });
// 初始值：使用initialValue属性来设置初始值
// 单个Form Item添加验证
// 一、验证功能
// 1. 验证的流程
// 核心要素：由规则(rules)和值(value)组成，在特定时机（如onBlur）触发验证逻辑
// 验证场景：
// 单个Item的验证
// 整个Form的验证
// 执行过程：通过规则+值的组合，在特定时机调用验证逻辑处理最终结果
// 2. 第三方库
// 1）第三方库介绍
// 库名称：async-validator（GitHub 7.6k star）
// 特点：
// 被多个主流框架采用（如React、Vue等）
// 提供丰富的预设验证类型
// 支持异步验证
// 基本结构：
// 2）第三方库使用案例
// 预设类型：
// string：字符串类型（默认）
// number：数字类型
// boolean：布尔类型
// regexp：正则表达式
// integer：整数
// float：浮点数
// array：数组
// object：对象
// enum：枚举值
// 验证器创建：
// 验证方式：
// 回调方式：
// Promise方式：
// 规则属性：
// required：是否必填
// pattern：正则匹配
// min/max：范围限制
// len：精确长度
// validator：自定义验证函数
// 多规则验证：
// 二、单个Item验证
// 1. 验证store设计
// 核心字段:
// rules: RuleItem[]; // 验证规则数组，类型为RuleItem[]以便灵活扩展
// isValid: boolean; // 字段验证状态，布尔类型
// errors: ValidateError[]; // 错误信息数组，存储多条验证错误信息
// 2. 验证function编写
// 关键依赖:
// 从async-validator导入Schema、RuleItem和ValidateError类型
// 使用React的useReducer管理表单状态
// 验证流程:
// 创建descriptor对象，将字段名与对应规则关联
// 构建valueMap包含待验证的字段值
// 初始化验证器实例new Schema(descriptor)
// 使用try-catch处理验证结果，更新isValid和errors状态
// const validateField = async (name: string) => {
//     const field = fields[name];
//     if (!field) return;
//     const { value, rules } = field;
//     const descriptor = { [name]: rules };
//     const valueMap = { [name]: value };
//     // 创建 Schema 实例并验证
//     const validator = new Schema(descriptor);
//     let isValid = true;
//     let errors: ValidateError[] = [];
//     try {
//       await validator.validate(valueMap);
//       isValid = true;
//       errors = [];
//     } catch (e: any) {
//       isValid = false;
//       // async-validator 的错误对象有 errors 属性
//       errors = e.errors || [];
//     }
//     dispatchFields({
//       type: 'updateValidateResult',
//       name,
//       value: { isValid, errors },
//     });
//   };
// 3. 验证form编写
// Context设计:
// 通过FormContext传递dispatch、fields和validateField方法
// FormItem组件通过context获取验证能力
// 触发机制:
// 默认在onBlur事件触发验证
// 可通过validateTrigger属性自定义触发事件
// 验证规则rules作为可选属性传递给FormItem
//   // 默认在onBlur事件触发验证
//   // 可通过validateTrigger属性自定义触发事件
//   // 验证规则rules作为可选属性传递给FormItem
//   if (rules && rules.length > 0 && validateTrigger) {
//     const existingHandler = child.props[validateTrigger];
//     // 合并事件处理函数，避免覆盖原有的处理函数
//     propsList[validateTrigger] = async (e: any) => {
//       // 先执行原有的事件处理函数
//       if (existingHandler) {
//         existingHandler(e);
//       }
//       // 然后执行验证
//       await validateField(name!);
//     };
//   }
//   // 默认在onBlur事件触发验证
//   // 可通过validateTrigger属性自定义触发事件
//   // 验证规则rules作为可选属性传递给FormItem
//   if (rules && rules.length > 0) {
//     const trigger = validateTrigger;
//     propsList[trigger] = async () => {
//       await validateField(name!);
//     };
//   }
// // FormItem中的控制属性添加
// if (rules) {
//   controlProps[validateTrigger] = async () => {
//     await validateField(name);
//   };
// }
// "username": {
//     "label": "用户名",
//     "name": "username",
//     "value": "",
//     "rules": [
//       {
//         "required": true,
//         "message": "请输入用户名"
//       }
//     ],
//     "isValid": false,
//     "errors": [
//       {
//         "message": "请输入用户名",
//         "fieldValue": "",
//         "field": "username"
//       }
//     ]
//   },
// 添加错误提示，根据fields中的errors数组，显示错误提示
// {/* <div className={controlClassName}>
// <div className="cream-input-wrapper">{clonedChild}</div>
// {errors.length > 0 ? (
//   <div className="cream-form-item-explain">{errors[0].message}</div>
// ) : (
//   error && <div className="cream-form-item-explain">{error}</div>
// )}
// </div> */}
// 现在的rule是这样的：
// rules={[
//     {
//       required: true,
//       message: '请输入用户名',
//     },
//     {
//       min: 3,
//       message: '用户名长度不能小于3位',
//     },
//     {
//       max: 10,
//       message: '用户名长度不能大于10位',
//     },
//   ]}
// 现在我们发现难以处理跨字段验证，比如密码和确认密码的验证
// const password = getFieldValue('password');
// const passwordConfirm = getFieldValue('passwordConfirm');
// console.log('password', password);
// console.log('passwordConfirm', passwordConfirm);
// if (password !== passwordConfirm) {
//    Promise.reject({ message: '密码和确认密码不一致' });
// }
//  Promise.resolve();
// 我们通过函数参数传递getValue方法，实现跨字段验证
// CustomRuleFunc: 接收包含getFieldValue方法的对象，返回RuleItem
// CustomRule: RuleItem与CustomRuleFunc的联合类型
// 使用混合类型就可以了
// 但是这里要注意，descriptor的类型是{ [x: string]: CustomRule[]; }，所以需要转换为{ [x: string]: RuleItem[]; }
// const transformedRules = function (rules: CustomRule[]): RuleItem[] {
//     const result: RuleItem[] = []; // 结果数组
//     rules.forEach(rule => {
//       if (typeof rule === 'function') {
//         const customRule = rule({ getFieldValue });
//         result.push(customRule);
//       } else {
//         // 如果规则是 RuleItem，直接添加
//         result.push(rule);
//       }
//     }); // 遍历规则数组，如果规则是函数，则转换为 RuleItem，否则直接添加到结果数组
//     return result;
//   };
//     // 转换规则并包装成 descriptor 对象格式
//     // 注意！！！而 Schema 需要对象格式的 descriptor
//     const transformedRuleItems = transformedRules(rules);
//     const descriptor = { [name]: transformedRuleItems };
// 测试：
// ({ getFieldValue }) => {
//     return {
//       validator: (rule: any, value: any, callback: (error?: Error) => void) => {
//         const password = getFieldValue('password');
//         const passwordConfirm = getFieldValue('passwordConfirm');
//         if (password !== passwordConfirm) {
//           Promise.reject({ message: '密码和确认密码不一致' });
//         } else {
//           Promise.resolve();
//         }
//       },
//     };
//   },
// 但是现在又有问题了，我们应该是return一个Promise，但是async-validator的validator不支持直接返回Promise，需要使用回调模式，并在内部处理Promise：
// const customRule: CustomRule[] = [
//     { type: 'string', required: true, message: ' 请再次输入密码' },
//     { min: 3, message: '用户名长度不能小于3位' },
//     { max: 10, message: '用户名长度不能大于10位' },
//     ({ getFieldValue }) => {
//       return {
//         validator: (rule: any, value: any, callback: (error?: Error) => void) => {
//           const password = getFieldValue('password');
//           const passwordConfirm = getFieldValue('passwordConfirm');
//           // 使用 Promise 进行验证，但通过 callback 返回结果
//           // 验证逻辑：如果密码不一致，reject；否则 resolve
//           const validationPromise =
//             password !== passwordConfirm
//               ? Promise.reject({ message: '密码和确认密码不一致' })
//               : Promise.resolve();
//           validationPromise
//             .then(() => {
//               // 验证通过
//               callback();
//             })
//             .catch((error: any) => {
//               // 验证失败
//               const message = error?.message || '验证失败';
//               callback(new Error(message));
//             });
//         },
//       };
//     },
//   ];
// 整个表单的验证：
// 最开始的思路应该是遍历所有FormItem上的validate进行一个验证，但是这样做太费性能，也很麻烦
// 验过程当中，验证值和验证规则是很重要的，那我们就可以拿到所有的验证值和验证规则然后进行整体校验
// 添加张泰：
// isValid: 初始值为true，表示表单验证状态
// isSubmitting: 初始值为false，表示表单提交状态
// errors: 初始为空对象，记录所有字段的错误信息
// 函数validateAllFields：验证整体的白哦单
// 我们需要切换格式：
// 将字段对象从{username: {value: 'abc', rules: [...]}}格式
// 转换为{username: 'abc'}和{username: [...]}两种格式
// 借助工具库：
// 工具库选择:
// 使用lodash-es而非原生lodash
// 原因：lodash-es导出ES模块，打包体积更小
// 核心方法:
// mapValues：对对象每个值进行转换
// 进行验证：
// 使用mapValues生成valueMap
// 使用mapValues生成rules描述符
//  // 获取值和规则，我们使用lodash-es的mapValues方法
//  const valueMap = mapValues(fields, field => field.value);
//  // 进行转换：将CustomRule[]转换为RuleItem[]
//  const rulesMap = mapValues(fields, field => transformedRules(field.rules));
// 创建Schema实例进行验证
// 错误处理：
// 定义ValidateErrorType接口
// export interface FormErrors extends Error {
//     fields?: Record<string, ValidateError>;
//     errors?: ValidateError[];
//   }
// 使用类型断言处理错误对象
// catch (e: any) {
//     isValid = false;
//     const error = e as FormErrors;
//     const errors = error.errors || [];
//     // 开始each进行遍历
//     each(fields, (value, name: string) => {
//       // 如果说errors中存在name，则证明验证没有通过，我们就要进行派发修改fields的状态
//       if (errors[name as any]) {
//         dispatchFields({
//           type: 'updateField',
//           name,
//           value: {
//             isValid: false,
//             errors: errors[name as any],
//           },
//         });
//         // 如果说errors中不存在name以及没有规则，则证明验证通过，我们就要进行派发修改fields的状态
//       }
// dispatch进行更新：
// 字段循环处理：需要循环处理表单中的fields字段，每个字段包含两个关键参数
// 参数说明：
// value：对应字段的当前值
// name：字段的标识名称（字幕中提到的"t"应为name的误读）
// 这里要注意的是，如果errors里面存在name，则证明验证没有通过，我们就要进行派发修改fields的状态
// 如果errors里面不存在name以及没有规则，则证明验证通过，我们就要进行派发修改fields的状态
// try {
//     await validator.validate(valueMap);
//   } catch (e: any) {
//     isValid = false;
//     const error = e as FormErrors;
//     const errors = error.errors || [];
//     // 开始each进行遍历
//     each(fields, (value, name: string) => {
//       // 如果说errors中存在name，则证明验证没有通过，我们就要进行派发修改fields的状态
//       if (errors[name as any]) {
//         dispatchFields({
//           type: 'updateField',
//           name,
//           value: {
//             isValid: false,
//             errors: errors[name as any],
//           },
//         });
//         // 如果说errors中不存在name以及没有规则，则证明验证通过，我们就要进行派发修改fields的状态
//       } else if (!errors[name as any] && !value.rules) {
//         dispatchFields({
//           type: 'updateField',
//           name,
//           value: {
//             isValid: true,
//           },
//         });
//       }
//     });
//   } finally {
//     setForm({ ...form, isSubmitting: false, isValid, errors });
//   }
//   最后记得返回一些参数供后面使用
//   return {
//     isValid,
//     errors,
//     values: valueMap,
//   };
// 1、特定时机表单验证
// 提交时机验证: 在表单提交时(onSubmit事件)进行整体验证，这是最关键的验证时机
// <form className="cream-form" style={style} onSubmit={onFormSubmit}>
// 事件处理: 需要阻止默认事件(e.preventDefault())和停止冒泡(e.stopPropagation())
// 验证流程: 通过validateAllFields方法获取验证结果，包含isValid、errors和values三个关键属性
// async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     e.stopPropagation();
//     const { isValid, errors, values } = await validateAllFields();
//     if (isValid) {
//       onFinish?.(values);
//     } else {
//       onFinishFailed?.(values, errors);
//     }
//   }
// 2、添加特定事件
// 在and里面发现有onFinish和onFinishFailed事件，我们可以在onFormSubmit中调用这两个事件
// onFinish事件:
// 触发条件: 表单验证成功后触发
// 参数: 包含所有表单值的values对象(Record<string, any>)
// 返回值: void
// onFinishFailed事件:
// 触发条件: 表单验证失败后触发
// 参数: values对象和errors对象(Record<string, ValidateError[]>)
// 返回值: void
// 事件调用: 根据validateAllFields返回的isValid值决定触发哪个事件
// 基于前面的表单验证体系，我们已经实现了：
// ✅ 完整的验证规则机制（基础规则 + 自定义函数规则）
// ✅ 灵活的状态管理（单独验证 + 整体验证）
// ✅ 智能的错误处理（onFinish/onFinishFailed回调）
// 但存在一个关键限制：UI 展示被硬编码在组件内部。
// // 当前实现：UI 与逻辑耦合
// <FormItem name="username">
//   <Input /> {/* 只能渲染 Input 组件 */}
// </FormItem>
// ReactProps: 我们可以通过ReactProps来实现UI展示，
// 比如可以实现多平台适配：
// // Web 使用 Input
// <FormItem name="username" render={() => <input />} />
// // 移动端使用 TextInput
// <FormItem name="username" render={() => <TextInput />} />
// // 自定义设计系统
// <FormItem name="username" render={() => <MyCustomInput />} />
// 比如可以实现条件渲染：
// <FormItem
//   name="email"
//   render={(fieldProps) => (
//     fieldProps.value.includes('@gmail.com')
//       ? <GmailInput {...fieldProps} />
//       : <NormalInput {...fieldProps} />
//   )}
// />
// 如何实现呢？就是对children进行处理，如果children是函数，则调用函数，如果children是组件，则渲染组件
// export type ReactProps = (formProps: FormState) => ReactNode;
// let childrenNode = null;
// if (typeof children === 'function') {
//   childrenNode = children(form);
// } else {
//   childrenNode = children;
// }
// 提供实例给外界提供更多的自定义方法
// 设置值
// 重置值
// 1、获取所有值
// 通过之前的mapValues进行设置
// 2、设置值
// 判断是否存在后进行dispatch，type为update value，值为name和value <end>
// 3、重置字段值
// reset fields功能：将字段恢复到初始值
// initialValues参数：
// 类型：key为string，值为any
// 是否必须：否
// 实现恢复功能的方法：传入initialvalues参数，循环对应值进行恢复，判断是否存在并更新值
// // 获取所有值
// const getAllFields = () => {
//     return mapValues(fields, field => field.value);
//   };
//   // 设置值
//   const setFieldValue = (name: string, value: any) => {
//     if (fields[name]) {
//       dispatchFields({
//         type: 'updateField',
//         name,
//         value,
//       });
//     }
//   };
//   // 重置字段值
//   const resetFields = () => {
//     if (initialValues) {
//       each(initialValues, (value, name) => {
//         if (fields[name]) {
//           dispatchFields({
//             type: 'updateField',
//             name,
//             value,
//           });
//         }
//       });
//     }
//     暴露组件实例
//     1. ref属性
//     基本用法: 使用useRef()创建ref对象，通过ref属性绑定到DOM元素后，可通过访问DOM节点
//     2. forwardRef
//     作用: 将ref自动传递通过组件到其子元素的技术
//     实现方式: 使用包裹组件，接收props和ref两个参数
//     // 注意这里的类型要使用泛型来定义，因为ref是React.RefObject<HTMLFormElement>类型
// export const Form: FC<FormProps> = forwardRef<HTMLFormElement, FormProps>(
//     <div>
//     <form
//       className="cream-form"
//       style={style}
//       onSubmit={onFormSubmit}
//       ref={ref}
//     >
//     使用：
//     const ref = useRef<HTMLFormElement>(null);
//   return (
//     <Form style={{ width: '400px' }} {...args} ref={ref}>
//       {formState => {
//         return (
//             <Button
//             btnType={ButtonType.Primary}
//             onClick={() => {
//               console.log(ref.current);
//             }}
//           >
//             获取表单实例
//           </Button>
//         </Form>
//       );
// <form class="cream-form" style="width: 400px;"><div class="cream-row"><div class="cream-form-item-label cream-form-item-required"><label>用户名</label></div><div class="cream-form-item"><div class="cream-input-wrapper"><input type="text" value=""></div><div class="cream-form-item-explain">请输入用户名</div></div></div><div class="cream-row"><div class="cream-form-item-label cream-form-item-required"><label>密码</label></div><div class="cream-form-item"><div class="cream-input-wrapper"><input type="password" value=""></div><div class="cream-form-item-explain">请输入密码</div></div></div><div class="cream-row"><div class="cream-form-item-label cream-form-item-required"><label>确认密码</label></div><div class="cream-form-item"><div class="cream-input-wrapper"><input type="password" value=""></div><div class="cream-form-item-explain"> 请再次输入密码</div></div></div><div class="cream-row cream-row-no-label"><div class="cream-form-item"><div class="cream-input-wrapper"><input type="email" value=""></div></div></div><div class="cream-row cream-row-no-label"><div class="cream-form-item"><div class="cream-input-wrapper"><button class="btn btn-primary btn-normal" aria-disabled="false" aria-busy="false" type="submit" value="">提交失败</button></div></div></div><button class="btn btn-primary btn-normal" aria-disabled="false" aria-busy="false">获取表单实例</button></form>
// 3. useImperativeHandle
// 我们不希望Ref返回的是节点，而是上面的方法(实例)
// 功能: 自定义通过ref暴露给父组件的实例值
// 参数结构:
// 工作原理: 返回的对象会成为ref.current的值
// Form实例方法暴露
// 实现步骤:
// 定义IFormRef类型，使用Omit排除不需要暴露的字段，剩下的就是我们想要的。
// 修改forwardRef泛型为
// 使用useImperativeHandle暴露指定方法
// ...restProps拿出剩下的函数，后面传入对象的时候不必把所有的方法拿出来，只需要传入这个就可以了
// useImperativeHandle进行自定义，传入ref和对应的方法
//   // 使用 useImperativeHandle 暴露表单方法给外部 ref
//   useImperativeHandle(ref, () => ({
//     ...restProps,
//     setForm, // 添加 setForm，因为 FormRefType 需要它
//   }));
//   const { form, setForm, fields, dispatchFields, ...restProps } =
//   useStore(initialValues);
//   export type FormRefType = Omit<
//   ReturnType<typeof useStore>,
//   'form' | 'dispatchFields' | 'fields'
// >;
// 使用的时候要注意，不要把按钮放在FormItem里面，因为FormItem会自动添加一个div包裹，这样会导致按钮无法正常显示
// <div>
// <Button
//   btnType={ButtonType.Primary}
//   type="button"
//   onClick={e => {
//     e.preventDefault();
//     e.stopPropagation();
//     ref.current?.resetFields();
//   }}
// >
//   重置
// </Button>
// </div>
// 总结：
// 一、Form表单开发流程总结
// 1. 分析需求，明确组件结构
// 需求分析：根据业务需求确定组件应具备的功能和结构，明确JSX的编写方式
// 结构设计：规划表单组件的基础布局和父子组件关系
// 2. 完成组件基本的静态展示
// 静态阶段：仅实现UI展示，不包含任何数据交互和功能逻辑
// 开发重点：专注于视觉呈现和基础DOM结构搭建
// 3. 提取store作为中枢及桥梁
// 核心思想：使用提取公共store作为数据中枢
// 架构优势：store同时承担父子组件通信桥梁的角色
// 实现方式：通过useStore自定义hook管理全局状态
// 4. 注册Item到store
// 注册时机：组件mount后通过dispatch执行addField操作
// 注册内容：将label、name、value、rules等表单元信息存入store
// 数据关联：通过useContext获取store中的dispatch和fields
// 5. Item表单更新，更新store中的数据
// 黑魔法技术：使用混入control props
// 更新流程：表单变化→触发onValueUpdate→dispatchupdateValue
// props注入：动态添加value和onChange等控制属性
// 6. 自定义Item的字段及完善默认值
// 扩展机制：在controlProps中添加个性化字段如valuePropName
// 默认值处理：通过initialValues初始化表单字段值
// 子组件校验：确保children是有效的ReactElement且数量唯一
// 7. 添加单个Item的验证
// 验证核心：使用库处理校验逻辑
// 方法封装：validateField函数负责单个字段校验
// 规则转换：通过transfromRules处理自定义校验规则
// 8. 添加表单整体的验证
// 批量验证：validateAllFields收集所有字段值统一校验
// 状态管理：验证时设置isSubmitting为true
// 错误处理：捕获ValidateErrorType并更新错误状态
// 9. 添加组件实例方法
// 方法集合：包括getFieldsValue、setFieldValue、resetFields等
// 暴露技术：组合使用forwardRef和useImperativeHandle
// 类型定义：通过IFormRef类型约束暴露的方法签名
// 10. 内容总结
// 设计原则：先设计后编码，确立核心架构（树根和树干）
// 扩展建议：参考antd API继续完善组件功能
// 后续任务：补充单元测试和不同场景的stories案例
// 开发心得：复杂组件需要良好的前期设计和状态管理方案
const TransForm = Form;
TransForm.FormItem = FormItem;

/**
 * 输入框组件:通过鼠标和键盘输入内容,是最基础的表单组件
 *
 *  ~~~
 * //这样引用
 * import { Input } from 'creamdesign';
 * ~~~
 * 支持所有原生input属性
 */
const Input = ({ size = 'small', disabled = false, icon, prefix, suffix, className, ...rest }) => {
    const isDisabled = disabled;
    const inputClassName = classNames('input', `input-${size}`, {
        'input-disabled': isDisabled,
    }, className);
    //解决state初始值为undefined时，从非受控变为受控会触发警告
    const fixValue = (value) => {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    // 处理value和defaultValue的冲突
    if ('value' in rest) {
        delete rest.defaultValue;
        rest.value = fixValue(rest.value);
    }
    return (jsxs("div", { className: inputClassName, children: [prefix && jsx("div", { className: "input-prefix", children: prefix }), jsx("input", { ...rest, disabled: isDisabled }), icon && jsx(FontAwesomeIcon, { icon: icon, className: "input-icon" }), suffix && jsx("div", { className: "input-suffix", children: suffix })] }));
};

const Progress = props => {
    const { percent, strokeHeight = 15, showText = true, styles, theme = 'primary', minimumDisplayTime = 3000, } = props;
    // 控制进度显示状态
    const [displayPercent, setDisplayPercent] = useState(0);
    const [startTime] = useState(Date.now());
    const [hasStarted, setHasStarted] = useState(false);
    useEffect(() => {
        if (percent > 0 && !hasStarted) {
            setHasStarted(true);
        }
        // 如果进度大于0且还没有开始显示，开始显示
        if (percent > 0 && !hasStarted) {
            setDisplayPercent(10); // 从10%开始显示
            setHasStarted(true);
        }
        // 如果已经开始了，根据真实进度更新显示
        if (hasStarted) {
            const elapsed = Date.now() - startTime;
            const progressRatio = elapsed / minimumDisplayTime;
            if (percent < 100) {
                // 上传过程中，显示较慢的进度
                const slowPercent = Math.min(percent * 0.7 + progressRatio * 30, percent);
                setDisplayPercent(slowPercent);
            }
            else {
                // 上传完成，平滑过渡到100%
                const finalPercent = Math.min(displayPercent + 5, 100);
                setDisplayPercent(finalPercent);
                // 如果达到100%，延迟隐藏
                if (finalPercent >= 100) {
                    const timer = setTimeout(() => {
                        setDisplayPercent(100);
                    }, 500);
                    return () => clearTimeout(timer);
                }
            }
        }
    }, [percent, startTime, hasStarted, displayPercent, minimumDisplayTime]);
    return (jsx("div", { className: "progress-container", style: styles, children: jsx("div", { className: "progress-bar", style: { height: `${strokeHeight}px` }, children: jsx("div", { className: classNames('progress-fill', {
                    [`progress-fill-${theme}`]: theme,
                    'progress-animated': displayPercent > 0 && displayPercent < 100,
                }), style: { width: `${displayPercent}%` }, children: showText && displayPercent > 0 && (jsxs("span", { className: "progress-text", children: [Math.round(displayPercent), "%"] })) }) }) }));
};

const FileList = ({ fileList, onRemoved, onToggleStatus, }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const getStatusIcon = (status, isHovered = false) => {
        // 如果悬浮在success状态上，显示error图标
        if (status === 'success' && isHovered) {
            return faXmark;
        }
        switch (status) {
            case 'uploading':
                return faSpinner;
            case 'success':
                return faCircleCheck;
            case 'error':
                return faCircleXmark;
            default:
                return faCircleCheck;
        }
    };
    const getStatusClass = (status) => {
        switch (status) {
            case 'uploading':
                return 'status-uploading';
            case 'success':
                return 'status-success';
            case 'error':
                return 'status-error';
            default:
                return 'status-uploading';
        }
    };
    return (jsx("div", { className: "file-list-container", children: jsx("div", { className: "file-list", children: fileList.map(item => (jsxs("div", { className: `file-item ${getStatusClass(item.status)}`, children: [jsxs("div", { className: "file-content", children: [jsxs("div", { className: "file-left", children: [jsx(Icon, { icon: faFile, className: "file-main-icon" }), jsx("div", { className: "file-info", children: jsx("span", { className: "file-name", title: item.name, children: item.name }) })] }), jsx("div", { className: "file-right", children: jsxs("div", { className: "status-section", children: [jsx("div", { className: "status-with-remove", children: jsx("button", { className: "status-icon-btn", disabled: item.status === 'uploading', onMouseEnter: () => setHoveredItem(item.uid), onMouseLeave: () => setHoveredItem(null), onClick: () => {
                                                    // 如果是success状态悬浮时显示error图标，此时点击就是删除
                                                    // 如果是error状态，直接点击删除
                                                    if (item.status === 'success' &&
                                                        hoveredItem === item.uid) {
                                                        onRemoved === null || onRemoved === void 0 ? void 0 : onRemoved(item);
                                                    }
                                                    else if (item.status === 'error') {
                                                        onRemoved === null || onRemoved === void 0 ? void 0 : onRemoved(item);
                                                    }
                                                }, children: jsx(Icon, { icon: getStatusIcon(item.status, hoveredItem === item.uid), className: `status-icon ${getStatusClass(item.status)}` }) }) }), jsxs("span", { className: "file-status", children: [item.status === 'uploading' && '上传中...', item.status === 'success' && '上传成功', item.status === 'error' && '上传失败'] })] }) })] }), item.status === 'uploading' && (jsx("div", { className: "progress-section", children: jsx(Progress, { percent: item.percent, showText: false }) }))] }, item.uid))) }) }));
};

const Dragger = props => {
    const { onFile, children } = props;
    const [isDragover, setIsDragover] = useState(false);
    const klass = classNames('upload-dragger', {
        'is-dragover': isDragover,
    });
    const handelDrag = (e, isOver) => {
        e.preventDefault();
        setIsDragover(isOver);
    };
    // 默认内容
    const defaultContent = (jsxs("div", { className: "dragger-content", children: [jsx("div", { className: "dragger-icon", children: "\uD83D\uDCC1" }), jsx("div", { className: "dragger-text", children: "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u533A\u57DF" }), jsx("div", { className: "dragger-hint", children: "\u652F\u6301\u591A\u6587\u4EF6\u4E0A\u4F20" })] }));
    return (jsx("div", { className: klass, onDragOver: e => handelDrag(e, true), onDragLeave: e => {
            e.preventDefault();
            handelDrag(e, false);
        }, onDrop: e => {
            e.preventDefault();
            handelDrag(e, false);
            onFile(e.dataTransfer.files);
        }, children: children || defaultContent }));
};

/**
 * Web Worker 内联代码 - 在子线程中计算文件 MD5 Hash
 * 包含完整的 MD5 算法实现（基于 RFC 1321），无需外部依赖
 * 使用 Blob URL 方式创建 Worker，避免额外的打包配置
 */
const HASH_WORKER_CODE = `
'use strict';

// ========== MD5 Algorithm (RFC 1321) ==========

// T[i] = floor(abs(sin(i + 1)) * 2^32)
var T = [
  0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
  0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
  0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
  0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
  0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
  0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
  0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
  0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
  0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
  0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
  0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
  0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
  0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
  0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
  0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
  0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
];

// 每轮移位量
var S = [
  7,12,17,22, 7,12,17,22, 7,12,17,22, 7,12,17,22,
  5, 9,14,20, 5, 9,14,20, 5, 9,14,20, 5, 9,14,20,
  4,11,16,23, 4,11,16,23, 4,11,16,23, 4,11,16,23,
  6,10,15,21, 6,10,15,21, 6,10,15,21, 6,10,15,21
];

// MD5 内部状态
var _state, _buffer, _bufLen, _totalLen;

function md5Init() {
  _state = new Int32Array([0x67452301, -271733879, -1732584194, 271733878]);
  _buffer = new Uint8Array(64);
  _bufLen = 0;
  _totalLen = 0;
}

// 处理一个 64 字节块
function md5Transform(block) {
  var x = new Int32Array(16);
  for (var i = 0; i < 16; i++) {
    var o = i * 4;
    x[i] = block[o] | (block[o+1] << 8) | (block[o+2] << 16) | (block[o+3] << 24);
  }

  var a = _state[0], b = _state[1], c = _state[2], d = _state[3];

  for (var i = 0; i < 64; i++) {
    var f, g;
    if (i < 16) {
      f = (b & c) | ((~b) & d);
      g = i;
    } else if (i < 32) {
      f = (d & b) | ((~d) & c);
      g = (5 * i + 1) % 16;
    } else if (i < 48) {
      f = b ^ c ^ d;
      g = (3 * i + 5) % 16;
    } else {
      f = c ^ (b | (~d));
      g = (7 * i) % 16;
    }

    var temp = d;
    d = c;
    c = b;
    var sum = (a + f + T[i] + x[g]) | 0;
    b = (b + ((sum << S[i]) | (sum >>> (32 - S[i])))) | 0;
    a = temp;
  }

  _state[0] = (_state[0] + a) | 0;
  _state[1] = (_state[1] + b) | 0;
  _state[2] = (_state[2] + c) | 0;
  _state[3] = (_state[3] + d) | 0;
}

// 增量添加数据
function md5Update(arrayBuffer) {
  var input = new Uint8Array(arrayBuffer);
  var len = input.length;
  _totalLen += len;
  var pos = 0;

  if (_bufLen > 0) {
    var need = 64 - _bufLen;
    var copy = Math.min(need, len);
    _buffer.set(input.subarray(0, copy), _bufLen);
    _bufLen += copy;
    pos = copy;
    if (_bufLen === 64) {
      md5Transform(_buffer);
      _bufLen = 0;
    }
  }

  while (pos + 64 <= len) {
    md5Transform(input.subarray(pos, pos + 64));
    pos += 64;
  }

  if (pos < len) {
    _buffer.set(input.subarray(pos), 0);
    _bufLen = len - pos;
  }
}

// 完成计算，返回 Hash 十六进制字符串
function md5Finalize() {
  var totalBits = _totalLen * 8;
  var lo = totalBits % 4294967296;
  var hi = Math.floor(totalBits / 4294967296);

  // 计算填充长度：填充至 56 mod 64
  var padLen = ((_bufLen < 56) ? 56 : 120) - _bufLen;
  var padding = new Uint8Array(padLen + 8);
  padding[0] = 0x80;

  // 追加原始消息长度（64-bit LE）
  padding[padLen]     = lo & 0xff;
  padding[padLen + 1] = (lo >>> 8) & 0xff;
  padding[padLen + 2] = (lo >>> 16) & 0xff;
  padding[padLen + 3] = (lo >>> 24) & 0xff;
  padding[padLen + 4] = hi & 0xff;
  padding[padLen + 5] = (hi >>> 8) & 0xff;
  padding[padLen + 6] = (hi >>> 16) & 0xff;
  padding[padLen + 7] = (hi >>> 24) & 0xff;

  // 直接处理填充块（不更新 _totalLen）
  var input = padding;
  var pos = 0;

  if (_bufLen > 0) {
    var need = 64 - _bufLen;
    _buffer.set(input.subarray(0, need), _bufLen);
    md5Transform(_buffer);
    pos = need;
    _bufLen = 0;
  }

  while (pos + 64 <= input.length) {
    md5Transform(input.subarray(pos, pos + 64));
    pos += 64;
  }

  var hex = '';
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var byte = (_state[i] >>> (j * 8)) & 0xff;
      hex += ('0' + byte.toString(16)).slice(-2);
    }
  }
  return hex;
}

// ========== Worker 消息处理 ==========

self.onmessage = function(e) {
  var data = e.data;

  if (data.type === 'hash') {
    try {
      var file = data.file;
      var chunkSize = data.chunkSize || 2 * 1024 * 1024;
      var totalChunks = Math.ceil(file.size / chunkSize);

      md5Init();

      var reader = new FileReaderSync();

      for (var i = 0; i < totalChunks; i++) {
        var start = i * chunkSize;
        var end = Math.min(start + chunkSize, file.size);
        var blob = file.slice(start, end);
        var buffer = reader.readAsArrayBuffer(blob);
        md5Update(buffer);

        self.postMessage({
          type: 'progress',
          progress: Math.round(((i + 1) / totalChunks) * 100)
        });
      }

      var hash = md5Finalize();
      self.postMessage({ type: 'complete', hash: hash });
    } catch (err) {
      self.postMessage({ type: 'error', error: err.message || 'Hash 计算失败' });
    }
  }
};
`;

/**
 * 计算文件的 MD5 哈希值
 * 优先使用 Web Worker（不阻塞主线程），失败时回退到主线程计算
 *
 * @param file 要计算哈希的文件
 * @param chunkSize 读取文件时的分块大小，默认 2MB
 * @param onProgress 进度回调函数（可选）
 * @returns Promise<string> 文件的 MD5 哈希值
 */
const calculateFileHash = async (file, chunkSize = 2 * 1024 * 1024, onProgress) => {
    // 优先尝试 Web Worker
    try {
        return await calculateFileHashWithWorker(file, chunkSize, onProgress);
    }
    catch (_a) {
        // Worker 不可用或执行失败，回退到主线程
        return calculateFileHashOnMainThread(file, chunkSize, onProgress);
    }
};
/**
 * 使用 Web Worker 计算文件 Hash（不阻塞 UI）
 */
const calculateFileHashWithWorker = (file, chunkSize, onProgress) => {
    return new Promise((resolve, reject) => {
        let worker = null;
        try {
            // 通过 Blob URL 创建内联 Worker
            const blob = new Blob([HASH_WORKER_CODE], {
                type: 'application/javascript',
            });
            const workerUrl = URL.createObjectURL(blob);
            worker = new Worker(workerUrl);
            worker.onmessage = (e) => {
                const { type, hash, progress, error } = e.data;
                switch (type) {
                    case 'progress':
                        onProgress === null || onProgress === void 0 ? void 0 : onProgress(progress);
                        break;
                    case 'complete':
                        worker === null || worker === void 0 ? void 0 : worker.terminate();
                        URL.revokeObjectURL(workerUrl);
                        resolve(hash);
                        break;
                    case 'error':
                        worker === null || worker === void 0 ? void 0 : worker.terminate();
                        URL.revokeObjectURL(workerUrl);
                        reject(new Error(error));
                        break;
                }
            };
            worker.onerror = (e) => {
                worker === null || worker === void 0 ? void 0 : worker.terminate();
                URL.revokeObjectURL(workerUrl);
                reject(new Error(e.message || 'Worker 执行失败'));
            };
            // 发送文件到 Worker
            worker.postMessage({ type: 'hash', file, chunkSize });
        }
        catch (err) {
            worker === null || worker === void 0 ? void 0 : worker.terminate();
            reject(err);
        }
    });
};
/**
 * 主线程回退方案：使用 SparkMD5 计算文件 Hash
 * 通过 FileReader 异步读取，在 onload 回调间隙让出主线程
 */
const calculateFileHashOnMainThread = (file, chunkSize, onProgress) => {
    const totalChunks = Math.ceil(file.size / chunkSize);
    return new Promise((resolve, reject) => {
        const spark = new SparkMD5.ArrayBuffer();
        let processedChunks = 0;
        function readChunk(i) {
            if (i >= totalChunks) {
                resolve(spark.end());
                return;
            }
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const reader = new FileReader();
            reader.onload = e => {
                var _a;
                try {
                    spark.append((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
                    processedChunks++;
                    onProgress === null || onProgress === void 0 ? void 0 : onProgress(Math.round((processedChunks / totalChunks) * 100));
                    readChunk(i + 1);
                }
                catch (error) {
                    reject(new Error(`处理分块失败: ${error}`));
                }
            };
            reader.onerror = () => reject(new Error('文件读取失败'));
            reader.readAsArrayBuffer(file.slice(start, end));
        }
        readChunk(0);
    });
};

// 进行文件的切分
const splitFile = (file, chunkSize = null) => {
    // 思路：
    // 1. 计算总分片数：Math.ceil(file.size / chunkSize)
    // 2. 循环切分：file.slice(start, end)
    // 3. 返回 Blob 数组
    const totalChunks = chunkSize ? Math.ceil(file.size / chunkSize) : 1;
    const chunks = [];
    for (let i = 0; i < totalChunks; i++) {
        const start = chunkSize ? i * chunkSize : 0;
        const end = chunkSize ? Math.min(start + chunkSize, file.size) : file.size;
        chunks.push(file.slice(start, end));
    }
    return chunks;
};

/**
 * 上传单个分片（带重试机制 + 取消支持）
 */
const uploadChunkWithRetry = async (params, retryCount = 0) => {
    const { chunk, chunkIndex, adapter, uploadId, fileHash, fileName, fileSize, totalChunks, maxRetries, retryDelay, signal, } = params;
    // 检查是否已取消
    if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
        throw new DOMException('上传已取消', 'AbortError');
    }
    try {
        await adapter.uploadChunk({
            uploadId,
            chunkIndex,
            chunk,
            fileName,
            fileSize,
            totalChunks,
            fileHash,
            signal,
        });
    }
    catch (error) {
        // 如果是取消操作，直接抛出不重试
        if ((signal === null || signal === void 0 ? void 0 : signal.aborted) ||
            (error instanceof DOMException && error.name === 'AbortError')) {
            throw new DOMException('上传已取消', 'AbortError');
        }
        // 如果还有重试次数，则重试
        if (retryCount < maxRetries) {
            // 指数退避：延迟时间 = retryDelay * 2^retryCount
            const delay = retryDelay * Math.pow(2, retryCount);
            // 等待时也支持取消
            await new Promise((resolve, reject) => {
                const timer = setTimeout(resolve, delay);
                if (signal) {
                    const onAbort = () => {
                        clearTimeout(timer);
                        reject(new DOMException('上传已取消', 'AbortError'));
                    };
                    if (signal.aborted) {
                        clearTimeout(timer);
                        reject(new DOMException('上传已取消', 'AbortError'));
                        return;
                    }
                    signal.addEventListener('abort', onAbort, { once: true });
                }
            });
            // 递归重试
            return uploadChunkWithRetry(params, retryCount + 1);
        }
        // 超过最大重试次数，抛出错误
        throw error;
    }
};

/**
 * IndexedDB 分片上传持久化工具
 * 用于断点续传：记录已上传的分片，刷新/断网后可恢复
 */
const DB_NAME = 'cream_upload_store';
const DB_VERSION = 1;
const STORE_NAME = 'chunk_records';
/**
 * 打开 IndexedDB 数据库
 */
const openDB = () => {
    return new Promise((resolve, reject) => {
        // 检查 IndexedDB 是否可用
        if (typeof indexedDB === 'undefined') {
            reject(new Error('IndexedDB 不可用'));
            return;
        }
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'fileHash' });
                store.createIndex('updatedAt', 'updatedAt', { unique: false });
            }
        };
        request.onsuccess = event => {
            resolve(event.target.result);
        };
        request.onerror = () => {
            reject(new Error('无法打开 IndexedDB'));
        };
    });
};
/**
 * 获取分片上传记录
 */
const getChunkRecord = async (fileHash) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const request = store.get(fileHash);
            request.onsuccess = () => {
                resolve(request.result || null);
            };
            request.onerror = () => reject(request.error);
            tx.oncomplete = () => db.close();
        });
    }
    catch (_a) {
        return null;
    }
};
/**
 * 保存/更新分片上传记录
 */
const saveChunkRecord = async (record) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.put({ ...record, updatedAt: Date.now() });
            tx.oncomplete = () => {
                db.close();
                resolve();
            };
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    }
    catch (_a) {
        // IndexedDB 不可用时静默失败，不影响上传流程
    }
};
/**
 * 标记某个分片已上传
 */
const markChunkUploaded = async (fileHash, chunkIndex) => {
    try {
        const record = await getChunkRecord(fileHash);
        if (record) {
            if (!record.uploadedChunks.includes(chunkIndex)) {
                record.uploadedChunks.push(chunkIndex);
                await saveChunkRecord(record);
            }
        }
    }
    catch (_a) {
        // 静默失败
    }
};
/**
 * 删除分片上传记录（上传完成后清理）
 */
const deleteChunkRecord = async (fileHash) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.delete(fileHash);
            tx.oncomplete = () => {
                db.close();
                resolve();
            };
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    }
    catch (_a) {
        // 静默失败
    }
};
/**
 * 清理过期记录（超过指定天数的记录）
 */
const cleanExpiredRecords = async (maxAgeDays = 7) => {
    try {
        const db = await openDB();
        const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000;
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const index = store.index('updatedAt');
            const range = IDBKeyRange.upperBound(cutoff);
            const request = index.openCursor(range);
            request.onsuccess = event => {
                const cursor = event.target.result;
                if (cursor) {
                    cursor.delete();
                    cursor.continue();
                }
            };
            tx.oncomplete = () => {
                db.close();
                resolve();
            };
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    }
    catch (_a) {
        // 静默失败
    }
};

/**
 * 并发分片上传
 * 支持：跳过已上传分片（断点续传）、AbortSignal 取消、暂停恢复
 */
/**
 * 并发上传所有分片
 */
const uploadChunks = async (params) => {
    const { chunks, adapter, uploadId, fileHash, fileName, fileSize, totalChunks, concurrent, maxRetries, retryDelay, uploadedChunkIndices = [], signal, isPaused, waitForResume, onProgress, onChunkComplete, } = params;
    // 构建待上传的分片索引列表（跳过已上传的）
    const uploadedSet = new Set(uploadedChunkIndices);
    const pendingIndices = Array.from({ length: chunks.length }, (_, i) => i).filter(i => !uploadedSet.has(i));
    let uploadedChunks = uploadedChunkIndices.length;
    // 报告初始进度（已有断点续传的进度）
    if (uploadedChunks > 0) {
        onProgress === null || onProgress === void 0 ? void 0 : onProgress({
            percent: Math.round((uploadedChunks / totalChunks) * 100),
            uploadedChunks,
            totalChunks,
            uploadedSize: (uploadedChunks / totalChunks) * fileSize,
            totalSize: fileSize,
            state: 'uploading',
        });
    }
    // 分批上传
    for (let i = 0; i < pendingIndices.length; i += concurrent) {
        // 检查是否已取消
        if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
            throw new DOMException('上传已取消', 'AbortError');
        }
        // 检查是否暂停，等待恢复
        if ((isPaused === null || isPaused === void 0 ? void 0 : isPaused()) && waitForResume) {
            await waitForResume();
        }
        const batch = pendingIndices.slice(i, i + concurrent);
        // 并发上传当前批次
        await Promise.all(batch.map(async (chunkIndex) => {
            // 再次检查暂停
            if ((isPaused === null || isPaused === void 0 ? void 0 : isPaused()) && waitForResume) {
                await waitForResume();
            }
            await uploadChunkWithRetry({
                chunk: chunks[chunkIndex],
                chunkIndex,
                adapter,
                uploadId,
                fileHash,
                fileName,
                fileSize,
                totalChunks,
                maxRetries,
                retryDelay,
                signal,
            });
            uploadedChunks++;
            onChunkComplete === null || onChunkComplete === void 0 ? void 0 : onChunkComplete(chunkIndex, totalChunks);
            // 持久化已上传分片记录（断点续传）
            markChunkUploaded(fileHash, chunkIndex).catch(() => {
                // 静默失败，不影响上传
            });
            // 更新进度
            onProgress === null || onProgress === void 0 ? void 0 : onProgress({
                percent: Math.round((uploadedChunks / totalChunks) * 100),
                uploadedChunks,
                totalChunks,
                uploadedSize: (uploadedChunks / totalChunks) * fileSize,
                totalSize: fileSize,
                state: 'uploading',
            });
        }));
    }
};

/**
 * 大文件上传 Hook
 *
 * 功能特性：
 * - Web Worker 计算文件 Hash（不阻塞 UI）
 * - 秒传：Hash 查后端是否已存在
 * - 断点续传：IndexedDB 持久化分片记录
 * - 上传控制：pause / resume / cancel
 * - 并发上传 + 指数退避重试
 */
const useLargeFileUpload = (props) => {
    const { adapter, chunkSize = 5 * 1024 * 1024, concurrent = 3, maxRetries = 3, retryDelay = 1000, enableResume = true, onProgress, onHashProgress, onSuccess, onError, onChunkComplete, } = props;
    // 当前上传进度
    const [currentProgress, setCurrentProgress] = useState(null);
    // 上传状态
    const stateRef = useRef('idle');
    // AbortController 用于取消
    const abortControllerRef = useRef(null);
    // 暂停控制
    const pausedRef = useRef(false);
    const resumeResolverRef = useRef(null);
    /**
     * 暂停上传
     */
    const pause = useCallback(() => {
        if (stateRef.current === 'uploading') {
            pausedRef.current = true;
            stateRef.current = 'paused';
        }
    }, []);
    /**
     * 恢复上传
     */
    const resume = useCallback(() => {
        var _a;
        if (stateRef.current === 'paused') {
            pausedRef.current = false;
            stateRef.current = 'uploading';
            // 释放等待中的 Promise
            (_a = resumeResolverRef.current) === null || _a === void 0 ? void 0 : _a.call(resumeResolverRef);
            resumeResolverRef.current = null;
        }
    }, []);
    /**
     * 取消上传
     */
    const cancel = useCallback(() => {
        var _a, _b;
        stateRef.current = 'error';
        pausedRef.current = false;
        // 释放暂停等待
        (_a = resumeResolverRef.current) === null || _a === void 0 ? void 0 : _a.call(resumeResolverRef);
        resumeResolverRef.current = null;
        // 中止所有正在进行的请求
        (_b = abortControllerRef.current) === null || _b === void 0 ? void 0 : _b.abort();
    }, []);
    /**
     * 检查是否暂停
     */
    const isPaused = () => pausedRef.current;
    /**
     * 等待恢复（返回一个 Promise，恢复时 resolve）
     */
    const waitForResume = () => {
        return new Promise(resolve => {
            if (!pausedRef.current) {
                resolve();
                return;
            }
            resumeResolverRef.current = resolve;
        });
    };
    // 上传函数
    const upload = useCallback(async (file) => {
        const startTime = Date.now();
        // 初始化控制器
        abortControllerRef.current = new AbortController();
        pausedRef.current = false;
        stateRef.current = 'hashing';
        try {
            // 清理过期的断点续传记录
            if (enableResume) {
                cleanExpiredRecords().catch(() => { });
            }
            // ===== 阶段 1：计算文件 Hash（Web Worker） =====
            stateRef.current = 'hashing';
            const fileHash = await calculateFileHash(file, chunkSize, percent => {
                onHashProgress === null || onHashProgress === void 0 ? void 0 : onHashProgress(percent);
                setCurrentProgress({
                    percent: 0,
                    uploadedChunks: 0,
                    totalChunks: 0,
                    uploadedSize: 0,
                    totalSize: file.size,
                    state: 'hashing',
                    hashPercent: percent,
                });
            });
            // 检查是否已取消
            if (abortControllerRef.current.signal.aborted) {
                throw new DOMException('上传已取消', 'AbortError');
            }
            // ===== 阶段 2：秒传检查 =====
            if (adapter.checkFileExists) {
                const checkResult = await adapter.checkFileExists({
                    fileHash,
                    fileName: file.name,
                    fileSize: file.size,
                });
                if (checkResult.exists && checkResult.fileUrl) {
                    // 秒传成功！
                    const result = {
                        fileId: checkResult.fileId || fileHash,
                        fileUrl: checkResult.fileUrl,
                        fileName: file.name,
                        fileSize: file.size,
                        uploadTime: Date.now() - startTime,
                        instantUpload: true,
                    };
                    stateRef.current = 'success';
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(result);
                    return result;
                }
                // 后端返回已上传的分片列表（用于断点续传）
                if (checkResult.uploadedChunks &&
                    checkResult.uploadedChunks.length > 0 &&
                    enableResume) {
                    const record = await getChunkRecord(fileHash);
                    if (!record) {
                        const defaultChunkSize = chunkSize || 5 * 1024 * 1024;
                        await saveChunkRecord({
                            fileHash,
                            fileName: file.name,
                            fileSize: file.size,
                            chunkSize: defaultChunkSize,
                            totalChunks: Math.ceil(file.size / defaultChunkSize),
                            uploadedChunks: checkResult.uploadedChunks,
                            uploadId: null,
                            updatedAt: Date.now(),
                        });
                    }
                }
            }
            // ===== 阶段 3：划分文件 =====
            const defaultChunkSize = chunkSize || 5 * 1024 * 1024;
            const fileChunks = splitFile(file, defaultChunkSize);
            const totalChunks = fileChunks.length;
            // ===== 阶段 4：加载断点续传记录 =====
            let uploadedChunkIndices = [];
            let uploadId = null;
            if (enableResume) {
                const record = await getChunkRecord(fileHash);
                if (record &&
                    record.fileSize === file.size &&
                    record.chunkSize === defaultChunkSize &&
                    record.totalChunks === totalChunks) {
                    uploadedChunkIndices = record.uploadedChunks;
                    uploadId = record.uploadId;
                }
            }
            // ===== 阶段 5：初始化上传 =====
            if (!uploadId && adapter.initUpload) {
                uploadId = await adapter.initUpload({
                    fileName: file.name,
                    fileSize: file.size,
                    fileHash,
                    chunkSize: defaultChunkSize,
                    totalChunks,
                });
            }
            // 保存断点记录
            if (enableResume) {
                await saveChunkRecord({
                    fileHash,
                    fileName: file.name,
                    fileSize: file.size,
                    chunkSize: defaultChunkSize,
                    totalChunks,
                    uploadedChunks: uploadedChunkIndices,
                    uploadId,
                    updatedAt: Date.now(),
                });
            }
            // ===== 阶段 6：上传分片 =====
            stateRef.current = 'uploading';
            await uploadChunks({
                chunks: fileChunks,
                adapter,
                uploadId,
                fileHash,
                fileName: file.name,
                fileSize: file.size,
                totalChunks,
                concurrent,
                maxRetries,
                retryDelay,
                uploadedChunkIndices,
                signal: abortControllerRef.current.signal,
                isPaused,
                waitForResume,
                onProgress: progress => {
                    setCurrentProgress(progress);
                    onProgress === null || onProgress === void 0 ? void 0 : onProgress(progress);
                },
                onChunkComplete,
            });
            // ===== 阶段 7：合并分片 =====
            stateRef.current = 'merging';
            const result = await adapter.mergeChunks({
                uploadId,
                fileHash,
                fileName: file.name,
                fileSize: file.size,
                totalChunks,
            });
            // 上传完成，清理断点记录
            if (enableResume) {
                await deleteChunkRecord(fileHash);
            }
            // ===== 阶段 8：返回结果 =====
            const uploadResult = {
                fileId: result.fileId,
                fileUrl: result.fileUrl,
                fileName: file.name,
                fileSize: file.size,
                uploadTime: Date.now() - startTime,
                instantUpload: false,
                response: result,
            };
            stateRef.current = 'success';
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(uploadResult);
            return uploadResult;
        }
        catch (error) {
            const err = error;
            stateRef.current = 'error';
            onError === null || onError === void 0 ? void 0 : onError(err, file);
            throw err;
        }
    }, [
        adapter,
        chunkSize,
        concurrent,
        maxRetries,
        retryDelay,
        enableResume,
        onProgress,
        onHashProgress,
        onSuccess,
        onError,
        onChunkComplete,
    ]);
    return {
        upload,
        getProgress: () => currentProgress,
        getControl: () => ({
            pause,
            resume,
            cancel,
            state: stateRef.current,
        }),
    };
};

/**
 * 默认适配器创建工具
 * 基于 Upload 组件的配置创建适配器
 */
/**
 * 创建默认适配器
 * 基于标准的后端接口规范
 */
const createDefaultAdapter = (config) => {
    const { action, checkUrl, initUrl, chunkUrl, mergeUrl, headers, data, withCredentials, name = 'file', } = config;
    return {
        // 秒传检查（可选）
        checkFileExists: checkUrl
            ? async (params) => {
                try {
                    const response = await axios.post(checkUrl, {
                        fileHash: params.fileHash,
                        fileName: params.fileName,
                        fileSize: params.fileSize,
                        ...data,
                    }, { headers, withCredentials });
                    return {
                        exists: !!response.data.exists,
                        fileUrl: response.data.fileUrl || response.data.file_url,
                        fileId: response.data.fileId || response.data.file_id,
                        uploadedChunks: response.data.uploadedChunks ||
                            response.data.uploaded_chunks ||
                            [],
                    };
                }
                catch (_a) {
                    // 检查失败时视为文件不存在，继续正常上传
                    return { exists: false };
                }
            }
            : undefined,
        // 初始化上传（可选）
        initUpload: initUrl
            ? async (fileInfo) => {
                try {
                    const response = await axios.post(initUrl || `${action}/init`, {
                        fileName: fileInfo.fileName,
                        fileSize: fileInfo.fileSize,
                        fileHash: fileInfo.fileHash,
                        chunkSize: fileInfo.chunkSize,
                        totalChunks: fileInfo.totalChunks,
                        ...data,
                    }, {
                        headers,
                        withCredentials,
                    });
                    return response.data.uploadId || response.data.upload_id || null;
                }
                catch (error) {
                    // 如果初始化失败，返回 null，继续使用文件名作为 uploadId
                    console.warn('初始化上传失败，将使用文件名作为标识:', error);
                    return null;
                }
            }
            : undefined,
        // 上传分片
        uploadChunk: async (params) => {
            const formData = new FormData();
            // 添加 uploadId（如果有）
            if (params.uploadId) {
                formData.append('uploadId', params.uploadId);
            }
            // 添加分片信息
            formData.append('chunkIndex', params.chunkIndex.toString());
            formData.append(name || 'chunk', params.chunk);
            formData.append('fileName', params.fileName);
            formData.append('fileSize', params.fileSize.toString());
            formData.append('totalChunks', params.totalChunks.toString());
            if (params.fileHash) {
                formData.append('fileHash', params.fileHash);
            }
            // 添加额外数据
            if (data) {
                Object.keys(data).forEach(key => {
                    formData.append(key, data[key]);
                });
            }
            const response = await axios.post(chunkUrl || `${action}/chunk`, formData, {
                headers: {
                    ...headers,
                },
                withCredentials,
                // 传递 AbortSignal（axios >= 0.22 支持）
                signal: params.signal,
                onUploadProgress: e => {
                    if (params.onProgress && e.total) {
                        const progress = Math.round((e.loaded * 100) / e.total);
                        params.onProgress(progress);
                    }
                },
            });
            return {
                success: response.data.success !== false,
                chunkIndex: params.chunkIndex,
            };
        },
        // 合并分片
        mergeChunks: async (params) => {
            const response = await axios.post(mergeUrl || `${action}/merge`, {
                uploadId: params.uploadId,
                fileName: params.fileName,
                fileSize: params.fileSize,
                totalChunks: params.totalChunks,
                fileHash: params.fileHash,
                ...data,
            }, {
                headers,
                withCredentials,
            });
            return {
                fileUrl: response.data.fileUrl || response.data.file_url,
                fileId: response.data.fileId ||
                    response.data.file_id ||
                    params.uploadId ||
                    '',
                ...response.data,
            };
        },
    };
};

const Upload = forwardRef(({ action, defaultFileList, headers, name, data, withCredentials, accept, multiple, beforeUpload, onProgress, onSuccess, onError, onChange, onBeforeUploadSuccess, onRemoved, children, drag, 
// 大文件上传配置
enableLargeFileUpload = true, chunkSize = 5 * 1024 * 1024, chunkThreshold = 10 * 1024 * 1024, concurrent = 3, maxRetries = 3, retryDelay = 1000, adapter, checkUrl, initUrl, chunkUrl, mergeUrl, enableResume = true, onHashProgress, }, ref) => {
    // 创建文件列表状态
    const [fileList, setFileList] = useState(defaultFileList || []);
    // 存储当前上传的文件信息（用于进度更新）
    const currentUploadingFileIdRef = useRef(null);
    const currentUploadingFileRef = useRef(null);
    // 创建默认适配器（如果未提供自定义适配器）
    const defaultAdapter = useMemo(() => {
        if (adapter) {
            return adapter;
        }
        return createDefaultAdapter({
            action,
            checkUrl,
            initUrl,
            chunkUrl,
            mergeUrl,
            headers,
            data,
            withCredentials,
            name,
        });
    }, [
        adapter,
        action,
        checkUrl,
        initUrl,
        chunkUrl,
        mergeUrl,
        headers,
        data,
        withCredentials,
        name,
    ]);
    // 大文件上传 Hook（集成秒传 / 断点续传 / 暂停恢复取消 / Web Worker Hash）
    const largeFileUpload = useLargeFileUpload({
        adapter: defaultAdapter,
        chunkSize,
        concurrent,
        maxRetries,
        retryDelay,
        enableResume,
        onHashProgress,
        onProgress: progress => {
            // 更新文件列表中的进度
            if (currentUploadingFileIdRef.current) {
                updateFileList(currentUploadingFileIdRef.current, {
                    status: 'uploading',
                    percent: progress.percent,
                });
                // 调用原有的 onProgress 回调（兼容原有 API）
                if (onProgress && currentUploadingFileRef.current) {
                    onProgress(progress.percent, currentUploadingFileRef.current);
                }
            }
        },
        onSuccess: _result => {
            // 上传成功的处理在 uploadLargeFile 中完成
        },
        onError: (_error, _file) => {
            // 上传失败的处理在 uploadLargeFile 中完成
        },
    });
    // 通过 ref 暴露上传控制能力
    useImperativeHandle(ref, () => ({
        pause: () => largeFileUpload.getControl().pause(),
        resume: () => largeFileUpload.getControl().resume(),
        cancel: () => largeFileUpload.getControl().cancel(),
        getControl: () => largeFileUpload.getControl(),
        getProgress: () => largeFileUpload.getProgress(),
        getFileList: () => fileList,
    }));
    // 创建一个更新文件列表的函数
    const updateFileList = (targetUid, updateObj) => {
        setFileList(prevList => {
            const newList = prevList.map(item => item.uid === targetUid ? { ...item, ...updateObj } : item);
            return newList;
        });
    };
    const handelFileChange = () => {
        //触发文件选择对话框
        if (uploadInputRef.current) {
            uploadInputRef.current.click();
        }
    };
    const uploadInputRef = useRef(null);
    // 值变化的时候添加文件
    const handelChange = (e) => {
        const file = e.target.files;
        // 如果文件不存在，直接返回
        if (!file) {
            return;
        }
        // 如果文件存在，调用handelFileUpload函数
        if (file) {
            handelFileUpload(file);
        }
        // 最后清空当前文件选择
        if (uploadInputRef.current) {
            uploadInputRef.current.value = '';
        }
    };
    const post = (file) => {
        // 文件对象创建
        const fileItem = {
            uid: Date.now() + '-' + file.name,
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file,
        };
        // 更新文件列表状态
        setFileList(prevList => [...prevList, fileItem]);
        // 1、创建FormData对象
        const formData = new FormData();
        // 2、追加文件到FormData
        // todo:添加name属性，解决后端接收文件名问题
        formData.append(name || 'file', file);
        // todo:添加data属性，解决后端接收自定义字段问题
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
        }
        // 3、发送POST请求
        axios
            .post(action, formData, {
            // 4、设置请求头为multipart/form-data
            // todo:自定义请求头
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // },
            // todo:自定义请求头
            headers: headers || {},
            withCredentials: withCredentials || false,
            // 5、设置上传进度回调
            onUploadProgress: e => {
                // 6、计算上传进度
                const progress = Math.round((e.loaded * 100) / e.total);
                if (progress < 100) {
                    // 在这个地方需要更新文件列表，在setState中更新
                    // 打印当前文件项的详细信息
                    updateFileList(fileItem.uid, {
                        status: 'uploading',
                        percent: progress,
                    });
                    if (onProgress) {
                        onProgress(progress, file);
                    }
                }
            },
        })
            .then(response => {
            // 更新文件状态为成功
            updateFileList(fileItem.uid, {
                status: 'success',
                percent: 100,
                response: response.data,
            });
            if (onSuccess) {
                // 7、调用成功回调
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(response.data, file);
            }
            if (onChange) {
                // 9、调用onChange回调
                onChange === null || onChange === void 0 ? void 0 : onChange(file);
            }
        })
            .catch(error => {
            // 更新文件状态为失败
            updateFileList(fileItem.uid, {
                status: 'error',
                error: error,
            });
            if (onError) {
                // 8、调用失败回调
                onError === null || onError === void 0 ? void 0 : onError(error, file);
            }
            if (onChange) {
                // 10、调用onChange回调
                onChange === null || onChange === void 0 ? void 0 : onChange(file);
            }
        });
    };
    // 大文件上传函数（集成秒传 / 断点续传 / 暂停恢复取消）
    const uploadLargeFile = async (file) => {
        const fileId = Date.now() + '-' + file.name;
        currentUploadingFileIdRef.current = fileId;
        currentUploadingFileRef.current = file;
        // 创建文件项
        const fileItem = {
            uid: fileId,
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file,
        };
        // 添加到文件列表
        setFileList(prevList => [...prevList, fileItem]);
        try {
            updateFileList(fileId, { status: 'uploading' });
            const result = await largeFileUpload.upload(file);
            updateFileList(fileId, {
                status: 'success',
                percent: 100,
                response: result.response || result,
            });
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(result.response || result, file);
            onChange === null || onChange === void 0 ? void 0 : onChange(file);
        }
        catch (error) {
            updateFileList(fileId, {
                status: 'error',
                error: error,
            });
            onError === null || onError === void 0 ? void 0 : onError(error, file);
            onChange === null || onChange === void 0 ? void 0 : onChange(file);
        }
        finally {
            currentUploadingFileIdRef.current = null;
            currentUploadingFileRef.current = null;
        }
    };
    //   文件上传函数
    const handelFileUpload = (files) => {
        // 1、把文件列表转换为数组
        const fileArray = Array.from(files);
        // 2、遍历文件数组，对每个文件进行上传
        fileArray.forEach(file => {
            // 3、如果beforeUpload存在，调用beforeUpload函数
            if (beforeUpload) {
                const result = beforeUpload(file);
                // 4、判断结果的类型
                if (result instanceof Promise) {
                    result
                        .then(res => {
                        // 使用返回的新文件对象而不是原始文件
                        if (res) {
                            // 调用beforeUpload成功回调
                            if (onBeforeUploadSuccess) {
                                onBeforeUploadSuccess(file, res);
                            }
                            // 判断是否需要分片上传
                            const shouldChunk = enableLargeFileUpload && res.size >= chunkThreshold;
                            if (shouldChunk) {
                                uploadLargeFile(res);
                            }
                            else {
                                post(res);
                            }
                        }
                    })
                        .catch(err => {
                        if (onError) {
                            onError === null || onError === void 0 ? void 0 : onError(err, file);
                        }
                    });
                }
                else if (result) {
                    // 5、如果结果为true，调用post函数，传递原始文件
                    if (onBeforeUploadSuccess) {
                        onBeforeUploadSuccess(file, file);
                    }
                    // 判断是否需要分片上传
                    const shouldChunk = enableLargeFileUpload && file.size >= chunkThreshold;
                    if (shouldChunk) {
                        uploadLargeFile(file);
                    }
                    else {
                        post(file);
                    }
                }
                else {
                    // 如果beforeUpload返回false，不上传文件
                    if (onError) {
                        onError === null || onError === void 0 ? void 0 : onError(new Error('beforeUpload校验失败'), file);
                    }
                }
            }
            else {
                // 如果没有beforeUpload，直接上传文件
                // 判断是否需要分片上传
                const shouldChunk = enableLargeFileUpload && file.size >= chunkThreshold;
                if (shouldChunk) {
                    uploadLargeFile(file);
                }
                else {
                    post(file);
                }
            }
        });
    };
    const handelRemove = (file) => {
        // console.log('删除文件:', file);
        // 1、从文件列表中删除该文件项
        setFileList(prevList => prevList.filter(item => item.uid !== file.uid));
        // 2、调用onRemoved回调
        onRemoved === null || onRemoved === void 0 ? void 0 : onRemoved(file);
    };
    return (jsxs("div", { style: { margin: '20px' }, children: [jsxs("div", { className: "upload-container", onClick: handelFileChange, children: [drag ? (jsx(Dragger, { onFile: handelFileUpload, children: children })) : (children), jsx("input", { type: "file", className: "upload-input", style: { display: 'none' }, ref: uploadInputRef, onChange: handelChange, accept: accept, multiple: multiple })] }), jsx(FileList, { fileList: fileList, onRemoved: handelRemove })] }));
});
// 设置显示名称，便于调试
Upload.displayName = 'Upload';

/**
 * 大文件上传 Mock 适配器
 * 用于 Storybook 和开发测试，模拟分片上传流程
 */
/**
 * 创建 Mock 适配器
 * 模拟真实的分片上传流程，包括进度更新、延迟、错误处理等
 */
const createMockAdapter = (config = {}) => {
    const { uploadDelay = 500, // 默认每个分片上传延迟 500ms
    mergeDelay = 1000, // 默认合并延迟 1s
    failChunks = [], // 默认不失败
    failProbability = 0, // 默认失败概率 0%
    enableProgress = true, // 默认启用进度模拟
    instantUploadHashes = [], // 默认不模拟秒传
     } = config;
    // 存储上传任务信息（模拟服务端）
    const uploadTasks = new Map();
    return {
        /**
         * 秒传检查（可选）
         * 如果文件 Hash 在 instantUploadHashes 列表中，模拟秒传成功
         */
        checkFileExists: async (params) => {
            await new Promise(resolve => setTimeout(resolve, 100));
            if (instantUploadHashes.includes(params.fileHash)) {
                console.log(`[Mock] 秒传命中: ${params.fileName} (hash: ${params.fileHash})`);
                return {
                    exists: true,
                    fileUrl: `https://mock-storage.example.com/files/${params.fileName}`,
                    fileId: `instant-${params.fileHash.slice(0, 8)}`,
                };
            }
            return { exists: false };
        },
        /**
         * 初始化上传（可选）
         */
        initUpload: async (fileInfo) => {
            // 模拟网络延迟
            await new Promise(resolve => setTimeout(resolve, 100));
            const uploadId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            // 初始化任务
            uploadTasks.set(uploadId, {
                chunks: new Map(),
                totalChunks: fileInfo.totalChunks,
                fileName: fileInfo.fileName,
                fileSize: fileInfo.fileSize,
            });
            console.log(`[Mock] 初始化上传: ${uploadId}`, fileInfo);
            return uploadId;
        },
        /**
         * 上传分片
         */
        uploadChunk: async (params) => {
            var _a, _b;
            const uploadId = params.uploadId || `mock-${params.fileName}`;
            const task = uploadTasks.get(uploadId);
            // 检查取消
            if ((_a = params.signal) === null || _a === void 0 ? void 0 : _a.aborted) {
                throw new DOMException('上传已取消', 'AbortError');
            }
            if (!task) {
                throw new Error(`上传任务不存在: ${uploadId}`);
            }
            // 检查是否应该失败
            const shouldFail = failChunks.includes(params.chunkIndex) ||
                (failProbability > 0 && Math.random() < failProbability);
            if (shouldFail) {
                await new Promise(resolve => setTimeout(resolve, uploadDelay));
                throw new Error(`分片 ${params.chunkIndex} 上传失败（模拟错误）`);
            }
            // 模拟上传进度（支持取消）
            if (enableProgress && params.onProgress) {
                const steps = 5;
                for (let i = 1; i <= steps; i++) {
                    if ((_b = params.signal) === null || _b === void 0 ? void 0 : _b.aborted) {
                        throw new DOMException('上传已取消', 'AbortError');
                    }
                    await new Promise(resolve => setTimeout(resolve, uploadDelay / steps));
                    params.onProgress((i / steps) * 100);
                }
            }
            else {
                await new Promise(resolve => setTimeout(resolve, uploadDelay));
            }
            // 保存分片（模拟服务端存储）
            task.chunks.set(params.chunkIndex, params.chunk);
            console.log(`[Mock] 分片上传完成: ${params.chunkIndex + 1}/${params.totalChunks}`, {
                chunkSize: params.chunk.size,
                uploadedChunks: task.chunks.size,
                totalChunks: params.totalChunks,
            });
            return {
                success: true,
                chunkIndex: params.chunkIndex,
            };
        },
        /**
         * 合并分片
         */
        mergeChunks: async (params) => {
            const uploadId = params.uploadId || `mock-${params.fileName}`;
            const task = uploadTasks.get(uploadId);
            if (!task) {
                throw new Error(`上传任务不存在: ${uploadId}`);
            }
            // 验证所有分片是否都已上传
            const missingChunks = [];
            for (let i = 0; i < params.totalChunks; i++) {
                if (!task.chunks.has(i)) {
                    missingChunks.push(i);
                }
            }
            if (missingChunks.length > 0) {
                throw new Error(`缺少分片: ${missingChunks.join(', ')}`);
            }
            // 模拟合并过程
            console.log(`[Mock] 开始合并分片: ${params.totalChunks} 个分片`);
            await new Promise(resolve => setTimeout(resolve, mergeDelay));
            // 计算合并后的文件大小（验证）
            let totalSize = 0;
            for (let i = 0; i < params.totalChunks; i++) {
                totalSize += task.chunks.get(i).size;
            }
            // 清理任务
            uploadTasks.delete(uploadId);
            const fileUrl = `https://mock-storage.example.com/files/${params.fileName}`;
            const fileId = uploadId;
            console.log(`[Mock] 合并完成:`, {
                fileName: params.fileName,
                fileSize: totalSize,
                fileUrl,
                fileId,
            });
            return {
                fileUrl,
                fileId,
                fileSize: totalSize,
                uploadedAt: new Date().toISOString(),
            };
        },
    };
};
/**
 * 默认 Mock 适配器（快速测试）
 */
createMockAdapter();
/**
 * 慢速 Mock 适配器（用于测试进度显示）
 */
createMockAdapter({
    uploadDelay: 2000, // 每个分片 2s
    mergeDelay: 3000, // 合并 3s
});
/**
 * 错误测试 Mock 适配器（用于测试错误处理）
 */
createMockAdapter({
    uploadDelay: 500,
    mergeDelay: 1000,
    failChunks: [2, 5], // 第 3 和第 6 个分片会失败
    failProbability: 0.1, // 10% 的随机失败率
});

const Card = ({ title, extra, cover, actions, bordered = true, hoverable = false, size = 'default', loading = false, className, style, children, }) => {
    const cardClassName = classNames('cream-card', {
        'cream-card--bordered': bordered,
        'cream-card--hoverable': hoverable,
        'cream-card--small': size === 'small',
        'cream-card--loading': loading,
    }, className);
    const hasHeader = title !== undefined || extra !== undefined;
    return (jsxs("div", { className: cardClassName, style: style, role: "article", children: [cover && (jsx("div", { className: "cream-card__cover", "aria-hidden": "true", children: cover })), hasHeader && (jsxs("div", { className: "cream-card__header", children: [title && (jsx("div", { className: "cream-card__title", children: typeof title === 'string' ? (jsx("h4", { className: "cream-card__title-text", children: title })) : (title) })), extra && jsx("div", { className: "cream-card__extra", children: extra })] })), jsx("div", { className: "cream-card__body", children: loading ? (jsxs("div", { className: "cream-card__skeleton", "aria-label": "\u52A0\u8F7D\u4E2D", children: [jsx("div", { className: "cream-card__skeleton-row cream-card__skeleton-row--title" }), jsx("div", { className: "cream-card__skeleton-row" }), jsx("div", { className: "cream-card__skeleton-row" }), jsx("div", { className: "cream-card__skeleton-row cream-card__skeleton-row--short" })] })) : (children) }), actions && actions.length > 0 && (jsx("div", { className: "cream-card__actions", role: "group", "aria-label": "\u5361\u7247\u64CD\u4F5C", children: actions.map((action, index) => (jsx("div", { className: "cream-card__action-item", children: action }, index))) }))] }));
};

// ===== 默认状态图标 =====
const DefaultIcon = ({ status }) => {
    if (status === 'completed') {
        return (jsx("svg", { viewBox: "0 0 16 16", width: "10", height: "10", fill: "none", "aria-hidden": "true", children: jsx("path", { d: "M2.5 8l4 4 7-7", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
    }
    if (status === 'processing') {
        return (jsx("span", { className: "cream-timeline__processing-dot", "aria-hidden": "true" }));
    }
    return null;
};
const TimelineItem = ({ title, content, timestamp, status = 'pending', icon, color, className, isLast, mode, direction, index, }) => {
    const isAlternateRight = direction === 'vertical' && mode === 'alternate' && index % 2 !== 0;
    const itemClassName = classNames('cream-timeline__item', `cream-timeline__item--${status}`, {
        'cream-timeline__item--last': isLast,
        'cream-timeline__item--alternate-right': isAlternateRight,
        'cream-timeline__item--mode-right': direction === 'vertical' && mode === 'right',
    }, className);
    const nodeStyle = color
        ? { backgroundColor: color, borderColor: color }
        : {};
    const statusLabel = status === 'completed'
        ? '已完成'
        : status === 'processing'
            ? '进行中'
            : '待处理';
    return (jsxs("li", { className: itemClassName, "aria-label": `时间节点：${statusLabel}`, children: [!isLast && jsx("div", { className: "cream-timeline__tail", "aria-hidden": "true" }), jsx("div", { className: classNames('cream-timeline__node', {
                    'cream-timeline__node--custom': !!icon,
                }), style: nodeStyle, "aria-hidden": "true", children: icon ? (jsx("span", { className: "cream-timeline__node-inner", children: icon })) : (jsx("span", { className: "cream-timeline__node-inner", children: jsx(DefaultIcon, { status: status }) })) }), jsxs("div", { className: "cream-timeline__content", children: [timestamp && (jsx("time", { className: "cream-timeline__timestamp", dateTime: timestamp, children: timestamp })), title && (jsx("div", { className: "cream-timeline__title", children: typeof title === 'string' ? (jsx("span", { className: "cream-timeline__title-text", children: title })) : (title) })), content && jsx("div", { className: "cream-timeline__body", children: content })] })] }));
};
// ===== Timeline 主组件 =====
const Timeline = ({ items = [], direction = 'vertical', mode = 'left', className, style, }) => {
    const rootClassName = classNames('cream-timeline', `cream-timeline--${direction}`, {
        [`cream-timeline--mode-${mode}`]: direction === 'vertical',
    }, className);
    return (jsx("ol", { className: rootClassName, style: style, "aria-label": "\u65F6\u95F4\u8F74", children: items.map((item, index) => (jsx(TimelineItem, { ...item, isLast: index === items.length - 1, mode: mode, direction: direction, index: index }, index))) }));
};

var TagColor;
(function (TagColor) {
    TagColor["Default"] = "default";
    TagColor["Primary"] = "primary";
    TagColor["Success"] = "success";
    TagColor["Warning"] = "warning";
    TagColor["Danger"] = "danger";
    TagColor["Info"] = "info";
})(TagColor || (TagColor = {}));
var TagSize;
(function (TagSize) {
    TagSize["Small"] = "small";
    TagSize["Medium"] = "medium";
    TagSize["Large"] = "large";
})(TagSize || (TagSize = {}));
const Tag = ({ children, color = TagColor.Default, size = TagSize.Medium, clickable = false, closable = false, onClick, onClose, className, }) => {
    const handleClick = (e) => {
        if (clickable && onClick) {
            onClick(e);
        }
    };
    const handleClose = (e) => {
        e.stopPropagation();
        onClose === null || onClose === void 0 ? void 0 : onClose(e);
    };
    return (jsxs("span", { className: `cream-tag cream-tag--${color} cream-tag--${size} ${clickable ? 'cream-tag--clickable' : ''} ${className || ''}`, onClick: handleClick, children: [jsx("span", { className: "cream-tag__text", children: children }), closable && (jsx("span", { className: "cream-tag__close", onClick: handleClose, role: "button", tabIndex: 0, "aria-label": "\u5173\u95ED", children: "\u00D7" }))] }));
};

export { Button, ButtonSize, ButtonType, Card, TransForm as Form, Icon, Input, TransMenu as Menu, Pagination, Progress, TableContainer as Table, Tag, Timeline, Upload };
//# sourceMappingURL=index.esm.js.map
