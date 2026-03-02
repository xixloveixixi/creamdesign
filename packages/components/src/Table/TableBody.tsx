import { memo, useContext, useCallback } from 'react';
import { TableContext } from './TableContainer';
import Icon from '../Icon';
import {
  faSquare,
  faSquareCheck,
  faCircle,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

// 使用reactmemo优化
const TableBody = memo(() => {
  // 从context中获取数据
  const context = useContext(TableContext);

  // 使用分页后的数据（可能为 undefined）
  const paginatedData = context?.paginatedData || [];
  const columns = context?.columns || [];
  const rowSelection = context?.rowSelection;
  const isRowSelected = context?.isRowSelected;
  const toggleRowSelection = context?.toggleRowSelection;

  const isRowSelectionEnabled = !!rowSelection;
  const selectionType = rowSelection?.type || 'checkbox';
  const columnWidth = rowSelection?.columnWidth || 80;
  const getCheckboxProps = rowSelection?.getCheckboxProps;

  // 渲染选择列单元格（必须在早期返回之前定义）
  const renderSelectionCell = useCallback(
    (record: any) => {
      if (!isRowSelectionEnabled) {
        return null;
      }

      const selected = isRowSelected?.(record) || false;
      const checkboxProps = getCheckboxProps?.(record) || {};
      const disabled = checkboxProps.disabled || false;

      const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!disabled && toggleRowSelection) {
          toggleRowSelection(record);
        }
      };

      return (
        <td
          className="cream-table-selection-column"
          style={{
            width: `${columnWidth}px`,
            minWidth: `${columnWidth}px`,
            maxWidth: `${columnWidth}px`,
            textAlign: 'center',
            padding: '0.75rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            position: 'relative',
          }}
          onClick={handleClick}
          onMouseDown={e => {
            if (!disabled) {
              e.preventDefault(); // 防止拖拽选中文本
            }
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              minHeight: '40px',
              minWidth: '40px',
            }}
          >
            {selectionType === 'checkbox' ? (
              selected ? (
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
            ) : selected ? (
              <Icon
                icon={faCircleCheck}
                style={{ color: 'var(--color-primary-500)', fontSize: '20px' }}
              />
            ) : (
              <Icon
                icon={faCircle}
                style={{ color: '#d9d9d9', fontSize: '20px' }}
              />
            )}
          </div>
        </td>
      );
    },
    [
      isRowSelectionEnabled,
      selectionType,
      columnWidth,
      isRowSelected,
      toggleRowSelection,
      getCheckboxProps,
    ]
  );

  // 早期返回必须在所有 Hooks 之后
  if (!context) {
    return null;
  }

  return (
    <tbody>
      {paginatedData.map((item, rowIndex) => {
        const selected = isRowSelected?.(item) || false;
        return (
          <tr
            key={item.key || rowIndex}
            className={selected ? 'selected' : undefined}
          >
            {renderSelectionCell(item)}
            {columns.map(column => {
              const alignClass = column.align
                ? `text-${column.align === 'center' ? 'center' : column.align === 'right' ? 'right' : 'left'}`
                : 'text-left';
              const fixedClass = column.fixed ? `fixed-${column.fixed}` : '';
              const className = [alignClass, fixedClass]
                .filter(Boolean)
                .join(' ');

              // 获取单元格值：优先使用 dataIndex，否则使用 key
              const getCellValue = (record: any, column: any) => {
                if (column.dataIndex) {
                  if (Array.isArray(column.dataIndex)) {
                    // 支持嵌套路径，如 ['user', 'name']
                    return column.dataIndex.reduce(
                      (obj: any, key: string) => obj?.[key],
                      record
                    );
                  } else {
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

              return (
                <td
                  key={column.key}
                  className={className || undefined}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {cellContent}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
});
export default TableBody;
