/**
 * 设备调试组件
 * 用于在开发时显示当前设备信息
 */

import { useDevice } from '../../hooks/useDevice';

export interface DeviceDebugProps {
  /**
   * 是否显示调试信息
   * @default process.env.NODE_ENV === 'development'
   */
  show?: boolean;
  /**
   * 位置
   * @default 'top-right'
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const DeviceDebug: React.FC<DeviceDebugProps> = ({
  show = process.env.NODE_ENV === 'development',
  position = 'top-right',
}) => {
  const device = useDevice();

  if (!show) return null;

  const positionStyles = {
    'top-left': { top: 0, left: 0 },
    'top-right': { top: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
    'bottom-right': { bottom: 0, right: 0 },
  };

  const deviceType = device.isMobile
    ? '📱 手机'
    : device.isTablet
      ? '📱 平板'
      : '💻 桌面';

  const breakpointColors = {
    xs: '#ff6b6b',
    sm: '#4ecdc4',
    md: '#45b7d1',
    lg: '#96ceb4',
    xl: '#ffeaa7',
    xxl: '#dda0dd',
  };

  return (
    <div
      style={{
        position: 'fixed',
        ...positionStyles[position],
        background: 'rgba(0, 0, 0, 0.85)',
        color: 'white',
        padding: '0.75rem',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        borderRadius: '0 0 0 0.5rem',
        lineHeight: '1.6',
        minWidth: '200px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
        🛠️ 设备调试信息
      </div>
      <div>
        <div>
          <strong>设备类型:</strong> {deviceType}
        </div>
        <div>
          <strong>断点:</strong>{' '}
          <span
            style={{
              color: breakpointColors[device.breakpoint],
              fontWeight: 'bold',
            }}
          >
            {device.breakpoint.toUpperCase()}
          </span>
        </div>
        <div>
          <strong>屏幕尺寸:</strong> {device.width} × {device.height}px
        </div>
        <div>
          <strong>触摸设备:</strong>{' '}
          {device.isTouch ? '✅ 是' : '❌ 否'}
        </div>
        <div>
          <strong>方向:</strong>{' '}
          {device.isPortrait ? '📱 竖屏' : '🔄 横屏'}
        </div>
        <div>
          <strong>Retina:</strong>{' '}
          {device.isRetina ? '✅ 是' : '❌ 否'}
        </div>
      </div>
      <div
        style={{
          marginTop: '0.5rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid rgba(255,255,255,0.3)',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        调整窗口大小查看变化
      </div>
    </div>
  );
};

export default DeviceDebug;

