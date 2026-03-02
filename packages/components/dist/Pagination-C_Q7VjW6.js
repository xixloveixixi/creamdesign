import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';

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

export { Pagination as P };
