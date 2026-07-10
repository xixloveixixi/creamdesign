import React from 'react';
import { Meta } from '@storybook/react';
import { Table, TableProps } from 'creamdesign-lib';

const meta: Meta<typeof Table> = {
  title: 'Table/Stage 4 Data Pipeline',
  component: Table,
};

export default meta;

interface Opportunity {
  key: string;
  customer: string;
  owner: string;
  status: 'Signed' | 'Follow-up' | 'Risk' | 'Paused';
  city: 'Shanghai' | 'Beijing' | 'Shenzhen' | 'Hangzhou' | 'Chengdu';
  age: number;
  amount: number;
  stage: string;
}

type PreviewColumn<T extends Record<string, any> = any> =
  TableProps<T>['columns'][number];
type PreviewFilterOption<T extends Record<string, any> = any> = NonNullable<
  PreviewColumn<T>['filters']
>[number];

const opportunities: Opportunity[] = [
  {
    key: 'opp-1001',
    customer: 'Cedar Cloud',
    owner: 'Lin Yue',
    status: 'Signed',
    city: 'Shanghai',
    age: 34,
    amount: 128000,
    stage: 'Renewal',
  },
  {
    key: 'opp-1002',
    customer: 'North Retail',
    owner: 'Zhou Lan',
    status: 'Follow-up',
    city: 'Beijing',
    age: 29,
    amount: 86000,
    stage: 'Proposal',
  },
  {
    key: 'opp-1003',
    customer: 'Southbridge Manufacturing',
    owner: 'Chen Zhou',
    status: 'Risk',
    city: 'Shenzhen',
    age: 41,
    amount: 212000,
    stage: 'Legal Review',
  },
  {
    key: 'opp-1004',
    customer: 'Lake Bio',
    owner: 'Xu Yan',
    status: 'Signed',
    city: 'Hangzhou',
    age: 37,
    amount: 158000,
    stage: 'Delivery',
  },
  {
    key: 'opp-1005',
    customer: 'Jincheng Energy',
    owner: 'Wang Ce',
    status: 'Paused',
    city: 'Chengdu',
    age: 46,
    amount: 74000,
    stage: 'Budget Hold',
  },
  {
    key: 'opp-1006',
    customer: 'Qiming Education',
    owner: 'Li Yan',
    status: 'Follow-up',
    city: 'Shanghai',
    age: 31,
    amount: 97000,
    stage: 'Negotiation',
  },
  {
    key: 'opp-1007',
    customer: 'Galaxy Logistics',
    owner: 'Zhao He',
    status: 'Risk',
    city: 'Beijing',
    age: 39,
    amount: 185000,
    stage: 'Pricing',
  },
  {
    key: 'opp-1008',
    customer: 'Whale Media',
    owner: 'Shen Qing',
    status: 'Signed',
    city: 'Shenzhen',
    age: 28,
    amount: 64000,
    stage: 'Launch',
  },
  {
    key: 'opp-1009',
    customer: 'Chenghai Medical',
    owner: 'Luo Ning',
    status: 'Follow-up',
    city: 'Hangzhou',
    age: 44,
    amount: 245000,
    stage: 'Discovery',
  },
  {
    key: 'opp-1010',
    customer: 'East Property',
    owner: 'Qin Yue',
    status: 'Paused',
    city: 'Chengdu',
    age: 35,
    amount: 53000,
    stage: 'Procurement Delay',
  },
  {
    key: 'opp-1011',
    customer: 'Mountain Auto',
    owner: 'Han Zhi',
    status: 'Signed',
    city: 'Beijing',
    age: 48,
    amount: 301000,
    stage: 'Expansion',
  },
  {
    key: 'opp-1012',
    customer: 'River Food',
    owner: 'Ma Che',
    status: 'Follow-up',
    city: 'Shanghai',
    age: 33,
    amount: 116000,
    stage: 'Acceptance',
  },
];

const statusFilters: PreviewFilterOption[] = [
  { text: 'Signed', value: 'Signed' },
  { text: 'Follow-up', value: 'Follow-up' },
  { text: 'Risk', value: 'Risk' },
  { text: 'Paused', value: 'Paused' },
];

const cityFilters: PreviewFilterOption[] = [
  { text: 'Shanghai', value: 'Shanghai' },
  { text: 'Beijing', value: 'Beijing' },
  { text: 'Shenzhen', value: 'Shenzhen' },
  { text: 'Hangzhou', value: 'Hangzhou' },
  { text: 'Chengdu', value: 'Chengdu' },
];

const moneyFormatter = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
  maximumFractionDigits: 0,
});

const renderStatus = (status: Opportunity['status']) => {
  const colorMap: Record<Opportunity['status'], string> = {
    Signed: '#237804',
    'Follow-up': '#0958d9',
    Risk: '#cf1322',
    Paused: '#595959',
  };

  return <span style={{ color: colorMap[status] }}>{status}</span>;
};

const columns: PreviewColumn<Opportunity>[] = [
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: statusFilters,
    onFilter: (value, record) => record.status === value,
    render: value => renderStatus(value),
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
    filters: cityFilters,
    onFilter: (value, record) => record.city === value,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    sorter: (a, b) => a.amount - b.amount,
    render: value => moneyFormatter.format(value),
  },
  {
    title: 'Stage',
    dataIndex: 'stage',
    key: 'stage',
  },
];

export const DataPipeline = {
  render: () => (
    <div
      style={{
        width: '100%',
        maxWidth: '1320px',
        height: '520px',
        padding: '20px',
      }}
    >
      <Table<Opportunity>
        columns={columns}
        dataSource={opportunities}
        emptyText="No matching opportunities"
        pagination={{
          defaultCurrent: 1,
          pageSize: 4,
          showTotal: true,
        }}
      />
    </div>
  ),
};

DataPipeline.storyName = 'Data Pipeline';

export const Loading = {
  render: () => (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        height: '460px',
        padding: '20px',
      }}
    >
      <Table<Opportunity>
        columns={columns.filter(column =>
          ['customer', 'owner', 'status', 'city', 'amount'].includes(column.key)
        )}
        dataSource={opportunities.slice(0, 6)}
        loading
        loadingText="Syncing customer data"
        pagination={{ pageSize: 4 }}
      />
    </div>
  ),
};

Loading.storyName = 'Loading';
