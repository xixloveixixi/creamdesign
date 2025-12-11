## 从零到一：搭建一个现代化的 React + TypeScript 组件库

在当今的前端开发中，组件化已成为构建可维护、可扩展应用的核心思想。无论是为了在多个项目间复用代码，还是为了打造一个开源项目，创建一个高质量的组件库都是一项极具价值的技能。本文将带你从零开始，一步步搭建一个基于 React 和 TypeScript 的现代化组件库。

### 总览：组件库的蓝图

与传统的 Web 应用不同，组件库的核心产出是可供其他项目消费的 JS 代码和样式文件，而非一个独立的展示页面。在开始之前，我们先明确一下构建组件库需要关注的几个关键点：

- **项目结构**：清晰、可扩展的目录结构是组件库的骨架。
- **样式方案**：需要一套完善、隔离且易于定制的样式解决方案。
- **开发流程**：遵循“需求分析 -> 编码 -> 测试”的标准化流程。
- **测试策略**：组件作为独立的逻辑单元，非常适合进行单元测试，以保证质量。
- **打包输出**：需要支持 TypeScript 源码转译，并输出多种模块格式（如 CommonJS, ES6, UMD）。
- **发布流程**：支持发布到 npm，并集成 CI/CD 流程，实现文档自动生成等。
带着这些目标，我们开始动手搭建。

---

### 一、组件库的基本搭建

我们将使用 `create-react-app` 作为脚手架工具，因为它为我们预配置了 Webpack、Babel、ESLint 等复杂工具链，让我们能更专注于组件库本身的开发。

```bash
# 创建一个名为 creamdesign 的项目，并使用 TypeScript 模板
npx create-react-app creamdesign --template typescript
cd creamdesign

```

### 1.1 规划项目结构

一个优秀的目录结构能让项目更易于理解和维护。对于组件库，我们推荐采用“组件独立”的结构。

```jsx
project-root/
├── README.md
├── node_modules/
├── package.json
├── tsconfig.json
└── src/
    ├── components/           # 所有组件的源码目录
    │   └── Button/          # 单个组件的独立文件夹
    │       ├── index.tsx    # 组件入口，导出 Button 组件本身
    │       ├── Button.tsx   # 组件的核心逻辑实现
    │       ├── Button.test.tsx # 组件的单元测试文件
    │       └── style.scss   # 组件的专属样式文件
    ├── styles/              # 全局样式、变量、工具函数等
    │   ├── _variables.scss  # SCSS 变量（颜色、字体等）
    │   ├── _mixins.scss     # SCSS 混入
    │   ├── _reboot.scss      # 用于重置浏览器默认样式
    │   └── index.scss       # 全局样式入口文件
    └── index.tsx            # 整个组件库的总入口文件

```

**设计原则与特点：**

1. **组件内聚**：每个组件（如 `Button`）都拥有自己的文件夹，内部包含了逻辑、测试和样式，实现了高内聚。
2. **职责分离**：全局样式、变量和工具函数统一放在 `styles` 目录下，与组件逻辑分离。
3. **统一导出**：顶层的 `index.tsx` 作为库的总入口，负责导出所有公共组件和类型，方便外部使用者按需导入。
4. **结构扁平**：避免过度嵌套（建议不超过3-4层），保持结构简单直观，便于扩展。

### 1.2 统一代码规范

代码规范是团队协作的基石。`create-react-app` 默认集成了 ESLint，为我们提供了强大的代码检查能力。

- **内置规则**：其规则集继承自 `eslint-config-react-app`，你可以在 [GitHub 仓库](https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app) 查看详细的规则说明。
- **TypeScript 支持**：对于 TypeScript 项目，相关的解析器和规则也已配置好，无需手动干预。
为了在开发过程中获得最佳体验，我们可以在项目根目录下创建 `.vscode/settings.json` 文件，配置 VS Code 与 ESLint 的无缝集成：

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.enable": true,
  "eslint.run": "onType"
}

```

此配置的作用是：

- **保存时自动修复**：每次保存文件时，ESLint 会自动修复所有可修复的问题。
- **实时检查**：在输入代码时即时进行语法检查和提示。

### 1.3 设计整体样式方案

样式是组件库的灵魂。我们将使用 SCSS（Sass）来构建一套强大且可维护的样式体系。
**第一步：安装 SCSS 依赖**

```bash
# 使用 Dart Sass，它是 Sass 的主要实现，也是官方推荐的
npm install --save-dev sass

```

**第二步：构建样式体系**
在 `src/styles` 目录下，我们可以开始搭建我们的设计系统。

1. **色彩体系**：在 `_variables.scss` 中定义全局的颜色变量。
2. **字体系统**：同样在 `_variables.scss` 中定义字体相关的变量。
3. **样式规范化**：为了解决不同浏览器下 HTML 元素默认样式不一致的问题，我们引入 `normalize.css`。它并非完全重置样式，而是保留有用的默认值，并提供跨浏览器的一致性。
我是直接在git上找的这个css然后复制到normalize.scss当中的
    
    ```scss
    // src/styles/index.scss
    // 引入 normalize.css
    @import 'normalize';
    // 引入我们自己的变量和全局样式
    @import 'variables';
    ```
### 二、创建一个组件(button为例子)

### 2.1 **项目结构**

```markdown
creamdesign/
├── src/
│   ├── component/
│   │   └── Button/
│   │       ├── index.tsx        # Button组件核心实现
│   │       └── buttonStyle.scss # Button样式定义
│   └── style/
│       ├── _creamdesign.scss    # 颜色和变量定义
│       ├── _mixin.scss          # 样式混合器
│       └── index.scss           # 主样式入口
└── package.json                 # 项目依赖配置
```

```

### 2.2 功能需求

```
在开始编码前，我们需要明确Button组件的功能需求：
1. 按钮类型：primary、secondary、danger、warning、info、success、outline、ghost、text
2. 按钮尺寸：large、normal、small
3. 交互状态：默认、悬停(hover)、点击(active)、禁用(disabled)、加载(loading)
4. 额外功能：支持图标、响应式设计、无障碍访问

```

### 2.3 基础结构搭建

```markdown
首先，我们创建Button组件的基础结构和类型定义：

```typescript
// Button/index.tsx
import React from "react";
import "./buttonStyle.scss";

// 按钮类型枚举
export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger",
  Warning = "warning",
  Info = "info",
  Success = "success",
  Outline = "outline",
  Ghost = "ghost",
  Text = "text",
}

// 按钮尺寸枚举
export enum ButtonSize {
  Large = "large",
  Normal = "normal",
  Small = "small",
}

// Button属性接口
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  'aria-label'?: string;
}
```
```

### 2.4  **样式架构设计**

```markdown
为了保持样式的可维护性和可复用性，我们使用SCSS的mixin功能来组织按钮样式：

```scss
// _mixin.scss
// 按钮基础样式Mixin
@mixin btn-base() {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  user-select: none;
}

// 按钮变体样式Mixin
@mixin btn-variant($bg-color, $text-color, $hover-bg-color, $active-bg-color, $border-color: transparent) {
  background-color: $bg-color;
  color: $text-color;
  border: 1px solid $border-color;
  
  &:hover:not(:disabled) {
    background-color: $hover-bg-color;
    transform: translateY(-0.5px);
  }
  
  &:active:not(:disabled) {
    background-color: $active-bg-color;
    transform: translateY(0);
  }
}

// 按钮尺寸样式Mixin
@mixin btn-size($padding, $font-size, $border-radius, $line-height: 1.5) {
  padding: $padding;
  font-size: $font-size;
  border-radius: $border-radius;
  line-height: $line-height;
}

// 按钮禁用状态Mixin
@mixin btn-disabled() {
  cursor: not-allowed !important;
  opacity: 0.6;
  
  &:hover,
  &:active,
  &:focus-visible {
    // 禁用状态下不响应交互
    all: unset;
    cursor: not-allowed !important;
    opacity: 0.6;
  }
}
```
```

### 2.5 组件核心实现

```markdown
现在，我们实现Button组件的核心逻辑：

```typescript
// Button/index.tsx 继续

export const Button: React.FC<ButtonProps> = ({
  type = ButtonType.Primary,
  size = ButtonSize.Normal,
  disabled = false,
  loading = false,
  icon,
  children,
  className,
  onClick,
  ...rest
}) => {
  const isDisabled = disabled || loading;
  const buttonClassName = `btn btn-${type} btn-${size} ${
    isDisabled ? "btn-disabled" : ""
  } ${loading ? "btn-loading" : ""} ${className || ""}`.trim();
  
  // 为无障碍访问添加ARIA属性
  const ariaProps = {
    'aria-disabled': isDisabled,
    'aria-busy': loading,
  };

  return (
    <button
      className={buttonClassName}
      disabled={isDisabled}
      onClick={onClick}
      {...ariaProps}
      {...rest}
    >
      {loading && <span className="btn-loading-spinner" aria-hidden="true"></span>}
      {icon && !loading && <span className="btn-icon" aria-hidden={!children}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
```
```

### 2.6 完整样式的实现

```markdown
接下来，我们实现按钮的完整样式，包括各种变体、尺寸和状态：

```scss
// buttonStyle.scss
@import '../../style/_creamdesign.scss'; // 颜色和变量
@import '../../style/_mixin.scss'; // Mixins

// 按钮基础样式
.btn {
  @include btn-base();
  gap: 0.5rem;
}

// 按钮类型样式
.btn-primary {
  @include btn-variant(
    $color-primary-600, 
    white, 
    $color-primary-700, 
    $color-primary-800
  );
}

.btn-secondary {
  @include btn-variant(
    $color-primary-400, 
    white, 
    $color-primary-500, 
    $color-primary-600
  );
}

.btn-danger {
  @include btn-variant(
    $color-error, 
    white, 
    darken-color($color-error, 10%), 
    darken-color($color-error, 20%)
  );
}

.btn-warning {
  @include btn-variant(
    $color-warning, 
    white, 
    darken-color($color-warning, 10%), 
    darken-color($color-warning, 20%)
  );
}

.btn-info {
  @include btn-variant(
    $color-info, 
    white, 
    darken-color($color-info, 10%), 
    darken-color($color-info, 20%)
  );
}

.btn-success {
  @include btn-variant(
    $color-success, 
    white, 
    darken-color($color-success, 10%), 
    darken-color($color-success, 20%)
  );
}

.btn-outline {
  @include btn-variant(
    transparent, 
    $color-primary-900, 
    $color-primary-100, 
    $color-primary-200,
    $color-primary-600
  );
}

.btn-ghost {
  @include btn-variant(
    transparent, 
    $color-text-primary, 
    $color-primary-100, 
    $color-primary-200
  );
}

.btn-text {
  @include btn-variant(
    transparent, 
    $color-primary-600, 
    $color-primary-100, 
    $color-primary-100
  );
  font-weight: 400;
  
  &:hover:not(:disabled) {
    color: $color-primary-700;
  }
}

// 按钮尺寸样式
.btn-small {
  @include btn-size(0.2rem 0.75rem, 0.875rem, 0.25rem);
}

.btn-normal {
  @include btn-size(0.625rem 1.5rem, 1rem, 0.375rem);
}

.btn-large {
  @include btn-size(1rem 2rem, 1.25rem, 0.5rem);
}

// 加载状态
.btn-loading {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

// 加载指示器动画
.btn-loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

// 加载动画关键帧
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// 按钮图标样式
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25em;
  height: 1.25em;
}

// 禁用状态
.btn-disabled,
button[disabled] {
  @include btn-disabled();
}

// 焦点样式优化
.btn:focus {
  outline: none;
}

.btn:focus-visible {
  box-shadow: 0 0 0 3px rgba($color-primary-500, 0.2);
}

// 响应式设计
@media (max-width: 768px) {
  .btn {
    gap: 0.375rem;
  }
  
  .btn-large {
    @include btn-size(0.75rem 1.5rem, 1.125rem, 0.5rem);
  }
  
  .btn-normal {
    @include btn-size(0.5rem 1.25rem, 0.9375rem, 0.375rem);
  }
  
  .btn-small {
    @include btn-size(0.1875rem 0.625rem, 0.8125rem, 0.25rem);
  }
}
```
```
### 三、组件测试

> 在现代前端开发中，单元测试是保证代码质量和稳定性的重要手段。本文将以Button组件为例，详细介绍如何使用Jest和React Testing Library进行React组件的单元测试实践。
> 

### 3.1 测试的好处

- 自动化验证：计算机可重复执行复杂流程，避免人为错误
- 质量保障：确保代码可运行且无bug，产出高质量代码
- 早期发现bug：大幅降低修复成本，避免上线后造成业务损失
- 重构安全性：升级或重构时快速验证功能完整性
- 开发敏捷性：已有测试保障下可快速开发新特性
- 持续集成：支持每次代码提交自动运行测试套件

### 3.2 测试工具

测试的工具是使用的 **React Testing Library**，他是基于react-dom和react-dom/test-utils的轻量级封装，而且已经集成在了create-react-app 3.3.0+默认模板

如果需要安装可以执行

```
 npm install --save-dev @testing-library/react
```

可以通过`npm test`命令运行测试。

```
{
  "scripts": {
    "test": "react-scripts test"
  }
}
```

在`package.json`中配置了测试脚本：

### 3.3 测试策略规定

在开始编写测试用例之前，我们需要制定明确的测试策略，确定需要测试的功能和场景。对于Button组件，我们确定了以下测试范围：

1. **基本渲染**：确保组件能够正确渲染为按钮元素
2. **样式变化**：验证不同类型、尺寸的按钮应用了正确的CSS类
3. **状态管理**：测试禁用、加载等状态的表现
4. **交互行为**：验证点击事件的触发和阻止
5. **无障碍支持**：确保组件符合无障碍标准
6. **特殊场景**：如纯图标按钮、加载状态与图标的交互

### **3.4 测试用例实现**

**1. 基础设置**

首先，我们需要导入必要的测试工具和被测试组件：

```
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button, { ButtonProps, ButtonType, ButtonSize } from "./index";

```

为了测试图标功能，我们创建了一个模拟的Ant Design风格图标组件：

```

const MockIcon = () => <span className="anticon" data-testid="mock-icon"><svg /></span>;
```

**2. 基本渲染测试**

```

test("should render a button element with default props", () => {
  const wrapper = render(<Button>Click Me</Button>);
  const button = wrapper.getByText("Click Me");
  expect(button).toBeInTheDocument();
  expect(button.tagName).toBe("BUTTON");
  expect(button).toHaveClass("btn btn-primary btn-normal");
});
```

这个测试验证了：

- 组件能够正确渲染
- 渲染结果是一个button元素
- 默认应用了正确的CSS类

**3. 参数化测试：按钮类型和尺寸**

使用Jest的`test.each`方法，我们可以高效地测试多种按钮类型和尺寸：

```
// 测试不同按钮类型
test.each([
  ButtonType.Primary,
  ButtonType.Secondary,
  ButtonType.Danger,
  ButtonType.Warning,
  ButtonType.Info,
  ButtonType.Success,
  ButtonType.Outline,
  ButtonType.Ghost,
  ButtonType.Text
])('should render %s button correctly', (type) => {
  const wrapper = render(<Button type={type}>{type}</Button>);
  const button = wrapper.getByText(type);
  expect(button).toHaveClass(`btn-${type}`);
});

// 测试不同按钮尺寸
test.each([
  [ButtonSize.Large, 'btn-large'],
  [ButtonSize.Normal, 'btn-normal'],
  [ButtonSize.Small, 'btn-small']
])('should render %s button correctly', (size, expectedClass) => {
  const wrapper = render(<Button size={size}>Size Test</Button>);
  const button = wrapper.getByText('Size Test');
  expect(button).toHaveClass(expectedClass);
});
```

**4. 状态测试：禁用和加载**

```

// 测试禁用状态
test('should render a disabled button when disabled prop is true', () => {
  const wrapper = render(<Button disabled>Disabled</Button>);
  const button = wrapper.getByText('Disabled');
  expect(button).toBeDisabled();
  expect(button).toHaveClass('btn-disabled');
  expect(button).toHaveAttribute('aria-disabled', 'true');
});

// 测试加载状态
test('should render loading state correctly', () => {
  const wrapper = render(<Button loading>Loading</Button>);
  const button = wrapper.getByText('Loading');
  expect(button).toBeDisabled();
  expect(button).toHaveClass('btn-loading btn-disabled');
  expect(button).toHaveAttribute('aria-busy', 'true');
  expect(button).toHaveAttribute('aria-disabled', 'true');
  expect(button).toContainHTML('<span class="btn-loading-spinner" aria-hidden="true"></span>');
});
```

**5. 图标按钮测试**

```

// 测试图标按钮
test('should render button with icon', () => {
  const wrapper = render(<Button icon={<MockIcon />}>With Icon</Button>);
  const button = wrapper.getByText('With Icon');
  const icon = wrapper.getByTestId('mock-icon');
  expect(button).toContainElement(icon);
  expect(icon.closest('.btn-icon')).toBeInTheDocument();
});

// 测试只有图标的按钮：只有图标时必须提供aria-label，这里不能通过之前的文本的方法来获取组件，使用getByRole结合name选项，它会考虑aria-label属性
test('should render icon-only button with proper accessibility attributes', () => {
  const wrapper = render(<Button icon={<MockIcon />} aria-label="Icon Button" />);
  const button = wrapper.getByRole('button', { name: 'Icon Button' });
  const icon = wrapper.getByTestId('mock-icon');
  expect(button).toContainElement(icon);
  expect(button).toHaveAttribute('aria-label', 'Icon Button');
  expect(icon).not.toHaveAttribute('aria-hidden');
});
```

**6. 交互测试：点击事件**

```

// 测试点击事件
test('should call onClick handler when button is clicked', () => {
  const handleClick = jest.fn();// 模拟点击事件处理函数
  const wrapper = render(<Button onClick={handleClick}>Click Me</Button>);
  const button = wrapper.getByText('Click Me');

  fireEvent.click(button);// 模拟点击事件
  expect(handleClick).toHaveBeenCalledTimes(1);// 验证点击事件处理函数未被调用
});

// 测试禁用状态下不触发点击事件
test('should not call onClick handler when button is disabled', () => {
  const handleClick = jest.fn();
  const wrapper = render(<Button onClick={handleClick} disabled>Click Me</Button>);
  const button = wrapper.getByText('Click Me');

  fireEvent.click(button);
  expect(handleClick).not.toHaveBeenCalled();
});
```

**7. 其他**

```
// 测试自定义类名
    test('should apply custom className to button', () => {
      const wrapper = render(<Button className="custom-button">Custom Class</Button>);
      const button = wrapper.getByText('Custom Class'); 
      expect(button).toHaveClass('custom-button');
    });

    // 测试传递额外的属性
    test('should pass additional props to button element', () => {
      const wrapper = render(<Button data-testid="custom-button" title="Custom Title">Test</Button>);
      const button = wrapper.getByTestId('custom-button');
      expect(button).toHaveAttribute('title', 'Custom Title');
    });

    // 测试无障碍属性
    test('should apply aria-label when provided', () => {
      const wrapper = render(<Button aria-label="Accessibility Test">Test</Button>);
      const button = wrapper.getByText('Test');
      expect(button).toHaveAttribute('aria-label', 'Accessibility Test');
    });
```

### **3.5 测试最佳实践**

通过Button组件的测试实践，我们总结了以下React组件单元测试的最佳实践：

**1. 测试用户行为而非实现细节**

使用React Testing Library的查询方式（如`getByText`、`getByRole`）模拟用户的实际行为，而不是直接测试组件的内部实现。

**2. 全面覆盖各种场景**

测试应该覆盖组件的所有功能点，包括：

- 基本渲染
- 所有属性组合
- 各种状态（正常、禁用、加载等）
- 交互行为
- 边缘情况

**3. 使用参数化测试减少重复代码**

对于类似的测试场景（如不同类型、尺寸的按钮），使用`test.each`可以减少重复代码，提高测试的可维护性。

**4. 确保无障碍支持**

测试组件的无障碍属性（如`aria-label`、`aria-disabled`、`aria-busy`），确保组件符合无障碍标准。

**5. 测试组件的集成性**

除了测试组件的独立功能外，还应该测试组件与其他元素的集成（如图标、加载指示器等）。

### **3.6 常见测试问题及解决方案**

**1. 如何测试只有图标的按钮？**

对于没有可见文本的按钮，我们需要使用`aria-label`提供无障碍标签，并使用`getByRole('button', { name: '标签内容' })`来查找元素。

```

// 错误的方式
const button = wrapper.getByText('Icon Button'); // 会失败，因为没有可见文本

// 正确的方式
const button = wrapper.getByRole('button', { name: 'Icon Button' }); // 会考虑aria-label
```

**2. 如何测试组件的内部HTML结构？**

使用`toContainHTML`可以测试组件是否包含特定的HTML结构：

```

expect(button).toContainHTML('<span class="btn-loading-spinner" aria-hidden="true"></span>');
```

**3. 如何模拟用户交互？**

使用`fireEvent`可以模拟用户的各种交互行为：

```

fireEvent.click(button); // 模拟点击事件
fireEvent.mouseEnter(button); // 模拟鼠标进入事件
```

---

**参考资料**：

- [Jest官方文档](https://jestjs.io/docs/getting-started)
- [React Testing Library官方文档](https://testing-library.com/docs/react-testing-library/intro/)
- [WAI-ARIA无障碍标准](https://www.w3.org/TR/wai-aria/)