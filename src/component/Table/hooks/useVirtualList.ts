import { useCallback, useMemo, useRef, useState, useEffect } from 'react';

export interface UseVirtualListOptions<T> {
  dataSource: T[];
  containerHeight: number;
  // 静态的行高
  itemHeight: number;
  overscan?: number;
  scrollElementRef?: React.RefObject<HTMLElement>;
}

export interface VirtualListResult<T> {
  visibleData: T[];
  startIndex: number;
  endIndex: number;
  totalHeight: number;
  offsetY: number;
  scrollElementRef: React.RefObject<HTMLElement | null>;
  onScroll: (e: React.UIEvent<HTMLElement>) => void;
  // 添加：滚动到指定位置的方法
  scrollTo: (scrollTop: number) => void;
}

export function useVirtualList<T>(
  options: UseVirtualListOptions<T>
): VirtualListResult<T> {
  const {
    dataSource,
    containerHeight,
    itemHeight,
    overscan = 3,
    scrollElementRef: externalRef,
  } = options;

  const internalRef = useRef<HTMLElement | null>(null);
  const scrollElementRef = (externalRef ||
    internalRef) as React.RefObject<HTMLElement | null>;

  const [scrollTop, setScrollTop] = useState(0);
  const scrollTopRef = useRef(0);

  const defaultItemHeight = 50;

  // 使用 useRef 缓存计算结果
  const cacheRef = useRef({
    itemOffsets: [] as number[],
    itemHeights: [] as number[],
    dataSourceHash: '', // 用于检测数据变化
  });

  // 计算数据哈希，用于检测数据变化
  const getDataSourceHash = useCallback(() => {
    // 简单实现：使用长度和第一项的引用
    return `${dataSource.length}-${dataSource[0]?.toString() || ''}`;
  }, [dataSource]);

  // 重新计算高度和偏移量
  const recalculateOffsets = useCallback(() => {
    const dataLength = dataSource.length;

    if (dataLength === 0) {
      cacheRef.current = {
        itemOffsets: [0],
        itemHeights: [],
        dataSourceHash: getDataSourceHash(),
      };
      return;
    }

    const itemHeights: number[] = [];
    const itemOffsets: number[] = [0]; // 第一个偏移是0
    let currentOffset = 0;

    for (let i = 0; i < dataLength; i++) {
      const height = itemHeight;
      itemHeights.push(height);
      currentOffset += height;
      itemOffsets.push(currentOffset);
    }

    cacheRef.current = {
      itemOffsets,
      itemHeights,
      dataSourceHash: getDataSourceHash(),
    };
  }, [dataSource, itemHeight, getDataSourceHash]);

  // 监听数据变化，重新计算
  useEffect(() => {
    const currentHash = getDataSourceHash();
    if (currentHash !== cacheRef.current.dataSourceHash) {
      recalculateOffsets();
    }
  }, [getDataSourceHash, recalculateOffsets]);

  // 二分查找找到起始索引
  const findStartIndex = useCallback((scrollTop: number): number => {
    const { itemOffsets } = cacheRef.current;
    const dataLength = itemOffsets.length - 1; // -1 因为最后一个元素是总高度

    if (dataLength <= 0) return 0;

    let left = 0;
    let right = dataLength - 1;
    let result = 0;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const itemStart = itemOffsets[mid];
      const itemEnd = itemOffsets[mid + 1];

      if (scrollTop >= itemEnd) {
        left = mid + 1;
      } else if (scrollTop < itemStart) {
        right = mid - 1;
      } else {
        result = mid;
        break;
      }
    }

    // 如果没有精确找到，left 就是应该开始的位置
    if (left > right) {
      result = Math.min(left, dataLength - 1);
    }

    return Math.max(0, result);
  }, []);

  // 计算可见范围
  const { visibleData, startIndex, endIndex, totalHeight, offsetY } =
    useMemo(() => {
      const dataLength = dataSource.length;

      if (dataLength === 0 || containerHeight <= 0) {
        return {
          visibleData: [],
          startIndex: 0,
          endIndex: 0,
          totalHeight: 0,
          offsetY: 0,
        };
      }

      const { itemOffsets } = cacheRef.current;

      // 如果缓存还没计算好
      if (itemOffsets.length !== dataLength + 1) {
        return {
          visibleData: [],
          startIndex: 0,
          endIndex: 0,
          totalHeight: 0,
          offsetY: 0,
        };
      }

      const totalHeight = itemOffsets[dataLength];

      // 1. 找到起始索引
      const rawStartIndex = findStartIndex(scrollTop);
      const bufferedStartIndex = Math.max(0, rawStartIndex - overscan);

      // 2. 找到结束索引
      const visibleBottom = scrollTop + containerHeight;
      let rawEndIndex = rawStartIndex;

      // 找到最后一个可见项
      while (
        rawEndIndex < dataLength &&
        itemOffsets[rawEndIndex] < visibleBottom
      ) {
        rawEndIndex++;
      }

      const bufferedEndIndex = Math.min(dataLength, rawEndIndex + overscan);

      // 3. 计算偏移量
      const offsetY = itemOffsets[bufferedStartIndex];

      // 4. 获取可见数据
      const visibleData = dataSource.slice(
        bufferedStartIndex,
        bufferedEndIndex
      );

      return {
        visibleData,
        startIndex: bufferedStartIndex,
        endIndex: bufferedEndIndex,
        totalHeight,
        offsetY,
      };
    }, [dataSource, scrollTop, containerHeight, overscan, findStartIndex]);

  // 滚动事件处理（使用节流避免频繁更新）
  const onScroll = useCallback(
    (e: React.UIEvent<HTMLElement>) => {
      const target = e.currentTarget;
      if (!target) return;

      const newScrollTop = target.scrollTop;
      scrollTopRef.current = newScrollTop;

      // 使用 requestAnimationFrame 节流状态更新
      requestAnimationFrame(() => {
        // 再次检查元素是否还存在
        if (scrollElementRef.current) {
          setScrollTop(newScrollTop);
        }
      });
    },
    [scrollElementRef]
  );

  // 滚动到指定位置的方法
  const scrollTo = useCallback(
    (scrollTop: number) => {
      const element = scrollElementRef.current;
      if (element) {
        element.scrollTop = scrollTop;
        setScrollTop(scrollTop);
        scrollTopRef.current = scrollTop;
      }
    },
    [scrollElementRef]
  );

  return {
    visibleData,
    startIndex,
    endIndex,
    totalHeight,
    offsetY,
    scrollElementRef,
    onScroll,
    scrollTo,
  };
}
