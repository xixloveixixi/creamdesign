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
  containerRef?: React.RefObject<HTMLDivElement | null>;
  handleScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
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

const TableContainer = <T extends Record<string, any> = any>(
  props: TableProps<T>
) => {
  const { columns, dataSource, pagination, virtual, rowSelection } = props;

  const [tableData, setTableData] = useState<T[]>(dataSource ?? []);
  const [paginatedData, setPaginatedData] = useState<T[]>(dataSource ?? []);

  // 同步 dataSource 变化
  useEffect(() => {
    if (dataSource !== undefined) {
      setTableData(dataSource);
    }
  }, [dataSource]);

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
  const virtualConfig = useMemo(() => {
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
      rowHeight: 50,
      containerHeight: effectiveHeight,
      overscan: 2,
    };

    if (typeof virtual === 'boolean') {
      return defaultConfig;
    }

    return {
      ...defaultConfig,
      ...virtual,
      containerHeight: virtual.containerHeight ?? effectiveHeight,
    };
  }, [virtual, containerHeight, headerHeight, footerHeight]);

  // 使用虚拟滚动 Hook（固定高度模式）
  const virtualScroll = useVirtualScroll({
    data: paginatedData,
    estimateSize: virtualConfig.rowHeight || 50, // 固定行高
    containerHeight: virtualConfig.containerHeight || 400, // 使用计算出的容器高度
    overscan: virtualConfig.overscan || 2,
  });

  // 计算 total
  const total = tableData.length;

  // ==================== 行选择相关逻辑 ====================
  const isRowSelectionEnabled = !!rowSelection;
  const selectionType = rowSelection?.type || 'checkbox';
  const isControlled = rowSelection?.selectedRowKeys !== undefined;

  // 选中状态管理
  const [internalSelectedRowKeys, setInternalSelectedRowKeys] = useState<
    (string | number)[]
  >(rowSelection?.defaultSelectedRowKeys || []);

  const selectedRowKeys = isControlled
    ? rowSelection!.selectedRowKeys!
    : internalSelectedRowKeys;

  const setSelectedRowKeys = useCallback(
    (keys: (string | number)[]) => {
      if (!isControlled) {
        setInternalSelectedRowKeys(keys);
      }

      // 获取选中的行数据
      const selectedRows = tableData.filter(item => {
        const key = (item as any).key;
        return keys.includes(key);
      });

      // 触发 onChange 回调
      if (rowSelection?.onChange) {
        rowSelection.onChange(keys, selectedRows);
      }
    },
    [isControlled, tableData, rowSelection]
  );

  // 判断某行是否被选中
  const isRowSelected = useCallback(
    (record: T): boolean => {
      const key = (record as any).key;
      return selectedRowKeys.includes(key);
    },
    [selectedRowKeys]
  );

  // 切换某行的选中状态
  const toggleRowSelection = useCallback(
    (record: T, selected?: boolean) => {
      const key = (record as any).key;
      const currentSelected = isRowSelected(record);
      const newSelected = selected !== undefined ? selected : !currentSelected;

      let newSelectedRowKeys: (string | number)[];
      if (selectionType === 'radio') {
        // 单选模式：只能选中一个
        newSelectedRowKeys = newSelected ? [key] : [];
      } else {
        // 复选模式
        if (newSelected) {
          newSelectedRowKeys = [...selectedRowKeys, key];
        } else {
          newSelectedRowKeys = selectedRowKeys.filter(k => k !== key);
        }
      }

      setSelectedRowKeys(newSelectedRowKeys);

      // 触发 onSelect 回调
      if (rowSelection?.onSelect) {
        const selectedRows = tableData.filter(item => {
          const itemKey = (item as any).key;
          return newSelectedRowKeys.includes(itemKey);
        });
        rowSelection.onSelect(record, newSelected, selectedRows);
      }
    },
    [selectedRowKeys, selectionType, tableData, rowSelection, isRowSelected]
  );

  // 切换所有行的选中状态
  const toggleAllRowsSelection = useCallback(
    (selected?: boolean) => {
      if (selectionType === 'radio') {
        // 单选模式不支持全选
        return;
      }

      const currentData = paginatedData;
      const allKeys = currentData.map(item => (item as any).key);
      const allSelected = allKeys.every(key => selectedRowKeys.includes(key));
      const newSelected = selected !== undefined ? selected : !allSelected;

      let newSelectedRowKeys: (string | number)[];
      if (newSelected) {
        // 合并当前选中和当前页的所有 key
        newSelectedRowKeys = Array.from(
          new Set([...selectedRowKeys, ...allKeys])
        );
      } else {
        // 移除当前页的所有 key
        newSelectedRowKeys = selectedRowKeys.filter(
          key => !allKeys.includes(key)
        );
      }

      const changeRows = currentData.filter(item => {
        const key = (item as any).key;
        return newSelected
          ? !selectedRowKeys.includes(key)
          : selectedRowKeys.includes(key);
      });

      setSelectedRowKeys(newSelectedRowKeys);

      // 触发 onSelectAll 回调
      if (rowSelection?.onSelectAll) {
        const selectedRows = tableData.filter(item => {
          const itemKey = (item as any).key;
          return newSelectedRowKeys.includes(itemKey);
        });
        rowSelection.onSelectAll(newSelected, selectedRows, changeRows);
      }
    },
    [
      selectedRowKeys,
      paginatedData,
      selectionType,
      tableData,
      rowSelection,
      setSelectedRowKeys,
    ]
  );

  // 判断是否所有行都被选中
  const isAllRowsSelected = useCallback((): boolean => {
    if (selectionType === 'radio') {
      return false;
    }
    const currentData = paginatedData;
    if (currentData.length === 0) return false;
    return currentData.every(item => {
      const key = (item as any).key;
      return selectedRowKeys.includes(key);
    });
  }, [paginatedData, selectedRowKeys, selectionType]);

  // 判断是否部分行被选中
  const isSomeRowsSelected = useCallback((): boolean => {
    if (selectionType === 'radio') {
      return false;
    }
    const currentData = paginatedData;
    if (currentData.length === 0) return false;
    const selectedCount = currentData.filter(item => {
      const key = (item as any).key;
      return selectedRowKeys.includes(key);
    }).length;
    return selectedCount > 0 && selectedCount < currentData.length;
  }, [paginatedData, selectedRowKeys, selectionType]);

  // 同步受控的 selectedRowKeys
  useEffect(() => {
    if (isControlled && rowSelection?.selectedRowKeys) {
      setInternalSelectedRowKeys(rowSelection.selectedRowKeys);
    }
  }, [isControlled, rowSelection?.selectedRowKeys]);

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
    // 行选择相关
    rowSelection: isRowSelectionEnabled ? rowSelection : undefined,
    selectedRowKeys,
    setSelectedRowKeys,
    isRowSelected,
    toggleRowSelection,
    toggleAllRowsSelection,
    isAllRowsSelected,
    isSomeRowsSelected,
  };

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
