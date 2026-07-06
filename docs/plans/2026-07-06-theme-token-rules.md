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

后续可能需要：

- `TableToken`
  - `headerBg`
  - `rowHoverBg`
  - `cellPadding`
  - `borderColor`
- `FormToken`
  - `labelColor`
  - `itemMarginBottom`
  - `errorTextColor`
- `UploadToken`
  - `draggerBorderColor`
  - `draggerHoverBg`
  - `fileItemBg`

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
   - 先识别哪些能复用 global/semantic token。
   - 再决定是否新增 `TableToken`。

5. `Form`
   - 与 Input 共享 control、disabled、error、placeholder 语义 token。
   - 只有布局间距或 label 行为稳定后，再考虑 `FormToken`。

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
