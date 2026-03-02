import React, { useState, useMemo } from 'react';
import './Pagination.scss';

export interface PaginationProps {
  // 当前页码（从1开始）
  current?: number;
  // 总数据条数
  total: number;
  // 每页显示条数
  pageSize?: number;
  // 页码改变时的回调
  onChange?: (page: number, pageSize: number) => void;
  // 每页条数改变时的回调
  onPageSizeChange?: (pageSize: number) => void;
  //   是否显示每页条数选择器
  showSizeChanger?: boolean;
  //   每页条数选项
  pageSizeOptions?: number[];
  //   是否显示总数
  showTotal?: boolean;
  //   是否显示上一页/下一页按钮
  showPrevNext?: boolean;
  // 自定义类名
  className?: string;
  // 禁用状态
  disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  current: controlledCurrent,
  total,
  pageSize: controlledPageSize = 10,
  onChange,
  onPageSizeChange,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  showTotal = false,
  showPrevNext = true,
  className = '',
  disabled = false,
}) => {
  // 内部状态
  const [internalCurrent, setInternalCurrent] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(controlledPageSize);

  // 使用受控或非受控模式
  const current = controlledCurrent ?? internalCurrent;
  const pageSize = controlledPageSize ?? internalPageSize;

  // 计算总页数
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(total / pageSize));
  }, [total, pageSize]);

  // 更新当前页
  const updateCurrent = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, totalPages));
    if (validPage !== current) {
      if (controlledCurrent === undefined) {
        setInternalCurrent(validPage);
      }
      onChange?.(validPage, pageSize);
    }
  };

  // 更新每页条数
  const updatePageSize = (newPageSize: number) => {
    if (newPageSize !== pageSize) {
      const newTotalPages = Math.max(1, Math.ceil(total / newPageSize));
      const newCurrent = Math.min(current, newTotalPages);

      if (controlledPageSize === undefined) {
        setInternalPageSize(newPageSize);
      }
      if (controlledCurrent === undefined) {
        setInternalCurrent(newCurrent);
      }
      onPageSizeChange?.(newPageSize);
      onChange?.(newCurrent, newPageSize);
    }
  };

  // 生成页码数组
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // 最多显示7个页码按钮

    if (totalPages <= maxVisible) {
      // 如果总页数少于等于7，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 总是显示第一页
      pages.push(1);

      if (current <= 4) {
        // 当前页在前4页
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (current >= totalPages - 3) {
        // 当前页在后4页
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
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

  return (
    <div
      className={`cream-pagination ${disabled ? 'cream-pagination-disabled' : ''} ${className}`.trim()}
      role="navigation"
      aria-label="分页导航"
    >
      {showTotal && (
        <div className="cream-pagination-total">
          共 <strong>{total}</strong> 条
        </div>
      )}

      <div className="cream-pagination-pages">
        {showPrevNext && (
          <button
            className="cream-pagination-item cream-pagination-prev"
            disabled={disabled || current === 1}
            onClick={() => updateCurrent(current - 1)}
            aria-label="上一页"
          >
            ←
          </button>
        )}

        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="cream-pagination-ellipsis"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === current;

          return (
            <button
              key={pageNum}
              className={`cream-pagination-item ${
                isActive ? 'cream-pagination-item-active' : ''
              }`.trim()}
              disabled={disabled}
              onClick={() => updateCurrent(pageNum)}
              aria-label={`第 ${pageNum} 页`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}

        {showPrevNext && (
          <button
            className="cream-pagination-item cream-pagination-next"
            disabled={disabled || current === totalPages}
            onClick={() => updateCurrent(current + 1)}
            aria-label="下一页"
          >
            →
          </button>
        )}
      </div>

      {showSizeChanger && (
        <div className="cream-pagination-options">
          <select
            className="cream-pagination-size-selector"
            value={pageSize}
            onChange={e => updatePageSize(Number(e.target.value))}
            disabled={disabled}
            aria-label="每页显示条数"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size} 条/页
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;
