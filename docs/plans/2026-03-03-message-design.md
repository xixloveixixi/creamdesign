# Message 提示组件设计

## 概述

类似 Ant Design 的全局消息提示组件，通过 API 调用在页面任意位置显示提示信息。

## API 设计

### 基本用法

```typescript
Message.success('操作成功');
Message.error('操作失败');
Message.warning('警告信息');
Message.info('提示信息');
```

### 高级用法

```typescript
// 全局配置
Message.config({
  duration: 3000, // 默认 duration
  position: 'top-right', // 默认位置
  maxCount: 5, // 最大显示数量
});

// 带参数
Message.success({
  content: '自定义内容',
  duration: 3000,
  closable: true,
  position: 'top-right',
});

// 返回 message 实例，可手动关闭
const msg = Message.success('3秒后自动关闭');
msg.close();

// 销毁所有消息
Message.destroy();
```

## Props 设计

| 属性      | 类型                                                         | 默认值      | 说明                             |
| --------- | ------------------------------------------------------------ | ----------- | -------------------------------- |
| type      | 'success' \| 'error' \| 'warning' \| 'info'                  | 'info'      | 消息类型                         |
| content   | ReactNode                                                    | -           | 消息内容                         |
| duration  | number                                                       | 3000        | 自动关闭时间(ms)，0 则不自动关闭 |
| closable  | boolean                                                      | false       | 是否显示关闭按钮                 |
| position  | 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | 'top-right' | 显示位置                         |
| onClose   | () => void                                                   | -           | 关闭时的回调                     |
| className | string                                                       | -           | 自定义类名                       |
| style     | React.CSSProperties                                          | -           | 自定义样式                       |

## 全局配置 (Message.config)

```typescript
interface MessageConfig {
  duration?: number; // 默认 duration
  position?: Position; // 默认位置
  maxCount?: number; // 最大显示数量
}
```

## 实现思路

1. **使用 React Portal** 将消息渲染到 body 下
2. **使用 Context** 管理多个消息实例
3. **使用数组** 存储当前显示的消息列表
4. **使用 useEffect** 处理自动关闭计时器
