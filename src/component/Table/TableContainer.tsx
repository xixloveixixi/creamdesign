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
import { useVirtualScroll } from './hooks/useVirtualScroll.ts';
import VirtualScrollBody from './TableVirtualBody';
import { useDevice } from '../../hooks/useDevice';

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
  containerRef?: React.RefObject<HTMLDivElement | null>;
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

  // 设备检测
  const device = useDevice();

  const [tableData, setTableData] = useState<T[]>(dataSource ?? []);
  const [paginatedData, setPaginatedData] = useState<T[]>(dataSource ?? []);

  // 容器和表头的 ref
  const containerRef = useRef<HTMLDivElement>(null); //容器ref
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

    setContainerHeight(visibleHeight);
    setHeaderHeight(header);
    setFooterHeight(footer);
    return visibleHeight;
  }, []);

  // 在布局完成后计算高度
  useLayoutEffect(() => {
    if (!virtual) return;

    // 延迟一帧确保 DOM 已渲染
    requestAnimationFrame(() => {
      calculateVisibleHeight();
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
  // 移动端自动禁用虚拟滚动，平板和桌面根据配置决定
  const virtualConfig = useMemo(() => {
    // 移动端禁用虚拟滚动（性能考虑，移动端通常数据量不大）
    if (device.isMobile) {
      return { enabled: false };
    }

    // 如果用户明确禁用，则禁用
    if (!virtual) return { enabled: false };

    // 计算可视区域高度（容器高度 - 表头高度 - 表尾高度）
    const visibleHeight = Math.max(
      0,
      containerHeight - headerHeight - footerHeight
    );
    const effectiveHeight = visibleHeight > 0 ? visibleHeight : 400; // 如果还没计算出来，使用默认值

    const defaultConfig: VirtualScrollConfig = {
      enabled: true,
      rowHeight: device.isTablet ? 45 : 50, // 平板端行高稍小
      containerHeight: effectiveHeight,
      overscan: device.isTablet ? 3 : 2, // 平板端增加预渲染行数
    };

    if (typeof virtual === 'boolean') {
      return defaultConfig;
    }

    return {
      ...defaultConfig,
      ...virtual,
      containerHeight: virtual.containerHeight ?? effectiveHeight,
    };
  }, [
    virtual,
    containerHeight,
    headerHeight,
    footerHeight,
    device.isMobile,
    device.isTablet,
  ]);

  // 使用虚拟滚动 Hook
  const virtualScroll = useVirtualScroll({
    data: paginatedData,
    estimateSize: virtualConfig.rowHeight || 50,
    containerHeight: virtualConfig.containerHeight || 400, // 使用计算出的容器高度
    overscan: virtualConfig.overscan || 2,
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

  // 根据设备类型添加响应式类名（移动端保持表格布局，不需要特殊类名）
  const tableClassName = 'cream-table';

  return (
    <TableContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className="cream-table-container"
        style={virtualConfig.enabled ? { overflow: 'hidden' } : undefined}
      >
        <table ref={tableRef} className={tableClassName}>
          <TableHeader />
          {virtualConfig.enabled ? <VirtualScrollBody /> : <TableBody />}
          <TableFoot />
        </table>
      </div>
    </TableContext.Provider>
  );
};

export default TableContainer;
