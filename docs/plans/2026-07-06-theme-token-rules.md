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
  - placeholder 文本色
  - disabled 文本色
  - disabled 背景色
  - focus shadow

- Message
  - success/warning/error/info 图标色
  - success/warning/error/info 背景色
  - success/warning/error/info 边框色

暂不新增：

- `InputToken`
- `MessageToken`

## 后续迁移顺序

建议迁移顺序：

1. `Tag`
   - 复用状态色和背景/边框语义 token。

2. `Progress`
   - 复用 success/warning/error/info 语义色。

3. `Card`
   - 复用背景、边框、阴影、圆角。

4. `Table`
   - 已完成 `TableToken` 第一版。
   - 第一版只覆盖表格视觉表面，不修改排序、分页、虚拟滚动、行选择等行为逻辑。
   - `Table.scss` 已迁移为优先读取 `--cream-table-*` CSS Variables，保留原 SCSS 色值作为 fallback。
   - `enterpriseTheme` 已提供中后台风格的 Table token，用于验证主题切换。

5. `Form`
   - 已迁移为复用背景、圆角、error 等现有 global/semantic token。
   - 未新增 `FormToken`。
   - 只有布局间距或 label 行为稳定后，再考虑 `FormToken`。

6. `Upload`
   - 已迁移为复用背景、边框、文本、primary、success、error、info 等现有 global/semantic token。
   - 未新增 `UploadToken`。
   - 只有拖拽区、文件项等视觉语义出现稳定差异化覆盖需求后，再考虑 `UploadToken`。

7. `Menu`
   - 已迁移为复用背景、边框、文本、primary、disabled、圆角、阴影等现有 global/semantic token。
   - 未新增 `MenuToken`。
   - 只有导航容器、菜单项、子菜单浮层等视觉语义出现稳定差异化覆盖需求后，再考虑 `MenuToken`。

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
