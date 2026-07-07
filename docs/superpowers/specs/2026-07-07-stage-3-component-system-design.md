# 阶段三组件体系规范基线设计

## 目标

阶段三第一轮不直接重写复杂组件行为，而是先为 `Table`、`Form`、`Upload` 建立稳定的公共 API、目录、导出、Storybook 和测试规范基线。

这一步的目标是把复杂组件从“功能已经能跑”推进到“可以持续扩展、审查和发布”。后续 Table 专项、Form 专项和 Upload 专项都应该在这条基线上迭代。

## 背景

阶段一已经完成发布与消费链路，阶段二已经完成 `ConfigProvider + Design Token + CSS Variables` 主题闭环。阶段三路线图要求统一组件目录结构、公共 API、类型导出、Storybook 示例和测试文件，并优先关注 `Table`、`Form`、`Upload`。

本次审计确认：

1. 三个组件都已经是公开包入口，分别对应 `creamdesign-lib/table`、`creamdesign-lib/form` 和 `creamdesign-lib/upload`。
2. 任意公共 API、组件入口或导出调整都属于发布敏感改动，需要运行组件测试和真实消费 smoke。
3. 当前组件已有不少业务能力，但通用 props、类型边界、可访问性和文档结构仍不一致。

## 非目标

本轮不做以下事情：

1. 不重写 Table 分页、虚拟滚动或行选择逻辑。
2. 不实现 Table 排序、筛选、固定列、加载态等阶段四专项能力。
3. 不实现 Form 动态列表、嵌套字段、滚动到错误字段等高级能力。
4. 不重写 Upload 大文件分片、秒传、断点续传 hook。
5. 不新增生产依赖。
6. 不修改包名、子路径命名或构建产物目录结构。

## 改造原则

### 保持发布契约稳定

`Table`、`Form`、`Upload` 的根导入和小写子路径导入必须继续可用。新增公共类型时，应通过组件入口和根入口导出；修改公开 props 时要兼容已有写法。

### 先补通用 API，再做复杂能力

复杂组件优先统一以下通用能力：

1. `className` 和 `style` 透传到根节点。
2. 需要禁用交互时提供 `disabled`。
3. 数据驱动组件保留泛型能力，避免扩大 `any` 使用范围。
4. 需要命令式控制时明确 ref 暴露的是 DOM 还是组件实例 API。
5. 错误、禁用、上传中、校验失败等状态应尽量映射到 DOM 状态或 ARIA 属性。

### Storybook 面向消费场景

Storybook 示例应从“开发调试”调整为“业务接入说明”。复杂组件至少覆盖基础场景、受控/非受控场景、错误或空状态、主题场景和高价值复杂场景。

### 测试覆盖公共行为

测试优先覆盖公开 API 和用户可观察行为。快照可以保留，但不能替代交互、回调、可访问状态和类型消费 smoke。

## 组件审计结论

### Table

当前能力：

1. 支持泛型 `TableProps<T>`、`ColumnType<T>`。
2. 支持 dataIndex 字符串和路径数组。
3. 支持分页、受控和非受控分页参数。
4. 支持虚拟滚动和行选择。
5. 已有较多行为测试，覆盖渲染、dataIndex、render、对齐、列宽、checkbox/radio 行选择。
6. 已完成 `TableToken` 第一版主题化。

主要问题：

1. `TableProps` 缺少 `className`、`style` 和 `rowKey`。
2. 行选择逻辑默认读取 `record.key`，对无 `key` 数据不够明确。
3. `packages/components/src/Table/index.tsx` 保留大量早期注释，不适合作为公共入口。
4. 空数据当前只是空 `tbody`，缺少明确空态 API 和文档。
5. 根容器 ref 与虚拟滚动内部 ref 边界不够清楚。
6. Storybook 分类仍偏早期调试命名，缺少按中后台消费场景组织的说明。

第一轮 Table 改造建议：

1. 为 `TableProps<T>` 设计 `className?: string`、`style?: React.CSSProperties`、`rowKey?: keyof T | ((record: T) => string | number)`。
2. 保持默认 `rowKey` 为 `key`，避免破坏现有数据。
3. 所有选择状态、虚拟滚动和分页内部取 key 的逻辑统一走 `getRowKey`。
4. 清理 `Table/index.tsx` 的旧注释，只保留公共导出。
5. 补充空态行为设计，第一轮可先定义 `emptyText?: React.ReactNode`，默认展示空状态文案。
6. 补 Storybook：基础表格、rowKey、行选择、分页、虚拟滚动、空数据、企业主题。
7. 补测试：`rowKey` 函数、`className/style`、空态、无 key 数据选择。

### Form

当前能力：

1. 支持 `Form` + `FormItem` 语义化结构。
2. 支持 `initialValues`、`onFinish`、`onFinishFailed`。
3. 支持 render props 读取 `FormState`。
4. 通过 ref 暴露 `resetFields`、`validateAllFields`、`getAllFields`、`setFieldValue` 等命令式 API。
5. 使用 `async-validator` 支持同步和异步校验。
6. Storybook 已覆盖基础表单、必填、错误、ref、多输入类型和复杂校验。

主要问题：

1. `FormProps.className` 已声明但没有应用到 `<form>`。
2. `FormItemProps.labelWidth` 和 `controlWidth` 已声明但当前没有落到样式。
3. `FormProps`、`FieldDetail` 和 store API 使用较多 `Record<string, any>`，类型边界需要逐步收紧。
4. `FormRefType` 是命令式表单 API，不是 DOM ref，文档需要明确。
5. `FormItem` 单子元素约束只通过 `console.warn` 表达，错误路径不清晰。
6. 错误信息缺少稳定 `aria-invalid`、`aria-describedby` 等可访问性映射。
7. `required` 主要影响视觉标记，校验仍依赖 `rules`，两者关系需要写清楚。

第一轮 Form 改造建议：

1. 修复 `className` 透传，根节点 class 合并为 `cream-form` + 用户 class。
2. 让 `labelWidth` 和 `controlWidth` 通过 CSS 变量或 inline style 作用到当前 FormItem。
3. 明确并导出 `FormInstance` 类型，保留 `FormRefType` 作为兼容别名。
4. 为错误态子控件注入 `aria-invalid`，错误文案提供稳定 id 并通过 `aria-describedby` 关联。
5. 文档说明 `required` 不自动生成校验规则；需要校验时仍使用 `rules`。
6. 补测试：`className/style`、`labelWidth/controlWidth`、ref API、错误态 ARIA、`required` 视觉与 rules 行为边界。
7. Storybook 调整为基础提交、校验失败、命令式 API、多输入类型、布局宽度、企业主题。

### Upload

当前能力：

1. 支持普通上传、拖拽上传、多选、`beforeUpload`、进度、成功、失败、删除回调。
2. 支持大文件上传配置，包括分片、阈值、并发、重试、断点续传和 hash 进度。
3. 通过 adapter 暴露大文件上传适配层，入口已导出 `UploadAdapter`、`UploadControl`、`UploadState` 和 `ProgressInfo`。
4. 通过 ref 暴露 `pause`、`resume`、`cancel`、`getControl`、`getProgress`、`getFileList`。
5. 测试覆盖普通上传成功/失败/进度、`beforeUpload`、删除、拖拽上传。

主要问题：

1. `UploadProps` 缺少 `className`、`style` 和 `disabled`。
2. 根节点硬编码 `style={{ margin: '20px' }}`，不适合作为组件库默认样式。
3. `action` 标记为必填，但使用自定义 adapter 时并不一定需要真实 URL。
4. 默认 `enableLargeFileUpload = true`，但普通上传测试和基础 Storybook 经常需要显式禁用，默认值需要在文档中解释或后续重新评估。
5. 拖拽区是 `div`，需要键盘触发和 disabled 语义。
6. 删除按钮缺少明确可访问名称，hover 才显式表达删除意图。
7. `onChange` 只回传 `File`，无法直接反映完整文件列表和状态；第一轮不改破坏性签名，但需要记录后续演进方向。

第一轮 Upload 改造建议：

1. 增加 `className?: string`、`style?: React.CSSProperties`、`disabled?: boolean`。
2. 移除根节点固定 margin，把间距交给消费端或 Storybook 包裹容器。
3. disabled 时禁止点击选择、拖拽 drop 和删除操作，并同步 `aria-disabled`。
4. 当提供 adapter 时允许 `action` 只作为兼容字段保留；第一轮可以先文档化，不立即改成可选。
5. 为拖拽区补键盘 Enter/Space 触发文件选择。
6. 为删除按钮补 `aria-label`，上传中按钮保持 disabled。
7. 补测试：`className/style`、disabled 阻止选择和 drop、删除按钮可访问名称、大文件 adapter 类型导出 smoke。
8. Storybook 调整为普通上传、拖拽上传、大文件 mock adapter、自定义分片配置、禁用态。

## 第一轮实现顺序

建议按以下顺序实施：

1. `Form` 规范修复。
   - 风险较低，能快速建立通用 props、布局 props、ARIA 和 ref API 的规范样板。

2. `Upload` 规范修复。
   - 保留现有上传流程，只处理根节点 API、disabled、可访问性和 Storybook。

3. `Table` `rowKey` 和空态设计落地。
   - Table 内部状态面最大，最后处理，改动前先补测试保护现有分页、选择和虚拟滚动行为。

## 验收标准

### 代码与 API

1. 三个组件的公共 props 从组件入口和根入口可导入。
2. 根导入与子路径导入继续有效。
3. `className` 和 `style` 在三个组件上行为一致。
4. `Form` 的命令式 API 类型有明确导出。
5. `Upload` 的 adapter 类型继续可从子路径和根入口消费。
6. `Table` 默认仍兼容 `record.key`。

### Storybook

1. `Table`、`Form`、`Upload` 的示例标题和场景按业务消费方式组织。
2. 每个组件至少有基础、异常或空状态、复杂能力和企业主题相关示例。
3. 示例不依赖真实后端即可展示主要交互。

### 测试

1. 每个组件补充对应通用 props 和关键行为测试。
2. 可访问性相关状态有 DOM 断言。
3. 发布敏感改动运行真实消费 smoke。

建议命令：

```bash
pnpm test
pnpm smoke:components
pnpm build-storybook
```

如果只完成单个组件的第一步改造，可先运行对应组件测试，再在合并前运行完整门禁。

## 风险与控制

1. `Table` 使用 `rowKey` 会影响选择、虚拟列表和分页后的当前页选择，必须测试受控和非受控选择。
2. `FormItem` 注入 ARIA 属性时要保留子元素原有 props，不能覆盖用户传入的事件处理器。
3. `Upload` disabled 需要同时覆盖点击、键盘、拖拽和删除，不应只禁用 input。
4. Storybook 示例调整不应引入真实网络依赖；大文件上传继续使用 mock adapter。
5. 修改入口或公共类型后必须运行 smoke，避免发布后类型路径失效。

## 后续专项入口

完成规范基线后，再进入专项能力：

1. Table 专项：排序、筛选、固定列、加载态、错误态和性能基准。
2. Form 专项：动态字段、嵌套字段、字段依赖、滚动到错误字段。
3. Upload 专项：更完整的文件状态机、列表受控模式、失败重试 UI、暂停恢复 UI 和 adapter 接入指南。
