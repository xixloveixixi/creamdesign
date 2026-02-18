import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './index';
import { ButtonType, ButtonSize } from './Button';

describe('Button Component', () => {
  // 模拟Ant Design风格的图标组件
  const MockIcon = () => (
    <span className="anticon" data-testid="mock-icon">
      <svg />
    </span>
  );
  //   1.基本渲染测试
  test('should render a button element with default props', () => {
    const wrapper = render(<Button>Click Me</Button>);
    const button = wrapper.getByText('Click Me');
    expect(button).toBeInTheDocument(); // 确保按钮存在于DOM中
    expect(button.tagName).toBe('BUTTON'); // 确保渲染为按钮元素
    expect(button).toHaveClass('btn btn-primary btn-normal');
  });

  // 2.测试不同按钮类型
  test.each([
    ButtonType.Primary,
    ButtonType.Secondary,
    ButtonType.Danger,
    ButtonType.Warning,
    ButtonType.Info,
    ButtonType.Success,
    ButtonType.Outline,
    ButtonType.Ghost,
    ButtonType.Text,
  ])('should render %s button correctly', type => {
    const wrapper = render(<Button btnType={type}>{type}</Button>);
    const button = wrapper.getByText(type);
    expect(button).toHaveClass(`btn-${type}`);
  });

  // 测试不同按钮尺寸
  test.each([
    [ButtonSize.Large, 'btn-large'],
    [ButtonSize.Normal, 'btn-normal'],
    [ButtonSize.Small, 'btn-small'],
  ])('should render %s button correctly', (size, expectedClass) => {
    const wrapper = render(<Button size={size}>Size Test</Button>);
    const button = wrapper.getByText('Size Test');
    expect(button).toHaveClass(expectedClass);
  });

  // 测试禁用状态
  test('should render a disabled button when disabled prop is true', () => {
    const wrapper = render(<Button disabled>Disabled</Button>);
    const button = wrapper.getByText('Disabled');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  // 测试加载状态
  test('should render loading state correctly', () => {
    const wrapper = render(<Button loading>Loading</Button>);
    const button = wrapper.getByText('Loading');
    expect(button).toBeDisabled(); // 加载状态下按钮应禁用
    expect(button).toHaveClass('btn-loading btn-disabled');
    expect(button).toHaveAttribute('aria-busy', 'true'); // 加载状态下按钮应标记为繁忙
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toContainHTML(
      '<span class="btn-loading-spinner" aria-hidden="true"></span>'
    );
  });

  // 测试同时设置disabled和loading的情况
  test('should prioritize loading state over disabled state', () => {
    const wrapper = render(
      <Button disabled loading>
        Test
      </Button>
    );
    const button = wrapper.getByText('Test');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-loading btn-disabled');
    expect(button).toHaveAttribute('aria-busy', 'true'); // 加载状态下按钮应标记为繁忙
  });

  // 测试图标按钮
  test('should render button with icon', () => {
    const wrapper = render(<Button icon={<MockIcon />}>With Icon</Button>);
    const button = wrapper.getByText('With Icon');
    const icon = wrapper.getByTestId('mock-icon');
    expect(button).toContainElement(icon);
    expect(icon.closest('.btn-icon')).toBeInTheDocument();
  });

  // 测试只有图标的按钮:只有图标时必须提供aria-label
  test('should render icon-only button with proper accessibility attributes', () => {
    const wrapper = render(
      <Button icon={<MockIcon />} aria-label="Icon Button" />
    );
    // 使用getByRole结合name选项，它会考虑aria-label属性
    const button = wrapper.getByRole('button', { name: 'Icon Button' });
    const icon = wrapper.getByTestId('mock-icon');
    expect(button).toContainElement(icon);
    expect(button).toHaveAttribute('aria-label', 'Icon Button');
    // 当按钮只有图标时，aria-hidden应该不存在（React会省略值为false的布尔属性）
    expect(icon).not.toHaveAttribute('aria-hidden');
  });

  // 测试加载状态下不显示图标
  test('should not show icon when in loading state', () => {
    const wrapper = render(
      <Button icon={<MockIcon />} loading>
        With Icon
      </Button>
    );
    const button = wrapper.getByText('With Icon');
    // 检查图标元素是否不存在于DOM中
    expect(wrapper.queryByTestId('mock-icon')).not.toBeInTheDocument();
  });

  // 测试点击事件
  test('should call onClick handler when button is clicked', () => {
    const handleClick = jest.fn(); // 模拟点击事件处理函数
    const wrapper = render(<Button onClick={handleClick}>Click Me</Button>);
    const button = wrapper.getByText('Click Me');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 测试禁用状态下不触发点击事件
  test('should not call onClick handler when button is disabled', () => {
    const handleClick = jest.fn(); // 模拟点击事件处理函数
    const wrapper = render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    );
    const button = wrapper.getByText('Click Me');

    fireEvent.click(button); // 模拟点击事件
    expect(handleClick).not.toHaveBeenCalled(); // 验证点击事件处理函数未被调用
  });

  // 测试加载状态下不触发点击事件
  test('should not call onClick handler when button is in loading state', () => {
    const handleClick = jest.fn();
    const wrapper = render(
      <Button onClick={handleClick} loading>
        Click Me
      </Button>
    );
    const button = wrapper.getByText('Click Me');

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // 测试自定义类名
  test('should apply custom className to button', () => {
    const wrapper = render(
      <Button className="custom-button">Custom Class</Button>
    );
    const button = wrapper.getByText('Custom Class');
    expect(button).toHaveClass('custom-button');
  });

  // 测试传递额外的属性
  test('should pass additional props to button element', () => {
    const wrapper = render(
      <Button data-testid="custom-button" title="Custom Title">
        Test
      </Button>
    );
    const button = wrapper.getByTestId('custom-button');
    expect(button).toHaveAttribute('title', 'Custom Title');
  });

  // 测试无障碍属性
  test('should apply aria-label when provided', () => {
    const wrapper = render(
      <Button aria-label="Accessibility Test">Test</Button>
    );
    const button = wrapper.getByText('Test');
    expect(button).toHaveAttribute('aria-label', 'Accessibility Test');
  });
});
