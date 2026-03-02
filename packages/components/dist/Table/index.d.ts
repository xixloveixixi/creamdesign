export { default } from './TableContainer';
//# sourceMappingURL=index.d.ts.map, memo, useState, useMemo, useRef, useEffect, createContext, useLayoutEffect } from 'react';
import { I as Icon } from '../Icon-DLU6rUc2.js';
import { faSquareCheck, faSquare, faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { P as Pagination } from '../Pagination-C_Q7VjW6.js';
import '@fortawesome/react-fontawesome';
import 'classnames';

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

export { TableContainer as default };
