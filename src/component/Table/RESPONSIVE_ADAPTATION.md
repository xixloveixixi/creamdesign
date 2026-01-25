# Table 组件响应式适配说明

## 📱 适配概述

Table 组件现已完全支持手机、平板和桌面端的自适应显示，根据设备类型自动调整布局和交互方式。

---

## 🎯 自动适配特性

### 1. **设备自动检测**

- 使用 `useDevice` Hook 自动检测设备类型
- 无需手动配置，组件会根据屏幕宽度自动适配

### 2. **虚拟滚动智能控制**

- **移动端（< 768px）**：自动禁用虚拟滚动
  - 原因：移动端通常数据量不大，虚拟滚动反而影响体验
- **平板端（768px - 991px）**：根据配置启用
  - 行高：45px（稍小以适应平板屏幕）
  - 预渲染行数：3（增加流畅度）
- **桌面端（≥ 992px）**：根据配置启用
  - 行高：50px
  - 预渲染行数：2

### 3. **布局自动切换**

#### 移动端（< 768px）

- ✅ **卡片布局**：表格行自动转换为卡片样式
- ✅ **隐藏表头**：节省屏幕空间
- ✅ **标签显示**：每行数据前显示列标题（通过 `data-label` 属性）
- ✅ **触摸优化**：按钮最小尺寸 44px（符合 iOS 规范）
- ✅ **字体调整**：使用较小字体（`$font-size-sm`）

#### 平板端（768px - 991px）

- ✅ **表格布局**：保持传统表格样式
- ✅ **优化间距**：适中的内边距（0.75rem - 0.875rem）
- ✅ **触摸支持**：按钮最小尺寸 40px（支持触摸和鼠标）
- ✅ **平滑滚动**：启用 iOS 平滑滚动（`-webkit-overflow-scrolling: touch`）

#### 桌面端（≥ 992px）

- ✅ **完整表格**：显示所有列和功能
- ✅ **标准间距**：1rem 内边距
- ✅ **虚拟滚动**：支持大数据量优化

---

## 📐 样式适配详情

### 移动端样式（< 768px）

```scss
// 卡片布局
.cream-table-responsive {
  thead {
    display: none;
  } // 隐藏表头

  tbody tr {
    display: block; // 块级显示
    margin-bottom: 1rem;
    border-radius: 0.75rem;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    td {
      display: flex;
      justify-content: space-between;

      &::before {
        content: attr(data-label); // 显示列标题
        font-weight: bold;
        min-width: 80px;
      }
    }
  }
}
```

### 平板端样式（768px - 991px）

```scss
@media (min-width: 768px) and (max-width: 991px) {
  .cream-table {
    font-size: $font-size-base;
    padding: 0.75rem 0.875rem;

    // 优化触摸目标
    button,
    a {
      min-height: 40px;
    }
  }
}
```

---

## 🔧 使用方式

### 基本使用（自动适配）

```tsx
import { Table } from './component/Table';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const data = [
  { key: '1', name: '张三', age: 25, address: '北京市' },
  // ...
];

// 自动适配：移动端卡片布局，平板/桌面表格布局
<Table columns={columns} dataSource={data} />;
```

### 手动控制虚拟滚动

```tsx
// 桌面端启用虚拟滚动
<Table
  columns={columns}
  dataSource={data}
  virtual={true}  // 移动端会自动禁用
/>

// 自定义虚拟滚动配置（仅平板/桌面生效）
<Table
  columns={columns}
  dataSource={data}
  virtual={{
    rowHeight: 60,
    containerHeight: 500,
    overscan: 5
  }}
/>
```

---

## 📊 适配效果对比

| 特性         | 移动端  | 平板端        | 桌面端  |
| ------------ | ------- | ------------- | ------- |
| **布局**     | 卡片    | 表格          | 表格    |
| **表头**     | 隐藏    | 显示          | 显示    |
| **虚拟滚动** | ❌ 禁用 | ✅ 可选       | ✅ 可选 |
| **触摸目标** | ≥ 44px  | ≥ 40px        | 标准    |
| **字体大小** | 小      | 中            | 标准    |
| **内边距**   | 0.75rem | 0.75-0.875rem | 1rem    |

---

## 🎨 移动端卡片布局示例

### 桌面端显示：

```
┌─────────┬──────┬──────────┐
│ 姓名    │ 年龄 │ 地址     │
├─────────┼──────┼──────────┤
│ 张三    │ 25   │ 北京市   │
│ 李四    │ 30   │ 上海市   │
└─────────┴──────┴──────────┘
```

### 移动端显示：

```
┌─────────────────────┐
│ ┌─────────────────┐ │
│ │ 姓名: 张三      │ │
│ │ 年龄: 25        │ │
│ │ 地址: 北京市    │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ 姓名: 李四      │ │
│ │ 年龄: 30        │ │
│ │ 地址: 上海市    │ │
│ └─────────────────┘ │
└─────────────────────┘
```

---

## ✅ 测试方法

### 1. 使用 Chrome DevTools

1. 按 `F12` 打开开发者工具
2. 按 `Ctrl+Shift+M`（Mac: `Cmd+Shift+M`）打开设备工具栏
3. 选择设备（iPhone、iPad 等）
4. 查看布局变化

### 2. 使用 Storybook 测试

```bash
npm run storybook
```

- 打开 "Table组件/响应式测试"
- 选择不同的测试 Story

### 3. 真实设备测试

1. 确保手机和电脑在同一 Wi-Fi
2. 启动 Storybook：`npm run storybook`
3. 在手机浏览器访问：`http://你的IP:6006`

---

## 🔍 技术实现

### 设备检测

```tsx
import { useDevice } from '../../hooks/useDevice';

const device = useDevice();
// device.isMobile: < 768px
// device.isTablet: 768px - 991px
// device.isDesktop: ≥ 992px
```

### 自动类名

```tsx
// 移动端自动添加 .cream-table-responsive 类
const tableClassName = useMemo(() => {
  const classes = ['cream-table'];
  if (device.isMobile) {
    classes.push('cream-table-responsive');
  }
  return classes.join(' ');
}, [device.isMobile]);
```

### 数据标签

```tsx
// TableBody 组件自动为移动端添加 data-label
const dataLabel = device.isMobile
  ? typeof column.title === 'string'
    ? column.title
    : column.key
  : undefined;

<td data-label={dataLabel}>{cellContent}</td>;
```

---

## 📝 注意事项

1. **列标题要求**：移动端卡片布局需要列标题，确保 `column.title` 是字符串
2. **虚拟滚动**：移动端会自动禁用，无需手动配置
3. **触摸目标**：所有交互元素（按钮、链接）都符合最小触摸目标规范
4. **性能优化**：移动端禁用虚拟滚动，减少计算开销

---

## 🚀 未来优化方向

- [ ] 支持移动端横向滚动（保留部分列固定）
- [ ] 移动端支持下拉刷新
- [ ] 平板端支持列宽调整
- [ ] 深色模式优化

---

## 📚 相关文档

- [多端适配设计指南](../../MULTI_DEVICE_DESIGN.md)
- [多端适配实现指南](../../MULTI_DEVICE_IMPLEMENTATION.md)
- [测试指南](../../TESTING_GUIDE.md)
