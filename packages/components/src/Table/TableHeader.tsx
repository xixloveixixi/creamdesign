import { useContext, useCallback } from 'react';
import { TableContext } from './TableContainer';
import Icon from '../Icon';
import {
  faSquare,
  faSquareCheck,
  faCircle,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

export interface TableHeaderProps {}
// 主要是完成表头的渲染
const TableHeader = () => {
  // 获取columns数据：
  const context = useContext(TableContext);

  // 获取数据（可能为 undefined）
  const columns = context?.columns || [];
  const rowSelection = context?.rowSelection;
  const isAllRowsSelected = context?.isAllRowsSelected;
  const isSomeRowsSelected = context?.isSomeRowsSelected;
  const toggleAllRowsSelection = context?.toggleAllRowsSelection;

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
                    color: 'var(--color-primary-500)',
                    fontSize: '20px',
                  }}
                />
              ) : allSelected ? (
                <Icon
                  icon={faSquareCheck}
                  style={{
                    color: 'var(--color-primary-500)',
                    fontSize: '20px',
                  }}
                />
              ) : (
                <Icon
                  icon={faSquare}
                  style={{ color: '#d9d9d9', fontSize: '20px' }}
                />
              )
            ) : (
              <Icon
                icon={faCircle}
                style={{ color: '#d9d9d9', fontSize: '20px' }}
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
          const className = [alignClass, fixedClass].filter(Boolean).join(' ');

          return (
            <th
              key={column.key}
              className={className || undefined}
              style={column.width ? { width: column.width } : undefined}
            >
              {column.title}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
export default TableHeader;
