import { useContext, useState, useMemo, useEffect } from 'react';
import { TableContext, PaginationConfig } from './TableContainer';
import Pagination from '../Pagination';

// 分页器
const TableFoot = () => {
  const context = useContext(TableContext);
  const { pagination } = context ?? {};
  // 1、处理分页配置：类似 antd 的逻辑
  // pagination === false: 禁用分页
  // pagination === true 或 undefined: 使用默认配置（启用分页）
  // pagination === 对象: 使用配置对象
  const isPaginationDisabled = pagination === false;
  const paginationConfig: PaginationConfig | undefined = isPaginationDisabled
    ? undefined
    : pagination === true || pagination === undefined
      ? {}
      : pagination;

  // 2、计算 total：优先使用 pagination.total（服务端分页），否则使用 dataSource.length（客户端分页）
  const initialTotal = context?.total ?? 0;
  const total = paginationConfig?.total ?? initialTotal;

  // 获取初始分页参数（类似 antd）
  // 受控模式：使用 curren`t/pageSize
  // 非受控模式：使用 defaultCurrent/defaultPageSize 或默认值
  const initialPageSize =
    paginationConfig?.pageSize ?? paginationConfig?.defaultPageSize ?? 10;

  const initialCurrent =
    paginationConfig?.current ?? paginationConfig?.defaultCurrent ?? 1;

  const [current, setInternalCurrent] = useState(initialCurrent);
  const [pageSize, setInternalPageSize] = useState(initialPageSize);

  // 受控模式：如果 pagination 配置中有 current 或 pageSize，使用受控模式（类似 antd）
  const isCurrentControlled = paginationConfig?.current !== undefined;
  const isPageSizeControlled = paginationConfig?.pageSize !== undefined;

  const finalCurrent = isCurrentControlled
    ? paginationConfig!.current!
    : current;
  const finalPageSize = isPageSizeControlled
    ? paginationConfig!.pageSize!
    : pageSize;

  // 计算分页数据（类似 antd）
  const tableData = context?.tableData ?? [];
  const paginatedData = useMemo(() => {
    if (!context) {
      return [];
    }
    if (isPaginationDisabled) {
      // 如果分页被禁用，返回所有数据
      return tableData;
    }
    // 如果提供了 pagination.total（服务端分页），不进行客户端切片
    if (paginationConfig?.total !== undefined) {
      return tableData;
    }
    // 客户端分页：进行数据切片
    const startIndex = (finalCurrent - 1) * finalPageSize;
    const endIndex = startIndex + finalPageSize;
    return tableData.slice(startIndex, endIndex);
  }, [
    context,
    tableData,
    finalCurrent,
    finalPageSize,
    isPaginationDisabled,
    paginationConfig?.total,
  ]);

  // 更新 Context 中的 paginatedData，供 TableBody 使用
  const setPaginatedData = context?.setPaginatedData;
  useEffect(() => {
    if (setPaginatedData) {
      setPaginatedData(paginatedData);
    }
  }, [paginatedData, setPaginatedData]);

  // 处理页码变化（类似 antd）
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    const finalNewPageSize = newPageSize ?? finalPageSize;

    // 更新内部状态（非受控模式）
    if (!isCurrentControlled) {
      setInternalCurrent(newPage);
    }
    if (newPageSize !== undefined && !isPageSizeControlled) {
      setInternalPageSize(newPageSize);
    }

    // 调用回调（类似 antd：onChange 在页码或 pageSize 改变时都会触发）
    if (paginationConfig?.onChange) {
      paginationConfig.onChange(newPage, finalNewPageSize);
    }
  };

  // 处理每页条数变化（类似 antd）
  const handlePageSizeChange = (newPageSize: number) => {
    // 计算新的总页数和当前页（确保不超出范围）
    const newTotalPages = Math.max(1, Math.ceil(total / newPageSize));
    const newCurrent = Math.min(finalCurrent, newTotalPages);

    // 更新内部状态（非受控模式）
    if (!isPageSizeControlled) {
      setInternalPageSize(newPageSize);
    }
    if (!isCurrentControlled) {
      setInternalCurrent(newCurrent);
    }

    // 调用回调（类似 antd：onShowSizeChange 优先触发，然后触发 onChange）
    if (paginationConfig?.onShowSizeChange) {
      paginationConfig.onShowSizeChange(newCurrent, newPageSize);
    }
    if (paginationConfig?.onChange) {
      paginationConfig.onChange(newCurrent, newPageSize);
    }
  };

  // 同步受控的 current 和 pageSize（类似 antd）
  useEffect(() => {
    if (isCurrentControlled && paginationConfig?.current !== undefined) {
      setInternalCurrent(paginationConfig.current);
    }
  }, [paginationConfig?.current, isCurrentControlled]);

  useEffect(() => {
    if (isPageSizeControlled && paginationConfig?.pageSize !== undefined) {
      setInternalPageSize(paginationConfig.pageSize);
    }
  }, [paginationConfig?.pageSize, isPageSizeControlled]);

  // 早期返回必须在所有 Hooks 之后
  if (!context) {
    return null;
  }

  // 如果 pagination 为 false，不显示分页器
  if (pagination === false) {
    return null;
  }

  // 从 pagination 配置中获取选项，使用默认值（类似 antd）
  const showTotal = paginationConfig?.showTotal ?? true;
  const showSizeChanger = paginationConfig?.showSizeChanger ?? true;
  const columns = context.columns;

  return (
    <tfoot className="cream-table-foot">
      <tr>
        <td colSpan={columns.length}>
          <div className="cream-table-foot-content">
            <Pagination
              total={total}
              current={finalCurrent}
              pageSize={finalPageSize}
              showTotal={showTotal}
              showSizeChanger={showSizeChanger}
              onChange={(page, newPageSize) => {
                // 类似 antd：onChange 在页码或 pageSize 改变时都会触发
                handlePageChange(page, newPageSize);
              }}
              onPageSizeChange={newPageSize => {
                // 类似 antd：onShowSizeChange 专门处理 pageSize 变化
                handlePageSizeChange(newPageSize);
              }}
            />
          </div>
        </td>
      </tr>
    </tfoot>
  );
};
export default TableFoot;
