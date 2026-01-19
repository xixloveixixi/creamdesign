// hooks/useVirtualScroll.ts
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface VirtualItem {
  index: number;
  size: number;
  start: number;
  end: number;
}

export interface UseVirtualScrollOptions<T> {
  data: T[];
  estimateSize: number;
  containerHeight: number;
  overscan?: number;
  getKey?: (item: T, index: number) => string | number;
  onScroll?: (scrollTop: number) => void;
}

export interface UseVirtualScrollReturn<T> {
  virtualItems: T[];
  totalHeight: number;
  startOffset: number;
  containerRef: React.RefObject<HTMLDivElement>;
  scrollTop: number;
  setScrollTop: (top: number) => void;
  measureElement: (node: HTMLDivElement | null, index: number) => void;
  startIndex: number;
  endIndex: number;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export function useVirtualScroll<T>({
  data,
  estimateSize,
  containerHeight,
  overscan = 5,
  getKey = (_, index) => index,
  onScroll,
}: UseVirtualScrollOptions<T>): UseVirtualScrollReturn<T> {
  const [scrollTop, setScrollTop] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const [, forceUpdate] = useState({});

  const containerRef = useRef<HTMLDivElement | null>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const measurementsRef = useRef<VirtualItem[]>([]);
  const scrollTopRef = useRef(0);

  // 初始化 measurements
  useEffect(() => {
    measurementsRef.current = data.map((_, i) => ({
      index: i,
      size: estimateSize,
      start: i * estimateSize,
      end: (i + 1) * estimateSize,
    }));
    setTotalHeight(data.length * estimateSize);
  }, [data, estimateSize]);

  // 二分查找起始索引
  const binarySearch = useCallback((scrollTop: number): number => {
    const measurements = measurementsRef.current;
    if (measurements.length === 0) return 0;

    let start = 0;
    let end = measurements.length - 1;
    let result = 0;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      if (measurements[mid].end > scrollTop) {
        result = mid;
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return result;
  }, []);

  // 计算可视区域
  const visibleCount = Math.ceil(containerHeight / estimateSize) + 1;
  const startIndex = binarySearch(scrollTop);
  const actualStartIndex = Math.max(0, startIndex - overscan);
  const actualEndIndex = Math.min(
    startIndex + visibleCount + overscan,
    data.length
  );

  const virtualItems = useMemo(
    () => data.slice(actualStartIndex, actualEndIndex),
    [data, actualStartIndex, actualEndIndex]
  );
  const startOffset = measurementsRef.current[actualStartIndex]?.start ?? 0;

  // 测量元素
  const measureElement = useCallback(
    (node: HTMLDivElement | null, index: number) => {
      // 简单实现，实际项目中可能需要更复杂的逻辑
      if (node) {
        node.setAttribute('data-index', index.toString());
      }
    },
    []
  );

  // 滚动事件处理器
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const top = e.currentTarget.scrollTop;
      scrollTopRef.current = top;
      setScrollTop(top);
      onScroll?.(top);
    },
    [onScroll]
  );

  const setScrollTopValue = useCallback(
    (top: number) => {
      scrollTopRef.current = top;
      setScrollTop(top);
      onScroll?.(top);
    },
    [onScroll]
  );

  return {
    virtualItems,
    totalHeight,
    startOffset,
    containerRef,
    scrollTop,
    setScrollTop: setScrollTopValue,
    measureElement,
    startIndex: actualStartIndex,
    endIndex: actualEndIndex,
    handleScroll,
  };
}

// 简化版 Hook
export interface UseTableVirtualScrollOptions<T> {
  data: T[];
  rowHeight?: number;
  containerHeight?: number;
  overscan?: number;
  enabled?: boolean;
}

export function useTableVirtualScroll<T>({
  data,
  rowHeight = 50,
  containerHeight = 400,
  overscan = 5,
  enabled = true,
}: UseTableVirtualScrollOptions<T>) {
  const virtualScroll = useVirtualScroll({
    data,
    estimateSize: rowHeight,
    containerHeight,
    overscan,
    getKey: (item: any, index) => item.key || item.id || index,
  });

  return {
    ...virtualScroll,
    enabled,
    rowHeight,
    containerHeight,
  };
}
