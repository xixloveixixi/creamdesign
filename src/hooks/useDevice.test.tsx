import { renderHook, act } from '@testing-library/react';
import { useDevice, DeviceUtils } from './useDevice';

describe('useDevice Hook', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;
  const originalDevicePixelRatio = window.devicePixelRatio;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      value: originalInnerWidth,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: originalInnerHeight,
      writable: true,
    });
    Object.defineProperty(window, 'devicePixelRatio', {
      value: originalDevicePixelRatio,
      writable: true,
    });
  });

  // 1. 桌面设备检测
  test('should detect desktop device', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1200,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
    });

    const { result } = renderHook(() => useDevice());

    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.width).toBe(1200);
    expect(result.current.height).toBe(800);
    expect(result.current.isLandscape).toBe(true);
    expect(result.current.isPortrait).toBe(false);
  });

  // 2. 移动设备检测
  test('should detect mobile device', () => {
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
    Object.defineProperty(window, 'innerHeight', {
      value: 667,
      writable: true,
    });

    const { result } = renderHook(() => useDevice());

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.breakpoint).toBe('xs');
    expect(result.current.isPortrait).toBe(true);
  });

  // 3. 平板设备检测
  test('should detect tablet device', () => {
    Object.defineProperty(window, 'innerWidth', { value: 768, writable: true });
    Object.defineProperty(window, 'innerHeight', {
      value: 1024,
      writable: true,
    });

    const { result } = renderHook(() => useDevice());

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.breakpoint).toBe('md');
  });

  // 4. 窗口大小变化时更新
  test('should update on window resize', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1200,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
    });

    const { result } = renderHook(() => useDevice());
    expect(result.current.isDesktop).toBe(true);

    // 模拟窗口缩小到移动端
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        value: 375,
        writable: true,
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 667,
        writable: true,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });

  // 5. Retina 屏幕检测
  test('should detect retina display', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1200,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
    });
    Object.defineProperty(window, 'devicePixelRatio', {
      value: 2,
      writable: true,
    });

    const { result } = renderHook(() => useDevice());
    expect(result.current.isRetina).toBe(true);
  });

  // 6. 非 Retina 屏幕检测
  test('should detect non-retina display', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1200,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
    });
    Object.defineProperty(window, 'devicePixelRatio', {
      value: 1,
      writable: true,
    });

    const { result } = renderHook(() => useDevice());
    expect(result.current.isRetina).toBe(false);
  });

  // 7. 卸载时清理事件监听器
  test('should clean up event listeners on unmount', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useDevice());

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith(
      'orientationchange',
      expect.any(Function)
    );
    removeSpy.mockRestore();
  });

  // 8. 断点 sm 检测
  test('should detect sm breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { value: 600, writable: true });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
    });

    const { result } = renderHook(() => useDevice());
    expect(result.current.breakpoint).toBe('sm');
    expect(result.current.isMobile).toBe(true);
  });

  // 9. 断点 lg 检测
  test('should detect lg breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1000,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
    });

    const { result } = renderHook(() => useDevice());
    expect(result.current.breakpoint).toBe('lg');
    expect(result.current.isDesktop).toBe(true);
  });
});

describe('DeviceUtils', () => {
  // 10. 移动设备判断
  test('should correctly identify mobile width', () => {
    expect(DeviceUtils.isMobile(320)).toBe(true);
    expect(DeviceUtils.isMobile(767)).toBe(true);
    expect(DeviceUtils.isMobile(768)).toBe(false);
  });

  // 11. 平板设备判断
  test('should correctly identify tablet width', () => {
    expect(DeviceUtils.isTablet(768)).toBe(true);
    expect(DeviceUtils.isTablet(991)).toBe(true);
    expect(DeviceUtils.isTablet(992)).toBe(false);
    expect(DeviceUtils.isTablet(767)).toBe(false);
  });

  // 12. 桌面设备判断
  test('should correctly identify desktop width', () => {
    expect(DeviceUtils.isDesktop(992)).toBe(true);
    expect(DeviceUtils.isDesktop(1920)).toBe(true);
    expect(DeviceUtils.isDesktop(991)).toBe(false);
  });

  // 13. 所有断点值
  test('should return correct breakpoints', () => {
    expect(DeviceUtils.getBreakpoint(320)).toBe('xs');
    expect(DeviceUtils.getBreakpoint(575)).toBe('xs');
    expect(DeviceUtils.getBreakpoint(576)).toBe('sm');
    expect(DeviceUtils.getBreakpoint(767)).toBe('sm');
    expect(DeviceUtils.getBreakpoint(768)).toBe('md');
    expect(DeviceUtils.getBreakpoint(991)).toBe('md');
    expect(DeviceUtils.getBreakpoint(992)).toBe('lg');
    expect(DeviceUtils.getBreakpoint(1199)).toBe('lg');
    expect(DeviceUtils.getBreakpoint(1200)).toBe('xl');
    expect(DeviceUtils.getBreakpoint(1399)).toBe('xl');
    expect(DeviceUtils.getBreakpoint(1400)).toBe('xxl');
    expect(DeviceUtils.getBreakpoint(1920)).toBe('xxl');
  });
});
