import { useContext, useRef, useCallback, useMemo } from 'react';
import { TableContext } from './TableContainer';
import { useVirtualScroll } from './hooks/useVirtualScroll.ts';
import Icon from '../Icon';
import {
  faSquare,
  faSquareCheck,
  faCircle,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

const TableVirtualBody = () => {
  const context = useContext(TableContext);

  // 必须无条件地调用所有 Hook
  const containerRef = useRef<HTMLDivElement>(null);

  // 无条件地调用 useCallback
  const getCellValue = useCallback((record: any, column: any) => {
    if (column.dataIndex) {
      if (Array.isArray(column.dataIndex)) {
        return column.dataIndex.reduce(
          (obj: any, key: string) => obj?.[key],
          record
        );
      } else {
        return record[column.dataIndex];
      }
    }
    return record[column.key];
  }, []);

  // 检查是否有有效的 context
  const hasValidContext = !!context;
  const columns = context?.columns || [];
  const paginatedData = context?.paginatedData || [];
  const virtual = context?.virtual;
  const rowSelection = context?.rowSelection;
  const isRowSelected = context?.isRowSelected;
  const toggleRowSelection = context?.toggleRowSelection;

  const isRowSelectionEnabled = !!rowSelection;
  const selectionType = rowSelection?.type || 'checkbox';
  const columnWidth = rowSelection?.columnWidth || 80;
  const getCheckboxProps = rowSelection?.getCheckboxProps;

  // 解析虚拟滚动配置
  const virtualConfig = useMemo(() => {
    if (!virtual) return { enabled: false };

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
  const {
    virtualItems,
    totalHeight,
    startOffset,
    setScrollTop,
    measureElement,
    startIndex,
  } = useVirtualScroll({
    data: virtualConfig.enabled ? paginatedData : [],
    estimateSize:
      virtualConfig.enabled && 'rowHeight' in virtualConfig
        ? virtualConfig.rowHeight || 50
        : 50,
    containerHeight:
      virtualConfig.enabled && 'containerHeight' in virtualConfig
        ? virtualConfig.containerHeight || 400
        : 400,
    overscan:
      virtualConfig.enabled && 'overscan' in virtualConfig
        ? virtualConfig.overscan
        : 2,
  });

  // 处理滚动
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    },
    [setScrollTop]
  );

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
  if (!hasValidContext) {
    return null;
  }

  // 计算 colSpan（包括选择列）
  const colSpan = isRowSelectionEnabled ? columns.length + 1 : columns.length;

  if (!paginatedData || paginatedData.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={colSpan} style={{ textAlign: 'center' }}>
            暂无数据
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {/* 虚拟滚动行 - 占据整个表格宽度 */}
      <tr className="cream-table-virtual-row">
        <td
          colSpan={colSpan}
          style={{
            padding: 0,
            border: 0,
            height:
              virtualConfig.enabled && 'containerHeight' in virtualConfig
                ? virtualConfig.containerHeight || '100%'
                : '100%',
          }}
        >
          <div
            ref={containerRef}
            className="cream-table-virtual-container"
            style={{
              height: '100%',
              overflow: 'auto',
              position: 'relative',
            }}
            onScroll={handleScroll}
          >
            {/* 占位层，确定滚动区域高度 */}
            <div style={{ height: totalHeight }} />

            {/* 渲染层 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${startOffset}px)`,
              }}
            >
              {/* 虚拟表格 */}
              <table
                className="cream-table"
                style={{ width: '100%', scrollbarWidth: 'none' }}
              >
                <tbody>
                  {virtualItems.map((item, idx) => {
                    const actualIndex = startIndex + idx;
                    const selected = isRowSelected?.(item) || false;

                    return (
                      <tr
                        key={item.key || actualIndex}
                        ref={node => measureElement(node, actualIndex)}
                        data-index={actualIndex}
                        className={selected ? 'selected' : undefined}
                      >
                        {renderSelectionCell(item)}
                        {columns.map(column => {
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

                          return (
                            <td
                              key={column.key}
                              className={className || undefined}
                              style={
                                column.width
                                  ? { width: column.width }
                                  : undefined
                              }
                            >
                              {cellContent}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default TableVirtualBody;
