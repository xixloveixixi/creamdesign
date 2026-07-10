import { useContext } from 'react';
import { TableContext } from './TableContext';
import Pagination from '../Pagination';

// 分页器
const TableFoot = () => {
  const context = useContext(TableContext);

  if (!context) {
    return null;
  }

  const { pagination, paginationState } = context;

  if (pagination === false || !paginationState) {
    return null;
  }

  const columns = context.columns;
  const isRowSelectionEnabled = !!context.rowSelection;
  const colSpan = isRowSelectionEnabled ? columns.length + 1 : columns.length;

  return (
    <tfoot className="cream-table-foot">
      <tr>
        <td colSpan={colSpan}>
          <div className="cream-table-foot-content">
            <Pagination
              total={paginationState.total}
              current={paginationState.current}
              pageSize={paginationState.pageSize}
              showTotal={paginationState.showTotal}
              showSizeChanger={paginationState.showSizeChanger}
              disabled={paginationState.disabled}
              onChange={paginationState.onChange}
              onPageSizeChange={paginationState.onPageSizeChange}
            />
          </div>
        </td>
      </tr>
    </tfoot>
  );
};
export default TableFoot;
