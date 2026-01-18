import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import './tableStyle.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFoot from './TableFoot';
import { useVirtualList } from './hooks/useVirtualList';

// 定义通用的列接口（使用泛型参数 T 表示行数据类型）
export interface ColumnType<T = any> {
  key: string;
  title: string | ReactNode;
  dataIndex?: string | string[]; // 支持 dataIndex，类似 antd
  width?: number;
  render?: (value: any, record: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

// 分页配置类型（类似 antd）
export interface PaginationConfig {
  current?: number; // 受控模式：当前页码
  defaultCurrent?: number; // 非受控模式：默认页码
  pageSize?: number; // 受控模式：每页条数
  defaultPageSize?: number; // 非受控模式：默认每页条数
  total?: number; // 总数据条数（如果提供，用于服务端分页）
  showSizeChanger?: boolean;
  showTotal?: boolean;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}

// 为了支持 TableProps<DataType>['columns'] 这种用法（类似 antd）
// 创建一个类型，使得 TableProps<DataType>['columns'] 返回 ColumnType<DataType>[]
export interface TableProps<T = any> {
  columns: ColumnType<T>[];
  dataSource?: T[];
  data?: T[];
  pagination?: PaginationConfig | false | true; // 支持 pagination 对象、false 或 true
}

// TableContext 类型定义
export interface TableContextType<T = any> {
  columns: ColumnType<T>[];
  tableData: T[]; // 所有数据
  setTableData?: (data: T[]) => void;
  // 分页相关
  total: number;
  paginatedData: T[]; // 当前页的数据
  setPaginatedData?: (data: T[]) => void; // 用于 TableFoot 更新分页数据
  pagination?: PaginationConfig | false | true; // 分页配置
  // 虚拟滚动相关
  virtualScroll?: VirtualScrollConfig | boolean; // 虚拟滚动配置
}

// 创建 Context，使用泛型
export const TableContext = createContext<TableContextType<any> | undefined>(
  undefined
);

// 虚拟滚动配置
export interface VirtualScrollConfig {
  enabled?: boolean; // 是否启用虚拟滚动
  containerHeight?: number; // 容器高度（px），如果不提供则自动计算
  itemHeight?: number; // 固定行高（px），如果不提供则使用动态高度
  overscan?: number; // 缓冲区渲染数量
}

// TableContainer 组件 - 使用泛型 T
export interface TableContainerProps<T = any> {
  columns: ColumnType<T>[];
  dataSource?: T[]; // 数据源（类似 antd）
  pagination?: PaginationConfig | false | true; // 分页配置（类似 antd：true/undefined 使用默认，false 禁用，对象为配置）
  virtualScroll?: VirtualScrollConfig | boolean; // 虚拟滚动配置
}

const TableContainer = <T extends Record<string, any> = any>(
  props: TableContainerProps<T>
) => {
  const { columns, dataSource, pagination, virtualScroll } = props;

  // 支持 dataSource 和 data，优先使用 dataSource（类似 antd）
  const initialData = dataSource ?? [];
  const [tableData, setTableData] = useState<T[]>(initialData);
  const [paginatedData, setPaginatedData] = useState<T[]>(initialData);

  // 计算 total：初始使用 dataSource.length，TableFoot 会根据 pagination.total 更新
  const total = tableData.length;

  // 处理虚拟滚动配置
  const virtualScrollConfig: VirtualScrollConfig | undefined =
    typeof virtualScroll === 'boolean'
      ? virtualScroll
        ? { enabled: true }
        : undefined
      : virtualScroll;

  // 通过 context 传递数据
  const contextValue: TableContextType<T> = {
    columns,
    tableData,
    setTableData,
    total,
    paginatedData,
    setPaginatedData,
    pagination,
    virtualScroll: virtualScrollConfig,
  };

  return (
    <TableContext.Provider value={contextValue}>
      <div className="cream-table-container">
        <table className="cream-table">
          <TableHeader />
          <TableBody />
          <TableFoot />
        </table>
      </div>
    </TableContext.Provider>
  );
};

export default TableContainer;
