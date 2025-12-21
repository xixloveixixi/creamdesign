import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input, InputProps } from './input';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

describe('Input Component', () => {
  // 1. 基本渲染测试
  test('should render an input element with default props', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    const inputWrapper = container.querySelector('.input');

    expect(input).toBeInTheDocument();
    expect(inputWrapper).toBeInTheDocument();
    expect(inputWrapper).toHaveClass('input input-small');
    expect(input).not.toBeDisabled();
  });

  // 2. 测试不同尺寸
  test.each([
    ['large', 'input-large'],
    ['small', 'input-small'],
  ])('should render %s input correctly', (size, expectedClass) => {
    const { container } = render(<Input size={size as InputProps['size']} />);
    const inputWrapper = container.querySelector('.input');

    expect(inputWrapper).toHaveClass(expectedClass);
  });

  // 3. 测试禁用状态
  test('should render disabled input when disabled prop is true', () => {
    const { container } = render(<Input disabled />);
    const input = container.querySelector('input');
    const inputWrapper = container.querySelector('.input');

    expect(input).toBeDisabled();
    expect(inputWrapper).toHaveClass('input-disabled');
  });

  // 4. 测试带图标的输入框
  test('should render input with icon', () => {
    const { container } = render(<Input icon={faSearch} />);
    const inputWrapper = container.querySelector('.input');
    const iconElement = inputWrapper?.querySelector('.input-icon');

    expect(iconElement).toBeInTheDocument();
    expect(iconElement?.closest('.input-icon')).toBeInTheDocument();
  });

  // 5. 测试前缀功能
  test('should render input with prefix text', () => {
    const { getByText, container } = render(<Input prefix="$" />);
    const prefixElement = getByText('$');
    const inputWrapper = container.querySelector('.input');

    expect(prefixElement).toBeInTheDocument();
    expect(prefixElement).toHaveClass('input-prefix');
    expect(inputWrapper).toContainElement(prefixElement);
  });

  // 6. 测试后缀功能
  test('should render input with suffix text', () => {
    const { getByText, container } = render(<Input suffix=".com" />);
    const suffixElement = getByText('.com');
    const inputWrapper = container.querySelector('.input');

    expect(suffixElement).toBeInTheDocument();
    expect(suffixElement).toHaveClass('input-suffix');
    expect(inputWrapper).toContainElement(suffixElement);
  });

  // 7. 测试输入功能
  test('should allow user to type in the input', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
    expect(HTMLInputElement).toBeInTheDocument();
    expect(HTMLInputElement).toHaveAttribute(
      'aria-label',
      'Accessibility Test'
    );
  });
});
