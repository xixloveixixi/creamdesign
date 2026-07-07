import type { Meta, StoryObj } from '@storybook/react';
import {
  ConfigProvider,
  enterpriseTheme,
  Progress,
  ProgressProps,
} from 'creamdesign-lib';

const meta: Meta<ProgressProps> = {
  title: 'Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    percent: {
      control: { type: 'number', min: 0, max: 100 },
      description: '进度百分比',
    },
    strokeHeight: {
      control: { type: 'number' },
      description: '进度条高度',
    },
    showText: {
      control: 'boolean',
      description: '是否显示百分比文字',
    },
    theme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
      description: '主题颜色',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percent: 50,
  },
};

export const VariousColors: Story = {
  render: () => (
    <div
      style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <Progress percent={25} theme="primary" />
      <Progress percent={50} theme="success" />
      <Progress percent={75} theme="warning" />
      <Progress percent={100} theme="danger" />
    </div>
  ),
};
VariousColors.storyName = '各种颜色';

export const NoText: Story = {
  args: {
    percent: 60,
    showText: false,
  },
};
NoText.storyName = '不显示文字';

export const CustomHeight: Story = {
  args: {
    percent: 70,
    strokeHeight: 25,
  },
};
CustomHeight.storyName = '自定义高度';

export const Animated: Story = {
  render: () => (
    <div
      style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <Progress percent={30} />
      <Progress percent={60} />
      <Progress percent={90} />
    </div>
  ),
};
Animated.storyName = '动画进度';

export const SemanticTheme: Story = {
  render: () => (
    <ConfigProvider theme={enterpriseTheme}>
      <div
        style={{
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Progress percent={35} theme="primary" />
        <Progress percent={50} theme="success" />
        <Progress percent={65} theme="warning" />
        <Progress percent={80} theme="danger" />
        <Progress percent={95} theme="info" />
      </div>
    </ConfigProvider>
  ),
};
SemanticTheme.storyName = '企业级主题';
