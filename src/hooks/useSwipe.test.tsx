import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSwipe, SwipeOptions } from './useSwipe';

// 模拟触摸事件辅助函数
const simulateTouchStart = (element: Element, x: number, y: number) => {
  const event = new Event('touchstart', { bubbles: true });
  Object.defineProperty(event, 'touches', {
    value: [{ clientX: x, clientY: y }],
  });
  element.dispatchEvent(event);
};

const simulateTouchMove = (element: Element, x: number, y: number) => {
  const event = new Event('touchmove', { bubbles: true });
  Object.defineProperty(event, 'touches', {
    value: [{ clientX: x, clientY: y }],
  });
  element.dispatchEvent(event);
};

const simulateTouchEnd = (element: Element, x: number, y: number) => {
  const event = new Event('touchend', { bubbles: true });
  Object.defineProperty(event, 'changedTouches', {
    value: [{ clientX: x, clientY: y }],
  });
  element.dispatchEvent(event);
};

// 测试组件
const TestSwipeComponent = (props: SwipeOptions) => {
  const ref = useRef<HTMLDivElement>(null);
  useSwipe(ref, props);
  return (
    <div ref={ref} data-testid="swipe-area" style={{ width: 300, height: 300 }}>
      滑动区域
    </div>
  );
};

describe('useSwipe Hook', () => {
  let dateNowSpy: jest.SpyInstance;

  beforeEach(() => {
    dateNowSpy = jest.spyOn(Date, 'now');
  });

  afterEach(() => {
    dateNowSpy.mockRestore();
  });

  // 1. 检测向右滑动
  test('should detect swipe right', () => {
    const onSwipeRight = jest.fn();
    const { getByTestId } = render(
      <TestSwipeComponent
        onSwipeRight={onSwipeRight}
        threshold={30}
        velocityThreshold={0.1}
      />
    );
    const el = getByTestId('swipe-area');

    let currentTime = 1000;
    dateNowSpy.mockImplementation(() => currentTime);

    simulateTouchStart(el, 0, 100);
    currentTime = 1100;
    simulateTouchEnd(el, 200, 100);

    expect(onSwipeRight).toHaveBeenCalledTimes(1);
  });

  // 2. 检测向左滑动
  test('should detect swipe left', () => {
    const onSwipeLeft = jest.fn();
    const { getByTestId } = render(
      <TestSwipeComponent
        onSwipeLeft={onSwipeLeft}
        threshold={30}
        velocityThreshold={0.1}
      />
    );
    const el = getByTestId('swipe-area');

    let currentTime = 1000;
    dateNowSpy.mockImplementation(() => currentTime);

    simulateTouchStart(el, 200, 100);
    currentTime = 1100;
    simulateTouchEnd(el, 0, 100);

    expect(onSwipeLeft).toHaveBeenCalledTimes(1);
  });

  // 3. 检测向下滑动
  test('should detect swipe down', () => {
    const onSwipeDown = jest.fn();
    const { getByTestId } = render(
      <TestSwipeComponent
        onSwipeDown={onSwipeDown}
        threshold={30}
        velocityThreshold={0.1}
      />
    );
    const el = getByTestId('swipe-area');

    let currentTime = 1000;
    dateNowSpy.mockImplementation(() => currentTime);

    simulateTouchStart(el, 100, 0);
    currentTime = 1100;
    simulateTouchEnd(el, 100, 200);

    expect(onSwipeDown).toHaveBeenCalledTimes(1);
  });

  // 4. 检测向上滑动
  test('should detect swipe up', () => {
    const onSwipeUp = jest.fn();
    const { getByTestId } = render(
      <TestSwipeComponent
        onSwipeUp={onSwipeUp}
        threshold={30}
        velocityThreshold={0.1}
      />
    );
    const el = getByTestId('swipe-area');

    let currentTime = 1000;
    dateNowSpy.mockImplementation(() => currentTime);

    simulateTouchStart(el, 100, 200);
    currentTime = 1100;
    simulateTouchEnd(el, 100, 0);

    expect(onSwipeUp).toHaveBeenCalledTimes(1);
  });

  // 5. 距离不足时不触发
  test('should not trigger swipe when distance is below threshold', () => {
    const onSwipeRight = jest.fn();
    const { getByTestId } = render(
      <TestSwipeComponent
        onSwipeRight={onSwipeRight}
        threshold={100}
        velocityThreshold={0.1}
      />
    );
    const el = getByTestId('swipe-area');

    let currentTime = 1000;
    dateNowSpy.mockImplementation(() => currentTime);

    simulateTouchStart(el, 100, 100);
    currentTime = 1100;
    // 只移动了 30px，低于 100px 阈值
    simulateTouchEnd(el, 130, 100);

    expect(onSwipeRight).not.toHaveBeenCalled();
  });

  // 6. 速度不足时不触发
  test('should not trigger swipe when velocity is below threshold', () => {
    const onSwipeRight = jest.fn();
    const { getByTestId } = render(
      <TestSwipeComponent
        onSwipeRight={onSwipeRight}
        threshold={30}
        velocityThreshold={2}
      />
    );
    const el = getByTestId('swipe-area');

    let currentTime = 1000;
    dateNowSpy.mockImplementation(() => currentTime);

    simulateTouchStart(el, 0, 100);
    // 非常慢的滑动: 100px / 5000ms = 0.02 px/ms，低于阈值 2
    currentTime = 6000;
    simulateTouchEnd(el, 100, 100);

    expect(onSwipeRight).not.toHaveBeenCalled();
  });

  // 7. 卸载后清理事件监听器
  test('should clean up event listeners on unmount', () => {
    const { getByTestId, unmount } = render(
      <TestSwipeComponent onSwipeRight={jest.fn()} />
    );
    const el = getByTestId('swipe-area');
    const removeSpy = jest.spyOn(el, 'removeEventListener');

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('touchend', expect.any(Function));
    removeSpy.mockRestore();
  });

  // 8. 使用默认阈值（threshold=50, velocityThreshold=0.3）
  test('should use default thresholds', () => {
    const onSwipeRight = jest.fn();
    const { getByTestId } = render(
      <TestSwipeComponent onSwipeRight={onSwipeRight} />
    );
    const el = getByTestId('swipe-area');

    let currentTime = 1000;
    dateNowSpy.mockImplementation(() => currentTime);

    // 200px in 100ms = velocity 2 px/ms > 0.3, distance 200 > 50
    simulateTouchStart(el, 0, 100);
    currentTime = 1100;
    simulateTouchEnd(el, 200, 100);

    expect(onSwipeRight).toHaveBeenCalledTimes(1);
  });

  // 9. 对角线滑动优先判断水平方向
  test('should prefer horizontal direction when deltaX > deltaY', () => {
    const onSwipeRight = jest.fn();
    const onSwipeDown = jest.fn();
    const { getByTestId } = render(
      <TestSwipeComponent
        onSwipeRight={onSwipeRight}
        onSwipeDown={onSwipeDown}
        threshold={30}
        velocityThreshold={0.1}
      />
    );
    const el = getByTestId('swipe-area');

    let currentTime = 1000;
    dateNowSpy.mockImplementation(() => currentTime);

    // 水平距离 150 > 垂直距离 50
    simulateTouchStart(el, 0, 100);
    currentTime = 1100;
    simulateTouchEnd(el, 150, 150);

    expect(onSwipeRight).toHaveBeenCalledTimes(1);
    expect(onSwipeDown).not.toHaveBeenCalled();
  });

  // 10. 对角线滑动优先判断垂直方向
  test('should prefer vertical direction when deltaY > deltaX', () => {
    const onSwipeRight = jest.fn();
    const onSwipeDown = jest.fn();
    const { getByTestId } = render(
      <TestSwipeComponent
        onSwipeRight={onSwipeRight}
        onSwipeDown={onSwipeDown}
        threshold={30}
        velocityThreshold={0.1}
      />
    );
    const el = getByTestId('swipe-area');

    let currentTime = 1000;
    dateNowSpy.mockImplementation(() => currentTime);

    // 垂直距离 150 > 水平距离 50
    simulateTouchStart(el, 100, 0);
    currentTime = 1100;
    simulateTouchEnd(el, 150, 150);

    expect(onSwipeDown).toHaveBeenCalledTimes(1);
    expect(onSwipeRight).not.toHaveBeenCalled();
  });
});
