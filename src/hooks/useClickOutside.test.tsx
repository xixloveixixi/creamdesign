import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useClickOutSide } from './useClickOutside';

// 测试组件：包含一个内部区域和外部区域
const TestComponent = ({ onClickOutside }: { onClickOutside: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutSide(ref as React.RefObject<HTMLElement>, onClickOutside);
  return (
    <div>
      <div ref={ref} data-testid="inside">
        <span data-testid="inside-child">内部子元素</span>
      </div>
      <div data-testid="outside">外部区域</div>
    </div>
  );
};

describe('useClickOutside Hook', () => {
  // 1. 点击外部区域触发回调
  test('should call callback when clicking outside the element', () => {
    const callback = jest.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={callback} />);

    fireEvent.click(getByTestId('outside'));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  // 2. 点击内部区域不触发回调
  test('should not call callback when clicking inside the element', () => {
    const callback = jest.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={callback} />);

    fireEvent.click(getByTestId('inside'));
    expect(callback).not.toHaveBeenCalled();
  });

  // 3. 点击内部子元素不触发回调
  test('should not call callback when clicking inside child element', () => {
    const callback = jest.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={callback} />);

    fireEvent.click(getByTestId('inside-child'));
    expect(callback).not.toHaveBeenCalled();
  });

  // 4. 多次点击外部区域
  test('should call callback on each outside click', () => {
    const callback = jest.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={callback} />);

    fireEvent.click(getByTestId('outside'));
    fireEvent.click(getByTestId('outside'));
    fireEvent.click(getByTestId('outside'));
    expect(callback).toHaveBeenCalledTimes(3);
  });

  // 5. 卸载后清理事件监听器
  test('should clean up event listener on unmount', () => {
    const callback = jest.fn();
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = render(<TestComponent onClickOutside={callback} />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.any(Function)
    );
    removeEventListenerSpy.mockRestore();
  });

  // 6. 卸载后点击不触发回调
  test('should not call callback after unmount', () => {
    const callback = jest.fn();
    const { unmount } = render(<TestComponent onClickOutside={callback} />);

    unmount();

    // 卸载后点击 document
    fireEvent.click(document.body);
    expect(callback).not.toHaveBeenCalled();
  });

  // 7. 回调函数变化时使用最新的回调
  test('should use updated callback after rerender', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { rerender, getByTestId } = render(
      <TestComponent onClickOutside={callback1} />
    );

    fireEvent.click(getByTestId('outside'));
    expect(callback1).toHaveBeenCalledTimes(1);

    rerender(<TestComponent onClickOutside={callback2} />);
    fireEvent.click(getByTestId('outside'));
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
