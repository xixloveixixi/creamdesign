# 本地测试指南

## 方法一：使用 npm link（推荐）

### 1. 在组件库目录创建链接

```bash
cd /Users/lilithgames/creamdesign
npm link
```

### 2. 在测试项目中链接包

```bash
# 进入你的测试项目目录
cd /path/to/your/test-project
npm link creamdesign
```

### 3. 在测试项目中使用

```tsx
// 导入组件（从主入口导入）
import { Button, Table, Form } from 'creamdesign';
// 导入样式（使用 style 导出路径）
import 'creamdesign/style';

function App() {
  return (
    <div>
      <Button>测试按钮</Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
```

### 4. 取消链接

```bash
# 在测试项目中
npm unlink creamdesign

# 在组件库目录
npm unlink
```

---

## 方法二：使用 file: 协议（适合临时测试）

### 1. 在测试项目的 package.json 中添加

```json
{
  "dependencies": {
    "creamdesign": "file:../creamdesign"
  }
}
```

### 2. 安装依赖

```bash
cd /path/to/your/test-project
npm install
```

### 3. 使用方式同方法一

---

## 方法三：创建测试项目（推荐用于完整测试）

### 1. 创建测试项目

```bash
# 在组件库同级目录创建测试项目
cd /Users/lilithgames
npx create-react-app creamdesign-test --template typescript
cd creamdesign-test
```

### 2. 链接组件库

```bash
npm link ../creamdesign
```

### 3. 安装依赖

```bash
npm install
```

### 4. 在测试项目中使用

```tsx
// src/App.tsx
import React from 'react';
import { Button, Table, Form } from 'creamdesign';
import 'creamdesign/style';
import './App.css';

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

      <div style={{ margin: '20px 0' }}>
        <h2>Button 组件</h2>
        <Button btnType="primary">主要按钮</Button>
        <Button btnType="secondary" style={{ marginLeft: '10px' }}>
          次要按钮
        </Button>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h2>Table 组件</h2>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default App;
```

### 5. 启动测试项目

```bash
npm start
```

---

## 注意事项

1. **样式文件**：记得导入 CSS 文件

   ```tsx
   import 'creamdesign/dist/index.es.css';
   ```

2. **React 版本**：确保测试项目的 React 版本与组件库兼容（React 19）

3. **TypeScript**：如果使用 TypeScript，类型定义会自动从 `dist/index.d.ts` 加载

4. **热更新**：使用 `npm link` 时，修改组件库代码后需要重新构建：

   ```bash
   npm run build-es
   ```

5. **依赖问题**：如果遇到依赖冲突，可以在测试项目的 `package.json` 中添加：
   ```json
   {
     "resolutions": {
       "react": "^19.2.0",
       "react-dom": "^19.2.0"
     }
   }
   ```

---

## 快速测试脚本

创建一个简单的测试文件：

```tsx
// test-import.tsx
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

// 测试所有组件是否能够正常导入
console.log('✅ 所有组件导入成功！');
console.log({
  Button,
  Table,
  Form,
  Input,
  Progress,
  Pagination,
  Upload,
  Icon,
  Menu,
});
```

运行测试：

```bash
npx tsx test-import.tsx
```
