import React from 'react';
import {
  AutoComplate,
  AutoComplateProps,
  DataSourceType,
} from './autoComplate';
import type { Meta, StoryObj } from '@storybook/react';
// 模拟fetchSuggestions函数
// 我们现在如果返回的是string，会报错，因为renderOption期望的是一个对象
interface MockDataSourceObject {
  id: number;
  name: string;
}
const mockFetchSuggestions = async (
  value: string
): Promise<DataSourceType<MockDataSourceObject>[]> => {
  // 复杂的数据结构
  const suggestions = [
    { id: 1, name: 'apple', value: 'apple' },
    { id: 2, name: 'banana', value: 'banana' },
    { id: 3, name: 'cherry', value: 'cherry' },
    { id: 4, name: 'date', value: 'date' },
    { id: 5, name: 'elderberry', value: 'elderberry' },
    { id: 6, name: 'fig', value: 'fig' },
    { id: 7, name: 'grape', value: 'grape' },
  ];

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  // 根据输入值过滤建议
  return suggestions.filter(item =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );
};
// 添加renderOption
const renderOption = (item: DataSourceType<MockDataSourceObject>) => (
  <>
    <span className="custom-option-icon">🍎</span>
    <span className="custom-option-id">{item.id}</span>
    <span className="custom-option-text">{item.name}</span>
  </>
);

const autoComplateMeta: Meta<AutoComplateProps> = {
  title: '表单组件/AutoComplate',
  component: AutoComplate,
  tags: ['autodocs'],
  argTypes: {
    fetchSuggestions: {
      description: '获取建议列表的函数',
      control: false,
    },
    onSelect: {
      description: '选择建议项时的回调函数',
      control: false,
    },
    placeholder: {
      description: '输入框占位符',
      control: 'text',
    },
  },
  args: {
    fetchSuggestions: mockFetchSuggestions,
    onSelect: value => console.log('Selected value:', value),
    placeholder: '请输入水果名称...',
  },
};

export default autoComplateMeta;

type Story = StoryObj<typeof autoComplateMeta>;

// 基本用法
export const 基本用法: Story = {
  args: {
    placeholder: '请输入水果名称...',
    renderOption: renderOption as any,
  },
};
