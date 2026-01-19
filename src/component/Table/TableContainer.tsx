import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import './tableStyle.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFoot from './TableFoot';
import { useTableVirtualScroll } from './hooks/useVirtualScroll.ts';
import VirtualScrollBody from './TableVirtualBody';

// 定义通用的列接口
export interface ColumnType<T = any> {
  key: string;
  title: string | ReactNode;
  dataIndex?: string | string[];
  width?: number;
  render?: (value: any, record: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

// 分页配置类型
export interface PaginationConfig {
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  defaultPageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  showTotal?: boolean;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}

// 虚拟滚动配置
export interface VirtualScrollConfig {
  enabled?: boolean;
  rowHeight?: number;
  containerHeight?: number;
  overscan?: number;
}

// TableContext 类型定义
export interface TableContextType<T = any> {
  columns: ColumnType<T>[];
  tableData: T[];
  setTableData?: (data: T[]) => void;
  total: number;
  paginatedData: T[];
  setPaginatedData?: (data: T[]) => void;
  pagination?: PaginationConfig | false | true;
  virtual?: VirtualScrollConfig | boolean;
  // 虚拟滚动相关
  virtualItems?: T[];
  totalHeight?: number;
  startOffset?: number;
  measureRowElement?: (node: HTMLDivElement | null, index: number) => void;
  containerRef?: React.RefObject<HTMLDivElement>;
  handleScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

// 创建 Context
export const TableContext = createContext<TableContextType<any> | undefined>(
  undefined
);

// TableContainer 组件
export interface TableProps<T = any> {
  columns: ColumnType<T>[];
  dataSource?: T[];
  pagination?: PaginationConfig | false | true;
  virtual?: VirtualScrollConfig | boolean;
}

const TableContainer = <T extends Record<string, any> = any>(
  props: TableProps<T>
) => {
  const { columns, dataSource, pagination, virtual } = props;

  // 支持 dataSource 和 data，优先使用 dataSource
  const initialData = dataSource ?? [];
  const [tableData, setTableData] = useState<T[]>(initialData);
  const [paginatedData, setPaginatedData] = useState<T[]>(initialData);

  // 容器和表头的 ref
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(400);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [footerHeight, setFooterHeight] = useState<number>(0);

  // 计算实际可视区域高度（容器高度 - 表头高度 - 表尾高度）
  const calculateVisibleHeight = useCallback(() => {
    if (!containerRef.current || !tableRef.current) return;

    const container = containerRef.current;
    const table = tableRef.current;
    const thead = table.querySelector('thead');
    const tfoot = table.querySelector('tfoot');

    const totalHeight = container.clientHeight;
    const header = thead?.offsetHeight || 0;
    const footer = tfoot?.offsetHeight || 0;

    const visibleHeight = Math.max(0, totalHeight - header - footer);

    setContainerHeight(totalHeight);
    setHeaderHeight(header);
    setFooterHeight(footer);

    return visibleHeight;
  }, []);

  // 在布局完成后计算高度
  useLayoutEffect(() => {
    if (!virtual) return;

    // 延迟一帧确保 DOM 已渲染
    requestAnimationFrame(() => {
      const visibleHeight = calculateVisibleHeight();
      if (visibleHeight !== undefined && visibleHeight > 0) {
        // 高度已更新到 state
      }
    });
  }, [virtual, calculateVisibleHeight, columns]);

  // 监听容器尺寸变化
  useEffect(() => {
    if (!virtual || !containerRef.current) return;

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
    if (!virtual) return { enabled: false };

    // 计算可视区域高度（容器高度 - 表头高度 - 表尾高度）
    const visibleHeight = Math.max(
      0,
      containerHeight - headerHeight - footerHeight
    );
    const effectiveHeight = visibleHeight > 0 ? visibleHeight : 400; // 如果还没计算出来，使用默认值

    const defaultConfig: VirtualScrollConfig = {
      enabled: true,
      rowHeight: 50,
      containerHeight: effectiveHeight,
      overscan: 5,
    };

    if (typeof virtual === 'boolean') {
      return defaultConfig;
    }

    return {
      ...defaultConfig,
      ...virtual,
      // 如果用户没有指定 containerHeight，使用计算出的值
      containerHeight: virtual.containerHeight ?? effectiveHeight,
    };
  }, [virtual, containerHeight, headerHeight, footerHeight]);

  // 使用虚拟滚动 Hook
  const virtualScroll = useTableVirtualScroll({
    data: paginatedData,
    rowHeight: virtualConfig.rowHeight, //预估高度
    containerHeight: virtualConfig.containerHeight, //容器高度
    overscan: virtualConfig.overscan, //缓冲区大小
    enabled: virtualConfig.enabled!, //是否启用虚拟滚动
  });

  // 计算 total
  const total = tableData.length;

  // 通过 context 传递数据
  const contextValue: TableContextType<T> = {
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
  };

  return (
    <TableContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className="cream-table-container"
        style={virtualConfig.enabled ? { overflow: 'hidden' } : undefined}
      >
        <table ref={tableRef} className="cream-table">
          <TableHeader />
          {virtualConfig.enabled ? <VirtualScrollBody /> : <TableBody />}
          <TableFoot />
        </table>
      </div>
    </TableContext.Provider>
  );
};

export default TableContainer;
