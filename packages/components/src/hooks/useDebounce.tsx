import { useEffect, useState } from 'react';
/**
 * 防抖hook
 * @param value 要防抖的值
 * @param delay 防抖延迟时间，默认300ms
 * @returns 防抖后的值
 */
// 防抖：
// 1、当值发生变化时，等待指定延迟时间后更新防抖值。
// 2、如果在延迟时间内值又发生变化，重新开始等待。
// 输出：一个防抖后的值
export function useDebounce(value: any, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
