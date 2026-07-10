import { useContext, useCallback, useState, type ReactNode } from 'react';
import classNames from 'classnames';
import { TableContext } from './TableContext';
import type { TableFilterValue, TableSortOrder } from './TableContext';
import Icon from '../Icon';
import {
  faSquare,
  faSquareCheck,
  faCircle,
  faSort,
  faSortUp,
  faSortDown,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';

export interface TableHeaderProps {}

const getAriaSort = (
  order: TableSortOrder
): 'ascending' | 'descending' | 'none' => {
  if (order === 'ascend') {
    return 'ascending';
  }

  if (order === 'descend') {
    return 'descending';
  }

  return 'none';
};

const getSortLabel = (title: ReactNode, order: TableSortOrder) => {
  const titleText = typeof title === 'string' ? title : '当前列';

  if (order === 'ascend') {
    return `${titleText} 当前升序，点击切换为降序`;
  }

  if (order === 'descend') {
    return `${titleText} 当前降序，点击取消排序`;
  }

  return `${titleText} 当前未排序，点击切换为升序`;
};

// 主要是完成表头的渲染
const TableHeader = () => {
  // 获取columns数据：
  const context = useContext(TableContext);
  const [openFilterColumnKey, setOpenFilterColumnKey] = useState<string | null>(
    null
  );

  // 获取数据（可能为 undefined）
  const columns = context?.columns || [];
  const rowSelection = context?.rowSelection;
  const isAllRowsSelected = context?.isAllRowsSelected;
  const isSomeRowsSelected = context?.isSomeRowsSelected;
  const toggleAllRowsSelection = context?.toggleAllRowsSelection;
  const sorterState = context?.sorterState;
  const filterState = context?.filterState || {};
  const loading = !!context?.loading;
  const toggleSort = context?.toggleSort;
  const toggleFilter = context?.toggleFilter;
  const clearFilter = context?.clearFilter;
  const isColumnFiltered = context?.isColumnFiltered;

  const isRowSelectionEnabled = !!rowSelection;
  const selectionType = rowSelection?.type || 'checkbox';
  const hideSelectAll = rowSelection?.hideSelectAll || false;
  const columnWidth = rowSelection?.columnWidth || 80;
  const columnTitle = rowSelection?.columnTitle;

  // 处理全选/反选（必须在早期返回之前定义）
  const handleSelectAll = useCallback(() => {
    if (toggleAllRowsSelection) {
      const allSelected = isAllRowsSelected?.() || false;
      toggleAllRowsSelection(!allSelected);
    }
  }, [toggleAllRowsSelection, isAllRowsSelected]);

  const handleSort = useCallback(
    (columnKey: string) => {
      if (loading) {
        return;
      }

      toggleSort?.(columnKey);
    },
    [loading, toggleSort]
  );

  const handleToggleFilterPanel = useCallback(
    (columnKey: string) => {
      if (loading) {
        return;
      }

      setOpenFilterColumnKey(currentKey =>
        currentKey === columnKey ? null : columnKey
      );
    },
    [loading]
  );

  const handleFilterChange = useCallback(
    (columnKey: string, value: TableFilterValue) => {
      if (loading) {
        return;
      }

      toggleFilter?.(columnKey, value);
    },
    [loading, toggleFilter]
  );

  const handleClearFilter = useCallback(
    (columnKey: string) => {
      if (loading) {
        return;
      }

      clearFilter?.(columnKey);
      setOpenFilterColumnKey(null);
    },
    [clearFilter, loading]
  );

  // 渲染选择列表头
  const renderSelectionHeader = () => {
    if (!isRowSelectionEnabled || hideSelectAll) {
      return null;
    }

    const allSelected = isAllRowsSelected?.() || false;
    const someSelected = isSomeRowsSelected?.() || false;

    return (
      <th
        className="cream-table-selection-column"
        style={{
          width: `${columnWidth}px`,
          minWidth: `${columnWidth}px`,
          maxWidth: `${columnWidth}px`,
          textAlign: 'center',
          padding: '0.75rem',
        }}
      >
        {columnTitle || (
          <div
            onClick={handleSelectAll}
            onMouseDown={e => e.preventDefault()} // 防止拖拽选中文本
            style={{
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              width: '100%',
              height: '100%',
              minHeight: '40px',
              minWidth: '40px',
            }}
            title={allSelected ? '取消全选' : '全选'}
          >
            {selectionType === 'checkbox' ? (
              someSelected ? (
                <Icon
                  icon={faSquareCheck}
                  style={{
                    color:
                      'var(--cream-table-row-selected-border-color, var(--cream-color-primary, #a855f7))',
                    fontSize: '20px',
                  }}
                />
              ) : allSelected ? (
                <Icon
                  icon={faSquareCheck}
                  style={{
                    color:
                      'var(--cream-table-row-selected-border-color, var(--cream-color-primary, #a855f7))',
                    fontSize: '20px',
                  }}
                />
              ) : (
                <Icon
                  icon={faSquare}
                  style={{
                    color: 'var(--cream-color-border, #d9d9d9)',
                    fontSize: '20px',
                  }}
                />
              )
            ) : (
              <Icon
                icon={faCircle}
                style={{
                  color: 'var(--cream-color-border, #d9d9d9)',
                  fontSize: '20px',
                }}
              />
            )}
          </div>
        )}
      </th>
    );
  };

  // 早期返回必须在所有 Hooks 之后
  if (!context) {
    return null;
  }

  return (
    <thead>
      <tr>
        {renderSelectionHeader()}
        {columns.map(column => {
          const alignClass = column.align
            ? `text-${column.align === 'center' ? 'center' : column.align === 'right' ? 'right' : 'left'}`
            : 'text-left';
          const fixedClass = column.fixed ? `fixed-${column.fixed}` : '';
          const hasSorter = typeof column.sorter === 'function';
          const hasFilter =
            Array.isArray(column.filters) &&
            column.filters.length > 0 &&
            typeof column.onFilter === 'function';
          const currentSortOrder =
            hasSorter && sorterState?.columnKey === column.key
              ? sorterState.order
              : null;
          const selectedFilterValues = filterState[column.key] || [];
          const columnFiltered =
            isColumnFiltered?.(column.key) ?? selectedFilterValues.length > 0;
          const isFilterPanelOpen = openFilterColumnKey === column.key;
          const className = classNames(alignClass, fixedClass, {
            'cream-table-column-sortable': hasSorter,
            'cream-table-column-filterable': hasFilter,
            'cream-table-column-filter-open': isFilterPanelOpen,
          });
          const sortIcon =
            currentSortOrder === 'ascend'
              ? faSortUp
              : currentSortOrder === 'descend'
                ? faSortDown
                : faSort;

          return (
            <th
              key={column.key}
              className={className || undefined}
              style={column.width ? { width: column.width } : undefined}
              aria-sort={hasSorter ? getAriaSort(currentSortOrder) : undefined}
            >
              {hasSorter || hasFilter ? (
                <div className="cream-table-header-content">
                  <span className="cream-table-header-title">
                    {column.title}
                  </span>
                  <span className="cream-table-header-actions">
                    {hasSorter && (
                      <button
                        type="button"
                        className={classNames('cream-table-sort-button', {
                          'cream-table-sort-button-active': currentSortOrder,
                        })}
                        aria-label={getSortLabel(
                          column.title,
                          currentSortOrder
                        )}
                        disabled={loading}
                        onClick={() => handleSort(column.key)}
                      >
                        <Icon icon={sortIcon} />
                      </button>
                    )}
                    {hasFilter && (
                      <button
                        type="button"
                        className={classNames('cream-table-filter-button', {
                          'cream-table-filter-button-active': columnFiltered,
                        })}
                        aria-label={`${typeof column.title === 'string' ? column.title : '当前列'}筛选`}
                        aria-expanded={isFilterPanelOpen}
                        disabled={loading}
                        onClick={() => handleToggleFilterPanel(column.key)}
                      >
                        <Icon icon={faFilter} />
                      </button>
                    )}
                  </span>
                </div>
              ) : (
                column.title
              )}
              {hasFilter && isFilterPanelOpen && (
                <div
                  className="cream-table-filter-panel"
                  role="group"
                  aria-label={`${typeof column.title === 'string' ? column.title : '当前列'}筛选选项`}
                >
                  <div className="cream-table-filter-options">
                    {column.filters?.map((filter, filterIndex) => {
                      const inputId = `cream-table-filter-${column.key}-${filterIndex}`;
                      const checked = selectedFilterValues.includes(
                        filter.value
                      );

                      return (
                        <label
                          key={String(filter.value)}
                          className="cream-table-filter-option"
                          htmlFor={inputId}
                        >
                          <input
                            id={inputId}
                            type="checkbox"
                            checked={checked}
                            disabled={loading}
                            onChange={() =>
                              handleFilterChange(column.key, filter.value)
                            }
                          />
                          <span>{filter.text}</span>
                        </label>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    className="cream-table-filter-clear"
                    disabled={loading || selectedFilterValues.length === 0}
                    onClick={() => handleClearFilter(column.key)}
                  >
                    清空
                  </button>
                </div>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
export default TableHeader;
