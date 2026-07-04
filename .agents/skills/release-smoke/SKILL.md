---
name: release-smoke
description: 校验 CreamDesign 组件包导出、构建和消费方式。适用于 package.json exports、Rollup 配置、tsconfig 构建配置、根导出、组件入口文件或组件包产物结构相关改动。
---

# 发布 Smoke 校验

当改动可能影响 `creamdesign-lib` 的构建或消费方式时，使用这个流程。

## 发布敏感文件

以下文件发生变化时，应运行这个 skill：

- `packages/components/package.json`
- `packages/components/rollup.config.js`
- `packages/components/tsconfig.build.json`
- `packages/components/src/index.tsx`
- 组件 `index.ts` 或 `index.tsx` 文件
- 样式入口文件

## 校验项

1. 检查包元数据。
   - `main`、`module`、`types`、`style` 和 `exports` 指向真实构建产物。
   - 在 `"type": "module"` 下，CJS 产物不能有加载歧义。
   - 子路径导出尽量使用稳定的小写导入路径。
   - `sideEffects` 应保留 CSS/SCSS，避免被 tree-shaking 错误移除。
   - React 和 React DOM 应作为 peer dependencies，而不是被打包进运行时依赖。

2. 检查 Rollup 输出。
   - 生成根入口 ESM 和 CJS 产物。
   - 生成组件子路径入口产物。
   - 根入口和子路径入口都生成类型声明。
   - 样式产物已生成，或存在明确的样式导入方式。

3. 验证消费端导入方式。
   - 根导入：
     `import {Button, Table} from 'creamdesign-lib'`
   - 子路径导入：
     `import Button from 'creamdesign-lib/button'`
   - 样式导入：
     `import 'creamdesign-lib/style'`

4. 优先执行真实包消费 smoke test。
   - 首选运行 `pnpm smoke:components`。
   - 该命令会先运行 `pnpm build:components`。
   - 然后运行 `pnpm --filter creamdesign-lib smoke:consumer`。
   - smoke 会将 `pnpm pack` 打出的 tarball 解包到临时消费项目。
   - 检查 ESM、CJS、TypeScript 类型、子路径导入和样式子路径解析。

## 输出格式

报告当前组件包是否可以安全消费。如果因为依赖缺失无法运行完整 smoke test，仍需检查元数据，并列出尚未验证的具体命令。
