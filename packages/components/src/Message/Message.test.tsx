import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Message } from './Message';
import { ConfigProvider } from '../ConfigProvider';

describe('Message', () => {
  beforeEach(() => {
    act(() => {
      Message.destroy();
    });
  });

  afterEach(() => {
    act(() => {
      Message.destroy();
    });
  });

  it('should render success message', () => {
    act(() => {
      Message.success('操作成功');
    });
    expect(screen.getByText('操作成功')).toBeInTheDocument();
  });

  it('should render error message', () => {
    act(() => {
      Message.error('操作失败');
    });
    expect(screen.getByText('操作失败')).toBeInTheDocument();
  });

  it('should render warning message', () => {
    act(() => {
      Message.warning('警告信息');
    });
    expect(screen.getByText('警告信息')).toBeInTheDocument();
  });

  it('should render info message', () => {
    act(() => {
      Message.info('提示信息');
    });
    expect(screen.getByText('提示信息')).toBeInTheDocument();
  });

  it('should support closable', async () => {
    act(() => {
      Message.success({
        content: '可关闭消息',
        closable: true,
        duration: 0,
      });
    });
    expect(screen.getByText('可关闭消息')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: '关闭消息' });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('可关闭消息')).not.toBeInTheDocument();
    });
  });

  it('should auto close after duration', async () => {
    act(() => {
      Message.success({
        content: '自动关闭消息',
        duration: 100,
      });
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
    act(() => {
      Message.success({
        content: '左上角消息',
        position: 'top-left',
      });
    });
    expect(screen.getByText('左上角消息')).toBeInTheDocument();
  });

  it('should support config', () => {
    Message.config({
      duration: 5000,
      position: 'bottom-right',
    });

    act(() => {
      Message.success('配置后的消息');
    });
    expect(screen.getByText('配置后的消息')).toBeInTheDocument();
  });

  it('should destroy all messages', () => {
    act(() => {
      Message.success('消息1');
      Message.success('消息2');
      Message.success('消息3');
    });

    expect(screen.getByText('消息1')).toBeInTheDocument();
    expect(screen.getByText('消息2')).toBeInTheDocument();
    expect(screen.getByText('消息3')).toBeInTheDocument();

    act(() => {
      Message.destroy();
    });

    expect(screen.queryByText('消息1')).not.toBeInTheDocument();
    expect(screen.queryByText('消息2')).not.toBeInTheDocument();
    expect(screen.queryByText('消息3')).not.toBeInTheDocument();
    expect(
      document.querySelector('.cream-message-root')
    ).not.toBeInTheDocument();
  });

  it('should support options object as first argument', () => {
    act(() => {
      Message.success({
        content: '对象式消息',
        duration: 0,
        position: 'bottom-left',
      });
    });

    expect(screen.getByText('对象式消息')).toBeInTheDocument();
    expect(
      document.querySelector('.cream-message--bottom-left')
    ).toBeInTheDocument();
  });

  it('should inherit ConfigProvider theme variables in portal root', () => {
    render(
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1677ff',
            colorSuccess: '#22c55e',
            colorSuccessBg: '#ecfdf3',
            colorSuccessBorder: '#86efac',
          },
        }}
      >
        <div>theme provider</div>
      </ConfigProvider>
    );

    act(() => {
      Message.success({ content: '主题消息', duration: 0 });
    });

    expect(screen.getByText('主题消息')).toBeInTheDocument();
    expect(
      document.querySelector('body > div[style*="--cream-color-success"]')
    ).toHaveStyle('--cream-color-success: #22c55e');
    expect(
      document.querySelector('body > div[style*="--cream-color-success-bg"]')
    ).toHaveStyle('--cream-color-success-bg: #ecfdf3');
    expect(
      document.querySelector(
        'body > div[style*="--cream-color-success-border"]'
      )
    ).toHaveStyle('--cream-color-success-border: #86efac');
  });
});
