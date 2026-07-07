import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';
import { ConfigProvider } from '../ConfigProvider';

describe('Icon Component', () => {
  test('should render FontAwesome icon with theme class', () => {
    const { container } = render(<Icon icon={faCircleCheck} theme="success" />);

    const icon = container.querySelector('svg');

    expect(icon).toHaveClass('cream-icon');
    expect(icon).toHaveClass('icon-success');
  });

  test('should receive semantic theme variables from ConfigProvider', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#2563eb',
            colorText: '#111827',
            colorTextSecondary: '#4b5563',
            colorBgContainer: '#ffffff',
            colorSuccess: '#16a34a',
            colorWarning: '#ca8a04',
            colorError: '#dc2626',
            colorInfo: '#2563eb',
          },
        }}
      >
        <Icon icon={faCircleCheck} theme="success" title="themed icon" />
      </ConfigProvider>
    );

    const provider = container.querySelector('.cream-config-provider');

    expect(provider).toHaveStyle('--cream-color-primary: #2563eb');
    expect(provider).toHaveStyle('--cream-color-text: #111827');
    expect(provider).toHaveStyle('--cream-color-text-secondary: #4b5563');
    expect(provider).toHaveStyle('--cream-color-bg-container: #ffffff');
    expect(provider).toHaveStyle('--cream-color-success: #16a34a');
    expect(provider).toHaveStyle('--cream-color-warning: #ca8a04');
    expect(provider).toHaveStyle('--cream-color-error: #dc2626');
    expect(provider).toHaveStyle('--cream-color-info: #2563eb');
  });
});
