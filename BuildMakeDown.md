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
    │   ├── _reset.scss      # 样式重置或规范化
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