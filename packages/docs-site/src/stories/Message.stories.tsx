import type { Meta, StoryObj } from '@storybook/react';
import { ConfigProvider, Message } from 'creamdesign-lib';

const meta: Meta = {
  title: 'Message',
  component: Message,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Success: Story = {
  args: {},
  render: () => {
    const handleSuccess = () => {
      Message.success('操作成功！');
    };
    return <button onClick={handleSuccess}>显示成功消息</button>;
  },
};

export const Error: Story = {
  args: {},
  render: () => {
    const handleError = () => {
      Message.error('操作失败，请重试！');
    };
    return <button onClick={handleError}>显示错误消息</button>;
  },
};

export const Warning: Story = {
  args: {},
  render: () => {
    const handleWarning = () => {
      Message.warning('请注意，此操作不可撤销！');
    };
    return <button onClick={handleWarning}>显示警告消息</button>;
  },
};

export const Info: Story = {
  args: {},
  render: () => {
    const handleInfo = () => {
      Message.info('这是一条提示信息');
    };
    return <button onClick={handleInfo}>显示提示消息</button>;
  },
};

export const Closable: Story = {
  args: {},
  render: () => {
    const handleClosable = () => {
      Message.success({
        content: '这是一条可关闭的消息',
        closable: true,
      });
    };
    return <button onClick={handleClosable}>显示可关闭消息</button>;
  },
};

export const LongDuration: Story = {
  args: {},
  render: () => {
    const handleLong = () => {
      Message.success({
        content: '这条消息显示 5 秒',
        duration: 5000,
      });
    };
    return <button onClick={handleLong}>显示 5 秒消息</button>;
  },
};

export const DifferentPositions: Story = {
  args: {},
  render: () => {
    const showAllPositions = () => {
      Message.success({ content: '右上角消息', position: 'top-right' });
      Message.warning({ content: '左上角消息', position: 'top-left' });
      Message.info({ content: '右下角消息', position: 'bottom-right' });
      Message.error({ content: '左下角消息', position: 'bottom-left' });
    };
    return <button onClick={showAllPositions}>显示四个位置的消息</button>;
  },
};

export const SemanticTheme: Story = {
  args: {},
  render: () => {
    const showThemedMessages = () => {
      Message.success({ content: '成功状态使用语义 token', duration: 0 });
      Message.warning({ content: '警告状态使用语义 token', duration: 0 });
      Message.error({ content: '错误状态使用语义 token', duration: 0 });
      Message.info({ content: '信息状态使用语义 token', duration: 0 });
    };

    return (
      <ConfigProvider
        theme={{
          token: {
            colorSuccess: '#16a34a',
            colorSuccessBg: '#ecfdf3',
            colorSuccessBorder: '#86efac',
            colorWarning: '#ca8a04',
            colorWarningBg: '#fffbeb',
            colorWarningBorder: '#fde68a',
            colorError: '#dc2626',
            colorErrorBg: '#fef2f2',
            colorErrorBorder: '#fecaca',
            colorInfo: '#2563eb',
            colorInfoBg: '#eff6ff',
            colorInfoBorder: '#bfdbfe',
          },
        }}
      >
        <button onClick={showThemedMessages}>显示主题消息</button>
      </ConfigProvider>
    );
  },
};
