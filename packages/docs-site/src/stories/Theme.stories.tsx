import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  ButtonType,
  Card,
  ConfigProvider,
  Input,
  Progress,
  Tag,
  enterpriseTheme,
} from 'creamdesign-lib';

const meta = {
  title: '主题/Theme',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoSurface = () => (
  <Card
    title="业务概览"
    extra={<Tag color="success">运行中</Tag>}
    style={{ width: 420 }}
    hoverable
  >
    <div style={{ display: 'grid', gap: 16 }}>
      <Input placeholder="搜索项目或负责人" />
      <Progress percent={72} status="active" />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button btnType={ButtonType.Primary}>提交</Button>
        <Button btnType={ButtonType.Outline}>取消</Button>
        <Button btnType={ButtonType.Success}>通过</Button>
      </div>
    </div>
  </Card>
);

export const 默认主题: Story = {
  render: () => (
    <ConfigProvider>
      <DemoSurface />
    </ConfigProvider>
  ),
};

export const 企业级主题: Story = {
  render: () => (
    <ConfigProvider theme={enterpriseTheme}>
      <DemoSurface />
    </ConfigProvider>
  ),
};

export const 组件级覆盖: Story = {
  render: () => (
    <ConfigProvider
      theme={{
        ...enterpriseTheme,
        components: {
          Button: {
            colorPrimary: '#0f766e',
            colorPrimaryHover: '#0d9488',
            colorPrimaryActive: '#115e59',
            borderRadius: 4,
          },
        },
      }}
    >
      <DemoSurface />
    </ConfigProvider>
  ),
};
