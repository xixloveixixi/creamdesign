---
name: component-review
description: 审查或修改 CreamDesign React 组件时使用，关注 API 一致性、类型安全、样式、可访问性、Storybook 覆盖和测试。适用于 packages/components/src 下的组件文件或组件质量评估。
---

# 组件审查

审查或修改 CreamDesign 组件时使用这个流程。

## 适用范围

适用于 `packages/components/src` 下的公共组件。

不要用它处理包发布、Rollup 配置或 npm 导出校验。发布敏感改动请使用 `$release-smoke`。

## 审查清单

1. 确认组件入口文件。
   - 实现文件。
   - 组件 `index.ts` 或 `index.tsx`。
   - 公共组件需要在 `packages/components/src/index.tsx` 中导出。
   - Storybook 示例。
   - 测试文件。
   - SCSS 或基于 token 的样式文件。

2. 检查公共 API 一致性。
   - 公共 props 已导出。
   - 命名符合现有组件约定。
   - 存在 `className`、`style`、`children`、`disabled`、`size` 和状态类 props 时，其行为应与其他组件一致。
   - 受控与非受控行为需要明确。
   - 当消费者需要 DOM 或命令式访问时，应支持 ref 转发。

3. 检查类型。
   - 公共 API 避免使用宽泛的 `any`。
   - Table、Form 等数据驱动组件优先使用泛型。
   - 可复用的公共类型应从组件入口导出。

4. 检查样式。
   - class 名应稳定，并限制在组件作用域内。
   - 除非属于设计系统，否则不要引入全局样式。
   - 新增可主题化样式时，优先使用 design token 或 CSS variables。

5. 检查可访问性。
   - 交互元素需要使用语义化元素或 ARIA。
   - 纯图标控件需要可访问名称。
   - loading、disabled、invalid、error 等状态应尽量反映到 DOM 状态中。
   - 键盘行为应符合常见 Web 预期。

6. 检查示例和测试。
   - Storybook 应覆盖默认、禁用、加载、错误、空状态等相关场景。
   - 测试应覆盖本次任务改变的行为。
   - 对有意义的交互行为，避免只有快照测试。

## 输出格式

做审查时，先输出问题，按严重程度排序，并附上文件引用。

做实现时，保持改动聚焦，并运行最小相关测试。如果因为依赖缺失无法运行测试，需要明确说明。
