# CreamDesign 主题 Token 使用规则

## 背景

阶段二的目标是把组件样式从分散 SCSS 变量迁移到 `ConfigProvider + Design Token + CSS Variables`。迁移过程中需要避免一个误区：每新增或改造一个组件，就机械地新增一个 `XxxToken`。

组件级 token 是有成本的。它会扩大 `ThemeConfig` 类型、增加文档负担，也会让使用者难以判断应该改全局 token 还是组件 token。因此主题系统需要先建立分层规则。

## Token 分层

### Global Token

Global Token 描述整个设计系统的基础语义，适合被多个组件复用。

典型例子：

- `colorPrimary`
- `colorText`
- `colorTextSecondary`
- `colorBorder`
- `colorBgContainer`
- `borderRadius`
- `boxShadow`

### Semantic Token

Semantic Token 描述跨组件共享的状态或交互语义。它仍属于全局 token，而不是某个组件的私有 token。

典型例子：

- `colorTextPlaceholder`
- `colorTextDisabled`
- `colorBgDisabled`
- `colorSuccessBg`
- `colorSuccessBorder`
- `colorWarningBg`
- `colorWarningBorder`
- `colorErrorBg`
- `colorErrorBorder`
- `colorInfoBg`
- `colorInfoBorder`
- `controlFocusShadow`

这类 token 应优先用于 Input、Select、Form、Message、Alert 等组件中的通用状态。

### Component Token

Component Token 描述某个组件独有的结构或视觉语义。只有当样式覆盖需求无法用 global/semantic token 表达时，才新增组件级 token。

当前已有：

- `ButtonToken`
- `TableToken`
  - `headerBg`
  - `headerColor`
  - `headerBorderColor`
  - `rowBg`
  - `rowStripeBg`
  - `rowHoverBg`
  - `rowSelectedBg`
  - `rowSelectedBorderColor`
  - `cellPadding`
  - `cellBorderColor`

后续可能需要：

- `FormToken`
  - `labelColor`
  - `itemMarginBottom`
  - `errorTextColor`

## 判断规则

新增 token 前按以下顺序判断：

1. 是否已经有可复用的 global token。
   - 如果是，直接使用 global token。

2. 是否是多个组件共享的状态语义。
   - 如果是，新增或复用 semantic token。
   - 例如 disabled、placeholder、success background、focus shadow。

3. 是否只属于某个复杂组件的内部结构。
   - 如果是，再考虑 component token。
   - 例如 Table header、Table row hover、Upload dragger。

4. 是否只是某个组件当前实现里的局部写法。
   - 如果是，不要急着加 token，先保持 SCSS 局部变量或复用已有 token。

## 不要做的事

不要因为组件存在，就自动新增：

```ts
InputToken;
MessageToken;
CardToken;
TagToken;
```

这些 token 只有在出现明确、稳定、可复用的组件级覆盖需求时才应该添加。

## 当前阶段策略

阶段二第一刀先补通用语义 token，并让 `Input` 和 `Message` 复用这些 token。

已覆盖：

- Input
  - primary、文本、次级文本、边框和容器背景
  - placeholder 文本色
  - disabled 文本色
  - disabled 背景色
  - focus shadow

- Message
  - success/warning/error/info 图标色
  - success/warning/error/info 背景色
  - success/warning/error/info 边框色
  - Portal root 继承全局 CSS Variables

- Tag
  - primary/success/warning/danger/info 状态色
  - success/warning/danger/info 状态背景色
  - success/warning/danger/info 状态描边色

- Progress
  - 轨道背景色
  - primary/secondary/success/warning/danger/info 填充色
  - 基于 CSS Variables 的运行时渐变和 hover 色

暂不新增：

- `InputToken`
- `MessageToken`
- `TagToken`
- `ProgressToken`

## 后续迁移顺序

建议迁移顺序：

1. `Button`
   - 已保留 `ButtonToken` 只覆盖 primary 色和圆角。
   - danger/warning/info/success、ghost/text/outline、disabled、focus 已迁移为复用现有 global/semantic token。
   - 暂不新增 `ButtonToken` 字段，除非后续出现稳定的按钮专属覆盖需求。

2. `Icon`
   - 已迁移为复用 primary、text、success、warning、error、info、container 背景等现有 global/semantic token。
   - 未新增 `IconToken`。
   - `Icon` 的主题枚举保持不变，运行时颜色由 CSS Variables 继承。

3. `Message`
   - 已迁移为复用背景、阴影、文本、success/warning/error/info 状态背景和边框等现有 global/semantic token。
   - 未新增 `MessageToken`。
   - Portal root 已通过全局 CSS Variables 同步主题。

4. `Tag`
   - 已迁移为复用 primary、success、warning、error、info 状态色和背景/边框语义 token。
   - 未新增 `TagToken`。
   - `Tag` 的状态描边通过内阴影读取语义边框变量，避免改变标签布局尺寸。

5. `Progress`
   - 已迁移为复用 primary、text secondary、success、warning、error、info 和 disabled 背景等现有 global/semantic token。
   - 未新增 `ProgressToken`。
   - 进度条渐变和 hover 色通过运行时 `color-mix()` 从 CSS Variables 派生，避免 SCSS 编译期状态色固化。

6. `Card`
   - 已迁移为复用背景、边框、文本、primary、阴影、圆角、disabled/elevated 背景等现有 global/semantic token。
   - 未新增 `CardToken`。
   - 只有卡片头部、操作区、骨架屏等视觉语义出现稳定差异化覆盖需求后，再考虑 `CardToken`。

7. `Table`
   - 已完成 `TableToken` 第一版。
   - 第一版只覆盖表格视觉表面，不修改排序、分页、虚拟滚动、行选择等行为逻辑。
   - `Table.scss` 已迁移为优先读取 `--cream-table-*` CSS Variables，保留原 SCSS 色值作为 fallback。
   - `enterpriseTheme` 已提供中后台风格的 Table token，用于验证主题切换。

8. `Form`
   - 已迁移为复用背景、圆角、error 等现有 global/semantic token。
   - 未新增 `FormToken`。
   - 只有布局间距或 label 行为稳定后，再考虑 `FormToken`。

9. `Upload`
   - 已迁移为复用背景、边框、文本、primary、success、error、info 等现有 global/semantic token。
   - 未新增 `UploadToken`。
   - 只有拖拽区、文件项等视觉语义出现稳定差异化覆盖需求后，再考虑 `UploadToken`。

10. `Menu`
    - 已迁移为复用背景、边框、文本、primary、disabled、圆角、阴影等现有 global/semantic token。
    - 未新增 `MenuToken`。
    - 只有导航容器、菜单项、子菜单浮层等视觉语义出现稳定差异化覆盖需求后，再考虑 `MenuToken`。

11. `Pagination`
    - 已迁移为复用文本、边框、背景、primary、disabled、圆角、focus shadow 等现有 global/semantic token。
    - 未新增 `PaginationToken`。
    - 只有页码项、页大小选择器等视觉语义出现稳定差异化覆盖需求后，再考虑 `PaginationToken`。

12. `Timeline`
    - 已迁移为复用文本、边框、背景、primary、success、disabled、focus shadow 等现有 global/semantic token。
    - 未新增 `TimelineToken`。
    - 只有节点、连接线、内容卡片等视觉语义出现稳定差异化覆盖需求后，再考虑 `TimelineToken`。

## TableToken 第一版记录

`TableToken` 是阶段二进入复杂组件 token 化的第一步。它没有一次性重构 Table，只验证复杂业务组件能通过组件级 token 做稳定换肤。

### 字段范围

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

### 未做

- 不修改 Table Props。
- 不修改排序、筛选、分页、虚拟滚动、行选择等行为。
- 不迁移 Form、Upload、Menu。
- 不新增暗色主题。

### 验收结果

1. `themeToCSSVariables` 输出 `--cream-table-*` 变量。
2. `ConfigProvider theme={enterpriseTheme}` 下 Table 表头、斑马纹、hover、选中行和单元格边框跟随主题变化。
3. Storybook 已增加 Table 企业级主题示例。
4. CSS Variables 输出在 `.cream-config-provider` 上，可被 Table 组件继承。
5. `pnpm test`、`pnpm smoke:components`、`pnpm build-storybook` 通过。

## 阶段二收尾审计

主题迁移第一轮已覆盖 Button、Input、Icon、Message、Tag、Progress、Card、Table、Form、Upload、Menu、Pagination、Timeline。

收尾审计结论：

1. docs-site 的组件主题示例已统一复用 `enterpriseTheme`，用于展示默认主题和企业级主题差异。
2. 组件包内部 story 中的 Input、Message、Tag 主题示例已同步复用 `enterpriseTheme`，避免保留漂移的内联 token 对象。
3. `主题/Theme` 已补充主题接入文档、运行时主题切换示例和 CSS Variables 对照表。
4. 仍保留的内联 `theme={{ ...enterpriseTheme, components: { ... } }}` 仅用于 `主题/Theme` 和 Button 的组件级覆盖示例，属于有意展示 `ButtonToken` 的用法。
5. 第一轮未新增 `InputToken`、`MessageToken`、`TagToken`、`ProgressToken`、`CardToken`、`FormToken`、`UploadToken`、`MenuToken`、`PaginationToken`、`TimelineToken`。
6. 下一阶段如果要新增组件级 token，应先有稳定的组件私有视觉语义，再扩展 `ComponentToken`。

## 验收要求

每次主题迁移至少验证：

1. `themeToCSSVariables` 输出新增 CSS Variables。
2. `ConfigProvider` 覆盖 token 后组件能继承变量。
3. Portal 类组件，例如 `Message`，能读取全局主题变量。
4. Storybook 有一个主题覆盖示例。
5. `pnpm test` 和 `pnpm smoke:components` 通过。

如果改了 docs-site stories，还需要运行：

```bash
pnpm build-storybook
```
