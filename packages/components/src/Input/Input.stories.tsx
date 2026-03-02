import React from 'react';
import { Input, InputProps } from './Input';
import type { Meta, StoryObj } from '@storybook/react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const inputMeta: Meta<InputProps> = {
  title: '表单组件',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['large', 'small'],
      description: '输入框尺寸',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用输入框',
    },
    prefix: {
      control: { type: 'text' },
      description: '输入框前缀',
    },
    suffix: {
      control: { type: 'text' },
      description: '输入框后缀',
    },
    value: {
      control: { type: 'text' },
      description: '输入框值',
    },
    defaultValue: {
      control: { type: 'text' },
      description: '输入框默认值',
    },
    placeholder: {
      control: { type: 'text' },
      description: '输入框占位符',
    },
    onChange: {
      action: 'onChange',
      description: '输入框值变化时触发',
    },
  },
};
// 测试input作为受控组件支持的情况
// 一个输入框不能同时是受控和非受控组件。我需要修复这个问题。
const ControlledInput = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  return (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="请输入"
      defaultValue="初始值"
    />
  );
};

// 定义action
const onChange: React.ChangeEventHandler<HTMLInputElement> = e =>
  console.log(e.target.value);
export default inputMeta;
// 1、默认输入框
export const 默认输入框: StoryObj<InputProps> = {
  args: {
    size: 'small',
    disabled: false,
    icon: undefined,
    prefix: undefined,
    suffix: undefined,
    placeholder: '请输入',
    onChange: onChange,
    defaultValue: '初始值',
  },
  render: () => <ControlledInput />,
};

// 2、禁用输入框
export const 禁用输入框: StoryObj<InputProps> = {
  args: {
    size: 'small',
    disabled: true,
    icon: undefined,
    prefix: undefined,
    suffix: undefined,
    placeholder: '请输入',
    onChange: onChange,
  },
};
// 3、图标输入框
export const 图标输入框: StoryObj<InputProps> = {
  args: {
    size: 'small',
    disabled: false,
    icon: faSearch,
    prefix: undefined,
    suffix: undefined,
    placeholder: '请输入',
    onChange: onChange,
  },
};
// 4、前缀输入框
export const 前缀输入框: StoryObj<InputProps> = {
  args: {
    size: 'small',
    disabled: false,
    icon: undefined,
    prefix: 'https://',
    suffix: undefined,
    placeholder: '请输入',
    onChange: onChange,
  },
};
// 5、后缀输入框
export const 后缀输入框: StoryObj<InputProps> = {
  args: {
    size: 'small',
    disabled: false,
    icon: undefined,
    prefix: undefined,
    suffix: '@creamdesign',
    placeholder: '请输入',
    onChange: onChange,
  },
};
