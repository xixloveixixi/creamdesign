import { useContext } from 'react';
import { TableContext } from './TableContainer';

// 主要是对数据进行展示
interface TableBodyProps {
  data?: any[];
}
const TableBody = () => {
  // 从context中获取数据
  const context = useContext(TableContext);
  if (!context) {
    return null;
  }
  const { tableData, columns } = context;
  return (
    <tbody>
      {tableData.map((item, rowIndex) => (
        <tr key={item.key || rowIndex}>
          {columns.map(column => {
            const alignClass = column.align
              ? `text-${column.align === 'center' ? 'center' : column.align === 'right' ? 'right' : 'left'}`
              : 'text-left';
            const fixedClass = column.fixed ? `fixed-${column.fixed}` : '';
            const className = [alignClass, fixedClass]
              .filter(Boolean)
              .join(' ');

            // 使用 render 函数或直接显示值
            const cellContent = column.render
              ? column.render(item[column.key], item, rowIndex)
              : item[column.key];

            return (
              <td
                key={column.key}
                className={className || undefined}
                style={column.width ? { width: column.width } : undefined}
              >
                {cellContent}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
export default TableBody;
