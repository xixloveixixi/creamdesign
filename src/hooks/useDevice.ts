/**
 * 设备检测 Hook
 * 用于检测当前设备类型和特性
 */

import { useState, useEffect } from 'react';

export interface DeviceInfo {
  // 设备类型
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  // 设备特性
  isTouch: boolean;
  isRetina: boolean;

  // 屏幕尺寸
  width: number;
  height: number;

  // 方向
  isPortrait: boolean;
  isLandscape: boolean;

  // 断点信息
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

/**
 * 获取当前断点
 */
function getBreakpoint(width: number): DeviceInfo['breakpoint'] {
  if (width >= 1400) return 'xxl';
  if (width >= 1200) return 'xl';
  if (width >= 992) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 576) return 'sm';
  return 'xs';
}

/**
 * 检测设备信息
 */
function detectDevice(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouch: false,
      isRetina: false,
      width: 0,
      height: 0,
      isPortrait: false,
      isLandscape: true,
      breakpoint: 'lg',
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  // 设备类型判断
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 992;
  const isDesktop = width >= 992;

  // 触摸设备检测
  const isTouch =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0);

  // Retina 屏幕检测
  const isRetina = window.devicePixelRatio >= 2;

  // 方向检测
  const isPortrait = height > width;
  const isLandscape = width > height;

  // 断点
  const breakpoint = getBreakpoint(width);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    isRetina,
    width,
    height,
    isPortrait,
    isLandscape,
    breakpoint,
  };
}

/**
 * 设备检测 Hook
 *
 * @example
 * ```tsx
 * const device = useDevice();
 *
 * if (device.isMobile) {
 *   // 移动端逻辑
 * }
 * ```
 */
export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(detectDevice);

  useEffect(() => {
    const handleResize = () => {
      setDeviceInfo(detectDevice());
    };

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);

    // 监听方向变化（移动端）
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return deviceInfo;
}

/**
 * 设备类型判断工具函数
 */
export const DeviceUtils = {
  /**
   * 是否为移动设备
   */
  isMobile: (width: number) => width < 768,

  /**
   * 是否为平板设备
   */
  isTablet: (width: number) => width >= 768 && width < 992,

  /**
   * 是否为桌面设备
   */
  isDesktop: (width: number) => width >= 992,

  /**
   * 获取断点
   */
  getBreakpoint: getBreakpoint,
};
