// hooks/useVirtualScroll.ts
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface VirtualItem {
  index: number;
  size: number;
  start: number;
  end: number;
}

export interface UseVirtualScrollOptions<T> {
  data: T[]; //数据
  estimateSize: number; //预估高度
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
  measureElement: (node: HTMLDivElement | null, index: number) => void; //测量元素
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
  const measurementsRef = useRef<VirtualItem[]>([]);
  const scrollTopRef = useRef(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  //阶段一：初始化测量数据
  useEffect(() => {
    // 只有数据长度变化时才重新初始化测量数据
    const currentLength = measurementsRef.current.length;
    const newLength = data.length;

    if (currentLength !== newLength || measurementsRef.current.length === 0) {
      const newMeasurements = data.map((_, i) => ({
        index: i,
        size: estimateSize,
        start: i * estimateSize,
        end: (i + 1) * estimateSize,
      }));

      measurementsRef.current = newMeasurements;
    }
  }, [data, estimateSize]);

  //阶段二：查找起始索引
  const findStartIndex = useCallback((scrollTop: number) => {
    const measurements = measurementsRef.current;
    if (measurements.length === 0) return 0;

    let low = 0;
    let high = measurements.length - 1;
    let result = 0;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (measurements[mid].end > scrollTop) {
        result = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return Math.max(0, result - 1); // 稍微提前一点开始渲染
  }, []);

  // ==================== 3. 优化计算虚拟列表项 ====================
  const { startIndex, endIndex, startOffset, virtualItems, totalHeight } =
    useMemo(() => {
      const measurements = measurementsRef.current;

      // 计算总高度
      const totalHeight =
        measurements.length > 0
          ? measurements[measurements.length - 1].end
          : data.length * estimateSize;

      // 计算起始索引
      const rawStartIndex = findStartIndex(scrollTop);
      const actualStartIndex = Math.max(0, rawStartIndex - overscan);

      // 计算可见项数量（至少显示10项）
      const actualContainerHeight = Math.max(containerHeight, 1);
      const visibleCount = Math.ceil(actualContainerHeight / estimateSize);

      // 计算结束索引
      const actualEndIndex = Math.min(
        actualStartIndex + visibleCount + overscan * 2, // 前后都要有 overscan
        data.length
      );

      // 获取虚拟列表项
      const virtualItems = data.slice(actualStartIndex, actualEndIndex);
      const startOffset = measurements[actualStartIndex]?.start ?? 0;

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

  // ==================== 4. 优化调整项目大小 ====================
  const resizeItem = useCallback((index: number, newSize: number) => {
    const measurements = measurementsRef.current;
    if (!measurements[index] || newSize <= 0) return;

    const oldSize = measurements[index].size;
    const delta = newSize - oldSize;

    // 只有当大小变化超过5px时才更新
    if (Math.abs(delta) < 5) return;

    // 更新当前项
    measurements[index].size = newSize;
    measurements[index].end = measurements[index].start + newSize;

    // 增量更新后续项
    for (let k = index + 1; k < measurements.length; k++) {
      measurements[k].start = measurements[k - 1].end;
      measurements[k].end = measurements[k].start + measurements[k].size;
    }

    // 触发滚动位置补偿（如果变化的项在当前可视区域上方）
    if (
      measurements[index].start < scrollTopRef.current &&
      containerRef.current
    ) {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop += delta;
          scrollTopRef.current = containerRef.current.scrollTop;
          setScrollTop(containerRef.current.scrollTop);
        }
      });
    }
  }, []);

  // ==================== 5. 优化测量元素 ====================
  const measureElement = useCallback(
    (node: HTMLDivElement | null, index: number) => {
      if (!node) {
        // 清理
        const oldNode = itemRefs.current.get(index);
        if (oldNode && resizeObserverRef.current) {
          resizeObserverRef.current.unobserve(oldNode);
          itemRefs.current.delete(index);
        }
        return;
      }

      // 检查是否已经观察
      if (itemRefs.current.has(index)) return;

      // 设置属性
      node.setAttribute('data-index', index.toString());

      // 存储引用
      itemRefs.current.set(index, node);

      // 创建或获取 ResizeObserver
      if (!resizeObserverRef.current) {
        resizeObserverRef.current = new ResizeObserver(entries => {
          if (resizeTimeoutRef.current) {
            clearTimeout(resizeTimeoutRef.current);
          }

          resizeTimeoutRef.current = setTimeout(() => {
            entries.forEach(entry => {
              const index = Number(entry.target.getAttribute('data-index'));
              if (!isNaN(index) && index >= 0 && index < data.length) {
                const height =
                  entry.borderBoxSize?.[0]?.blockSize ??
                  entry.contentRect.height;

                if (height > 0) {
                  resizeItem(index, Math.ceil(height));
                }
              }
            });
          }, 100); // 100ms 防抖
        });
      }

      // 开始观察
      resizeObserverRef.current.observe(node);

      // 立即测量初始大小
      requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        if (rect.height > 0 && Math.abs(rect.height - estimateSize) > 5) {
          resizeItem(index, rect.height);
        }
      });
    },
    [data.length, estimateSize, resizeItem]
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

  // ==================== 7. 清理 ====================
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
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
    measureElement,
    startIndex,
    endIndex,
    handleScroll,
  };
}
