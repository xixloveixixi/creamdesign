# 快速修复指南

## ❌ 错误导入方式

```tsx
// 不要这样做！
import Button from 'creamdesign/dist/component/Button/buttion';
import 'creamdesign/dist/index.es.css';
```

## ✅ 正确导入方式

```tsx
// 从主入口导入所有组件
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

// 导入样式（使用 style 导出）
import 'creamdesign/style';
```

## 完整示例

```tsx
// src/App.tsx
import React from 'react';
import { Button, Table } from 'creamdesign';
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
      <h1>测试</h1>
      <Button btnType="primary">按钮</Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default App;
```

## 如果仍然报错

1. **检查测试项目的 App.tsx**，确保没有直接导入组件路径
2. **重新链接包**：

   ```bash
   cd /Users/lilithgames/creamdesign
   npm link

   cd /Users/lilithgames/creamdesign-test
   npm link creamdesign
   ```

3. **清除缓存并重启**：
   ```bash
   # 在测试项目中
   rm -rf node_modules/.cache
   npm start
   ```
