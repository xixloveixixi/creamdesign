import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tag, TagColor, TagSize } from './Tag';
import { ConfigProvider } from '../ConfigProvider';

describe('Tag', () => {
  it('should render correctly', () => {
    render(<Tag>标签内容</Tag>);
    expect(screen.getByText('标签内容')).toBeInTheDocument();
  });

  it('should call onClick when clickable and clicked', () => {
    const handleClick = jest.fn();
    render(
      <Tag clickable onClick={handleClick}>
        可点击
      </Tag>
    );
    fireEvent.click(screen.getByText('可点击'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when not clickable', () => {
    const handleClick = jest.fn();
    render(<Tag onClick={handleClick}>不可点击</Tag>);
    fireEvent.click(screen.getByText('不可点击'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should call onClose when closable and close button clicked', () => {
    const handleClose = jest.fn();
    render(
      <Tag closable onClose={handleClose}>
        可关闭
      </Tag>
    );
    fireEvent.click(screen.getByRole('button', { name: /关闭/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should apply custom className', () => {
    const { container } = render(<Tag className="custom-tag">自定义</Tag>);
    expect(container.firstChild).toHaveClass('custom-tag');
  });

  it('should receive semantic theme variables from ConfigProvider', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#7c3aed',
            colorPrimaryBg: '#f3e8ff',
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
        <Tag color="primary">主题标签</Tag>
        <Tag color="success">成功标签</Tag>
        <Tag color="warning">警告标签</Tag>
        <Tag color="danger">错误标签</Tag>
        <Tag color="info">信息标签</Tag>
      </ConfigProvider>
    );

    const provider = container.querySelector('.cream-config-provider');

    expect(provider).toHaveStyle('--cream-color-primary: #7c3aed');
    expect(provider).toHaveStyle('--cream-color-primary-bg: #f3e8ff');
    expect(provider).toHaveStyle('--cream-color-success: #16a34a');
    expect(provider).toHaveStyle('--cream-color-success-bg: #ecfdf3');
    expect(provider).toHaveStyle('--cream-color-success-border: #86efac');
    expect(provider).toHaveStyle('--cream-color-warning: #ca8a04');
    expect(provider).toHaveStyle('--cream-color-warning-bg: #fffbeb');
    expect(provider).toHaveStyle('--cream-color-warning-border: #fde68a');
    expect(provider).toHaveStyle('--cream-color-error: #dc2626');
    expect(provider).toHaveStyle('--cream-color-error-bg: #fef2f2');
    expect(provider).toHaveStyle('--cream-color-error-border: #fecaca');
    expect(provider).toHaveStyle('--cream-color-info: #2563eb');
    expect(provider).toHaveStyle('--cream-color-info-bg: #eff6ff');
    expect(provider).toHaveStyle('--cream-color-info-border: #bfdbfe');
  });
});
