// table用例展示

import { Meta } from '@storybook/react';
import Table, { TableProps } from './TableContainer';
import Button, { ButtonType, ButtonSize } from '../Button/buttion';
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    <div style={{ width: '700px', height: '600px' }}>
      <Table<DataType> columns={columns} dataSource={data} virtual={true} />
    </div>
  );
};
