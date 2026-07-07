# CreamDesign

CreamDesign 是一个面向中后台场景的 React 组件库，基于 TypeScript、SCSS、Rollup 和 Storybook 构建。当前项目重点放在组件包的可发布性、按需引入、主题配置、测试覆盖和真实消费校验上。

## 特性

- React 19 + TypeScript 组件实现。
- 支持 ESM、CJS、类型声明和样式产物。
- 支持根入口导入和小写子路径按需导入。
- 内置 `ConfigProvider`，支持运行时主题 token 覆盖。
- 使用 Storybook 维护组件示例和文档站。
- 提供测试、构建、包结构 smoke 和真实消费 smoke 校验。

## 环境要求

- Node.js 22，CI 当前使用 Node 22。
- pnpm 11.7.0，版本由根目录 `packageManager` 字段声明。
- React 和 React DOM 由业务项目作为 peer dependency 提供。

## 安装

```bash
pnpm add creamdesign-lib react react-dom
```

如果在当前 monorepo 内开发，先安装依赖：

```bash
pnpm install
```

## 基础使用

在应用入口引入组件库样式：

```tsx
import 'creamdesign-lib/style';
```

使用根入口导入组件：

```tsx
import { Button, Table, Message } from 'creamdesign-lib';

export function App() {
  return (
    <>
      <Button btnType="primary">提交</Button>
      <Table
        columns={[
          {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
          },
        ]}
        dataSource={[{ key: '1', name: 'Ada' }]}
      />
    </>
  );
}

Message.success('保存成功');
```

使用小写子路径按需导入：

```tsx
import Button from 'creamdesign-lib/button';
import { Message } from 'creamdesign-lib/message';
import ConfigProvider from 'creamdesign-lib/config-provider';
```

当前公开子路径包括：

```text
creamdesign-lib/button
creamdesign-lib/config-provider
creamdesign-lib/menu
creamdesign-lib/table
creamdesign-lib/form
creamdesign-lib/input
creamdesign-lib/progress
creamdesign-lib/pagination
creamdesign-lib/upload
creamdesign-lib/icon
creamdesign-lib/card
creamdesign-lib/timeline
creamdesign-lib/tag
creamdesign-lib/message
creamdesign-lib/style
```

## 主题配置

`ConfigProvider` 支持全局 token 和组件级 token 覆盖，并会输出对应的 CSS Variables。

```tsx
import { Button, ConfigProvider } from 'creamdesign-lib';
import 'creamdesign-lib/style';

export function ThemedApp() {
  return (
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
  );
}
```

主题相关工具也可以直接从根入口导入：

```tsx
import {
  defaultTheme,
  enterpriseTheme,
  mergeTheme,
  themeToCSSVariables,
} from 'creamdesign-lib';

const cssVariables = themeToCSSVariables(
  mergeTheme({
    token: {
      colorPrimary: '#7c3aed',
    },
  })
);
```

`enterpriseTheme` 是内置的中后台主题示例，用于验证组件是否能通过 token 统一换肤：

```tsx
import {
  Button,
  ConfigProvider,
  Input,
  enterpriseTheme,
} from 'creamdesign-lib';
import 'creamdesign-lib/style';

export function EnterpriseApp() {
  return (
    <ConfigProvider theme={enterpriseTheme}>
      <Input placeholder="搜索项目" />
      <Button btnType="primary">提交</Button>
    </ConfigProvider>
  );
}
```

`Table` 支持第一版组件级 token，用于覆盖表头、行背景、选中态和单元格边框等视觉表面：

```tsx
<ConfigProvider
  theme={{
    components: {
      Table: {
        headerBg: '#f8fafc',
        headerColor: '#111827',
        rowHoverBg: '#eff6ff',
        rowSelectedBorderColor: '#2563eb',
        cellPadding: '0.75rem 1rem',
      },
    },
  }}
>
  <Table columns={columns} dataSource={data} />
</ConfigProvider>
```

## 组件列表

- 通用：`Button`、`Icon`
- 数据录入：`Input`、`Form`、`Upload`
- 数据展示：`Table`、`Card`、`Tag`、`Timeline`、`Progress`
- 反馈：`Message`
- 导航：`Menu`、`Pagination`
- 配置：`ConfigProvider`

## 项目结构

```text
creamdesign/
  packages/components/   # 组件库源码、测试和构建配置
  packages/docs-site/    # Storybook 文档站
  docs/plans/            # 改造计划和设计文档
```

## 常用命令

```bash
pnpm test
pnpm build:components
pnpm smoke:components
pnpm release:check
pnpm storybook
pnpm build-storybook
pnpm lint
```

命令说明：

- `pnpm test`：运行组件测试。
- `pnpm build:components`：构建组件包，并执行包结构 smoke 校验。
- `pnpm smoke:components`：构建组件包后，在临时消费项目中验证 ESM、CJS、类型和样式导入。
- `pnpm release:check`：发布前统一门禁，依次运行测试、真实消费 smoke 和 Storybook 构建。
- `pnpm storybook`：启动本地 Storybook 文档站。
- `pnpm build-storybook`：构建 Storybook 静态站点。
- `pnpm lint`：运行 ESLint。

## 发布前校验

修改公共导出、构建配置、样式入口、主题入口、组件入口或 Storybook 文档后，运行：

```bash
pnpm release:check
```

其中 `pnpm smoke:components` 会先构建组件包，再用 `pnpm pack` 产出 tarball，并在临时消费项目中验证：

- 根入口 ESM/CJS 导入。
- 全部公开子路径 ESM/CJS 导入。
- TypeScript 类型解析。
- `creamdesign-lib/style` 样式入口解析。
- 主题工具和关键运行时导出。

`packages/components/dist` 和 `packages/docs-site/storybook-static` 是生成产物，不应作为源码维护。

## 改造路线

详细路线图见 [docs/plans/2026-06-30-creamdesign-upgrade-roadmap.md](docs/plans/2026-06-30-creamdesign-upgrade-roadmap.md)。当前优先级是稳定发布与构建体系，然后继续推进主题系统、组件 API 统一、复杂组件能力和 Storybook 文档完善。
