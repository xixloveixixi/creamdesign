# CreamDesign 组件库改造计划

## 目标定位

将 CreamDesign 从练习型自研组件集合，改造成一个可以对标千帆 antd-kit 的中后台 React 组件库项目。

核心目标：

1. 工程上可发布、可按需引入、可测试、可持续维护。
2. 设计上具备统一 Design Token、主题配置和组件级样式覆盖能力。
3. 组件上形成清晰分层，重点打磨 Table、Form、Upload 等复杂业务组件。
4. 文档上具备 Storybook 站点、组件规范、接入指南和最佳实践。
5. 产出上能形成清晰的简历项目描述和技术亮点。

## 对标千帆组件库的差距

### 现状

CreamDesign 当前已经有 Button、Menu、Table、Form、Input、Upload、Pagination、Progress、Card、Timeline、Tag、Message 等组件，并具备 Rollup 构建、Storybook、测试用例和 SCSS 变量。

主要问题：

1. 包导出配置与实际 dist 产物不一致，子路径按需引入存在失败风险。
2. README 仍有 Create React App 模板内容，组件库使用说明不足。
3. 主题能力主要停留在 SCSS 编译期变量，缺少运行时 ConfigProvider 和组件级 token。
4. 组件 API、类型、样式和文档规范不够统一。
5. 测试和构建脚本混用了 react-scripts、Rollup、Storybook，工程边界不够清晰。
6. dist 和 storybook-static 等构建产物被提交，仓库维护成本偏高。

### 改造方向

千帆 antd-kit 的核心价值不是“组件数量多”，而是：

1. 基于成熟底座进行业务设计封装。
2. 有统一主题和 ConfigProvider。
3. 有完整发布产物：esm、cjs、types、locale。
4. 有 Storybook、组件文档、使用规则和发布流程。
5. 复杂组件覆盖中后台高频业务场景。

CreamDesign 的改造应优先补齐这些工程化和体系化能力。

## 阶段一：发布与构建体系修复

### 目标

让组件库可以稳定构建、打包、发布和被业务项目消费。

### 任务

1. 修复 `packages/components/package.json` 的 `exports`。
   - 子路径导出需要和实际产物目录、文件名一致。
   - 统一大小写策略，建议使用小写子路径，例如 `creamdesign-lib/button`。
   - CJS 产物建议使用 `.cjs` 后缀，避免 `"type": "module"` 下加载歧义。

2. 梳理 Rollup 构建配置。
   - 主入口输出 ESM、CJS、类型声明和 CSS。
   - 组件子入口输出 JS、CJS、类型声明。
   - 保证 `Button`、`Table`、`Form`、`Upload`、`Message` 等主入口和子入口都可导入。

3. 增加发布前校验。
   - `pnpm build`
   - `pnpm pack`
   - 在临时项目中验证全量导入、子路径导入、样式导入和类型提示。

4. 清理构建产物管理。
   - `dist`、`storybook-static` 不再提交到 Git。
   - CI 或发布流程负责重新生成产物。

### 验收标准

```typescript
import { Button, Table } from 'creamdesign-lib';
import Button from 'creamdesign-lib/button';
import 'creamdesign-lib/style';
```

以上导入方式均可在新项目中正常构建和运行。

### 简历表达

搭建并优化组件库构建发布体系，支持 ESM/CJS 双格式、类型声明生成、样式产物拆分、子路径按需引入和发布前 smoke test，解决包导出与构建产物不一致导致的消费端接入问题。

## 阶段二：主题系统与设计 Token

### 目标

补齐类似千帆 `ConfigProvider + THEME_CONFIG` 的主题能力，让组件样式从“分散 SCSS”升级为“统一 token 驱动”。

### 任务

1. 建立 token 分层。
   - base token：颜色、字号、行高、间距、圆角、阴影、动效。
   - semantic token：品牌色、文本色、边框色、背景色、成功/警告/错误状态。
   - component token：Button、Input、Table、Form、Message 等组件级变量。

2. 增加 `ConfigProvider`。
   - 提供默认主题。
   - 支持传入局部主题覆盖。
   - 支持组件读取 theme context。
   - 预留 locale 配置。

3. 输出 CSS Variables。
   - 默认生成 `:root` 变量。
   - 支持主题 class 或 data attribute 切换。
   - 组件样式逐步从 SCSS 变量迁移到 CSS Variables。

4. 增加至少两个主题。
   - 默认 Cream 主题。
   - 中后台专业主题或暗色主题。

### 当前进展

阶段二已经完成主题能力的第一轮闭环：

1. 已提供 `ConfigProvider`、`defaultTheme`、`enterpriseTheme`、`mergeTheme` 和 `themeToCSSVariables`。
2. 已建立 global token、semantic token 和组件级 token `ButtonToken`、`TableToken`。
3. 已迁移并验证部分组件使用 CSS Variables，包括 `Button`、`Input`、`Message`、`Tag`、`Progress`、`Card`、`Table`。
4. 已在 Storybook 中新增 `主题/Theme` 和 Table 企业主题示例，用于对比默认主题、企业级主题和组件级覆盖。
5. 已通过 `pnpm test`、`pnpm smoke:components`、`pnpm build-storybook` 验证主题链路。

### 已完成：TableToken 第一版

复杂组件主题化的第一步已经完成，范围控制在 Table 的视觉表面，未修改行为逻辑。

已新增 `TableToken`：

```ts
interface TableToken {
  headerBg?: string;
  headerColor?: string;
  headerBorderColor?: string;
  rowBg?: string;
  rowStripeBg?: string;
  rowHoverBg?: string;
  rowSelectedBg?: string;
  rowSelectedBorderColor?: string;
  cellPadding?: number | string;
  cellBorderColor?: string;
}
```

迁移结果：

1. `Table.scss` 优先读取 `--cream-table-*` CSS Variables，保留现有 SCSS 色值作为 fallback。
2. `enterpriseTheme` 提供中后台风格 Table token。
3. Storybook 新增 Table 企业级主题示例。
4. 单测覆盖 `themeToCSSVariables` 的 Table 变量输出。
5. 未修改 Table Props，未修改排序、分页、虚拟滚动、行选择等行为。

### 下一步计划

继续迁移复杂组件时，优先评估 `Form` 是否只需复用现有 global/semantic token。只有布局间距或 label 视觉语义稳定后，再考虑 `FormToken`。

### 验收标准

```tsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#7c3aed',
    },
    components: {
      Button: {
        borderRadius: 4,
      },
    },
  }}
>
  <Button btnType="primary">提交</Button>
</ConfigProvider>
```

组件能读取全局 token 和组件 token，并正确更新样式。

### 简历表达

设计并实现组件库主题系统，基于 Design Token 与 CSS Variables 支持全局主题、组件级样式覆盖和多主题切换，提升组件样式一致性与业务接入灵活性。

## 阶段三：组件体系重构

### 目标

将组件从“按文件夹堆叠”升级为“中后台组件体系”。

### 分层规划

1. 通用组件
   - Button
   - Icon
   - Typography
   - Divider

2. 数据录入
   - Input
   - Form
   - Upload
   - Checkbox
   - Radio
   - Select

3. 数据展示
   - Table
   - Card
   - Tag
   - Timeline
   - Progress

4. 反馈
   - Message
   - Modal
   - Notification
   - Tooltip
   - Popover

5. 导航
   - Menu
   - Pagination
   - Breadcrumb
   - Tabs

### 任务

1. 统一组件目录结构。
   - `index.ts`
   - `Component.tsx`
   - `Component.scss`
   - `Component.test.tsx`
   - `Component.stories.tsx`
   - `types.ts`

2. 统一组件 API。
   - 受控和非受控行为一致。
   - 支持 `className`、`style`、`disabled`、`size`、`status` 等通用字段。
   - 支持 `ref` 转发。
   - 类型导出完整。

3. 建立复杂组件优先级。
   - 第一优先级：Table、Form、Upload。
   - 第二优先级：Message、Modal、Input、Button。
   - 第三优先级：Menu、Pagination、Tag、Card。

4. 对复杂组件使用成熟底座。
   - DatePicker、Select、Tree、Modal 等高复杂度组件可以优先二次封装 Ant Design。
   - 自研组件重点放在业务差异明显的 Table、Upload、Form 上。

### 验收标准

组件目录、导出方式、Props 命名、Storybook 文档和测试文件形成统一模板。

### 简历表达

规划并重构组件分层体系，覆盖通用、数据录入、数据展示、反馈、导航等中后台高频场景，统一组件 API、类型定义、样式规范和交互边界。

## 阶段四：复杂组件专项

### Table

目标：打造组件库的核心亮点。

任务：

1. 支持列配置、排序、筛选、分页、行选择。
2. 支持虚拟滚动和大数据量渲染。
3. 支持空状态、加载状态、错误状态。
4. 支持固定表头、固定列或横向滚动。
5. 优化渲染性能，减少不必要重渲染。

验收标准：

1. 1 万行数据虚拟滚动不卡顿。
2. 排序、筛选、分页、行选择可组合使用。
3. 有完整 Storybook 示例和测试用例。

简历表达：

设计并实现高性能 Table 组件，支持虚拟滚动、排序筛选、分页、行选择和复杂状态展示，优化大数据量场景下的渲染性能与交互体验。

### Form

目标：沉淀中后台高频表单能力。

任务：

1. 字段注册和卸载。
2. 同步和异步校验。
3. 字段联动。
4. 嵌套字段和数组字段。
5. 表单级提交、重置、校验、滚动到错误字段。

验收标准：

复杂注册表单、动态列表表单、异步校验表单都能通过示例覆盖。

简历表达：

实现表单状态管理和校验体系，支持字段注册、异步校验、动态字段、表单联动和错误定位，提升复杂业务表单开发效率。

### Upload

目标：做成业务亮点组件。

任务：

1. 普通上传。
2. 拖拽上传。
3. 大文件分片。
4. 秒传。
5. 断点续传。
6. 并发控制。
7. 失败重试。
8. 暂停和恢复。

验收标准：

有 mock adapter、真实 adapter 接口设计、上传状态流转图和完整示例。

简历表达：

设计并实现大文件上传组件，支持分片上传、断点续传、秒传、并发控制和失败重试，通过 adapter 抽象适配不同后端上传协议。

## 阶段五：文档站与开发者体验

### 目标

让组件库不仅能用，还能被别人快速理解和接入。

### 任务

1. 重写 README。
   - 项目定位。
   - 安装方式。
   - 快速开始。
   - 样式引入。
   - 按需引入。
   - 开发命令。
   - 发布流程。

2. 完善 Storybook。
   - 每个组件有基础示例、复杂示例、状态示例。
   - 使用 Controls 展示 Props。
   - 提供主题切换预览。
   - 增加组件分类导航。

3. 增加组件规范文档。
   - 组件设计原则。
   - API 命名规范。
   - 样式 token 使用规范。
   - 复杂组件最佳实践。

4. 增加 AI 使用规则。
   - 为每个核心组件沉淀规则文档。
   - 描述适用场景、推荐写法、禁用写法。
   - 后续可对标千帆 `.comate/components` 规则。

### 验收标准

新同学只看 README 和 Storybook，可以完成组件安装、主题配置、基础组件使用和复杂组件接入。

### 简历表达

基于 Storybook 建设组件文档站，沉淀组件使用规范、Props 文档、交互示例和 AI 辅助开发规则，降低业务团队接入成本。

## 阶段六：测试、质量和 CI

### 目标

建立组件库质量保障体系。

### 任务

1. 测试框架迁移。
   - 从 `react-scripts test` 迁移到 Vitest。
   - 使用 Testing Library 测试组件交互。

2. 测试类型。
   - 单元测试。
   - 交互测试。
   - 构建产物 smoke test。
   - 可访问性测试。
   - 可选视觉回归测试。

3. CI 流程。
   - lint。
   - typecheck。
   - test。
   - build。
   - pack smoke。
   - storybook build。

4. 质量门禁。
   - 核心组件覆盖率不低于 80%。
   - 发布前必须通过构建产物消费测试。
   - 每个新增组件必须包含 Storybook 和测试。

### 验收标准

PR 进入主分支前能自动发现类型错误、测试失败、构建失败和包消费失败。

### 简历表达

建立组件库质量保障体系，覆盖类型检查、单元测试、交互测试、构建校验、发布前 smoke test 和 CI 门禁，保障组件升级兼容性。

## 阶段七：项目交付与简历包装

### 项目成果

最终项目应具备以下可展示成果：

1. 一个可运行的 Storybook 文档站。
2. 一个可发布的 npm 包。
3. 一套主题系统。
4. 一套组件分层规范。
5. 三个复杂组件亮点：Table、Form、Upload。
6. 一套测试和 CI 质量流程。
7. 一份完整 README 和组件开发规范。

### 简历项目描述

负责建设 React 企业级组件库 CreamDesign，参考 Ant Design 和千帆组件库体系完成组件分层、主题系统、构建发布、按需加载、Storybook 文档站和测试体系建设；核心组件覆盖 Form、Table、Upload 等复杂业务场景，支持 Design Token、多主题、类型声明、ESM/CJS 双产物与 npm 发布校验。

### 简历技术亮点

1. 组件库工程化：Rollup/Rslib、ESM/CJS、类型声明、子路径导出、按需加载。
2. 设计系统：Design Token、CSS Variables、ConfigProvider、多主题。
3. 复杂组件：虚拟表格、表单校验联动、大文件上传。
4. 质量体系：Vitest、Testing Library、CI、pack smoke test。
5. 开发者体验：Storybook、组件规范、AI 使用规则。

## 推荐实施顺序

### 第 1 周：工程底座

1. 修复 exports 和构建产物。
2. 清理 dist/storybook-static 提交。
3. 增加 pack smoke test。
4. 重写 README 基础版。

### 第 2 周：主题系统

1. 设计 token 分层。
2. 实现 ConfigProvider。
3. Button/Input/Tag 接入 token。
4. Storybook 增加主题切换。

### 第 3 周：复杂组件 Table

1. 梳理 Table API。
2. 优化虚拟滚动。
3. 补齐排序、筛选、分页、行选择组合能力。
4. 增加性能示例和测试。

### 第 4 周：Form 和 Upload

1. Form 补齐字段联动、异步校验、动态字段。
2. Upload 完善分片、断点续传、并发控制和失败重试。
3. 增加 adapter 文档和示例。

### 第 5 周：文档和质量体系

1. Storybook 组件文档补齐。
2. 迁移 Vitest。
3. CI 增加 lint、typecheck、test、build、pack smoke。
4. 输出组件开发规范。

## 取舍建议

1. 不建议一次性自研所有复杂组件。
2. Select、DatePicker、Tree、Modal 等复杂度高的组件可以优先二次封装成熟库。
3. 简历重点不要放在组件数量，而要放在工程体系、主题系统和复杂组件能力。
4. 第一阶段必须先修包发布问题，否则后续主题和组件改造都缺少可靠交付基础。
