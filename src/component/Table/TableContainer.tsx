import { createContext, useState, ReactNode } from 'react';
import './tableStyle.scss';

// 定义通用的列接口（使用泛型参数 T 表示行数据类型）
export interface Column<T = any> {
  key: string;
  title: string | ReactNode;
  width?: number;
  render?: (value: any, record: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

// 行数据类型（示例）
export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

// TableContext 类型定义
export interface TableContextType<T = any> {
  columns: Column<T>[];
  tableData: T[];
  setTableData?: (data: T[]) => void;
}

// 创建 Context，使用泛型
export const TableContext = createContext<TableContextType<any> | undefined>(
  undefined
);

// TableContainer 组件 - 使用泛型 T
export interface TableContainerProps<T = any> {
  children: ReactNode;
  columns: Column<T>[];
  data?: T[]; // 添加数据属性
}

const TableContainer = <T extends Record<string, any>>(
  props: TableContainerProps<T>
) => {
  const { children, columns, data: initialData = [] } = props;
  const [tableData, setTableData] = useState<T[]>(initialData);

  // 通过 context 传递数据
  const contextValue: TableContextType<T> = {
    columns,
    tableData,
    setTableData,
  };

  return (
    <TableContext.Provider value={contextValue}>
      <table className="cream-table">{children}</table>
    </TableContext.Provider>
  );
};

export default TableContainer;
