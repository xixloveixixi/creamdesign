import { memo, useContext } from 'react';
import { TableContext } from './TableContainer';
// 使用reactmemo优化
const TableBody = memo(() => {
  // 从context中获取数据
  const context = useContext(TableContext);

  if (!context) {
    return null;
  }
  // 使用分页后的数据
  const { paginatedData, columns } = context;

  return (
    <tbody>
      {paginatedData.map((item, rowIndex) => (
        <tr key={item.key || rowIndex}>
          {columns.map(column => {
            const alignClass = column.align
              ? `text-${column.align === 'center' ? 'center' : column.align === 'right' ? 'right' : 'left'}`
              : 'text-left';
            const fixedClass = column.fixed ? `fixed-${column.fixed}` : '';
            const className = [alignClass, fixedClass]
              .filter(Boolean)
              .join(' ');

            // 获取单元格值：优先使用 dataIndex，否则使用 key
            const getCellValue = (record: any, column: any) => {
              if (column.dataIndex) {
                if (Array.isArray(column.dataIndex)) {
                  // 支持嵌套路径，如 ['user', 'name']
                  return column.dataIndex.reduce(
                    (obj: any, key: string) => obj?.[key],
                    record
                  );
                } else {
                  return record[column.dataIndex];
                }
              }
              return record[column.key];
            };

            const cellValue = getCellValue(item, column);

            // 使用 render 函数或直接显示值
            const cellContent = column.render
              ? column.render(cellValue, item, rowIndex)
              : cellValue;

            // data-label 属性（移动端不再需要，但保留以保持兼容性）
            const dataLabel = undefined;

            // 移动端保持表格布局，不需要特殊包裹
            return (
              <td
                key={column.key}
                className={className || undefined}
                style={column.width ? { width: column.width } : undefined}
                data-label={dataLabel}
              >
                {cellContent}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
});
export default TableBody;
