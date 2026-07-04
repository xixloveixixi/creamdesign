import {
  createContext,
  type ReactNode,
  type RefObject,
  type UIEvent,
} from 'react';

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
  rowHeight?: number; // 固定行高（所有行使用相同高度）
  containerHeight?: number;
  overscan?: number;
}

// 行选择配置
export interface RowSelectionConfig<T = any> {
  type?: 'checkbox' | 'radio'; // 选择类型：复选或单选，默认为 checkbox
  selectedRowKeys?: (string | number)[]; // 受控模式：选中的行 key 数组
  defaultSelectedRowKeys?: (string | number)[]; // 非受控模式：默认选中的行 key 数组
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void; // 选中项变化时的回调
  onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void; // 用户手动选择/取消选择某行的回调
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void; // 用户手动选择/取消选择所有行的回调
  getCheckboxProps?: (record: T) => { disabled?: boolean }; // 选择框的默认属性配置
  hideSelectAll?: boolean; // 隐藏全选选择框（仅对 checkbox 有效）
  fixed?: boolean; // 选择列是否固定，默认为 false
  columnWidth?: number; // 选择列宽度，默认为 80px
  columnTitle?: ReactNode; // 自定义选择列的表头，默认为空
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
  containerRef?: RefObject<HTMLDivElement | null>;
  handleScroll?: (e: UIEvent<HTMLDivElement>) => void;
  // 行选择相关
  rowSelection?: RowSelectionConfig<T>;
  selectedRowKeys?: (string | number)[];
  setSelectedRowKeys?: (keys: (string | number)[]) => void;
  isRowSelected?: (record: T) => boolean;
  toggleRowSelection?: (record: T, selected?: boolean) => void;
  toggleAllRowsSelection?: (selected?: boolean) => void;
  isAllRowsSelected?: () => boolean;
  isSomeRowsSelected?: () => boolean;
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
  rowSelection?: RowSelectionConfig<T>; // 行选择配置
}
