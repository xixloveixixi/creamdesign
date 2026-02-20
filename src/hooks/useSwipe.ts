/**
 * 滑动手势 Hook
 * 支持移动端滑动操作
 */

import { useEffect, RefObject } from 'react';

export interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // 滑动阈值（px），默认 50
  velocityThreshold?: number; // 速度阈值（px/ms），默认 0.3
  preventDefault?: boolean; // 是否阻止默认行为
}

/**
 * 滑动手势 Hook
 *
 * @param ref - 目标元素的 ref
 * @param options - 配置选项
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 *
 * useSwipe(containerRef, {
 *   onSwipeLeft: () => console.log('向左滑动'),
 *   onSwipeRight: () => console.log('向右滑动'),
 *   threshold: 50,
 * });
 * ```
 */
export function useSwipe<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: SwipeOptions = {}
): void {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    velocityThreshold = 0.3,
    preventDefault = false,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let isSwipe = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (preventDefault) {
        e.preventDefault();
      }

      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
      isSwipe = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (preventDefault) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (preventDefault) {
        e.preventDefault();
      }

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const deltaTime = Date.now() - startTime;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const velocity = distance / deltaTime;

      // 检查是否满足滑动条件
      if (distance > threshold && velocity > velocityThreshold) {
        isSwipe = true;

        // 判断滑动方向
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // 水平滑动
          if (deltaX > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
        } else {
          // 垂直滑动
          if (deltaY > 0) {
            onSwipeDown?.();
          } else {
            onSwipeUp?.();
          }
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart, {
      passive: !preventDefault,
    });
    element.addEventListener('touchmove', handleTouchMove, {
      passive: !preventDefault,
    });
    element.addEventListener('touchend', handleTouchEnd, {
      passive: !preventDefault,
    });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    ref,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold,
    velocityThreshold,
    preventDefault,
  ]);
}
