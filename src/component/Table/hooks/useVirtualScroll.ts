// hooks/useVirtualScroll.ts
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface UseVirtualScrollOptions<T> {
  data: T[]; //数据
  estimateSize: number; //固定行高（所有行使用相同高度）
  containerHeight: number; //容器高度
  overscan?: number; //缓冲区大小
  onScroll?: (scrollTop: number) => void; //滚动回调
}

export interface UseVirtualScrollReturn<T> {
  virtualItems: T[]; //虚拟列表项
  totalHeight: number; //总高度
  startOffset: number;
  containerRef: React.RefObject<HTMLDivElement | null>; //容器引用
  scrollTop: number; //滚动位置
  setScrollTop: (top: number) => void; //设置滚动位置
  measureElement: (node: HTMLDivElement | null, index: number) => void; //测量元素（固定高度模式下为空实现，保留以保持 API 兼容性）
  startIndex: number;
  endIndex: number; //结束索引
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void; //滚动处理
}

export function useVirtualScroll<T>({
  data,
  estimateSize,
  containerHeight,
  overscan = 3,
  onScroll,
}: UseVirtualScrollOptions<T>): UseVirtualScrollReturn<T> {
  const [scrollTop, setScrollTop] = useState(0);

  // 使用 useRef 存储状态
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // 查找起始索引（固定高度，直接计算）
  const findStartIndex = useCallback(
    (scrollTop: number) => {
      // 固定高度时，直接通过除法计算起始索引
      const index = Math.floor(scrollTop / estimateSize);
      return Math.max(0, index - 1); // 稍微提前一点开始渲染
    },
    [estimateSize]
  );

  // ==================== 计算虚拟列表项（固定高度） ====================
  const { startIndex, endIndex, startOffset, virtualItems, totalHeight } =
    useMemo(() => {
      // 计算总高度（固定高度，直接计算）
      const totalHeight = data.length * estimateSize;

      // 计算起始索引
      const rawStartIndex = findStartIndex(scrollTop);
      const actualStartIndex = Math.max(0, rawStartIndex - overscan);

      // 计算可见项数量
      const actualContainerHeight = Math.max(containerHeight, 1);
      const visibleCount = Math.ceil(actualContainerHeight / estimateSize);

      // 计算结束索引
      const actualEndIndex = Math.min(
        actualStartIndex + visibleCount + overscan * 2, // 前后都要有 overscan
        data.length
      );

      // 获取虚拟列表项
      const virtualItems = data.slice(actualStartIndex, actualEndIndex);

      // 计算起始偏移量（固定高度，直接计算）
      const startOffset = actualStartIndex * estimateSize;

      return {
        startIndex: actualStartIndex,
        endIndex: actualEndIndex,
        startOffset,
        virtualItems,
        totalHeight,
      };
    }, [
      scrollTop,
      data,
      estimateSize,
      containerHeight,
      overscan,
      findStartIndex,
    ]);

  // ==================== 测量元素（固定高度，仅用于 ref 绑定） ====================
  // 固定高度模式下，不需要实际测量，只需要提供 ref 绑定函数
  const measureElement = useCallback(
    (node: HTMLDivElement | null, index: number) => {
      // 固定高度模式下，不需要做任何处理
      // 保留此函数是为了保持 API 兼容性
    },
    []
  );

  // ==================== 6. 滚动处理（使用 requestAnimationFrame 节流） ====================
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const top = e.currentTarget.scrollTop;
      scrollTopRef.current = top;

      // 使用 requestAnimationFrame 节流
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setScrollTop(top);
        onScroll?.(top);
      });
    },
    [onScroll]
  );

  // ==================== 7. 设置滚动位置 ====================
  const setScrollTopValue = useCallback(
    (top: number) => {
      scrollTopRef.current = top;
      setScrollTop(top);
      onScroll?.(top);

      if (containerRef.current) {
        containerRef.current.scrollTop = top;
      }
    },
    [onScroll]
  );

  // ==================== 清理 ====================
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {
    virtualItems,
    totalHeight,
    startOffset,
    containerRef,
    scrollTop,
    setScrollTop: setScrollTopValue,
    measureElement, // 保留以保持 API 兼容性，但固定高度模式下不需要实际测量
    startIndex,
    endIndex,
    handleScroll,
  };
}
