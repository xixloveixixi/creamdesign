// table用例展示

import { Meta } from '@storybook/react';
import Table, { TableProps } from './index';
import Button, { ButtonType, ButtonSize } from '../Button/Button';
import React, { useState } from 'react';
import { ConfigProvider, enterpriseTheme } from '../ConfigProvider';
const meta: Meta<typeof Table> = {
  title: 'Components/Table',
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

// 生成测试数据
function generateData(count: number): DataType[] {
  const firstNames = [
    'John',
    'Jim',
    'Joe',
    'Jane',
    'Jack',
    'Jill',
    'James',
    'Julia',
    'Jason',
    'Jessica',
  ];
  const lastNames = [
    'Brown',
    'Green',
    'Black',
    'White',
    'Gray',
    'Red',
    'Blue',
    'Smith',
    'Johnson',
    'Williams',
  ];
  const cities = [
    'New York',
    'London',
    'Sydney',
    'Tokyo',
    'Paris',
    'Berlin',
    'Beijing',
    'Shanghai',
    'Moscow',
    'Dubai',
  ];
  const tagOptions = [
    ['nice', 'developer'],
    ['loser'],
    ['cool', 'teacher'],
    ['handsome'],
    ['cool'],
    ['smart'],
    ['friendly'],
    ['professional'],
  ];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName =
      lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const city = cities[i % cities.length];
    const tags = tagOptions[i % tagOptions.length];

    return {
      key: String(i + 1),
      name: `${firstName} ${lastName}`,
      age: 20 + (i % 50),
      address: `${city} No. ${i + 1} Lake Park${i % 3 === 0 ? '11111111111111111111111111111111111111111111' : ''}`,
      tags,
    };
  });
}

// 生成 1 万条数据用于测试虚拟滚动性能
const data: DataType[] = generateData(10000);

// 基础的表格 - 使用类似 antd 的 API
export const BasicTable = () => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
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
    <div
      style={{
        width: '100%',
        maxWidth: '1400px',
        height: '600px',
        padding: '20px',
      }}
    >
      <Table<DataType> columns={columns} dataSource={data} />
    </div>
  );
};

export const RowKeyTable = () => {
  interface AccountData {
    id: number;
    customer: string;
    owner: string;
    status: string;
  }

  const accountData: AccountData[] = [
    { id: 1001, customer: 'Acme Corp', owner: 'Alice', status: 'Active' },
    { id: 1002, customer: 'Northwind', owner: 'Bob', status: 'Pending' },
    { id: 1003, customer: 'Globex', owner: 'Charlie', status: 'Paused' },
  ];

  const accountColumns: TableProps<AccountData>['columns'] = [
    { title: '客户', dataIndex: 'customer', key: 'customer' },
    { title: '负责人', dataIndex: 'owner', key: 'owner' },
    { title: '状态', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '960px',
        height: '360px',
        padding: '20px',
      }}
    >
      <Table<AccountData>
        columns={accountColumns}
        dataSource={accountData}
        rowKey="id"
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          defaultSelectedRowKeys: [1002],
        }}
      />
    </div>
  );
};

export const EmptyTable = () => {
  const emptyColumns: TableProps<DataType>['columns'] = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '960px',
        height: '320px',
        padding: '20px',
      }}
    >
      <Table<DataType>
        columns={emptyColumns}
        dataSource={[]}
        emptyText="暂无符合条件的客户"
        pagination={false}
      />
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

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1400px',
        height: '600px',
        padding: '20px',
      }}
    >
      <Table<DataType> columns={alignedColumns} dataSource={data} />
    </div>
  );
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

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1400px',
        height: '600px',
        padding: '20px',
      }}
    >
      <Table<DataType> columns={customColumns} dataSource={data} />
    </div>
  );
};

export const VirtualScrollTable = () => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
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
            删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1400px',
        height: '700px',
        padding: '20px',
      }}
    >
      <Table<DataType> columns={columns} dataSource={data} virtual={true} />
    </div>
  );
};

// 带行选择和虚拟滚动的表格
export const TableWithSelectionAndVirtual = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
    []
  );

  const selectionColumns: TableProps<DataType>['columns'] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1400px',
        height: '700px',
        padding: '20px',
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <p>
          已选择 {selectedRowKeys.length} 项（共 {data.length} 项）
        </p>
      </div>
      <Table<DataType>
        columns={selectionColumns}
        dataSource={data}
        virtual={true}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: keys => {
            setSelectedRowKeys(keys);
          },
        }}
      />
    </div>
  );
};

export const EnterpriseThemeTable = () => {
  const enterpriseColumns: TableProps<DataType>['columns'] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <ConfigProvider theme={enterpriseTheme}>
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: '520px',
          padding: '20px',
        }}
      >
        <Table<DataType>
          columns={enterpriseColumns}
          dataSource={data.slice(0, 12)}
          className="enterprise-table-example"
          pagination={{ pageSize: 6 }}
          rowSelection={{ type: 'checkbox' }}
        />
      </div>
    </ConfigProvider>
  );
};
