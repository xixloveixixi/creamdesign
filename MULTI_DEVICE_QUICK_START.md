# 多端适配快速开始

## 🚀 快速开始

### 1. 使用设备检测 Hook

```typescript
import { useDevice } from 'creamdesign/hooks/useDevice';

function MyComponent() {
  const device = useDevice();
  
  // 根据设备类型调整行为
  const pageSize = device.isMobile ? 10 : 20;
  const enableVirtualScroll = device.isDesktop;
  
  return (
    <Table
      dataSource={data}
      pagination={{ pageSize }}
      virtual={enableVirtualScroll}
    />
  );
}
```

### 2. 在 SCSS 中使用断点

```scss
.my-component {
  // 默认样式（移动端优先）
  padding: 1rem;
  font-size: 0.875rem;
  
  // 平板端
  @include tablet-only {
    padding: 1.5rem;
    font-size: 1rem;
  }
  
  // 桌面端
  @include desktop-only {
    padding: 2rem;
    font-size: 1.125rem;
  }
  
  // 触摸设备
  @include touch-device {
    min-height: 44px;
  }
}
```

### 3. 使用滑动手势

```typescript
import { useSwipe } from 'creamdesign/hooks/useSwipe';

function SwipeableList() {
  const listRef = useRef<HTMLDivElement>(null);
  
  useSwipe(listRef, {
    onSwipeLeft: () => deleteItem(),
    onSwipeRight: () => editItem(),
    threshold: 50,
  });
  
  return <div ref={listRef}>可滑动列表</div>;
}
```

---

## 📐 断点参考

| 断点 | 尺寸 | 设备类型 |
|------|------|----------|
| xs   | 0px+ | 手机（竖屏） |
| sm   | 576px+ | 手机（横屏） |
| md   | 768px+ | 平板（竖屏） |
| lg   | 992px+ | 平板（横屏）/ 小桌面 |
| xl   | 1200px+ | 桌面 |
| xxl  | 1400px+ | 大桌面 |

---

## 🎯 常用 Mixin

```scss
// 设备类型
@include mobile-only { }
@include tablet-only { }
@include desktop-only { }

// 交互设备
@include touch-device { }
@include mouse-device { }

// 响应式工具
@include responsive-padding(1rem, 1.5rem, 2rem);
@include responsive-font-size(0.875rem, 1rem, 1.125rem);
@include touch-target(44px);
```

---

## 📱 移动端最佳实践

1. **触摸目标 ≥ 44px**
2. **字体大小 ≥ 16px**（防止 iOS 自动缩放）
3. **禁用悬停效果**（触摸设备）
4. **使用卡片布局**（替代复杂表格）
5. **优化性能**（减少渲染、使用虚拟滚动）

---

## 🔍 测试方法

1. **Chrome DevTools**: F12 → 设备工具栏
2. **真实设备**: 在手机、平板、PC 上测试
3. **响应式测试**: 调整窗口大小观察布局变化

