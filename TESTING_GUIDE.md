# 多端适配测试指南

## 🧪 测试方法总览

### 1. 浏览器开发者工具（最常用）
### 2. 真实设备测试（最准确）
### 3. 使用 useDevice Hook 调试
### 4. Storybook 响应式测试
### 5. 自动化测试工具

---

## 📱 方法一：浏览器开发者工具

### Chrome DevTools（推荐）

#### 步骤：

1. **打开开发者工具**
   - 快捷键：`F12` 或 `Ctrl+Shift+I` (Windows/Linux)
   - 快捷键：`Cmd+Option+I` (Mac)
   - 右键 → 检查

2. **打开设备工具栏**
   - 快捷键：`Ctrl+Shift+M` (Windows/Linux)
   - 快捷键：`Cmd+Shift+M` (Mac)
   - 或点击工具栏左上角的设备图标

3. **选择设备预设**
   - iPhone SE (375x667) - 小屏手机
   - iPhone 12 Pro (390x844) - 标准手机
   - iPhone 12 Pro Max (428x926) - 大屏手机
   - iPad (768x1024) - 平板竖屏
   - iPad Pro (1024x1366) - 平板横屏
   - 自定义尺寸

4. **测试不同方向**
   - 点击旋转按钮切换横屏/竖屏
   - 或使用快捷键 `Ctrl+Shift+M` 后按 `R`

5. **测试触摸模拟**
   - 勾选 "Simulate touch events"
   - 测试触摸交互

#### 常用设备尺寸：

| 设备 | 宽度 | 高度 | 类型 |
|------|------|------|------|
| iPhone SE | 375px | 667px | 手机 |
| iPhone 12/13 | 390px | 844px | 手机 |
| iPhone 14 Pro Max | 430px | 932px | 手机 |
| iPad | 768px | 1024px | 平板 |
| iPad Pro | 1024px | 1366px | 平板 |
| Desktop | 1920px | 1080px | 桌面 |

---

## 📲 方法二：真实设备测试

### 本地网络测试

#### 步骤：

1. **确保设备和电脑在同一网络**

2. **启动开发服务器**
   ```bash
   npm start
   # 或
   yarn start
   ```

3. **获取本机 IP 地址**
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```
   找到类似 `192.168.x.x` 的地址

4. **在设备浏览器访问**
   ```
   http://192.168.x.x:3000
   ```
   （端口号根据实际调整）

5. **测试**
   - 调整浏览器窗口大小
   - 测试触摸交互
   - 检查布局适配

### 使用 ngrok（外网访问）

如果需要外网访问测试：

```bash
# 安装 ngrok
npm install -g ngrok

# 启动本地服务器
npm start

# 在另一个终端运行
ngrok http 3000
```

会得到一个公网 URL，可以在任何设备上访问。

---

## 🔍 方法三：使用 useDevice Hook 调试

### 创建调试组件

```typescript
// src/component/DeviceDebug/DeviceDebug.tsx
import { useDevice } from '../../hooks/useDevice';

export const DeviceDebug = () => {
  const device = useDevice();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '0.5rem',
        fontSize: '12px',
        zIndex: 9999,
        fontFamily: 'monospace',
      }}
    >
      <div>设备: {device.isMobile ? '手机' : device.isTablet ? '平板' : '桌面'}</div>
      <div>断点: {device.breakpoint}</div>
      <div>尺寸: {device.width} x {device.height}</div>
      <div>触摸: {device.isTouch ? '是' : '否'}</div>
      <div>方向: {device.isPortrait ? '竖屏' : '横屏'}</div>
    </div>
  );
};
```

### 在 Storybook 中使用

```typescript
// src/component/Table/table.stories.tsx
import { DeviceDebug } from '../DeviceDebug/DeviceDebug';

export const ResponsiveTable = () => {
  return (
    <>
      <DeviceDebug />
      <div style={{ width: '100%', height: '100vh' }}>
        <Table columns={columns} dataSource={data} virtual={true} />
      </div>
    </>
  );
};
```

---

## 📐 方法四：Storybook 响应式测试

### 创建响应式测试 Story

```typescript
// src/component/Table/table.stories.tsx

// 响应式测试 Story
export const ResponsiveTest = () => {
  const [viewport, setViewport] = useState('mobile');

  const viewports = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setViewport('mobile')}>手机</button>
        <button onClick={() => setViewport('tablet')}>平板</button>
        <button onClick={() => setViewport('desktop')}>桌面</button>
      </div>
      <div
        style={{
          width: `${viewports[viewport].width}px`,
          height: `${viewports[viewport].height}px`,
          border: '1px solid #ccc',
          overflow: 'auto',
        }}
      >
        <Table columns={columns} dataSource={data} virtual={true} />
      </div>
    </div>
  );
};
```

---

## 🛠️ 方法五：创建测试页面

### 创建测试组件

```typescript
// src/TestResponsive.tsx
import { useDevice } from './hooks/useDevice';
import { Table } from './component/Table';
import { Button } from './component/Button';

export const TestResponsive = () => {
  const device = useDevice();

  return (
    <div style={{ padding: '1rem' }}>
      <h1>响应式测试页面</h1>
      
      {/* 设备信息显示 */}
      <div style={{ 
        background: '#f0f0f0', 
        padding: '1rem', 
        marginBottom: '1rem',
        borderRadius: '0.5rem'
      }}>
        <h2>设备信息</h2>
        <ul>
          <li>设备类型: {device.isMobile ? '手机' : device.isTablet ? '平板' : '桌面'}</li>
          <li>断点: {device.breakpoint}</li>
          <li>屏幕尺寸: {device.width} x {device.height}</li>
          <li>是否触摸设备: {device.isTouch ? '是' : '否'}</li>
          <li>方向: {device.isPortrait ? '竖屏' : '横屏'}</li>
        </ul>
      </div>

      {/* 测试表格 */}
      <Table 
        columns={columns} 
        dataSource={data} 
        virtual={!device.isMobile}
      />
    </div>
  );
};
```

---

## ✅ 测试检查清单

### 手机端测试（< 768px）

- [ ] **布局检查**
  - [ ] 表格是否切换为卡片布局
  - [ ] 按钮是否足够大（≥44px）
  - [ ] 文字是否清晰可读
  - [ ] 间距是否合适

- [ ] **交互检查**
  - [ ] 触摸目标是否足够大
  - [ ] 滑动是否流畅
  - [ ] 点击是否准确
  - [ ] 输入框是否防止 iOS 自动缩放

- [ ] **性能检查**
  - [ ] 滚动是否流畅
  - [ ] 虚拟滚动是否禁用（移动端）
  - [ ] 加载速度是否可接受

### 平板端测试（768px - 991px）

- [ ] **布局检查**
  - [ ] 表格是否简化显示
  - [ ] 组件尺寸是否适中
  - [ ] 是否充分利用屏幕空间

- [ ] **交互检查**
  - [ ] 触摸和鼠标交互都正常
  - [ ] 悬停效果是否合适

### 桌面端测试（≥ 992px）

- [ ] **布局检查**
  - [ ] 表格完整显示
  - [ ] 虚拟滚动是否启用
  - [ ] 组件尺寸是否合适

- [ ] **交互检查**
  - [ ] 鼠标悬停效果正常
  - [ ] 键盘导航正常

---

## 🔧 快速测试命令

### 在 package.json 中添加测试脚本

```json
{
  "scripts": {
    "test:responsive": "echo '请在浏览器中打开 http://localhost:3000 并使用 DevTools 测试'",
    "test:mobile": "echo '使用 Chrome DevTools 切换到移动设备视图'",
    "test:tablet": "echo '使用 Chrome DevTools 切换到平板设备视图'"
  }
}
```

---

## 📊 测试工具推荐

### 1. **BrowserStack**（付费）
- 真实设备云测试
- 支持多种设备和浏览器

### 2. **Responsively App**（免费）
- 同时查看多个设备尺寸
- 下载：https://responsively.app

### 3. **Chrome DevTools**（免费）
- 内置设备模拟
- 最常用

### 4. **Firefox Responsive Design Mode**
- Firefox 内置工具
- 快捷键：`Ctrl+Shift+M`

---

## 🎯 实际测试步骤

### 步骤 1：打开 Storybook

```bash
npm run storybook
```

### 步骤 2：打开 Chrome DevTools

1. 按 `F12` 打开开发者工具
2. 按 `Ctrl+Shift+M` 打开设备工具栏
3. 选择设备（如 iPhone 12 Pro）

### 步骤 3：测试 Table 组件

1. 找到 Table 相关的 Story
2. 检查：
   - 移动端是否显示卡片布局
   - 触摸目标是否足够大
   - 滚动是否流畅

### 步骤 4：调整窗口大小

1. 拖动窗口边缘调整大小
2. 观察布局变化
3. 检查断点切换是否平滑

### 步骤 5：真实设备测试

1. 在手机上打开 `http://你的IP:6006`（Storybook）
2. 测试触摸交互
3. 检查性能

---

## 💡 调试技巧

### 1. 使用控制台查看设备信息

```javascript
// 在浏览器控制台运行
const width = window.innerWidth;
const isMobile = width < 768;
const isTablet = width >= 768 && width < 992;
const isDesktop = width >= 992;

console.log({
  width,
  isMobile,
  isTablet,
  isDesktop,
  breakpoint: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
});
```

### 2. 检查 CSS 媒体查询

```javascript
// 检查当前应用的媒体查询
const mediaQueries = window.matchMedia('(max-width: 767px)');
console.log('是否移动端:', mediaQueries.matches);
```

### 3. 使用 React DevTools

- 安装 React DevTools 扩展
- 查看组件 props
- 检查 `useDevice` Hook 返回值

---

## 📝 测试报告模板

```
测试日期: 2024-XX-XX
测试设备: iPhone 12 Pro (390x844)
浏览器: Chrome Mobile

✅ 通过项:
- 表格卡片布局正常
- 按钮触摸目标 ≥44px
- 滚动流畅

❌ 问题项:
- 虚拟滚动在移动端未禁用
- 输入框字体小于 16px（iOS 自动缩放）

🔧 修复建议:
1. 检查 Table 组件的 virtual 配置
2. 设置输入框 font-size: 16px
```

---

## 🚀 快速开始测试

### 最简单的方法：

1. **打开 Storybook**
   ```bash
   npm run storybook
   ```

2. **打开 Chrome DevTools**
   - 按 `F12`
   - 按 `Ctrl+Shift+M`（或 `Cmd+Shift+M`）

3. **选择设备**
   - 选择 "iPhone 12 Pro" 测试手机
   - 选择 "iPad" 测试平板
   - 选择 "Responsive" 自定义尺寸

4. **测试组件**
   - 打开 Table Story
   - 检查布局和交互
   - 调整窗口大小观察变化

---

## ✅ 验证清单

测试完成后，确保：

- [ ] 手机端（< 768px）布局正常
- [ ] 平板端（768px - 991px）布局正常
- [ ] 桌面端（≥ 992px）布局正常
- [ ] 触摸目标大小符合规范
- [ ] 交互流畅无卡顿
- [ ] 文字清晰可读
- [ ] 性能表现良好

