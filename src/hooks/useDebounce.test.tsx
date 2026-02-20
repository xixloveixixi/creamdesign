import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // 1. 初始值立即返回
  test('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  // 2. 值变化后在延迟时间内不更新
  test('should not update value before delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 300 } }
    );

    rerender({ value: 'world', delay: 300 });

    // 延迟前仍是旧值
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('hello');
  });

  // 3. 延迟时间后更新值
  test('should update value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 300 } }
    );

    rerender({ value: 'world', delay: 300 });

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('world');
  });

  // 4. 快速连续变化只取最后一个值
  test('should only use last value when changing rapidly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 300 } }
    );

    rerender({ value: 'ab', delay: 300 });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender({ value: 'abc', delay: 300 });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender({ value: 'abcd', delay: 300 });

    // 还不到 300ms（从最后一次变化），不更新
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('a');

    // 最后一次变化后 300ms，更新为最终值
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('abcd');
  });

  // 5. 使用默认延迟 300ms
  test('should use default delay of 300ms', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'updated' });

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('updated');
  });

  // 6. 支持自定义延迟
  test('should respect custom delay value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 500 } }
    );

    rerender({ value: 'world', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('hello');

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('world');
  });

  // 7. 支持数字类型
  test('should work with numeric values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 300 } }
    );

    rerender({ value: 42, delay: 300 });

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe(42);
  });

  // 8. 支持对象类型
  test('should work with object values', () => {
    const obj1 = { name: 'test' };
    const obj2 = { name: 'updated' };

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: obj1 as any, delay: 300 } }
    );

    rerender({ value: obj2 as any, delay: 300 });

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toEqual({ name: 'updated' });
  });

  // 9. 值不变时不触发更新
  test('should not trigger unnecessary updates when value stays the same', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'same', delay: 300 } }
    );

    rerender({ value: 'same', delay: 300 });

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('same');
  });
});
