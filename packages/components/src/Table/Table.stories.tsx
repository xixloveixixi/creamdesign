// table用例展示

import { Meta } from '@storybook/react';
import Table, { TableProps } from './index';
import Button, { ButtonType, ButtonSize } from '../Button/Button';
import React, { useState } from 'react';
import { ConfigProvider, enterpriseTheme } from '../ConfigProvider';

type TableColumn<T extends Record<string, any> = any> =
  TableProps<T>['columns'][number];
type TableFilterOption<T extends Record<string, any> = any> = NonNullable<
  TableColumn<T>['filters']
>[number];

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

interface CustomerOpportunity {
  key: string;
  customer: string;
  owner: string;
  status: '已签约' | '跟进中' | '风险' | '暂停';
  city: '上海' | '北京' | '深圳' | '杭州' | '成都';
  age: number;
  amount: number;
  stage: string;
}

const customerOpportunities: CustomerOpportunity[] = [
  {
    key: 'opp-1001',
    customer: '云杉科技',
    owner: '林悦',
    status: '已签约',
    city: '上海',
    age: 34,
    amount: 128000,
    stage: '年度续约',
  },
  {
    key: 'opp-1002',
    customer: '北辰零售',
    owner: '周岚',
    status: '跟进中',
    city: '北京',
    age: 29,
    amount: 86000,
    stage: '方案确认',
  },
  {
    key: 'opp-1003',
    customer: '南桥制造',
    owner: '陈舟',
    status: '风险',
    city: '深圳',
    age: 41,
    amount: 212000,
    stage: '法务评审',
  },
  {
    key: 'opp-1004',
    customer: '湖畔生物',
    owner: '许言',
    status: '已签约',
    city: '杭州',
    age: 37,
    amount: 158000,
    stage: '交付排期',
  },
  {
    key: 'opp-1005',
    customer: '锦城能源',
    owner: '王策',
    status: '暂停',
    city: '成都',
    age: 46,
    amount: 74000,
    stage: '预算冻结',
  },
  {
    key: 'opp-1006',
    customer: '启明教育',
    owner: '李妍',
    status: '跟进中',
    city: '上海',
    age: 31,
    amount: 97000,
    stage: '商务谈判',
  },
  {
    key: 'opp-1007',
    customer: '星河物流',
    owner: '赵赫',
    status: '风险',
    city: '北京',
    age: 39,
    amount: 185000,
    stage: '价格复核',
  },
  {
    key: 'opp-1008',
    customer: '鲸云传媒',
    owner: '沈青',
    status: '已签约',
    city: '深圳',
    age: 28,
    amount: 64000,
    stage: '首批上线',
  },
  {
    key: 'opp-1009',
    customer: '澄海医疗',
    owner: '罗宁',
    status: '跟进中',
    city: '杭州',
    age: 44,
    amount: 245000,
    stage: '需求澄清',
  },
  {
    key: 'opp-1010',
    customer: '东洲物业',
    owner: '秦越',
    status: '暂停',
    city: '成都',
    age: 35,
    amount: 53000,
    stage: '采购延期',
  },
  {
    key: 'opp-1011',
    customer: '山岚汽车',
    owner: '韩知',
    status: '已签约',
    city: '北京',
    age: 48,
    amount: 301000,
    stage: '集团扩容',
  },
  {
    key: 'opp-1012',
    customer: '浦江食品',
    owner: '马澈',
    status: '跟进中',
    city: '上海',
    age: 33,
    amount: 116000,
    stage: '样板间验收',
  },
];

const statusFilters: TableFilterOption[] = [
  { text: '已签约', value: '已签约' },
  { text: '跟进中', value: '跟进中' },
  { text: '风险', value: '风险' },
  { text: '暂停', value: '暂停' },
];

const cityFilters: TableFilterOption[] = [
  { text: '上海', value: '上海' },
  { text: '北京', value: '北京' },
  { text: '深圳', value: '深圳' },
  { text: '杭州', value: '杭州' },
  { text: '成都', value: '成都' },
];

const currencyFormatter = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
  maximumFractionDigits: 0,
});

const renderStatus = (status: CustomerOpportunity['status']) => {
  const statusColor: Record<CustomerOpportunity['status'], string> = {
    已签约: '#237804',
    跟进中: '#0958d9',
    风险: '#cf1322',
    暂停: '#595959',
  };

  return <span style={{ color: statusColor[status] }}>{status}</span>;
};

const opportunityColumns: TableColumn<CustomerOpportunity>[] = [
  {
    title: '客户名称',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: '负责人',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    filters: statusFilters,
    onFilter: (value, record) => record.status === value,
    render: value => renderStatus(value),
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
    filters: cityFilters,
    onFilter: (value, record) => record.city === value,
  },
  {
    title: '客户年龄',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '商机金额',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    sorter: (a, b) => a.amount - b.amount,
    render: value => currencyFormatter.format(value),
  },
  {
    title: '业务阶段',
    dataIndex: 'stage',
    key: 'stage',
  },
];

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

export const SortableTable = () => {
  const sortableColumns: TableColumn<CustomerOpportunity>[] =
    opportunityColumns.filter(column =>
      ['customer', 'owner', 'age', 'amount', 'stage'].includes(column.key)
    );

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        height: '460px',
        padding: '20px',
      }}
    >
      <Table<CustomerOpportunity>
        columns={sortableColumns}
        dataSource={customerOpportunities}
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export const FilterableTable = () => {
  const filterableColumns: TableColumn<CustomerOpportunity>[] =
    opportunityColumns.filter(column =>
      ['customer', 'owner', 'status', 'city', 'stage'].includes(column.key)
    );

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        height: '460px',
        padding: '20px',
      }}
    >
      <Table<CustomerOpportunity>
        columns={filterableColumns}
        dataSource={customerOpportunities}
        emptyText="暂无匹配客户"
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export const TableDataPipeline = () => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1320px',
        height: '520px',
        padding: '20px',
      }}
    >
      <Table<CustomerOpportunity>
        columns={opportunityColumns}
        dataSource={customerOpportunities}
        emptyText="暂无匹配商机"
        pagination={{
          defaultCurrent: 1,
          pageSize: 4,
          showTotal: true,
        }}
      />
    </div>
  );
};

export const LoadingTable = () => {
  const loadingColumns: TableColumn<CustomerOpportunity>[] =
    opportunityColumns.filter(column =>
      ['customer', 'owner', 'status', 'city', 'amount'].includes(column.key)
    );

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        height: '460px',
        padding: '20px',
      }}
    >
      <Table<CustomerOpportunity>
        columns={loadingColumns}
        dataSource={customerOpportunities.slice(0, 6)}
        loading
        loadingText="同步客户数据中"
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
  const enterpriseColumns: TableColumn<CustomerOpportunity>[] = [
    opportunityColumns[0],
    opportunityColumns[1],
    {
      ...opportunityColumns[2],
      defaultFilteredValue: ['已签约', '跟进中'],
    },
    opportunityColumns[3],
    {
      ...opportunityColumns[5],
      defaultSortOrder: 'descend',
    },
    opportunityColumns[6],
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
        <Table<CustomerOpportunity>
          columns={enterpriseColumns}
          dataSource={customerOpportunities}
          className="enterprise-table-example"
          pagination={{ pageSize: 6 }}
          rowSelection={{ type: 'checkbox' }}
        />
      </div>
    </ConfigProvider>
  );
};

export const EnterpriseTable = EnterpriseThemeTable;
