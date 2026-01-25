# 移动端适配快速参考指南

## 🚀 快速开始

### 1. 基础样式模板

```scss
// 组件基础样式
.component {
  width: 100%;
  height: 100%;
  padding: clamp(0.5rem, 1%, 1rem);
  font-size: clamp($font-size-sm, 1.5vw, $font-size-base);
}

// 移动端 (< 768px)
@media (max-width: 767px) {
  .component {
    // 移动端样式
  }
}

// 平板端 (768px - 991px)
@media (min-width: 768px) and (max-width: 991px) {
  .component {
    // 平板端样式
  }
}

// 桌面端 (≥ 992px)
@media (min-width: 992px) {
  .component {
    // 桌面端样式
  }
}
```

### 2. 常用响应式单位

```scss
// 内边距
padding: clamp(0.5rem, 1%, 1rem);
padding: 0.5% 1%; // 百分比

// 字体大小
font-size: clamp(0.65rem, 2vw, 0.875rem);

// 按钮尺寸
min-height: clamp(32px, 5vh, 44px);
min-width: clamp(32px, 5vw, 44px);

// 间距
margin-bottom: clamp(1rem, 2%, 1.5rem);
gap: clamp(0.5rem, 1%, 1rem);
```

### 3. 设备检测

```typescript
import { useDevice } from '../../hooks/useDevice';

const device = useDevice();

if (device.isMobile) {
  // 移动端逻辑
} else if (device.isTablet) {
  // 平板端逻辑
} else {
  // 桌面端逻辑
}
```

---

## 📐 尺寸规范速查

### 内边距（Padding）

| 设备 | 表头/标签 | 内容 | 按钮 |
|------|----------|------|------|
| 移动端 | `0.25%` | `0.25%` | `0.5% 1%` |
| 平板端 | `0.4% 0.6%` | `0.4% 0.6%` | `0.4% 0.8%` |
| 桌面端 | `0.6% 0.8%` | `0.6% 0.8%` | `0.5% 1%` |

### 字体大小（Font Size）

| 设备 | 基础字体 | 小字体 | 大字体 |
|------|---------|--------|--------|
| 移动端 | `clamp(0.65rem, 2vw, 0.75*sm)` | `clamp(0.6rem, 1.8vw, 0.7*sm)` | - |
| 平板端 | `clamp(0.9*sm, 1.5vw, base)` | `clamp(0.85*sm, 1.3vw, sm)` | - |
| 桌面端 | `clamp(base, 1.2vw, 1.1*base)` | `clamp(sm, 1vw, base)` | - |

### 按钮尺寸（Button Size）

| 设备 | 最小高度 | 最大高度 | 实现 |
|------|---------|---------|------|
| 移动端 | 32px | 36px | `clamp(32px, 5vh, 36px)` |
| 平板端 | 36px | 40px | `clamp(36px, 4vh, 40px)` |
| 桌面端 | 38px | 44px | `clamp(38px, 3vh, 44px)` |

---

## 🎯 布局策略

### 移动端布局

```scss
// 垂直布局
.component {
  flex-direction: column;
  align-items: stretch;
  
  .label {
    flex-basis: 100%;
    text-align: left;
  }
  
  .content {
    flex-basis: 100%;
    width: 100%;
  }
}
```

### 平板/桌面布局

```scss
// 水平布局
.component {
  flex-direction: row;
  align-items: center;
  
  .label {
    flex-basis: 30%;
    text-align: right;
  }
  
  .content {
    flex-basis: 70%;
  }
}
```

---

## 🔧 常见问题解决

### 问题 1：按钮没有样式

**解决方案**：
```scss
// 添加 .btn 选择器和 !important
button, .btn {
  padding: 0.5% 1% !important;
  font-size: clamp(0.6rem, 1.8vw, $font-size-sm * 0.7) !important;
}
```

### 问题 2：容器高度为 0

**解决方案**：
```tsx
// 确保容器有明确高度
<div style={{ width: '100%', height: '100%' }}>
  <Component />
</div>
```

### 问题 3：百分比不生效

**解决方案**：
```scss
// 确保父元素有明确尺寸
.parent {
  width: 100%;
  height: 100%;
  
  .child {
    padding: 0.5% 1%; // 现在会生效
  }
}
```

---

## 📱 测试检查清单

- [ ] Chrome DevTools 设备模拟测试
- [ ] 真实设备测试
- [ ] 横屏/竖屏测试
- [ ] 不同屏幕尺寸测试
- [ ] 触摸目标大小检查
- [ ] 字体可读性检查
- [ ] 滚动流畅性检查

---

## 📚 完整文档

详细文档请参考：[RESPONSIVE_SOLUTION.md](./RESPONSIVE_SOLUTION.md)

