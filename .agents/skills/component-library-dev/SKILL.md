---
name: component-library-dev
description: CreamDesign 组件库开发工作流。用于 React 19 + TypeScript + SCSS 组件的标准化开发，包括需求完善、组件代码生成、Storybook 文档编写和 Jest 测试用例生成。当用户需要开发新组件或完善现有组件时使用此技能。
---

# CreamDesign 组件库开发

## 概述

本技能用于标准化 CreamDesign 组件库的开发流程，确保所有组件遵循统一的设计规范和代码质量标准。

**技术栈：**

- React 19 + TypeScript
- SCSS (Sass) + classnames
- Storybook 文档
- Jest + React Testing Library (覆盖率 ≥ 80%)

## 开发流程

### 阶段 1：需求分析与完善

当用户提供组件需求时，按以下步骤完善：

1. **解析原始需求**
   - 组件名称（PascalCase）
   - 核心功能描述
   - 使用场景

2. **补充组件规格**
   - Props 接口定义（含类型、默认值、是否可选）
   - 状态管理（useState/useReducer）
   - 事件处理回调
   - 样式类名规范（BEM 命名）

3. **输出结构化需求文档**

   ```markdown
   ## 组件名称：XXX

   ### 功能描述

   [详细描述]

   ### Props 接口

   | 属性名 | 类型 | 默认值 | 必填 | 说明 |

   ### 状态管理

   - [状态名]: [类型] - [用途]

   ### 事件处理

   - [事件名]: [参数] => [返回值] - [触发时机]

   ### 样式类名

   - .cream-xxx: [根元素样式]
   - .cream-xxx--[modifier]: [变体样式]
   ```

### 阶段 2：组件代码生成

基于完善的需求生成以下文件：

#### 1. 类型定义文件 (`index.tsx`)

```typescript
import React from 'react';

export interface [ComponentName]Props {
  // Props 定义
}

export const [ComponentName]: React.FC<[ComponentName]Props> = (props) => {
  // 组件实现
};

export default [ComponentName];
```

#### 2. 样式文件 (`style.scss`)

```scss
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.cream-[component-name] {
  // 基础样式

  &--[modifier] {
    // 变体样式
  }

  &__[element] {
    // 子元素样式
  }
}
```

**样式规范：**

- 使用 `@use` 引入变量和 mixins
- 类名前缀：`cream-` + 组件名（kebab-case）
- BEM 命名法：`block__element--modifier`

### 阶段 3：Storybook 文档生成

生成 `[ComponentName].stories.tsx`：

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { [ComponentName] } from './index';

const meta: Meta<typeof [ComponentName]> = {
  title: 'Components/[ComponentName]',
  component: [ComponentName],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // 每个 prop 的 controls 配置
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // 默认 props
  },
};

// 其他变体 Story
```

**Storybook 规范：**

- 必须包含 Default story
- 每个主要 prop 变体都要有独立 story
- 添加 JSDoc 说明复杂用例

### 阶段 4：测试用例生成

生成 `[ComponentName].test.tsx`，确保覆盖率 ≥ 80%：

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { [ComponentName] } from './index';

describe('[ComponentName]', () => {
  // 基础渲染测试
  it('should render correctly', () => {});

  // Props 测试
  it('should handle [prop] prop correctly', () => {});

  // 事件测试
  it('should call [event] handler when [action]', () => {});

  // 可访问性测试
  it('should be accessible', () => {});

  // 快照测试
  it('should match snapshot', () => {});
});
```

**测试规范：**

- 渲染测试：验证组件正确渲染
- Props 测试：验证每个 prop 的行为
- 事件测试：验证回调函数被正确调用
- 可访问性测试：验证 ARIA 属性
- 快照测试：防止 UI 意外变更

## 输出结构

每个组件生成以下文件：

```
[component-name]/
├── index.tsx           # 组件代码
├── style.scss          # 样式文件
├── [ComponentName].stories.tsx  # Storybook 文档
└── [ComponentName].test.tsx     # 测试文件
```

## 使用示例

用户输入：

> 需要一个 Card 组件，可以展示标题、内容和操作按钮

AI 执行：

1. 完善需求 → 补充 CardProps（title, content, actions, bordered, hoverable 等）
2. 生成 index.tsx → 实现 Card 组件
3. 生成 style.scss → 定义 .cream-card 样式
4. 生成 Card.stories.tsx → 展示 Default、WithActions、Bordered 等变体
5. 生成 Card.test.tsx → 覆盖渲染、props、事件、快照测试

## 质量检查清单

- [ ] TypeScript 类型完整，无 any
- [ ] SCSS 使用 BEM 命名规范
- [ ] Storybook 包含所有 prop 变体
- [ ] 测试覆盖率 ≥ 80%
- [ ] 组件可访问性（ARIA 标签）
- [ ] 代码符合现有组件风格
