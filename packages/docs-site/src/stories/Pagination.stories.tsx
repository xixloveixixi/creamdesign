// Pagination组件示例

import type { Meta, StoryObj } from '@storybook/react';
import {
  ConfigProvider,
  enterpriseTheme,
  Pagination,
  PaginationProps,
} from 'creamdesign-lib';

const meta: Meta<PaginationProps> = {
  title: 'Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    total: {
      control: { type: 'number' },
      description: '总数据量',
    },
    current: {
      control: { type: 'number' },
      description: '当前页码',
    },
    pageSize: {
      control: { type: 'number' },
      description: '每页条数',
    },
    showTotal: {
      control: 'boolean',
      description: '是否显示总数',
    },
    showSizeChanger: {
      control: 'boolean',
      description: '是否显示每页条数选择器',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
  },
};

export const WithTotal: Story = {
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
    showTotal: true,
  },
};
WithTotal.storyName = '显示总数';

export const WithSizeChanger: Story = {
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
  },
};
WithSizeChanger.storyName = '可切换每页条数';

export const FullFeatures: Story = {
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
    showTotal: true,
    showSizeChanger: true,
  },
};
FullFeatures.storyName = '完整功能';

export const LargeData: Story = {
  args: {
    total: 1000,
    current: 50,
    pageSize: 20,
    showTotal: true,
  },
};
LargeData.storyName = '大量数据';

export const Disabled: Story = {
  args: {
    total: 100,
    current: 5,
    pageSize: 10,
    disabled: true,
    showTotal: true,
    showSizeChanger: true,
  },
};
Disabled.storyName = '禁用状态';

export const EnterpriseTheme: Story = {
  render: args => (
    <ConfigProvider theme={enterpriseTheme}>
      <div style={{ display: 'grid', gap: 24 }}>
        <Pagination {...args} />
        <Pagination
          total={84}
          current={3}
          pageSize={20}
          showTotal
          showSizeChanger
        />
        <Pagination total={48} current={2} pageSize={10} disabled />
      </div>
    </ConfigProvider>
  ),
  args: {
    total: 268,
    current: 6,
    pageSize: 20,
    showTotal: true,
    showSizeChanger: true,
  },
};
EnterpriseTheme.storyName = '企业级主题';
