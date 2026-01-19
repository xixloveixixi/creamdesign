import {
  useContext,
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { TableContext } from './TableContainer';
import { useVirtualScroll } from './hooks/useVirtualScroll.ts';

const TableVirtualBody = () => {
  const context = useContext(TableContext);

  // 必须无条件地调用所有 Hook
  const containerRef = useRef<HTMLDivElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const [isMounted, setIsMounted] = useState(false);

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
    estimateSize: virtualConfig.rowHeight || 50,
    containerHeight: virtualConfig.containerHeight || 400,
    overscan: virtualConfig.overscan,
    getKey: (item: any, index: number) => item.key || item.id || index,
  });

  // 处理滚动
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    },
    [setScrollTop]
  );

  // 计算列宽
  const columnWidths = useMemo(() => {
    return columns.map(col => col.width || 'auto');
  }, [columns]);

  // 设置 mounted 状态
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 如果没有 context 或没有数据
  if (!hasValidContext) {
    return null;
  }

  if (!paginatedData || paginatedData.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} style={{ textAlign: 'center' }}>
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
          colSpan={columns.length}
          style={{
            padding: 0,
            border: 0,
            height: virtualConfig.containerHeight || '100%',
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

                    return (
                      <tr
                        key={item.key || actualIndex}
                        ref={node => measureElement(node, actualIndex)}
                        data-index={actualIndex}
                      >
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
