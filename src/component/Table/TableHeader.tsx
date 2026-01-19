import { useContext } from 'react';
import { TableContext } from './TableContainer';

export interface TableHeaderProps {}
// 主要是完成表头的渲染
const TableHeader = () => {
  // 获取columns数据：
  const context = useContext(TableContext);
  if (!context) {
    return null;
  }
  const { columns } = context;
  return (
    <thead>
      <tr>
        {columns.map(column => {
          const alignClass = column.align
            ? `text-${column.align === 'center' ? 'center' : column.align === 'right' ? 'right' : 'left'}`
            : 'text-left';
          const fixedClass = column.fixed ? `fixed-${column.fixed}` : '';
          const className = [alignClass, fixedClass].filter(Boolean).join(' ');

          return (
            <th
              key={column.key}
              className={className || undefined}
              style={column.width ? { width: column.width } : undefined}
            >
              {column.title}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
export default TableHeader;
