# 测试项目错误修复指南

## 错误 1: CSS 文件无法导入

### 错误信息

```
Module not found: Error: "./dist/index.es.css" is not exported
```

### 解决方案

在测试项目的 `App.tsx` 中，使用以下方式导入样式：

```tsx
// ❌ 错误的方式
import 'creamdesign/dist/index.es.css';

// ✅ 正确的方式（推荐）
import 'creamdesign/style';

// ✅ 或者使用完整路径（如果上面的方式不行）
import 'creamdesign/dist/index.es.css';
```

### 如果仍然报错

如果使用 `import 'creamdesign/style'` 仍然报错，可以尝试：

1. **在测试项目中创建类型声明文件**：

```typescript
// src/creamdesign.d.ts
declare module 'creamdesign/style' {
  const content: string;
  export default content;
}
```

2. **或者直接在测试项目中导入 CSS**：

```tsx
// src/index.tsx 或 src/App.tsx
import '../node_modules/creamdesign/dist/index.es.css';
```

---

## 错误 2: 组件路径错误

### 错误信息

```
Module not found: Error: "./dist/component/Button/buttion" is not exported
```

### 原因

**不要直接导入组件路径！** 所有组件都应该从主入口导入。

### 解决方案

```tsx
// ❌ 错误的方式 - 不要这样做
import Button from 'creamdesign/dist/component/Button/buttion';

// ✅ 正确的方式 - 从主入口导入
import { Button } from 'creamdesign';
```

### 正确的导入方式

```tsx
// src/App.tsx
import React from 'react';
import {
  Button,
  Table,
  Form,
  Input,
  Progress,
  Pagination,
  Upload,
  Icon,
  Menu,
} from 'creamdesign';
import 'creamdesign/style'; // 导入样式

function App() {
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
  ];

  const data = [
    { key: '1', name: '张三', age: 20 },
    { key: '2', name: '李四', age: 25 },
  ];

  return (
    <div className="App">
      <h1>CreamDesign 组件库测试</h1>

      <Button btnType="primary">测试按钮</Button>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default App;
```

---

## 完整测试步骤

### 1. 在组件库目录重新链接

```bash
cd /Users/lilithgames/creamdesign
npm link
```

### 2. 在测试项目中重新链接

```bash
cd /Users/lilithgames/creamdesign-test
npm link creamdesign
```

### 3. 确保测试项目的 package.json 中有正确的依赖

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}
```

### 4. 重新安装依赖（如果需要）

```bash
npm install
```

### 5. 使用正确的导入方式

确保在测试项目中：

- ✅ 从主入口导入组件：`import { Button } from 'creamdesign'`
- ✅ 使用 `import 'creamdesign/style'` 导入样式
- ❌ 不要直接导入组件路径

---

## 如果问题仍然存在

1. **清除缓存并重新安装**：

```bash
# 在测试项目中
rm -rf node_modules package-lock.json
npm install
npm link creamdesign
```

2. **检查组件库是否重新构建**：

```bash
# 在组件库目录
npm run build-es
```

3. **检查 package.json 的 exports 配置**：

确保 `package.json` 中有正确的 `exports` 字段（已更新）。
