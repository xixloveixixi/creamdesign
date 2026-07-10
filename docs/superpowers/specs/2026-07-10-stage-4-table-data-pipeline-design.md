# 阶段四 Table 本地数据管线设计

## 目标

阶段四第一轮先把 `Table` 从“可展示数据”推进到“能处理常见中后台列表数据”。本轮只做本地非受控数据能力，覆盖加载态、空态、单列排序、基础筛选，以及它们和分页、行选择、虚拟滚动的组合关系。

本轮完成后，`Table` 应支持以下数据处理顺序：

```text
dataSource -> filters -> sorter -> pagination -> render
```

这条顺序是本设计的核心契约。筛选和排序作用于完整 `dataSource`，分页只消费处理后的结果。

## 背景

阶段三已经完成 `Table` 公共 API 基线：

1. `className` 和 `style` 可透传到根容器。
2. `rowKey` 已统一选择、分页和普通渲染中的行 key 读取。
3. `emptyText` 已提供默认空态和自定义空态入口。
4. 根入口和 `creamdesign-lib/table` 子路径导入已通过真实消费 smoke。

阶段四路线图要求 `Table` 支持排序、筛选、分页、行选择、虚拟滚动、复杂状态和性能优化。本轮不追求完整成熟表格协议，而是先把本地数据处理管线跑通，并用测试保护和现有能力的组合关系。

## 非目标

本轮不做以下事情：

1. 不做受控排序、受控筛选或服务端表格模式。
2. 不设计完整 `onChange(pagination, filters, sorter, extra)` 协议。
3. 不实现固定列、固定表头、横向滚动增强。
4. 不做 1 万行性能基准和渲染性能专项优化。
5. 不引入新的生产依赖。
6. 不改变现有 `rowSelection`、`pagination`、`virtual` 的公开 API。

这些能力会作为后续 Table 专项继续推进。

## API 设计

### 排序类型

```ts
export type TableSortOrder = 'ascend' | 'descend' | null;

export interface TableSorterState {
  columnKey: string;
  order: Exclude<TableSortOrder, null>;
}
```

排序只允许单列生效。没有排序时内部状态为 `null`。

### 筛选类型

```ts
export type TableFilterValue = string | number | boolean;

export interface TableFilterOption {
  text: React.ReactNode;
  value: TableFilterValue;
}

export type TableFilterState = Record<string, TableFilterValue[]>;
```

筛选按列 key 存储。某列没有选中值时，从状态中删除该列，避免空数组和未设置状态产生两种语义。

### ColumnType 扩展

```ts
export interface ColumnType<T = any> {
  sorter?: (a: T, b: T) => number;
  defaultSortOrder?: Exclude<TableSortOrder, null>;
  filters?: TableFilterOption[];
  defaultFilteredValue?: TableFilterValue[];
  onFilter?: (value: TableFilterValue, record: T) => boolean;
}
```

设计约束：

1. `sorter` 只接收比较函数，不接收 `true`，避免本轮引入默认比较规则的不确定性。
2. `defaultSortOrder` 只在初始化时读取，后续列配置变化不主动重置用户操作。
3. `filters` 只负责声明可选项；真正过滤逻辑由 `onFilter` 提供。
4. 提供 `filters` 但没有 `onFilter` 时，筛选 UI 不渲染为可交互状态，避免用户以为筛选已经生效。

### TableProps 扩展

```ts
export interface TableProps<T = any> {
  loading?: boolean;
  loadingText?: React.ReactNode;
}
```

`loading` 不清空表格数据。已有数据会保留，表格根容器进入加载态并显示加载提示。`loadingText` 默认使用 `加载中...`。

## 交互设计

### 排序

带 `sorter` 的列标题展示排序触发区。点击触发区时，排序状态按以下顺序循环：

```text
无排序 -> ascend -> descend -> 无排序
```

排序只对当前列生效。点击另一列时，旧列排序失效，新列从 `ascend` 开始。

表头通过 `aria-sort` 表达当前排序状态：

1. `ascend` 映射为 `ascending`。
2. `descend` 映射为 `descending`。
3. 未排序映射为 `none`。

### 筛选

带 `filters` 和 `onFilter` 的列标题展示筛选触发按钮。点击后在表头附近展开一个轻量筛选面板。

筛选面板行为：

1. 多选 checkbox，点击选项立即更新过滤结果。
2. 有选中值时，筛选按钮进入 active 状态。
3. 面板提供“清空”动作，清除当前列筛选值。
4. 面板不做复杂定位系统，只在表头单元格内部使用绝对定位，后续再评估 Popover 组件复用。

本轮筛选不做确认按钮。原因是本地小数据过滤反馈即时，交互更直接；服务端筛选和批量确认留给后续受控协议。

### 加载态

`loading=true` 时：

1. 根容器增加 `cream-table-container-loading` class。
2. 表格结构保留，当前数据、空态或分页都不被卸载。
3. 容器内展示加载覆盖层，内容为 `loadingText`。
4. 排序、筛选和行选择交互在加载态下不触发，避免用户在异步状态下制造中间状态。

### 空态

空态继续使用 `emptyText`。如果筛选后没有数据，也展示同一个空态单元格。后续如果要区分“原始无数据”和“筛选无结果”，再新增 `filterEmptyText`，本轮不扩大 API。

## 数据流

`TableContainer` 继续作为本轮状态聚合点，新增内部状态：

1. `sorterState: TableSorterState | null`
2. `filterState: TableFilterState`

派生数据使用 `useMemo` 计算：

```text
sourceData = dataSource ?? []
filteredData = applyFilters(sourceData, filterState, columns)
sortedData = applySorter(filteredData, sorterState, columns)
displayData = sortedData
paginatedData = paginate(displayData, pagination)
```

`tableData` 语义调整为“筛选排序后的完整数据”，用于 `total` 和分页。原始数据只作为输入，不传给渲染层。

分页的 `total` 使用 `displayData.length`。当筛选后当前页超过最大页时，内部分页状态回到第一页。

## 组件边界

### TableContainer

负责：

1. 初始化默认排序和默认筛选。
2. 维护非受控 `sorterState` 和 `filterState`。
3. 计算处理后的数据和分页数据。
4. 把排序、筛选状态和操作函数通过 context 提供给表头。
5. 在加载态下阻止排序、筛选、行选择动作。

### TableHeader

负责：

1. 渲染排序按钮和当前方向。
2. 渲染筛选按钮、筛选选项和清空动作。
3. 添加 `aria-sort`、`aria-label`、`aria-expanded` 等可访问属性。
4. 不直接处理数据，只调用 context 中的操作函数。

### TableBody

保持当前职责：

1. 渲染普通数据行。
2. 渲染空态行。
3. 根据 context 中的 `paginatedData` 展示处理后的当前页。

### TableFoot

继续消费处理后的 `total` 和分页数据。本轮不修改分页组件 API。

## 兼容性

1. 没有 `sorter` 和 `filters` 的列行为不变。
2. `pagination={false}` 时渲染完整处理后数据。
3. `rowSelection` 仍只对当前页全选，这和现有行为一致。
4. `virtual` 消费处理后的当前页数据，不额外处理全量虚拟滚动语义。
5. 根导入和子路径导入继续导出新增类型。

## 性能原则

1. 过滤和排序放在 `useMemo` 内，依赖只包含 `dataSource`、`columns`、`filterState` 和 `sorterState`。
2. 排序时不原地修改输入数组，使用浅拷贝后排序。
3. 筛选遍历时只处理 active filters，避免无筛选状态下多余循环。
4. 不在 render 中创建内部组件，筛选面板和排序按钮逻辑保持在稳定组件函数内。
5. 这轮不承诺大数据性能，只保证没有明显的重复计算和输入数据突变。

## 测试计划

组件测试覆盖：

1. 点击可排序列后按升序渲染。
2. 再次点击后按降序渲染。
3. 第三次点击取消排序并恢复原始顺序。
4. 单列筛选后只展示符合条件的数据。
5. 多选筛选后展示所有匹配任一值的数据。
6. 清空筛选后恢复全部数据。
7. 筛选和排序先于分页生效。
8. 筛选后分页 total 使用处理后的数据量。
9. `loading=true` 展示加载提示且保留表格结构。
10. 加载态下排序、筛选、行选择不会改变当前状态。
11. 行选择全选只作用于筛选和分页后的当前页。
12. `defaultSortOrder` 和 `defaultFilteredValue` 初始化生效。

发布敏感验证：

```bash
pnpm test
pnpm smoke:components
pnpm build-storybook
```

合并前运行：

```bash
pnpm release:check
```

## Storybook 计划

新增或调整以下示例：

1. `SortableTable`：展示年龄或金额列排序。
2. `FilterableTable`：展示状态、城市等基础筛选。
3. `TableDataPipeline`：展示筛选、排序、分页组合。
4. `LoadingTable`：展示保留数据的加载态。
5. `EnterpriseTable`：保留企业主题示例，并补充排序筛选状态下的视觉表现。

示例继续使用本地数据和 mock 数据，不依赖真实后端。

## 风险与控制

1. 排序和筛选会改变 `paginatedData` 来源，必须保护分页、选择和虚拟滚动现有行为。
2. `columns` 是数组依赖，如果消费端每次 render 都重新创建列配置，`useMemo` 会重新计算。本轮接受这个成本，文档示例中保持列配置稳定。
3. 筛选面板如果放在 `th` 内，可能受 `overflow: hidden` 影响。实现时需要调整表头内容结构或针对可筛选列放宽 overflow。
4. 加载态阻止交互需要覆盖排序、筛选和行选择，不能只禁用视觉按钮。
5. 默认排序和默认筛选只初始化一次，后续如果业务需要外部重置，应进入受控协议设计。

## 简历表达

本轮完成后可以写成：

> 参与建设 React 企业级组件库 CreamDesign 的复杂 Table 组件，设计本地数据处理管线，支持筛选、排序、分页、空态和加载态组合使用；通过 TypeScript 泛型约束列配置与数据源类型，并补充 Storybook 示例、单元测试和真实消费 smoke 校验，保障组件 API 可发布和业务接入稳定性。

更偏技术实现的表述：

> 为组件库 Table 组件实现 filter -> sort -> paginate 的本地数据处理流程，支持列级 sorter、filters/onFilter、loading 与 empty state，并保持 rowSelection、pagination、virtual scroll 等既有能力兼容；补齐交互测试和文档示例，降低复杂表格能力演进中的回归风险。

## 后续演进

1. 补受控排序、受控筛选和统一 `onChange`。
2. 设计服务端分页、排序、筛选模式。
3. 增加固定列、固定表头和横向滚动。
4. 增加错误态和重试入口。
5. 建立 1 万行虚拟滚动性能基准。
