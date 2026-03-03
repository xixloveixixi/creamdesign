import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Message } from './Message';

describe('Message', () => {
  beforeEach(() => {
    Message.destroy();
  });

  it('should render success message', () => {
    Message.success('操作成功');
    expect(screen.getByText('操作成功')).toBeInTheDocument();
  });

  it('should render error message', () => {
    Message.error('操作失败');
    expect(screen.getByText('操作失败')).toBeInTheDocument();
  });

  it('should render warning message', () => {
    Message.warning('警告信息');
    expect(screen.getByText('警告信息')).toBeInTheDocument();
  });

  it('should render info message', () => {
    Message.info('提示信息');
    expect(screen.getByText('提示信息')).toBeInTheDocument();
  });

  it('should support closable', async () => {
    Message.success({
      content: '可关闭消息',
      closable: true,
      duration: 0,
    });
    expect(screen.getByText('可关闭消息')).toBeInTheDocument();

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('可关闭消息')).not.toBeInTheDocument();
    });
  });

  it('should auto close after duration', async () => {
    Message.success({
      content: '自动关闭消息',
      duration: 100,
    });

    expect(screen.getByText('自动关闭消息')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText('自动关闭消息')).not.toBeInTheDocument();
      },
      { timeout: 200 }
    );
  });

  it('should support custom position', () => {
    Message.success({
      content: '左上角消息',
      position: 'top-left',
    });
    expect(screen.getByText('左上角消息')).toBeInTheDocument();
  });

  it('should support config', () => {
    Message.config({
      duration: 5000,
      position: 'bottom-right',
    });

    Message.success('配置后的消息');
    expect(screen.getByText('配置后的消息')).toBeInTheDocument();
  });

  it('should destroy all messages', () => {
    Message.success('消息1');
    Message.success('消息2');
    Message.success('消息3');

    expect(screen.getByText('消息1')).toBeInTheDocument();
    expect(screen.getByText('消息2')).toBeInTheDocument();
    expect(screen.getByText('消息3')).toBeInTheDocument();

    Message.destroy();

    expect(screen.queryByText('消息1')).not.toBeInTheDocument();
    expect(screen.queryByText('消息2')).not.toBeInTheDocument();
    expect(screen.queryByText('消息3')).not.toBeInTheDocument();
  });
});
