# CreamDesign Copilot 指令

CreamDesign 是一个 React 组件库 workspace。建议和补全应聚焦在组件库范围内，并遵守以下仓库约定。

## 仓库上下文

- 组件源码：`packages/components/src`
- 组件包配置：`packages/components/package.json`
- 构建配置：`packages/components/rollup.config.js`
- 文档站：`packages/docs-site`
- 规划文档：`docs/plans`

## 编码规则

- 除非明确要求，否则不要编辑 `packages/components/dist` 或 `packages/docs-site/storybook-static`。
- 新增公共组件时，需要同时具备实现、入口导出、样式、Storybook 示例、测试和公共 prop/type 导出。
- 保持公共 API 稳定。如果 API 发生变化，需要同步更新 stories、tests、包导出和文档。
- 优先做小而聚焦的改动，避免大范围重构。
- 避免新增依赖，除非收益明确且已写清原因。

## 验证要求

- 组件改动应有聚焦测试和 Storybook 示例覆盖。
- 包导出或 Rollup 改动应通过构建和包消费 smoke check 验证。
- 发布敏感文件包括 `packages/components/package.json`、`packages/components/rollup.config.js`、`packages/components/tsconfig.build.json`、`packages/components/src/index.tsx` 和组件入口文件。
