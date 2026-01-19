import { createContext, useState, ReactNode, useMemo } from 'react';
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

  // 解析虚拟滚动配置
  const virtualConfig = useMemo(() => {
    if (!virtual) return { enabled: false };

    const defaultConfig: VirtualScrollConfig = {
      enabled: true,
      rowHeight: 50,
      containerHeight: 400,
      overscan: 5,
    };

    if (typeof virtual === 'boolean') {
      return defaultConfig;
    }

    return {
      ...defaultConfig,
      ...virtual,
    };
  }, [virtual]);

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
    paginatedData: paginatedData,
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
      <div className="cream-table-container">
        <table className="cream-table">
          <TableHeader />
          {virtualConfig.enabled ? <VirtualScrollBody /> : <TableBody />}
          <TableFoot />
        </table>
      </div>
    </TableContext.Provider>
  );
};

export default TableContainer;
