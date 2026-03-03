import type { Meta, StoryObj } from '@storybook/react';
import { Message } from './Message';

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
