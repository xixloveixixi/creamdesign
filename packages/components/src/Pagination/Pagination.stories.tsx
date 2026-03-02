// Pagination组件示例

import { Meta } from '@storybook/react';
import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Pagination组件',
  component: Pagination,
};

export default meta;

// 基础分页器
export const BasicPagination = () => {
  return (
    <Pagination
      total={100}
      current={1}
      pageSize={10}
      onChange={(page, pageSize) => {
        console.log('Page:', page, 'PageSize:', pageSize);
      }}
    />
  );
};

// 显示总数
export const WithTotal = () => {
  return (
    <Pagination
      total={100}
      current={1}
      pageSize={10}
      showTotal={true}
      onChange={page => console.log('Page:', page)}
    />
  );
};

// 显示每页条数选择器
export const WithSizeChanger = () => {
  return (
    <Pagination
      total={100}
      current={1}
      pageSize={10}
      showSizeChanger={true}
      onChange={(page, pageSize) => {
        console.log('Page:', page, 'PageSize:', pageSize);
      }}
    />
  );
};

// 完整功能
export const FullFeatures = () => {
  return (
    <Pagination
      total={100}
      current={1}
      pageSize={10}
      showTotal={true}
      showSizeChanger={true}
      onChange={(page, pageSize) => {
        console.log('Page:', page, 'PageSize:', pageSize);
      }}
    />
  );
};

// 大量数据
export const LargeData = () => {
  return (
    <Pagination
      total={1000}
      current={50}
      pageSize={20}
      showTotal={true}
      onChange={page => console.log('Page:', page)}
    />
  );
};

// 禁用状态
export const Disabled = () => {
  return (
    <Pagination
      total={100}
      current={5}
      pageSize={10}
      disabled={true}
      showTotal={true}
      showSizeChanger={true}
    />
  );
};
