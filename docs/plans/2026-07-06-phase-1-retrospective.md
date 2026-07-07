# CreamDesign 阶段一复盘

## 阶段一目标

阶段一的目标是把 CreamDesign 从“能在本地跑起来的组件集合”推进到“可以被业务项目稳定消费的组件包”。这个阶段不追求新增组件数量，而是优先处理发布链路上的确定性问题。

核心目标包括：

1. 组件包可以稳定构建。
2. 根入口、子路径入口、类型声明和样式入口可以被消费端解析。
3. ESM 和 CJS 两种运行时格式都没有加载歧义。
4. 构建产物不再作为源码维护。
5. 发布前有自动化校验，而不是依赖人工检查 dist 目录。

## 已完成内容

阶段一已经完成以下工作：

1. 稳定组件包构建和导出配置。
   - `packages/components/package.json` 声明 `main`、`module`、`types`、`style` 和 `exports`。
   - 子路径导出统一使用小写路径，例如 `creamdesign-lib/button`。
   - CJS 产物使用 `.cjs`，ESM 产物使用 `.mjs`，避免 `"type": "module"` 下的加载歧义。

2. 建立 Rollup 多入口产物。
   - 主入口输出 ESM、CJS、类型声明和 CSS。
   - 组件子入口输出 ESM、CJS 和对应类型声明。
   - 构建后通过脚本补齐子路径类型声明位置。

3. 增加包结构和真实消费 smoke。
   - `pnpm build:components` 构建组件包，并运行包结构 smoke。
   - `pnpm smoke:components` 会先构建组件包，再运行真实消费 smoke。
   - 真实消费 smoke 会通过 `pnpm pack` 产出 tarball，再解包到临时消费项目中验证导入。
   - 包结构 smoke 会对齐源码公共组件入口和 `package.json exports`，避免新增组件后漏配子路径。
   - 真实消费 smoke 会遍历全部公开子路径，而不是只抽样核心组件。

4. 清理生成产物管理。
   - `packages/components/dist` 和 `packages/docs-site/storybook-static` 不作为源码维护。
   - CI 或发布流程负责重新生成产物。

5. 替换根 README。
   - 移除 Create React App 模板内容。
   - 补充安装、样式引入、根导入、子路径导入、主题示例、组件列表和发布前校验说明。

6. 增加发布前统一门禁。
   - 根目录提供 `pnpm release:check`。
   - 该命令串联组件测试、真实消费 smoke 和 Storybook 构建。

## 发布风险如何被降低

阶段一降低的主要风险不是“构建失败”，而是“发布后业务项目接入失败”。这些失败通常不会被单纯的 TypeScript 检查覆盖。

已覆盖的风险包括：

1. 包元数据和实际产物不一致。
   - `exports` 中声明的 `types`、`import`、`require` 和 `style` 必须能解析到真实文件。

2. ESM 可以用但 CJS 失败。
   - 在 `"type": "module"` 的包里，CJS 文件必须使用 `.cjs` 后缀。

3. 根导入可以用但子路径导入失败。
   - smoke 同时验证 `creamdesign-lib` 和 `creamdesign-lib/button` 等子路径。

4. JavaScript 可以运行但 TypeScript 类型不可用。
   - smoke 使用消费端 TypeScript 文件验证根入口类型、子路径类型和公共类型导出。

5. 组件代码可导入但样式入口不可解析。
   - smoke 验证 `creamdesign-lib/style` 是否解析到 `dist/index.css`。

6. 直接使用 workspace 源码导致误判。
   - 真实消费 smoke 使用 `pnpm pack` 产出的 tarball，而不是直接引用本地源码目录。

## 沉淀出的工程规范

### 包导出规范

公共包入口需要遵守以下约定：

1. 根入口统一使用 `creamdesign-lib`。
2. 样式入口统一使用 `creamdesign-lib/style`。
3. 组件子路径统一使用小写路径，例如 `creamdesign-lib/table`。
4. 每个可消费入口需要同时考虑：
   - `types`
   - `import`
   - `require`
5. ESM 产物使用 `.mjs`。
6. CJS 产物使用 `.cjs`。
7. CSS/SCSS 需要保留在 `sideEffects` 中，避免被 tree-shaking 错误移除。
8. React 和 React DOM 应保持为 peer dependencies。

### 发布前校验规范

改动公共导出、构建配置、组件入口或样式入口时，至少运行：

```bash
pnpm release:check
```

其中：

- `pnpm test` 验证组件行为没有回归。
- `pnpm smoke:components` 验证组件包能被真实消费项目接入。
- `pnpm build-storybook` 验证文档站可以构建。

如果只改动组件内部实现且需要更快反馈，可以先单独运行 `pnpm test` 或 `pnpm smoke:components`；合并前仍以 `pnpm release:check` 为准。

### 新增组件的发布要求

新增公共组件时，不只需要实现组件本身，还需要同步：

1. 组件入口文件。
2. 根入口导出。
3. `package.json` 的子路径 `exports`。
4. Rollup 的子入口配置。
5. 子路径类型声明复制逻辑。
6. Storybook 示例。
7. 聚焦测试。
8. 真实消费 smoke 中的代表性导入校验。

当前 `smoke-package` 和 `smoke-consumer` 已经会自动遍历公开子路径，新增组件时仍需要保证源码入口、Rollup entry、根导出和 `exports` 都同步更新。

## AI 工作流复盘

阶段一的 AI 协作效果比较好的地方是：把“工程改造”拆成了可验证的发布链路，而不是只修单个报错。对 AI 来说，这类任务的关键不是一次性写对配置，而是形成可重复执行的检查闭环。

有效做法包括：

1. 先读仓库规则和路线图，再判断下一步。
2. 对发布敏感文件保持高警惕，包括 `package.json`、Rollup、根入口和组件入口。
3. 遇到 pnpm 在沙箱内因为依赖状态检查失败时，用 `CI=true` 复跑，保证拿到真实测试结果。
4. 每次阶段完成后，先确认工作树，再提交和推送。
5. 把命令结果转化成用户能复用的规范，而不是只报告“通过了”。

需要改进的地方：

1. 工作区存在外层 Git 仓库和内层项目仓库时，必须先确认真正项目根目录，避免误判提交状态。
2. 对“下一步做什么”的回答应该明确区分：
   - 当前工作树状态。
   - 最近一次远端 CI 状态。
   - 是否需要先沉淀文档。
   - 是否应该开新分支进入下一阶段。
3. 对已有项目内 skill 的复用还可以更主动。阶段一结束后，应主动判断已有 skill 是否需要更新。

## Skill 沉淀评估

### 已有 skill：release-smoke

结论：应该增强。

原因：

1. 阶段一最核心的可复用经验就是发布 smoke。
2. 当前 `.agents/skills/release-smoke/SKILL.md` 已经覆盖发布敏感文件、包元数据、Rollup 输出和消费端导入方式。
3. 阶段一进一步证明，真实消费 smoke 应该成为这个 skill 的中心流程，而不是可选补充。

建议增强内容：

1. 明确要求优先运行 `pnpm smoke:components`，因为它覆盖构建和真实消费校验。
2. 明确真实消费 smoke 的校验维度：
   - ESM 根导入。
   - ESM 子路径导入。
   - CJS `require`。
   - TypeScript 类型检查。
   - 样式入口解析。
   - 主题工具和关键运行时导出。
3. 增加失败定位顺序：
   - 先看 `package.json exports`。
   - 再看 Rollup entry 和产物文件名。
   - 再看类型声明复制逻辑。
   - 最后看 smoke 脚本本身是否缺少依赖链接。
4. 增加输出要求：
   - 必须说明哪些消费方式已经验证。
   - 如果 smoke 没跑完整，必须列出未验证的消费面。

### 已有 skill：component-review

结论：暂不修改。

原因：

1. `component-review` 面向组件 API、类型、安全性、可访问性、Storybook 和测试。
2. 阶段一主要是包发布体系，不直接改变组件设计审查标准。
3. 后续进入主题系统和组件 API 统一时，再根据实际迁移经验更新它更合适。

### 是否新增 skill

结论：暂不新增。

阶段一的可复用能力可以先沉淀到 `release-smoke`。如果现在新增 skill，容易和 `release-smoke` 重叠，增加 AI 选择成本。

后续可以考虑新增的 skill：

1. `theme-token-migration`
   - 触发场景：把组件样式从 SCSS 变量迁移到 CSS Variables 和 ConfigProvider token。
   - 候选时机：完成 Input、Message、Table 中至少两个组件的 token 迁移后。

2. `storybook-docs-quality`
   - 触发场景：补齐组件文档站、Controls、示例矩阵和接入指南。
   - 候选时机：Storybook 文档结构稳定后。

3. `component-export-addition`
   - 触发场景：新增公共组件时同步入口、exports、Rollup、类型复制和 smoke。
   - 候选时机：新增组件流程重复出现两次以上后。

### 不适合进入 skill 的内容

以下内容应留在项目文档或 README，不应写进 skill：

1. 阶段一背景和历史决策过程。
2. 简历表达和面试包装。
3. 当前日期、阶段编号、提交记录。
4. 过长的路线图说明。
5. 只对 CreamDesign 当前状态有意义、但不能指导未来操作的叙述。

skill 应该保留可执行流程、触发条件、检查清单和失败处理顺序。

## 后续行动

短期建议：

1. 增强 `.agents/skills/release-smoke/SKILL.md`。
2. 把阶段一复盘提交到 `main`。
3. 开新分支进入阶段二主题系统。

阶段二开始前建议确认：

1. `main` 与 `origin/main` 对齐。
2. GitHub CI 通过。
3. 当前工作树干净。
4. 已明确第一批 token 迁移组件，建议从 `Input` 和 `Message` 开始，不直接从 `Table` 开始。

## 简历表达沉淀

可以将阶段一概括为：

> 搭建并稳定 React 组件库发布体系，支持 ESM/CJS 双格式、类型声明生成、样式入口和子路径按需引入；设计真实消费 smoke test，通过 tarball 临时消费项目验证根导入、子路径导入、CJS/ESM、TypeScript 类型和样式解析，降低组件包发布后业务接入失败风险。
