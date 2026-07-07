import React from 'react';
import {
  ConfigProvider,
  enterpriseTheme,
  Input,
  InputProps,
} from 'creamdesign-lib';
import type { Meta, StoryObj } from '@storybook/react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const inputMeta: Meta<InputProps> = {
  title: '表单组件/Input',
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

const onChange: React.ChangeEventHandler<HTMLInputElement> = e =>
  console.log(e.target.value);

export default inputMeta;

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

export const 后缀输入框: StoryObj<InputProps> = {
  args: {
    size: 'small',
    disabled: false,
    icon: undefined,
    suffix: '@creamdesign',
    placeholder: '请输入',
    onChange: onChange,
  },
};

export const 主题语义变量: StoryObj<InputProps> = {
  render: () => (
    <ConfigProvider theme={enterpriseTheme}>
      <div style={{ display: 'grid', gap: 12, width: 320 }}>
        <Input placeholder="聚焦时使用主题 focus shadow" />
        <Input disabled placeholder="禁用态使用主题语义色" />
        <Input prefix="https://" suffix=".com" placeholder="前后缀示例" />
      </div>
    </ConfigProvider>
  ),
};
主题语义变量.storyName = '企业级主题';
