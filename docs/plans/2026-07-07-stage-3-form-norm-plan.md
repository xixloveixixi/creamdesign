# 阶段三 Form 规范修复实施计划

## 目标

落实阶段三组件体系规范基线的第一批实现任务，先从 `Form` 开始修复低风险但高价值的不一致点：

1. `className` 透传到 `<form>` 根节点。
2. `FormItem` 的 `labelWidth` 和 `controlWidth` 实际作用到布局。
3. 明确导出命令式表单实例类型 `FormInstance`，保留 `FormRefType` 兼容别名。
4. 为校验失败状态补充 `aria-invalid` 和 `aria-describedby`。
5. 补充测试与 Storybook 示例，说明 `required` 与 `rules` 的边界。

本计划不改变 Form 的字段注册、校验、提交、重置等核心行为。

## 修改范围

预计涉及文件：

1. `packages/components/src/Form/Form.tsx`
2. `packages/components/src/Form/FormItem.tsx`
3. `packages/components/src/Form/Form.scss`
4. `packages/components/src/Form/index.tsx`
5. `packages/components/src/index.tsx`
6. `packages/components/src/Form/Form.test.tsx`
7. `packages/components/src/Form/Form.stories.tsx`

如果只新增类型导出而入口已自动转发，不额外修改 Rollup 或 `package.json`。

## 实施步骤

### 1. 修复 Form 根节点 className

当前 `FormProps.className` 已声明但没有应用。

实现要求：

1. 引入或复用 `classnames`。
2. 根 `<form>` class 合并为 `cream-form` 和用户传入的 `className`。
3. 保持 `style` 继续透传。
4. 不改变 `name`、`initialValues`、`onFinish`、`onFinishFailed` 行为。

测试要求：

1. 渲染 `<Form className="custom-form" style={{ width: 320 }} />`。
2. 断言根 `<form>` 同时包含 `cream-form` 和 `custom-form`。
3. 断言 style 仍生效。

### 2. 明确 FormInstance 类型

当前 `FormRefType` 已经暴露命令式 API，但命名不够直接。

实现要求：

1. 新增 `export type FormInstance = ...`，类型内容与当前 `FormRefType` 保持一致。
2. 将 `FormRefType` 改为 `FormInstance` 的兼容别名。
3. `Form` 的 `forwardRef` 泛型使用 `FormInstance`。
4. `packages/components/src/Form/index.tsx` 导出 `FormInstance`。
5. 根入口 `packages/components/src/index.tsx` 导出 `FormInstance` 和 `FormRefType`。

测试要求：

1. 保持现有 ref 测试和 Storybook ref 示例可编译。
2. 后续 smoke 会验证根入口类型导出。

### 3. 落地 FormItem 布局宽度 props

当前 `labelWidth` 和 `controlWidth` 已声明但未使用。

实现要求：

1. `labelWidth` 应作用于 label 容器。
2. `controlWidth` 应作用于控件容器。
3. 优先使用 CSS 变量，例如：
   - `--cream-form-label-width`
   - `--cream-form-control-width`
4. 默认值保持现有 30% / 70% 布局。
5. 移动端垂直布局不应被自定义宽度破坏，移动端仍保持 100% 宽度。

测试要求：

1. 渲染 `labelWidth="40%"`、`controlWidth="60%"`。
2. 断言对应元素的 inline style 或 CSS variable 存在。
3. 不要求在 jsdom 中验证媒体查询。

### 4. 补充错误态可访问性

当前错误文案有 DOM 展示，但输入控件没有稳定关联。

实现要求：

1. 当当前字段有校验错误或外部 `error` 文案时，克隆的子控件应带 `aria-invalid="true"`。
2. 错误文案元素应有稳定 id，例如 `cream-form-item-${name}-error`。
3. 子控件应通过 `aria-describedby` 指向错误文案 id。
4. 如果用户已经传入 `aria-describedby`，应与错误 id 合并，不覆盖用户值。
5. 没有错误时不强制注入 `aria-invalid="false"`，避免 DOM 噪声。
6. 保留子控件原有事件处理器和 props。

测试要求：

1. 触发必填校验失败后，断言输入框 `aria-invalid="true"`。
2. 断言 `aria-describedby` 指向错误元素 id。
3. 断言错误元素文案正确。

### 5. 澄清 required 与 rules 边界

当前 `required` 主要影响视觉必填标记，不自动生成校验规则。

实现要求：

1. 不改变 `required` 行为，避免引入隐式校验破坏兼容性。
2. 在 Storybook 中增加或调整示例文案与代码结构，让 `required` + `rules` 的关系清楚。
3. 可在注释中说明：校验请使用 `rules`，`required` 只控制视觉标记。

测试要求：

1. 渲染 `required` 但不传 `rules` 的字段。
2. 提交表单时不应因为 `required` 自动失败。
3. 渲染 `required` 且传必填 `rules` 的字段，提交或 blur 后应失败。

### 6. Storybook 场景整理

本轮只做 Form 的最小文档收敛，不重写整个 Storybook。

建议保留或调整以下场景：

1. `BasicForm`：基础提交和校验。
2. `RequiredForm`：说明 `required` 标记与 `rules` 校验。
3. `ErrorForm`：外部错误文案。
4. `CustomWidthForm`：`labelWidth` / `controlWidth` 生效。
5. `FormWithRef`：`FormInstance` 命令式 API。
6. `MultipleInputTypesForm`：不同 `valuePropsName`、`trigger`、`getValueFormEvent`。
7. `ComplexValidationForm`：异步或跨字段校验。

不要求本轮重命名所有 Storybook title，但可以把示例说明从调试语气调整为业务消费语气。

## 验证命令

最小验证：

```bash
pnpm --filter creamdesign-lib test -- Form.test.tsx
```

如果脚本不支持按文件参数，则运行：

```bash
pnpm --filter creamdesign-lib test
```

发布敏感验证：

```bash
pnpm smoke:components
```

合并前完整门禁：

```bash
pnpm release:check
```

如果 pnpm 在沙箱中触发依赖状态检查失败，可使用 `CI=true` 复跑同一命令。

## 验收标准

1. `Form` 根节点支持 `className` 和 `style`。
2. `FormItem` 的 `labelWidth` 和 `controlWidth` 可以被消费端观察到。
3. `FormInstance` 和 `FormRefType` 都可以从根入口和 form 子路径导入类型。
4. 校验失败输入框带 `aria-invalid` 和正确的 `aria-describedby`。
5. `required` 不产生隐式校验，这一点有测试保护。
6. 现有 Form 提交、校验、重置、render props 和自定义规则测试继续通过。

## 风险控制

1. 不修改 `useStore` 的 reducer 数据结构。
2. 不修改 `onFinish` / `onFinishFailed` 回调参数。
3. 不改变 `validateTrigger` 默认值。
4. 不改变 `getValueFormEvent` 默认行为。
5. 不把 `required` 自动转换为校验规则。
6. 不修改 `FormRefType` 的既有成员，只新增更清晰的别名。
