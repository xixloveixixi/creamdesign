import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Table from './index';
import { ColumnType, TableProps } from './index';

// ==================== 全局 Mock ====================
// jsdom 不支持 ResizeObserver，需要 Mock
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}
global.ResizeObserver = MockResizeObserver as any;

// 控制 requestAnimationFrame 同步执行（虚拟滚动使用）
global.requestAnimationFrame = (cb: FrameRequestCallback) => {
  cb(0);
  return 0;
};

// ==================== 测试数据 ====================
interface TestData {
  key: string;
  name: string;
  age: number;
  address: string;
}

const testData: TestData[] = [
  { key: '1', name: 'Alice', age: 30, address: 'New York' },
  { key: '2', name: 'Bob', age: 25, address: 'London' },
  { key: '3', name: 'Charlie', age: 35, address: 'Tokyo' },
];

const columns: ColumnType<TestData>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'age', title: 'Age', dataIndex: 'age' },
  { key: 'address', title: 'Address', dataIndex: 'address' },
];

type PipelineFilterValue = string | number | boolean;

interface PipelineFilterOption {
  text: React.ReactNode;
  value: PipelineFilterValue;
}

type PipelineSortOrder = 'ascend' | 'descend';

type PipelineColumnType<T = any> = ColumnType<T> & {
  sorter?: (a: T, b: T) => number;
  defaultSortOrder?: PipelineSortOrder;
  filters?: PipelineFilterOption[];
  defaultFilteredValue?: PipelineFilterValue[];
  onFilter?: (value: PipelineFilterValue, record: T) => boolean;
};

type PipelineTableProps<T extends Record<string, any>> = Omit<
  TableProps<T>,
  'columns'
> & {
  columns: PipelineColumnType<T>[];
  loading?: boolean;
  loadingText?: React.ReactNode;
};

const PipelineTable = Table as <T extends Record<string, any>>(
  props: PipelineTableProps<T>
) => React.ReactElement;

interface PipelineData {
  key: string;
  name: string;
  age: number;
  status: 'Active' | 'Paused' | 'Archived';
  city: string;
}

const pipelineData: PipelineData[] = [
  { key: '1', name: 'Alice', age: 30, status: 'Active', city: 'London' },
  { key: '2', name: 'Bob', age: 25, status: 'Paused', city: 'London' },
  { key: '3', name: 'Charlie', age: 35, status: 'Active', city: 'Tokyo' },
  { key: '4', name: 'Diana', age: 28, status: 'Archived', city: 'Berlin' },
  { key: '5', name: 'Ethan', age: 40, status: 'Active', city: 'Paris' },
  { key: '6', name: 'Fiona', age: 22, status: 'Paused', city: 'Tokyo' },
];

const pipelineColumns: PipelineColumnType<PipelineData>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    filters: [
      { text: 'Active', value: 'Active' },
      { text: 'Paused', value: 'Paused' },
      { text: 'Archived', value: 'Archived' },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    key: 'city',
    title: 'City',
    dataIndex: 'city',
    filters: [
      { text: 'London', value: 'London' },
      { text: 'Tokyo', value: 'Tokyo' },
      { text: 'Berlin', value: 'Berlin' },
      { text: 'Paris', value: 'Paris' },
    ],
    onFilter: (value, record) => record.city === value,
  },
];

const getBodyRows = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('tbody tr')).filter(
    row => !row.classList.contains('cream-table-empty-row')
  );

const getRenderedNames = (container: HTMLElement, nameCellIndex = 0) =>
  getBodyRows(container).map(row => {
    const cells = Array.from(row.querySelectorAll('td'));
    return cells[nameCellIndex]?.textContent?.trim() ?? '';
  });

const expectRenderedNames = (
  container: HTMLElement,
  expectedNames: string[],
  nameCellIndex = 0
) => {
  expect(getRenderedNames(container, nameCellIndex)).toEqual(expectedNames);
};

const getColumnHeader = (columnName: string) =>
  screen.getByRole('columnheader', {
    name: new RegExp(columnName, 'i'),
  });

const clickSortColumn = async (columnName: string) => {
  const header = getColumnHeader(columnName);
  const sortTrigger =
    within(header).queryByRole('button', {
      name: /sort|排序|升序|降序/i,
    }) ??
    (header.querySelector(
      '[aria-sort], [data-sorter], .cream-table-sorter'
    ) as HTMLElement | null) ??
    header;

  await userEvent.click(sortTrigger);
};

const queryFilterTrigger = (columnName: string) => {
  const header = getColumnHeader(columnName);
  return (
    within(header).queryByRole('button', {
      name: /filter|筛选/i,
    }) ??
    (header.querySelector(
      '[aria-haspopup], [aria-expanded], [data-filter-trigger], .cream-table-filter-trigger'
    ) as HTMLElement | null) ??
    within(header).queryByRole('button') ??
    header
  );
};

const openFilterPanel = async (columnName: string) => {
  const filterTrigger = queryFilterTrigger(columnName);
  expect(filterTrigger).toBeInTheDocument();
  await userEvent.click(filterTrigger);
};

const toggleFilterOption = async (columnName: string, optionName: string) => {
  let option = screen.queryByRole('checkbox', {
    name: new RegExp(optionName, 'i'),
  });

  if (!option) {
    await openFilterPanel(columnName);
    option = await screen.findByRole('checkbox', {
      name: new RegExp(optionName, 'i'),
    });
  }

  await userEvent.click(option);
};

const clickClearFilter = async () => {
  await userEvent.click(
    screen.getByRole('button', {
      name: /clear|清空/i,
    })
  );
};

const getSelectAllControl = (container: HTMLElement) =>
  screen.queryByRole('checkbox', {
    name: /select all|全选/i,
  }) ??
  (container.querySelector(
    'thead .cream-table-selection-column [title="全选"], thead .cream-table-selection-column input, thead .cream-table-selection-column button, thead .cream-table-selection-column div'
  ) as HTMLElement | null);

// ==================== 基础渲染 ====================
describe('Table - 基础渲染', () => {
  test('渲染表格容器和主表格元素', () => {
    const { container } = render(
      <Table columns={columns} dataSource={testData} pagination={false} />
    );
    expect(
      container.querySelector('.cream-table-container')
    ).toBeInTheDocument();
    expect(container.querySelector('.cream-table')).toBeInTheDocument();
    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelector('tbody')).toBeInTheDocument();
  });

  test('渲染列标题', () => {
    const { getByText } = render(
      <Table columns={columns} dataSource={testData} pagination={false} />
    );
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Age')).toBeInTheDocument();
    expect(getByText('Address')).toBeInTheDocument();
  });

  test('pagination=false 时不渲染表尾分页', () => {
    const { container } = render(
      <Table columns={columns} dataSource={testData} pagination={false} />
    );
    expect(
      container.querySelector('.cream-table-foot')
    ).not.toBeInTheDocument();
  });

  test('透传 className 和 style 到根容器', () => {
    const { container } = render(
      <Table
        columns={columns}
        dataSource={testData}
        className="custom-table"
        style={{ maxWidth: 640 }}
        pagination={false}
      />
    );
    const tableContainer = container.querySelector('.cream-table-container');
    expect(tableContainer).toHaveClass('custom-table');
    expect(tableContainer).toHaveStyle({ maxWidth: '640px' });
  });

  test('默认启用分页，渲染表尾', () => {
    const { container } = render(
      <Table columns={columns} dataSource={testData} />
    );
    expect(container.querySelector('.cream-table-foot')).toBeInTheDocument();
  });

  test('无数据时展示默认空态', () => {
    const { container, getByText } = render(
      <Table columns={columns} dataSource={[]} pagination={false} />
    );
    expect(getByText('暂无数据')).toBeInTheDocument();
    expect(container.querySelector('.cream-table-empty')).toBeInTheDocument();
    expect(container.querySelector('.cream-table-empty-cell')).toHaveAttribute(
      'colspan',
      '3'
    );
  });

  test('支持自定义 emptyText', () => {
    const { getByText } = render(
      <Table
        columns={columns}
        dataSource={[]}
        emptyText={<span>暂无客户记录</span>}
        pagination={false}
      />
    );
    expect(getByText('暂无客户记录')).toBeInTheDocument();
  });
});

// ==================== 数据行渲染 ====================
describe('Table - 数据行渲染', () => {
  test('pagination=false 时渲染所有数据行', async () => {
    const { findByText } = render(
      <Table columns={columns} dataSource={testData} pagination={false} />
    );
    expect(await findByText('Alice')).toBeInTheDocument();
    expect(await findByText('Bob')).toBeInTheDocument();
    expect(await findByText('Charlie')).toBeInTheDocument();
  });

  test('dataIndex 正确取值', async () => {
    const { findByText } = render(
      <Table columns={columns} dataSource={testData} pagination={false} />
    );
    expect(await findByText('30')).toBeInTheDocument();
    expect(await findByText('New York')).toBeInTheDocument();
  });

  test('支持嵌套 dataIndex 路径（数组形式）', async () => {
    interface NestedData {
      key: string;
      user: { name: string };
    }
    const nestedData: NestedData[] = [{ key: '1', user: { name: 'Alice' } }];
    const nestedColumns: ColumnType<NestedData>[] = [
      { key: 'name', title: 'Name', dataIndex: ['user', 'name'] },
    ];
    const { findByText } = render(
      <Table
        columns={nestedColumns}
        dataSource={nestedData}
        pagination={false}
      />
    );
    expect(await findByText('Alice')).toBeInTheDocument();
  });

  test('render 函数覆盖默认显示值', async () => {
    const customColumns: ColumnType<TestData>[] = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        render: value => (
          <strong data-testid="custom-cell">{`[${value}]`}</strong>
        ),
      },
    ];
    const { findAllByTestId } = render(
      <Table columns={customColumns} dataSource={testData} pagination={false} />
    );
    const cells = await findAllByTestId('custom-cell');
    expect(cells.length).toBe(3);
    expect(cells[0]).toHaveTextContent('[Alice]');
    expect(cells[1]).toHaveTextContent('[Bob]');
  });

  test('render 函数接收 (value, record, index) 正确参数', async () => {
    const renderMock = jest.fn((value, _record, index) => (
      <span data-testid={`cell-${index}`}>{value}</span>
    ));
    const customColumns: ColumnType<TestData>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', render: renderMock },
    ];
    render(
      <Table columns={customColumns} dataSource={testData} pagination={false} />
    );
    await waitFor(() => {
      expect(renderMock).toHaveBeenCalledWith('Alice', testData[0], 0);
      expect(renderMock).toHaveBeenCalledWith('Bob', testData[1], 1);
    });
  });

  test('dataSource 变更后视图同步更新', async () => {
    const { rerender, findByText, queryByText } = render(
      <Table columns={columns} dataSource={testData} pagination={false} />
    );
    expect(await findByText('Alice')).toBeInTheDocument();

    const updatedData = [
      { key: '4', name: 'David', age: 28, address: 'Berlin' },
    ];
    rerender(
      <Table columns={columns} dataSource={updatedData} pagination={false} />
    );
    expect(await findByText('David')).toBeInTheDocument();
    expect(queryByText('Alice')).not.toBeInTheDocument();
  });
});

// ==================== 列对齐 ====================
describe('Table - 列对齐', () => {
  test('align="left" 表头单元格带 text-left 类', () => {
    const alignedColumns: ColumnType<TestData>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', align: 'left' },
    ];
    const { container } = render(
      <Table
        columns={alignedColumns}
        dataSource={testData}
        pagination={false}
      />
    );
    const th = container.querySelector('thead th');
    expect(th).toHaveClass('text-left');
  });

  test('align="center" 表头单元格带 text-center 类', () => {
    const alignedColumns: ColumnType<TestData>[] = [
      { key: 'age', title: 'Age', dataIndex: 'age', align: 'center' },
    ];
    const { container } = render(
      <Table
        columns={alignedColumns}
        dataSource={testData}
        pagination={false}
      />
    );
    const th = container.querySelector('thead th');
    expect(th).toHaveClass('text-center');
  });

  test('align="right" 表头单元格带 text-right 类', () => {
    const alignedColumns: ColumnType<TestData>[] = [
      {
        key: 'address',
        title: 'Address',
        dataIndex: 'address',
        align: 'right',
      },
    ];
    const { container } = render(
      <Table
        columns={alignedColumns}
        dataSource={testData}
        pagination={false}
      />
    );
    const th = container.querySelector('thead th');
    expect(th).toHaveClass('text-right');
  });

  test('数据行单元格也应用对齐类', () => {
    const alignedColumns: ColumnType<TestData>[] = [
      { key: 'age', title: 'Age', dataIndex: 'age', align: 'center' },
    ];
    const { container } = render(
      <Table
        columns={alignedColumns}
        dataSource={testData}
        pagination={false}
      />
    );
    const dataCells = container.querySelectorAll('tbody td');
    dataCells.forEach(td => {
      expect(td).toHaveClass('text-center');
    });
  });
});

// ==================== 列宽 ====================
describe('Table - 列宽', () => {
  test('width 属性设置列内联样式', () => {
    const widthColumns: ColumnType<TestData>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', width: 200 },
    ];
    const { container } = render(
      <Table columns={widthColumns} dataSource={testData} pagination={false} />
    );
    const th = container.querySelector('thead th') as HTMLElement;
    expect(th).toHaveStyle({ width: '200px' });
  });
});

// ==================== 行选择 - checkbox ====================
describe('Table - 行选择（checkbox）', () => {
  test('启用 rowSelection 时表头和数据行渲染选择列', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        columns={columns}
        dataSource={testData}
        pagination={false}
        rowSelection={{ type: 'checkbox', onChange }}
      />
    );
    expect(
      container.querySelector('thead .cream-table-selection-column')
    ).toBeInTheDocument();
    const bodySelections = container.querySelectorAll(
      'tbody .cream-table-selection-column'
    );
    expect(bodySelections.length).toBe(3);
  });

  test('点击数据行选择单元格触发 onChange，选中对应 key', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        columns={columns}
        dataSource={testData}
        pagination={false}
        rowSelection={{ type: 'checkbox', onChange }}
      />
    );

    const firstRowSelection = container.querySelector(
      'tbody .cream-table-selection-column'
    ) as HTMLElement;
    fireEvent.click(firstRowSelection);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(['1'], [testData[0]]);
    });
  });

  test('选中行添加 selected 类', async () => {
    const { container } = render(
      <Table
        columns={columns}
        dataSource={testData}
        pagination={false}
        rowSelection={{ type: 'checkbox' }}
      />
    );

    const firstRowSelection = container.querySelector(
      'tbody .cream-table-selection-column'
    ) as HTMLElement;
    fireEvent.click(firstRowSelection);

    await waitFor(() => {
      const firstRow = container.querySelector('tbody tr') as HTMLElement;
      expect(firstRow).toHaveClass('selected');
    });
  });

  test('再次点击选中行取消选中', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        columns={columns}
        dataSource={testData}
        pagination={false}
        rowSelection={{ type: 'checkbox', onChange }}
      />
    );

    const firstRowSelection = container.querySelector(
      'tbody .cream-table-selection-column'
    ) as HTMLElement;

    // 选中
    fireEvent.click(firstRowSelection);
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['1'], [testData[0]]);
    });

    // 取消选中
    fireEvent.click(firstRowSelection);
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith([], []);
    });
  });

  test('点击表头全选选中所有行', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        columns={columns}
        dataSource={testData}
        pagination={false}
        rowSelection={{ type: 'checkbox', onChange }}
      />
    );

    const headerSelection = container.querySelector(
      'thead .cream-table-selection-column div'
    ) as HTMLElement;
    fireEvent.click(headerSelection);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(['1', '2', '3'], testData);
    });
  });

  test('受控模式：selectedRowKeys 控制选中状态', () => {
    const { container } = render(
      <Table
        columns={columns}
        dataSource={testData}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: ['2'],
        }}
      />
    );

    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0]).not.toHaveClass('selected');
    expect(rows[1]).toHaveClass('selected'); // key='2'
    expect(rows[2]).not.toHaveClass('selected');
  });

  test('rowKey 函数用于行选择和回调数据匹配', async () => {
    interface AccountData {
      id: number;
      name: string;
      age: number;
      address: string;
    }

    const accountData: AccountData[] = [
      { id: 101, name: 'Alice', age: 30, address: 'New York' },
      { id: 102, name: 'Bob', age: 25, address: 'London' },
    ];
    const accountColumns: ColumnType<AccountData>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name' },
    ];
    const onChange = jest.fn();

    const { container } = render(
      <Table
        columns={accountColumns}
        dataSource={accountData}
        pagination={false}
        rowKey={record => record.id}
        rowSelection={{ type: 'checkbox', onChange }}
      />
    );

    const firstRowSelection = container.querySelector(
      'tbody .cream-table-selection-column'
    ) as HTMLElement;
    fireEvent.click(firstRowSelection);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([101], [accountData[0]]);
    });
  });

  test('rowKey 字段支持无 key 数据的受控选中', () => {
    interface AccountData {
      id: number;
      name: string;
    }

    const accountData: AccountData[] = [
      { id: 101, name: 'Alice' },
      { id: 102, name: 'Bob' },
    ];
    const accountColumns: ColumnType<AccountData>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name' },
    ];

    const { container } = render(
      <Table
        columns={accountColumns}
        dataSource={accountData}
        pagination={false}
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: [102],
        }}
      />
    );

    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0]).not.toHaveClass('selected');
    expect(rows[1]).toHaveClass('selected');
  });

  test('getCheckboxProps disabled 时禁用选择', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        columns={columns}
        dataSource={testData}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          onChange,
          getCheckboxProps: record => ({
            disabled: record.key === '1',
          }),
        }}
      />
    );

    // 点击第一行（已禁用）
    const firstRowSelection = container.querySelector(
      'tbody .cream-table-selection-column'
    ) as HTMLElement;
    fireEvent.click(firstRowSelection);

    await waitFor(() => {
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  test('hideSelectAll=true 时隐藏表头全选控件', () => {
    const { container } = render(
      <Table
        columns={columns}
        dataSource={testData}
        pagination={false}
        rowSelection={{ type: 'checkbox', hideSelectAll: true }}
      />
    );
    // 表头选择列存在，但没有 div（全选 div 被隐藏）
    const headerSelectionTh = container.querySelector(
      'thead .cream-table-selection-column'
    );
    expect(headerSelectionTh).not.toBeInTheDocument();
  });
});

// ==================== 行选择 - radio ====================
describe('Table - 行选择（radio）', () => {
  test('radio 模式下只能选中一行', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Table
        columns={columns}
        dataSource={testData}
        pagination={false}
        rowSelection={{ type: 'radio', onChange }}
      />
    );

    const selectionCells = container.querySelectorAll(
      'tbody .cream-table-selection-column'
    );

    // 点击第一行
    fireEvent.click(selectionCells[0]);
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['1'], [testData[0]]);
    });

    // 点击第二行，第一行应被取消
    fireEvent.click(selectionCells[1]);
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['2'], [testData[1]]);
    });
  });

  test('radio 模式下表头存在选择列', () => {
    const { container } = render(
      <Table
        columns={columns}
        dataSource={testData}
        pagination={false}
        rowSelection={{ type: 'radio' }}
      />
    );
    // radio 类型的选择列表头显示 faCircle 而不是全选 div
    const headerSelection = container.querySelector(
      'thead .cream-table-selection-column'
    );
    expect(headerSelection).toBeInTheDocument();
  });
});

// ==================== 阶段四：本地数据管线 ====================
describe('Table - 本地数据管线', () => {
  test('可排序列点击后升序、再次点击降序、第三次恢复原始顺序', async () => {
    const { container } = render(
      <PipelineTable
        columns={pipelineColumns}
        dataSource={pipelineData}
        pagination={false}
      />
    );

    expectRenderedNames(container, [
      'Alice',
      'Bob',
      'Charlie',
      'Diana',
      'Ethan',
      'Fiona',
    ]);

    await clickSortColumn('Age');
    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual([
        'Fiona',
        'Bob',
        'Diana',
        'Alice',
        'Charlie',
        'Ethan',
      ]);
    });

    await clickSortColumn('Age');
    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual([
        'Ethan',
        'Charlie',
        'Alice',
        'Diana',
        'Bob',
        'Fiona',
      ]);
    });

    await clickSortColumn('Age');
    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual([
        'Alice',
        'Bob',
        'Charlie',
        'Diana',
        'Ethan',
        'Fiona',
      ]);
    });
  });

  test('单列筛选只展示匹配数据', async () => {
    const { container } = render(
      <PipelineTable
        columns={pipelineColumns}
        dataSource={pipelineData}
        pagination={false}
      />
    );

    await toggleFilterOption('Status', 'Active');

    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual([
        'Alice',
        'Charlie',
        'Ethan',
      ]);
    });
  });

  test('多选筛选展示匹配任一值的数据', async () => {
    const { container } = render(
      <PipelineTable
        columns={pipelineColumns}
        dataSource={pipelineData}
        pagination={false}
      />
    );

    await toggleFilterOption('Status', 'Active');
    await toggleFilterOption('Status', 'Paused');

    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual([
        'Alice',
        'Bob',
        'Charlie',
        'Ethan',
        'Fiona',
      ]);
    });
  });

  test('清空筛选恢复全部数据', async () => {
    const { container } = render(
      <PipelineTable
        columns={pipelineColumns}
        dataSource={pipelineData}
        pagination={false}
      />
    );

    await toggleFilterOption('City', 'Tokyo');
    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual(['Charlie', 'Fiona']);
    });

    await clickClearFilter();

    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual([
        'Alice',
        'Bob',
        'Charlie',
        'Diana',
        'Ethan',
        'Fiona',
      ]);
    });
  });

  test('筛选/排序先于分页生效', async () => {
    const { container } = render(
      <PipelineTable
        columns={pipelineColumns}
        dataSource={pipelineData}
        pagination={{ defaultPageSize: 2, showSizeChanger: false }}
      />
    );

    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual(['Alice', 'Bob']);
    });

    await toggleFilterOption('Status', 'Active');
    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual(['Alice', 'Charlie']);
      expect(
        container.querySelector('.cream-pagination-total')
      ).toHaveTextContent('共 3 条');
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });

    await clickSortColumn('Age');
    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual(['Alice', 'Charlie']);
    });

    await clickSortColumn('Age');
    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual(['Ethan', 'Charlie']);
    });
  });

  test('筛选后当前页超过最大页时回到第一页', async () => {
    const { container } = render(
      <PipelineTable
        columns={pipelineColumns}
        dataSource={pipelineData}
        pagination={{ defaultPageSize: 2, showSizeChanger: false }}
      />
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: '第 3 页',
      })
    );
    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual(['Ethan', 'Fiona']);
    });

    await toggleFilterOption('Status', 'Active');

    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual(['Alice', 'Charlie']);
      expect(
        screen.getByRole('button', {
          name: '第 1 页',
        })
      ).toHaveAttribute('aria-current', 'page');
    });
  });

  test('受控分页筛选后越界时通知外部回到第一页', async () => {
    const onChange = jest.fn();

    const ControlledPipelineTable = () => {
      const [current, setCurrent] = React.useState(3);

      return (
        <PipelineTable
          columns={pipelineColumns}
          dataSource={pipelineData}
          pagination={{
            current,
            pageSize: 2,
            showSizeChanger: false,
            onChange: (page, size) => {
              onChange(page, size);
              setCurrent(page);
            },
          }}
        />
      );
    };

    const { container } = render(<ControlledPipelineTable />);

    expectRenderedNames(container, ['Ethan', 'Fiona']);

    await toggleFilterOption('Status', 'Active');

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(1, 2);
      expect(getRenderedNames(container)).toEqual(['Alice', 'Charlie']);
    });
  });

  test('loading=true 展示 loadingText，保留表格结构，并阻止排序或筛选改变状态', async () => {
    const { container } = render(
      <PipelineTable
        columns={pipelineColumns}
        dataSource={pipelineData}
        loading
        loadingText="正在同步客户数据"
        pagination={false}
      />
    );

    expect(screen.getByText('正在同步客户数据')).toBeInTheDocument();
    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelector('tbody')).toBeInTheDocument();
    expectRenderedNames(container, [
      'Alice',
      'Bob',
      'Charlie',
      'Diana',
      'Ethan',
      'Fiona',
    ]);

    await clickSortColumn('Age');
    expect(
      screen.getByRole('button', {
        name: /Age 当前未排序，点击切换为升序/i,
      })
    ).toBeDisabled();
    expect(
      screen.getByRole('button', {
        name: /Status筛选/i,
      })
    ).toBeDisabled();

    await waitFor(() => {
      expect(getRenderedNames(container)).toEqual([
        'Alice',
        'Bob',
        'Charlie',
        'Diana',
        'Ethan',
        'Fiona',
      ]);
    });
  });

  test('loading=true 时禁用分页交互', async () => {
    const onChange = jest.fn();
    const loadingData: PipelineData[] = Array.from(
      { length: 12 },
      (_, index) => ({
        key: String(index + 1),
        name: `User ${index + 1}`,
        age: 20 + index,
        status: 'Active',
        city: 'London',
      })
    );

    const { container } = render(
      <PipelineTable
        columns={pipelineColumns}
        dataSource={loadingData}
        loading
        pagination={{ defaultPageSize: 10, onChange }}
      />
    );

    const secondPageButton = screen.getByRole('button', {
      name: '第 2 页',
    });
    const pageSizeSelect = screen.getByRole('combobox', {
      name: '每页显示条数',
    });

    expect(secondPageButton).toBeDisabled();
    expect(pageSizeSelect).toBeDisabled();

    await userEvent.click(secondPageButton);

    expect(onChange).not.toHaveBeenCalled();
    expect(getRenderedNames(container)).toEqual(
      loadingData.slice(0, 10).map(item => item.name)
    );
  });

  test('loading=true 时受控分页越界不触发自动回到第一页', () => {
    const onChange = jest.fn();

    const { container } = render(
      <PipelineTable
        columns={pipelineColumns}
        dataSource={[]}
        loading
        pagination={{
          current: 3,
          pageSize: 2,
          showSizeChanger: false,
          onChange,
        }}
      />
    );

    expect(onChange).not.toHaveBeenCalled();
    expect(
      container.querySelector('.cream-table-loading-overlay')
    ).toBeInTheDocument();
  });

  test('rowSelection 全选只作用于筛选和分页后的当前页', async () => {
    const onChange = jest.fn();
    const onSelectAll = jest.fn();
    const { container } = render(
      <PipelineTable
        columns={pipelineColumns}
        dataSource={pipelineData}
        pagination={{ defaultPageSize: 2, showSizeChanger: false }}
        rowSelection={{
          type: 'checkbox',
          onChange,
          onSelectAll,
        }}
      />
    );

    await toggleFilterOption('Status', 'Active');
    await waitFor(() => {
      expect(getRenderedNames(container, 1)).toEqual(['Alice', 'Charlie']);
    });

    const selectAllControl = getSelectAllControl(container);
    expect(selectAllControl).toBeInTheDocument();
    await userEvent.click(selectAllControl as HTMLElement);

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(
        ['1', '3'],
        [pipelineData[0], pipelineData[2]]
      );
      expect(onSelectAll).toHaveBeenLastCalledWith(
        true,
        [pipelineData[0], pipelineData[2]],
        [pipelineData[0], pipelineData[2]]
      );
    });

    expect(onChange).not.toHaveBeenLastCalledWith(
      ['1', '3', '5'],
      expect.anything()
    );
  });

  test('defaultSortOrder/defaultFilteredValue 初始化生效', () => {
    const initializedColumns: PipelineColumnType<PipelineData>[] =
      pipelineColumns.map(column => {
        if (column.key === 'age') {
          return {
            ...column,
            defaultSortOrder: 'descend',
          };
        }

        if (column.key === 'status') {
          return {
            ...column,
            defaultFilteredValue: ['Active'],
          };
        }

        return column;
      });

    const { container } = render(
      <PipelineTable
        columns={initializedColumns}
        dataSource={pipelineData}
        pagination={false}
      />
    );

    expectRenderedNames(container, ['Ethan', 'Charlie', 'Alice']);
  });
});

// ==================== 快照 ====================
describe('Table - 快照', () => {
  test('基础表格渲染快照', () => {
    const { container } = render(
      <Table columns={columns} dataSource={testData} pagination={false} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('空数据表格快照', () => {
    const { container } = render(
      <Table columns={columns} dataSource={[]} pagination={false} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
