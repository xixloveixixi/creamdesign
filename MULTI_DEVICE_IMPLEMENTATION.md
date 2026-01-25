# 多端适配实施指南

## 📋 实施步骤

### 第一步：安装依赖（如果需要）

当前项目已包含所需依赖，无需额外安装。

---

### 第二步：更新样式系统

#### 1. 在 `_creamdesign.scss` 中导入断点系统

```scss
// src/style/_creamdesign.scss
@import './breakpoints'; // 已自动添加
```

#### 2. 更新组件样式使用断点

**示例：Button 组件**

```scss
// src/component/Button/buttonStyle.scss

.cream-btn {
  // 基础样式
  @include btn-base();

  // 桌面端：标准尺寸
  @include desktop-only {
    min-height: 32px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  // 移动端：更大的触摸目标
  @include mobile-only {
    min-height: 44px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    @include touch-target(44px);
  }

  // 触摸设备：禁用悬停效果
  @include touch-device {
    &:hover {
      // 不显示悬停效果
    }

    &:active {
      transform: scale(0.98);
      background-color: $color-primary-700;
    }
  }

  // 鼠标设备：保留悬停效果
  @include mouse-device {
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba($color-primary-900, 0.2);
    }
  }
}
```

---

### 第三步：在组件中使用设备检测

**示例：Table 组件**

```typescript
// src/component/Table/TableContainer.tsx
import { useDevice } from '../../hooks/useDevice';

const TableContainer = <T extends Record<string, any> = any>(
  props: TableContainerProps<T>
) => {
  const device = useDevice();

  // 根据设备类型调整虚拟滚动配置
  const virtualConfig = useMemo(() => {
    if (!virtual) return { enabled: false };

    // 移动端：禁用虚拟滚动，使用更大的行高
    if (device.isMobile) {
      return {
        enabled: false,
        rowHeight: 60,
        containerHeight: device.height - 200,
        overscan: 2,
      };
    }

    // 平板：可选虚拟滚动
    if (device.isTablet) {
      return {
        enabled: typeof virtual === 'boolean' ? virtual : false,
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
  }, [
    virtual,
    device.isMobile,
    device.isTablet,
    device.isDesktop,
    device.height,
  ]);

  // ...
};
```

---

### 第四步：添加响应式样式类

在 `_creamdesign.scss` 中添加响应式工具类：

```scss
// 响应式显示/隐藏
.hide-mobile {
  @include mobile-only {
    display: none !important;
  }
}

.hide-tablet {
  @include tablet-only {
    display: none !important;
  }
}

.hide-desktop {
  @include desktop-only {
    display: none !important;
  }
}

.show-mobile {
  display: none !important;

  @include mobile-only {
    display: block !important;
  }
}

.show-tablet {
  display: none !important;

  @include tablet-only {
    display: block !important;
  }
}

.show-desktop {
  display: none !important;

  @include desktop-only {
    display: block !important;
  }
}
```

---

### 第五步：测试验证

#### 1. 使用浏览器开发者工具

- Chrome DevTools: F12 → 设备工具栏（Ctrl+Shift+M）
- 测试不同设备尺寸：
  - iPhone SE (375x667)
  - iPhone 12 Pro (390x844)
  - iPad (768x1024)
  - Desktop (1920x1080)

#### 2. 真实设备测试

- 在真实手机、平板、PC 上测试
- 检查触摸交互
- 验证布局适配

#### 3. 性能测试

- 使用 Chrome Performance 工具
- 检查移动端性能
- 优化渲染性能

---

## 🎯 组件适配检查清单

### Button 组件

- [ ] 移动端触摸目标 ≥ 44px
- [ ] 桌面端保留悬停效果
- [ ] 触摸设备禁用悬停
- [ ] 响应式字体大小

### Table 组件

- [ ] 移动端卡片布局
- [ ] 平板端简化表格
- [ ] 桌面端完整表格
- [ ] 虚拟滚动按设备启用

### Form 组件

- [ ] 移动端全宽输入框
- [ ] 防止 iOS 自动缩放（font-size: 16px）
- [ ] 触摸目标大小适配
- [ ] 响应式布局

### Menu 组件

- [ ] 移动端抽屉式菜单
- [ ] 平板端侧边栏
- [ ] 桌面端顶部导航
- [ ] 触摸手势支持

### Pagination 组件

- [ ] 移动端简化分页
- [ ] 触摸目标大小
- [ ] 响应式按钮大小

---

## 📱 移动端特殊处理

### 1. 防止 iOS 自动缩放

```scss
.cream-input {
  @include mobile-only {
    font-size: 16px; // iOS 不会自动缩放 ≥16px 的输入框
  }
}
```

### 2. 安全区域适配（iPhone X+）

```scss
.safe-area {
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

### 3. 视口单位使用

```scss
// 使用 vh/vw 而非固定 px
.container {
  height: 100vh;
  width: 100vw;

  @include mobile-only {
    // 移动端考虑地址栏
    height: 100dvh; // 动态视口高度
  }
}
```

---

## 🔧 工具函数使用

### useDevice Hook

```typescript
import { useDevice } from 'creamdesign/hooks/useDevice';

function MyComponent() {
  const device = useDevice();

  return (
    <div>
      {device.isMobile && <MobileView />}
      {device.isTablet && <TabletView />}
      {device.isDesktop && <DesktopView />}

      <p>当前断点: {device.breakpoint}</p>
      <p>屏幕尺寸: {device.width} x {device.height}</p>
      <p>是否触摸设备: {device.isTouch ? '是' : '否'}</p>
    </div>
  );
}
```

### useSwipe Hook

```typescript
import { useSwipe } from 'creamdesign/hooks/useSwipe';

function SwipeableCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  useSwipe(cardRef, {
    onSwipeLeft: () => console.log('向左滑动'),
    onSwipeRight: () => console.log('向右滑动'),
    threshold: 50,
  });

  return <div ref={cardRef}>可滑动卡片</div>;
}
```

---

## 📊 性能优化建议

### 1. 条件渲染

```typescript
// 根据设备类型条件渲染
const Component = device.isMobile ? MobileComponent : DesktopComponent;
```

### 2. 懒加载

```typescript
// 移动端延迟加载非关键组件
const HeavyComponent = device.isMobile
  ? React.lazy(() => import('./HeavyComponent'))
  : HeavyComponent;
```

### 3. 虚拟滚动

```typescript
// 仅桌面端启用虚拟滚动
<Table virtual={device.isDesktop} />
```

---

## ✅ 完成标准

- [ ] 所有组件支持移动端布局
- [ ] 触摸目标大小符合规范
- [ ] 响应式断点系统完善
- [ ] 设备检测 Hook 可用
- [ ] 真实设备测试通过
- [ ] 性能优化到位
- [ ] 文档完善
