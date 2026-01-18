// table用例展示

import { Meta } from '@storybook/react';
import Table, { TableProps } from './TableContainer';
import Button, { ButtonType, ButtonSize } from '../Button/buttion';

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

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address:
      'New York No. 1 Lake Park11111111111111111111111111111111111111111111',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    tags: ['handsome'],
  },
  {
    key: '5',
    name: 'Jim Blue',
    age: 32,
    address: 'London No. 3 Lake Park',
    tags: ['cool'],
  },
  {
    key: '6',
    name: 'Jim Black',
    age: 32,
    address: 'London No. 4 Lake Park',
    tags: ['cool'],
  },
  {
    key: '7',
    name: 'Jim White',
    age: 32,
    address: 'London No. 5 Lake Park',
    tags: ['cool'],
  },
  {
    key: '8',
    name: 'Jim Gray',
    age: 32,
    address: 'London No. 6 Lake Park',
    tags: ['cool'],
  },
  {
    key: '9',
    name: 'Jim Brown',
    age: 32,
    address: 'London No. 7 Lake Park',
    tags: ['cool'],
  },
  {
    key: '10',
    name: 'Jim Green',
    age: 32,
    address: 'London No. 8 Lake Park',
    tags: ['cool'],
  },
  {
    key: '11',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 9 Lake Park',
    tags: ['cool'],
  },
  {
    key: '12',
    name: 'Jim Blue',
    age: 32,
    address: 'London No. 10 Lake Park',
    tags: ['cool'],
  },
  {
    key: '13',
    name: 'Jim Black',
    age: 32,
    address: 'London No. 11 Lake Park',
    tags: ['cool'],
  },
  {
    key: '14',
    name: 'Jim White',
    age: 32,
    address: 'London No. 12 Lake Park',
    tags: ['cool'],
  },
  {
    key: '15',
    name: 'Jim Gray',
    age: 32,
    address: 'London No. 13 Lake Park',
    tags: ['cool'],
  },
  {
    key: '16',
    name: 'Jim Brown',
    age: 32,
    address: 'London No. 14 Lake Park',
    tags: ['cool'],
  },
  {
    key: '17',
    name: 'Jim Green',
    age: 32,
    address: 'London No. 15 Lake Park',
    tags: ['cool'],
  },
  {
    key: '18',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 16 Lake Park',
    tags: ['cool'],
  },
  {
    key: '19',
    name: 'Jim Blue',
    age: 32,
    address: 'London No. 17 Lake Park',
    tags: ['cool'],
  },
  {
    key: '20',
    name: 'Jim Black',
    age: 32,
    address: 'London No. 18 Lake Park',
    tags: ['cool'],
  },
  {
    key: '21',
    name: 'Jim White',
    age: 32,
    address: 'London No. 19 Lake Park',
    tags: ['cool'],
  },
  {
    key: '22',
    name: 'Jim Gray',
    age: 32,
    address: 'London No. 20 Lake Park',
    tags: ['cool'],
  },
  {
    key: '23',
    name: 'Jim Brown',
    age: 32,
    address: 'London No. 21 Lake Park',
    tags: ['cool'],
  },
  {
    key: '24',
    name: 'Jim Green',
    age: 32,
    address: 'London No. 22 Lake Park',
    tags: ['cool'],
  },
  {
    key: '25',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 23 Lake Park',
    tags: ['cool'],
  },
  {
    key: '26',
    name: 'Jim Blue',
    age: 32,
    address: 'London No. 24 Lake Park',
    tags: ['cool'],
  },
  {
    key: '27',
    name: 'Jim Black',
    age: 32,
    address: 'London No. 25 Lake Park',
    tags: ['cool'],
  },
  {
    key: '28',
    name: 'Jim White',
    age: 32,
    address: 'London No. 26 Lake Park',
    tags: ['cool'],
  },
  {
    key: '29',
    name: 'Jim Gray',
    age: 32,
    address: 'London No. 27 Lake Park',
    tags: ['cool'],
  },
];

// 基础的表格 - 使用类似 antd 的 API
export const BasicTable = () => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <div>{Array.isArray(tags) ? tags.join(', ') : tags}</div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button
            btnType={ButtonType.Primary}
            size={ButtonSize.Small}
            onClick={() => console.log('编辑', record.name)}
          >
            编辑
          </Button>
          <Button
            btnType={ButtonType.Danger}
            size={ButtonSize.Small}
            onClick={() => console.log('删除', record.name)}
          >
            编辑
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: '700px', height: '500px' }}>
      <Table<DataType> columns={columns} dataSource={data} />
    </div>
  );
};

// 带对齐的表格
export const AlignedTable = () => {
  const alignedColumns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'right',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      align: 'left',
    },
  ];

  return <Table<DataType> columns={alignedColumns} dataSource={data} />;
};

// 带自定义渲染的表格
export const CustomRenderTable = () => {
  const customColumns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <strong>{text}</strong>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      render: value => (
        <span style={{ color: value > 20 ? '#4caf50' : '#f44336' }}>
          {value}
        </span>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (_, { tags }) => (
        <div>{Array.isArray(tags) ? tags.join(', ') : tags}</div>
      ),
    },
  ];

  return <Table<DataType> columns={customColumns} dataSource={data} />;
};

// 使用虚拟滚动的表格
export const VirtualScrollTable = () => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <div>{Array.isArray(tags) ? tags.join(', ') : tags}</div>
      ),
    },
  ];

  return (
    <div style={{ width: '700px', height: '500px' }}>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        // virtual={true} // 启用虚拟滚动
      />
    </div>
  );
};
