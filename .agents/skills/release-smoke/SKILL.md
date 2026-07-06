---
name: release-smoke
description: 校验 CreamDesign 组件包导出、构建和消费方式。适用于 package.json exports、Rollup 配置、tsconfig 构建配置、根导出、组件入口文件或组件包产物结构相关改动。
---

# 发布 Smoke 校验

当改动可能影响 `creamdesign-lib` 的构建或消费方式时，使用这个流程。

首选校验命令是：

```bash
pnpm smoke:components
```

该命令覆盖组件构建、包结构 smoke 和真实消费 smoke。不要只依赖 TypeScript 编译或检查 dist 文件存在。

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
   - 检查 ESM、CJS、TypeScript 类型、子路径导入、样式子路径解析和关键运行时导出。

## 真实消费 smoke 应覆盖

确认 smoke 至少覆盖以下消费面：

1. ESM 根导入。
   - 例如 `import {Button, Table, Message} from 'creamdesign-lib'`。

2. ESM 子路径导入。
   - 例如 `import Button from 'creamdesign-lib/button'`。

3. CJS 根导入和子路径导入。
   - 例如 `require('creamdesign-lib')` 和 `require('creamdesign-lib/button')`。

4. TypeScript 类型消费。
   - 根入口公共类型可导入。
   - 子路径公共类型可导入。
   - 泛型组件类型可在消费端正常推导。

5. 样式入口解析。
   - `creamdesign-lib/style` 应解析到 `dist/index.css`。

6. 关键运行时导出。
   - 例如 `ConfigProvider`、`defaultTheme`、`mergeTheme`、`themeToCSSVariables` 和 `Message`。

## 失败定位顺序

当 smoke 失败时，按以下顺序定位：

1. 先检查 `packages/components/package.json`。
   - `exports` 是否声明了对应子路径。
   - `types`、`import`、`require` 是否指向真实文件。
   - `style` 和 `./style` 是否指向 CSS 产物。

2. 再检查 `packages/components/rollup.config.js`。
   - 子入口是否在 `componentEntries` 中。
   - ESM/CJS 文件名是否与 `exports` 一致。
   - CSS 是否按预期抽取或注入。

3. 再检查类型声明复制逻辑。
   - `packages/components/scripts/copy-types.js` 是否覆盖新增入口。
   - `dist/<subpath>/index.d.ts` 是否存在。

4. 再检查根导出和组件入口。
   - `packages/components/src/index.tsx` 是否导出公共 API。
   - 组件 `index.ts` 或 `index.tsx` 是否导出默认值和公共类型。

5. 最后检查 smoke 脚本自身。
   - 临时消费项目是否链接了 peer dependencies。
   - 新增依赖是否需要被链接到消费项目。
   - smoke 是否遗漏了新入口或新公共类型。

## 输出格式

报告当前组件包是否可以安全消费，并明确列出已经验证的消费面。

如果因为依赖缺失、网络限制或环境问题无法运行完整 smoke test，仍需检查元数据，并列出：

1. 已经完成的检查。
2. 尚未验证的消费面。
3. 后续需要运行的具体命令。
