# 阶段二主题 Token 收口设计

## 目标

在暂不开 PR 的前提下，把阶段二主题系统的验收范围补完整，再统一合并回 `main`。

这次收口需要证明 CreamDesign 已经具备可用的 `ConfigProvider + Design Token + CSS Variables` 主题链路，包括第二套内置主题和可查阅的使用示例，同时避免把范围扩大成复杂组件重构。

## 范围

1. 新增第二套内置主题 `enterpriseTheme`。
   - 定位为克制的中后台专业主题。
   - 从 `ConfigProvider` 和根入口导出。
   - 继续使用现有 `ThemeConfig` 结构，不新增主题 API。

2. 保持 token 分层克制。
   - 共享设计语义继续优先使用 global token 和 semantic token。
   - 当前仍只保留 `ButtonToken` 作为组件级 token。
   - 不新增 `InputToken`、`MessageToken`、`TagToken`、`CardToken` 或 `ProgressToken`。

3. 补齐示例和文档。
   - 新增展示 `enterpriseTheme` 的 Storybook 示例。
   - 更新 README，让使用者能看到默认主题、`enterpriseTheme` 和 Button 组件级 token 覆盖方式。

4. 避免在本次收口里迁移高风险组件。
   - 本次不迁移 `Table`、`Form` 或 `Upload`。
   - 这些组件内部状态和布局面更大，需要独立设计和验证。

## 数据流

`enterpriseTheme` 是一个 `ThemeConfig`。使用者通过现有 `theme` prop 把它传给 `ConfigProvider`。

`ConfigProvider` 使用 `mergeTheme` 解析主题，通过 `themeToCSSVariables` 输出 CSS Variables，并通过 React context 提供解析后的主题。`Message` 这类 portal 组件继续依赖全局主题 CSS Variables 同步。

## 测试

1. 单测覆盖 `enterpriseTheme` 的 CSS Variables 输出，以及 Button 组件级 token 覆盖行为。
2. Storybook 构建验证文档示例可以编译。
3. 组件包 smoke 验证构建后的公共导出可以被消费端使用。

必须运行：

```bash
pnpm test
pnpm smoke:components
pnpm build-storybook
```

## 不在本次范围

1. 创建 PR。
2. 暗色主题支持。
3. 新增 `ButtonToken` 之外的组件级 token 类型。
4. 完整迁移 `Table`、`Form`、`Upload` 这类复杂组件。
