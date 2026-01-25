# CreamDesign 多端适配设计方案

## 📱 设计目标

支持手机、平板、PC 三端，提供一致的用户体验和自适应布局。

---

## 🎯 核心设计原则

### 1. **移动优先（Mobile First）**

- 从小屏幕开始设计，逐步增强到大屏幕
- 确保移动端体验优先

### 2. **响应式布局（Responsive Layout）**

- 使用弹性布局和媒体查询
- 组件自动适配不同屏幕尺寸

### 3. **触摸友好（Touch Friendly）**

- 移动端按钮最小 44x44px
- 增加触摸目标间距
- 支持手势操作

### 4. **性能优化（Performance）**

- 按需加载组件
- 虚拟滚动优化
- 图片懒加载

---

## 📐 断点系统（Breakpoints）

### 标准断点定义

```scss
// src/style/_breakpoints.scss

// 断点定义
$breakpoints: (
  xs: 0,
  // 手机（竖屏）
  sm: 576px,
  // 手机（横屏）/ 小平板
  md: 768px,
  // 平板（竖屏）
  lg: 992px,
  // 平板（横屏）/ 小桌面
  xl: 1200px,
  // 桌面
  xxl: 1400px, // 大桌面
);

// 设备类型
$device-mobile: 0px;
$device-tablet: 768px;
$device-desktop: 992px;

// 媒体查询 Mixin
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    $value: map-get($breakpoints, $breakpoint);
    @media (min-width: $value) {
      @content;
    }
  } @else {
    @warn "Unknown breakpoint: #{$breakpoint}";
  }
}

// 移动端专用
@mixin mobile-only {
  @media (max-width: 767px) {
    @content;
  }
}

// 平板专用
@mixin tablet-only {
  @media (min-width: 768px) and (max-width: 991px) {
    @content;
  }
}

// 桌面端专用
@mixin desktop-only {
  @media (min-width: 992px) {
    @content;
  }
}

// 触摸设备检测
@mixin touch-device {
  @media (hover: none) and (pointer: coarse) {
    @content;
  }
}

// 鼠标设备检测
@mixin mouse-device {
  @media (hover: hover) and (pointer: fine) {
    @content;
  }
}
```

---

## 🎨 组件尺寸适配策略

### 1. **按钮组件**

```scss
// 移动端：更大的触摸目标
@mixin mobile-only {
  .cream-btn {
    min-height: 44px; // iOS 推荐最小触摸目标
    min-width: 44px;
    padding: 0.75rem 1.5rem; // 更大的内边距
    font-size: 1rem;
    gap: 0.5rem; // 图标和文字间距
  }

  .cream-btn-sm {
    min-height: 36px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .cream-btn-lg {
    min-height: 52px;
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
}

// 桌面端：标准尺寸
@mixin desktop-only {
  .cream-btn {
    min-height: 32px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
```

### 2. **表格组件**

```scss
// 移动端：卡片布局
@mixin mobile-only {
  .cream-table {
    // 隐藏表头
    thead {
      display: none;
    }

    // 卡片式行布局
    tbody tr {
      display: block;
      margin-bottom: 1rem;
      border: 1px solid $color-primary-200;
      border-radius: 0.5rem;
      padding: 1rem;

      td {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid $color-divider;

        &::before {
          content: attr(data-label);
          font-weight: bold;
          min-width: 100px;
        }
      }
    }
  }
}

// 平板：简化表格
@mixin tablet-only {
  .cream-table {
    font-size: 0.875rem;

    th,
    td {
      padding: 0.625rem 0.75rem;
    }
  }
}
```

### 3. **表单组件**

```scss
// 移动端：全宽输入框
@mixin mobile-only {
  .cream-input {
    width: 100%;
    font-size: 16px; // 防止 iOS 自动缩放
    padding: 0.875rem 1rem;
    min-height: 44px;
  }
}

// 桌面端：固定宽度
@mixin desktop-only {
  .cream-input {
    max-width: 400px;
    padding: 0.5rem 0.75rem;
    min-height: 32px;
  }
}
```

---

## 👆 触摸交互适配

### 1. **触摸目标大小**

```scss
// 最小触摸目标
$touch-target-min: 44px; // iOS 推荐
$touch-target-comfortable: 48px; // Android 推荐

// 触摸目标间距
$touch-spacing: 8px; // 最小间距
$touch-spacing-comfortable: 12px; // 舒适间距
```

### 2. **悬停状态处理**

```scss
// 触摸设备：禁用悬停效果
@mixin touch-device {
  .cream-btn:hover {
    // 触摸设备不显示悬停效果
  }

  // 使用 :active 替代 :hover
  .cream-btn:active {
    background-color: $color-primary-700;
    transform: scale(0.98);
  }
}

// 鼠标设备：保留悬停效果
@mixin mouse-device {
  .cream-btn:hover {
    background-color: $color-primary-600;
    transform: translateY(-1px);
  }
}
```

### 3. **手势支持**

```typescript
// src/hooks/useSwipe.ts
export interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // 滑动阈值（px）
}

export function useSwipe(
  ref: React.RefObject<HTMLElement>,
  options: SwipeOptions
) {
  const { threshold = 50 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const deltaTime = Date.now() - startTime;

      // 快速滑动（< 300ms）且距离 > 阈值
      if (deltaTime < 300) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // 水平滑动
          if (deltaX > threshold) {
            options.onSwipeRight?.();
          } else if (deltaX < -threshold) {
            options.onSwipeLeft?.();
          }
        } else {
          // 垂直滑动
          if (deltaY > threshold) {
            options.onSwipeDown?.();
          } else if (deltaY < -threshold) {
            options.onSwipeUp?.();
          }
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, options]);
}
```

---

## 📱 设备检测 Hook

```typescript
// src/hooks/useDevice.ts
import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  width: number;
  height: number;
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTouch: false,
        width: 0,
        height: 0,
      };
    }

    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 992;
    const isDesktop = width >= 992;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    return {
      isMobile,
      isTablet,
      isDesktop,
      isTouch,
      width,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 992;
      const isDesktop = width >= 992;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isTouch,
        width,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceInfo;
}
```

---

## 🎯 组件适配示例

### Table 组件多端适配

```typescript
// src/component/Table/TableContainer.tsx
import { useDevice } from '../../hooks/useDevice';

const TableContainer = <T extends Record<string, any> = any>(
  props: TableContainerProps<T>
) => {
  const device = useDevice();

  // 根据设备类型调整配置
  const virtualConfig = useMemo(() => {
    if (!virtual) return { enabled: false };

    // 移动端：禁用虚拟滚动，使用分页
    if (device.isMobile) {
      return {
        enabled: false,
        rowHeight: 60, // 移动端行高更大
        containerHeight: device.height - 200, // 减去表头和表尾
        overscan: 2,
      };
    }

    // 平板：可选虚拟滚动
    if (device.isTablet) {
      return {
        enabled: virtual === true ? true : false,
        rowHeight: 55,
        containerHeight: device.height - 180,
        overscan: 3,
      };
    }

    // 桌面：启用虚拟滚动
    return {
      enabled: true,
      rowHeight: 50,
      containerHeight: virtualConfig.containerHeight || 400,
      overscan: 5,
    };
  }, [virtual, device]);

  // ...
};
```

---

## 📦 布局系统

### Grid 布局适配

```scss
// src/style/_grid.scss

.cream-grid {
  display: grid;
  gap: 1rem;

  // 移动端：单列
  @include mobile-only {
    grid-template-columns: 1fr;
  }

  // 平板：2列
  @include tablet-only {
    grid-template-columns: repeat(2, 1fr);
  }

  // 桌面：3列
  @include desktop-only {
    grid-template-columns: repeat(3, 1fr);
  }
}

// 响应式列数
.cream-grid-cols {
  &-1 {
    grid-template-columns: 1fr;
  }
  &-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  &-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  &-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  @include mobile-only {
    &-mobile-1 {
      grid-template-columns: 1fr;
    }
  }

  @include tablet-only {
    &-tablet-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @include desktop-only {
    &-desktop-3 {
      grid-template-columns: repeat(3, 1fr);
    }
    &-desktop-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
```

---

## ⚡ 性能优化策略

### 1. **按需加载**

```typescript
// 移动端：延迟加载非关键组件
const LazyComponent = device.isMobile
  ? React.lazy(() => import('./HeavyComponent'))
  : HeavyComponent;
```

### 2. **虚拟滚动优化**

```typescript
// 根据设备性能调整虚拟滚动配置
const virtualConfig = {
  enabled: device.isDesktop, // 仅桌面端启用
  overscan: device.isMobile ? 2 : 5, // 移动端减少预渲染
  itemHeight: device.isMobile ? 60 : 50,
};
```

### 3. **图片优化**

```scss
// 响应式图片
.cream-image {
  width: 100%;
  height: auto;

  @include mobile-only {
    max-width: 100%;
  }

  @include desktop-only {
    max-width: 800px;
  }
}
```

---

## 🛠️ 实施步骤

### 第一步：创建断点系统

1. 创建 `src/style/_breakpoints.scss`
2. 定义断点和 Mixin
3. 在 `_creamdesign.scss` 中导入

### 第二步：更新现有组件

1. 为每个组件添加响应式样式
2. 使用断点 Mixin
3. 测试各设备尺寸

### 第三步：添加设备检测

1. 创建 `useDevice` Hook
2. 在组件中使用设备信息
3. 根据设备类型调整行为

### 第四步：优化交互

1. 添加触摸手势支持
2. 优化触摸目标大小
3. 处理悬停状态

### 第五步：测试验证

1. 在真实设备上测试
2. 使用浏览器开发者工具模拟
3. 性能测试和优化

---

## 📝 使用示例

```typescript
import { useDevice } from 'creamdesign/hooks/useDevice';
import { Table } from 'creamdesign';

function App() {
  const device = useDevice();

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        // 移动端禁用虚拟滚动
        virtual={!device.isMobile}
        // 根据设备调整分页
        pagination={{
          pageSize: device.isMobile ? 10 : 20,
        }}
      />
    </div>
  );
}
```

---

## ✅ 检查清单

- [ ] 所有组件支持移动端布局
- [ ] 触摸目标大小符合规范（≥44px）
- [ ] 响应式断点系统完善
- [ ] 设备检测 Hook 可用
- [ ] 性能优化到位
- [ ] 真实设备测试通过
- [ ] 文档完善
