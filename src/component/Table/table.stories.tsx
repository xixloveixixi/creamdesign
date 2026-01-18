// table用例展示

import { Meta } from '@storybook/react';
import Table, { Column } from './TableContainer';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
const meta: Meta<typeof Table> = {
  title: 'Table组件',
  component: Table,
};
export default meta;
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const columns: Column<any>[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'age',
    title: 'Age',
  },
  {
    key: 'address',
    title: 'Address',
  },
  {
    key: 'tags',
    title: 'Tags',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 18,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 25,
    address: 'London No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['loser'],
  },
];

// 基础的表格
export const BasicTable = () => {
  return (
    <Table columns={columns} data={data}>
      <TableHeader />
      <TableBody />
    </Table>
  );
};

// 带对齐的表格
export const AlignedTable = () => {
  const alignedColumns: Column<any>[] = [
    {
      key: 'name',
      title: 'Name',
      align: 'left',
    },
    {
      key: 'age',
      title: 'Age',
      align: 'center',
    },
    {
      key: 'address',
      title: 'Address',
      align: 'right',
    },
    {
      key: 'tags',
      title: 'Tags',
      align: 'left',
    },
  ];

  return (
    <Table columns={alignedColumns} data={data}>
      <TableHeader />
      <TableBody />
    </Table>
  );
};

// 带自定义渲染的表格
export const CustomRenderTable = () => {
  const customColumns: Column<any>[] = [
    {
      key: 'name',
      title: 'Name',
      render: value => <strong>{value}</strong>,
    },
    {
      key: 'age',
      title: 'Age',
      align: 'center',
      render: value => (
        <span style={{ color: value > 20 ? '#4caf50' : '#f44336' }}>
          {value}
        </span>
      ),
    },
    {
      key: 'address',
      title: 'Address',
    },
    {
      key: 'tags',
      title: 'Tags',
      render: value => (
        <div>{Array.isArray(value) ? value.join(', ') : value}</div>
      ),
    },
  ];

  return (
    <Table columns={customColumns} data={data}>
      <TableHeader />
      <TableBody />
    </Table>
  );
};
