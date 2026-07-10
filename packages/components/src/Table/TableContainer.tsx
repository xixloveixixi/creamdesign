import {
  useState,
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import classNames from 'classnames';
import './Table.scss';
import { TableContext } from './TableContext';
import type {
  TableContextType,
  TableFilterState,
  TableFilterValue,
  PaginationConfig,
  TableProps,
  TableRowKey,
  TableSorterState,
  VirtualScrollConfig,
} from './TableContext';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFoot from './TableFoot';
import { useVirtualScroll } from './hooks/useVirtualScroll';
import VirtualScrollBody from './TableVirtualBody';

export type {
  ColumnType,
  PaginationConfig,
  RowSelectionConfig,
  TableFilterOption,
  TableFilterState,
  TableFilterValue,
  TableContextType,
  TableProps,
  TableRowKey,
  TableSorterState,
  TableSortOrder,
  VirtualScrollConfig,
} from './TableContext';

const DEFAULT_EMPTY_TEXT = '暂无数据';
const DEFAULT_LOADING_TEXT = '加载中...';
const EMPTY_DATA: any[] = [];

const getInitialSorterState = <T,>(
  columns: TableProps<T>['columns']
): TableSorterState | null => {
  const defaultSortColumn = columns.find(
    column => column.sorter && column.defaultSortOrder
  );

  if (!defaultSortColumn?.defaultSortOrder) {
    return null;
  }

  return {
    columnKey: defaultSortColumn.key,
    order: defaultSortColumn.defaultSortOrder,
  };
};

const getInitialFilterState = <T,>(
  columns: TableProps<T>['columns']
): TableFilterState =>
  columns.reduce<TableFilterState>((state, column) => {
    if (column.onFilter && column.defaultFilteredValue?.length) {
      state[column.key] = [...column.defaultFilteredValue];
    }
    return state;
  }, {});

const applyFilters = <T,>(
  data: T[],
  columns: TableProps<T>['columns'],
  filterState: TableFilterState
): T[] => {
  const activeFilters = Object.entries(filterState).filter(
    ([, values]) => values.length > 0
  );

  if (activeFilters.length === 0) {
    return data;
  }

  return activeFilters.reduce((filteredData, [columnKey, values]) => {
    const column = columns.find(item => item.key === columnKey);

    if (!column?.onFilter) {
      return filteredData;
    }

    return filteredData.filter(record =>
      values.some(value => column.onFilter!(value, record))
    );
  }, data);
};

const applySorter = <T,>(
  data: T[],
  columns: TableProps<T>['columns'],
  sorterState: TableSorterState | null
): T[] => {
  if (!sorterState) {
    return data;
  }

  const column = columns.find(item => item.key === sorterState.columnKey);

  if (!column?.sorter) {
    return data;
  }

  const direction = sorterState.order === 'ascend' ? 1 : -1;

  return [...data].sort(
    (current, next) => column.sorter!(current, next) * direction
  );
};

const TableContainer = <T extends Record<string, any> = any>(
  props: TableProps<T>
) => {
  const {
    columns,
    dataSource,
    className,
    style,
    rowKey = 'key' as TableRowKey<T>,
    emptyText = DEFAULT_EMPTY_TEXT,
    pagination,
    virtual,
    rowSelection,
    loading = false,
    loadingText = DEFAULT_LOADING_TEXT,
  } = props;

  const [sorterState, setSorterState] = useState<TableSorterState | null>(() =>
    getInitialSorterState(columns)
  );
  const [filterState, setFilterState] = useState<TableFilterState>(() =>
    getInitialFilterState(columns)
  );

  const sourceData = (dataSource ?? EMPTY_DATA) as T[];
  const tableData = useMemo(() => {
    const filteredData = applyFilters(sourceData, columns, filterState);
    return applySorter(filteredData, columns, sorterState);
  }, [sourceData, columns, filterState, sorterState]);

  const isPaginationDisabled = pagination === false;
  const paginationConfig = useMemo<PaginationConfig | undefined>(() => {
    if (isPaginationDisabled) {
      return undefined;
    }

    if (pagination === true || pagination === undefined) {
      return {};
    }

    return pagination;
  }, [isPaginationDisabled, pagination]);
  const total = tableData.length;
  const paginationTotal = paginationConfig?.total ?? total;
  const initialPageSize =
    paginationConfig?.pageSize ?? paginationConfig?.defaultPageSize ?? 10;
  const initialCurrent =
    paginationConfig?.current ?? paginationConfig?.defaultCurrent ?? 1;
  const [current, setInternalCurrent] = useState(initialCurrent);
  const [pageSize, setInternalPageSize] = useState(initialPageSize);
  const isCurrentControlled = paginationConfig?.current !== undefined;
  const isPageSizeControlled = paginationConfig?.pageSize !== undefined;
  const controlledCurrent = paginationConfig?.current;
  const controlledPageSize = paginationConfig?.pageSize;
  const finalCurrent = isCurrentControlled ? controlledCurrent! : current;
  const finalPageSize = isPageSizeControlled ? controlledPageSize! : pageSize;
  const maxPage = Math.max(1, Math.ceil(paginationTotal / finalPageSize));
  const safeCurrent =
    finalCurrent < 1 || finalCurrent > maxPage ? 1 : finalCurrent;

  const paginatedData = useMemo(() => {
    if (isPaginationDisabled || paginationConfig?.total !== undefined) {
      return tableData;
    }

    const startIndex = (safeCurrent - 1) * finalPageSize;
    const endIndex = startIndex + finalPageSize;
    return tableData.slice(startIndex, endIndex);
  }, [
    finalPageSize,
    isPaginationDisabled,
    paginationConfig?.total,
    safeCurrent,
    tableData,
  ]);

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

  const handlePageChange = useCallback(
    (newPage: number, newPageSize?: number) => {
      if (loading) {
        return;
      }

      const finalNewPageSize = newPageSize ?? finalPageSize;

      if (!isCurrentControlled) {
        setInternalCurrent(newPage);
      }

      if (newPageSize !== undefined && !isPageSizeControlled) {
        setInternalPageSize(newPageSize);
      }

      paginationConfig?.onChange?.(newPage, finalNewPageSize);
    },
    [
      finalPageSize,
      isCurrentControlled,
      isPageSizeControlled,
      loading,
      paginationConfig,
    ]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      if (loading) {
        return;
      }

      const newTotalPages = Math.max(
        1,
        Math.ceil(paginationTotal / newPageSize)
      );
      const newCurrent = Math.min(safeCurrent, newTotalPages);

      if (!isPageSizeControlled) {
        setInternalPageSize(newPageSize);
      }

      if (!isCurrentControlled) {
        setInternalCurrent(newCurrent);
      }

      paginationConfig?.onShowSizeChange?.(newCurrent, newPageSize);
    },
    [
      isCurrentControlled,
      isPageSizeControlled,
      loading,
      paginationConfig,
      paginationTotal,
      safeCurrent,
    ]
  );

  useEffect(() => {
    if (isCurrentControlled && controlledCurrent !== undefined) {
      setInternalCurrent(controlledCurrent);
    }
  }, [controlledCurrent, isCurrentControlled]);

  useEffect(() => {
    if (isPageSizeControlled && controlledPageSize !== undefined) {
      setInternalPageSize(controlledPageSize);
    }
  }, [controlledPageSize, isPageSizeControlled]);

  useEffect(() => {
    if (
      loading ||
      isPaginationDisabled ||
      (finalCurrent >= 1 && finalCurrent <= maxPage)
    ) {
      return;
    }

    if (!isCurrentControlled) {
      setInternalCurrent(1);
      return;
    }

    paginationConfig?.onChange?.(1, finalPageSize);
  }, [
    finalCurrent,
    finalPageSize,
    isCurrentControlled,
    isPaginationDisabled,
    loading,
    maxPage,
    paginationConfig,
  ]);

  const toggleSort = useCallback(
    (columnKey: string) => {
      if (loading) {
        return;
      }

      const column = columns.find(item => item.key === columnKey);

      if (!column?.sorter) {
        return;
      }

      setSorterState(currentSorterState => {
        if (currentSorterState?.columnKey !== columnKey) {
          return { columnKey, order: 'ascend' };
        }

        if (currentSorterState.order === 'ascend') {
          return { columnKey, order: 'descend' };
        }

        return null;
      });
    },
    [columns, loading]
  );

  const toggleFilter = useCallback(
    (columnKey: string, value: TableFilterValue) => {
      if (loading) {
        return;
      }

      const column = columns.find(item => item.key === columnKey);

      if (!column?.onFilter) {
        return;
      }

      setFilterState(currentFilterState => {
        const currentValues = currentFilterState[columnKey] ?? [];
        const nextValues = currentValues.includes(value)
          ? currentValues.filter(item => item !== value)
          : [...currentValues, value];

        if (nextValues.length === 0) {
          const { [columnKey]: _removedValue, ...nextFilterState } =
            currentFilterState;
          return nextFilterState;
        }

        return {
          ...currentFilterState,
          [columnKey]: nextValues,
        };
      });
    },
    [columns, loading]
  );

  const clearFilter = useCallback(
    (columnKey: string) => {
      if (loading) {
        return;
      }

      setFilterState(currentFilterState => {
        if (!currentFilterState[columnKey]) {
          return currentFilterState;
        }

        const { [columnKey]: _removedValue, ...nextFilterState } =
          currentFilterState;
        return nextFilterState;
      });
    },
    [loading]
  );

  const isColumnFiltered = useCallback(
    (columnKey: string) => {
      const values = filterState[columnKey];
      return !!values && values.length > 0;
    },
    [filterState]
  );

  const getRowKey = useCallback(
    (record: T): string | number => {
      if (typeof rowKey === 'function') {
        return rowKey(record);
      }
      return record[rowKey] as string | number;
    },
    [rowKey]
  );

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
        const key = getRowKey(item);
        return keys.includes(key);
      });

      // 触发 onChange 回调
      if (rowSelection?.onChange) {
        rowSelection.onChange(keys, selectedRows);
      }
    },
    [isControlled, tableData, rowSelection, getRowKey]
  );

  // 判断某行是否被选中
  const isRowSelected = useCallback(
    (record: T): boolean => {
      const key = getRowKey(record);
      return selectedRowKeys.includes(key);
    },
    [selectedRowKeys, getRowKey]
  );

  // 切换某行的选中状态
  const toggleRowSelection = useCallback(
    (record: T, selected?: boolean) => {
      if (loading) {
        return;
      }

      const key = getRowKey(record);
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
          const itemKey = getRowKey(item);
          return newSelectedRowKeys.includes(itemKey);
        });
        rowSelection.onSelect(record, newSelected, selectedRows);
      }
    },
    [
      selectedRowKeys,
      selectionType,
      tableData,
      rowSelection,
      isRowSelected,
      setSelectedRowKeys,
      getRowKey,
      loading,
    ]
  );

  // 切换所有行的选中状态
  const toggleAllRowsSelection = useCallback(
    (selected?: boolean) => {
      if (loading) {
        return;
      }

      if (selectionType === 'radio') {
        // 单选模式不支持全选
        return;
      }

      const currentData = paginatedData;
      const allKeys = currentData.map(item => getRowKey(item));
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
        const key = getRowKey(item);
        return newSelected
          ? !selectedRowKeys.includes(key)
          : selectedRowKeys.includes(key);
      });

      setSelectedRowKeys(newSelectedRowKeys);

      // 触发 onSelectAll 回调
      if (rowSelection?.onSelectAll) {
        const selectedRows = tableData.filter(item => {
          const itemKey = getRowKey(item);
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
      getRowKey,
      loading,
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
      const key = getRowKey(item);
      return selectedRowKeys.includes(key);
    });
  }, [paginatedData, selectedRowKeys, selectionType, getRowKey]);

  // 判断是否部分行被选中
  const isSomeRowsSelected = useCallback((): boolean => {
    if (selectionType === 'radio') {
      return false;
    }
    const currentData = paginatedData;
    if (currentData.length === 0) return false;
    const selectedCount = currentData.filter(item => {
      const key = getRowKey(item);
      return selectedRowKeys.includes(key);
    }).length;
    return selectedCount > 0 && selectedCount < currentData.length;
  }, [paginatedData, selectedRowKeys, selectionType, getRowKey]);

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
    total,
    paginatedData,
    pagination,
    paginationState: paginationConfig
      ? {
          current: safeCurrent,
          pageSize: finalPageSize,
          total: paginationTotal,
          showTotal: paginationConfig.showTotal ?? true,
          showSizeChanger: paginationConfig.showSizeChanger ?? true,
          disabled: loading,
          onChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }
      : undefined,
    virtual: virtualConfig,
    emptyText,
    getRowKey,
    sorterState,
    filterState,
    loading,
    loadingText,
    toggleSort,
    toggleFilter,
    clearFilter,
    isColumnFiltered,
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

  const tableClassName = classNames('cream-table', {
    'cream-table-empty': paginatedData.length === 0,
  });
  const containerClassName = classNames('cream-table-container', className, {
    'cream-table-container-loading': loading,
  });

  return (
    <TableContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={containerClassName}
        style={{
          ...(virtualConfig.enabled ? { overflow: 'hidden' } : undefined),
          ...(loading
            ? { position: style?.position ?? 'relative' }
            : undefined),
          ...style,
        }}
      >
        <table ref={tableRef} className={tableClassName}>
          <TableHeader />
          {virtualConfig.enabled ? <VirtualScrollBody /> : <TableBody />}
          <TableFoot />
        </table>
        {loading ? (
          <div
            className="cream-table-loading-overlay"
            role="status"
            aria-live="polite"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.72)',
              pointerEvents: 'none',
            }}
          >
            {loadingText}
          </div>
        ) : null}
      </div>
    </TableContext.Provider>
  );
};

export default TableContainer;
