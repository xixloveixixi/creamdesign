# CreamDesign Agent 指南

## 项目结构

- 这是一个基于 pnpm workspace 的 React 组件库项目。
- 组件源码位于 `packages/components/src`。
- Storybook 文档站位于 `packages/docs-site`。
- 规划文档位于 `docs/plans`。
- 面向业务消费的组件包是 `packages/components`。

## 常用命令

- 使用 `pnpm install` 安装依赖。
- 使用 `pnpm test` 运行组件测试。
- 使用 `pnpm build:components` 构建组件包。
- 使用 `pnpm build:all` 构建所有 workspace 包。
- 使用 `pnpm lint` 运行代码检查。

## 约束规则

- 除非任务明确要求修改生成产物，否则不要编辑：
  - `packages/components/dist`
  - `packages/docs-site/storybook-static`
- 不要在没有说明必要性的情况下新增生产依赖。
- 修改组件时不要顺手做无关重构。
- 修改公共组件 API 时，必须同步更新导出、测试、Storybook 示例和文档。
- 组件任务优先在 `packages/components/src/<ComponentName>` 内做聚焦修改。

## 组件标准

每个公共组件应具备：

- 组件实现文件，
- 组件入口文件，
- SCSS 或基于 token 的样式，
- Storybook 示例，
- 聚焦的测试文件，
- 公共 API 对应的 props/types 导出。

新增组件或大幅重构组件时，优先使用以下结构：

```text
packages/components/src/<ComponentName>/
  <ComponentName>.tsx
  <ComponentName>.scss
  <ComponentName>.test.tsx
  <ComponentName>.stories.tsx
  index.ts
```

## 发布敏感改动

如果修改以下文件，不要只检查本地 TypeScript，需要验证组件包是否能被业务项目消费：

- `packages/components/package.json`
- `packages/components/rollup.config.js`
- `packages/components/tsconfig.build.json`
- `packages/components/src/index.tsx`
- 任意组件的 `index.ts` 或 `index.tsx`

建议的发布校验：

1. `pnpm build:components`
2. `pnpm --filter creamdesign-lib pack`
3. 对根导入、子路径导入、样式导入和类型声明做包消费 smoke test。

## AI 工作流

- 审查或修改组件时使用 `$component-review`。
- 修改包导出、构建配置或组件包产物结构时使用 `$release-smoke`。
- 用户询问“下一步是什么”“现在做到哪”“继续做什么”等项目进度问题时，先执行 `.ai/harness/protocols/next-step-context.md` 的上下文读取协议，再回答。
- 使用 `.ai/harness` 中的 case 检查 AI 辅助改动是否满足仓库预期。
