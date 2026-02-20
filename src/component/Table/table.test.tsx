import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './index';
import { ColumnType } from './TableContainer';

// ==================== 全局 Mock ====================
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}
global.ResizeObserver = MockResizeObserver as any;

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

  test('默认启用分页，渲染表尾', () => {
    const { container } = render(
      <Table columns={columns} dataSource={testData} />
    );
    expect(container.querySelector('.cream-table-foot')).toBeInTheDocument();
  });

  test('无数据时 tbody 为空', () => {
    const { container } = render(
      <Table columns={columns} dataSource={[]} pagination={false} />
    );
    const tbody = container.querySelector('tbody');
    expect(tbody?.children.length).toBe(0);
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
    fireEvent.click(firstRowSelection);
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['1'], [testData[0]]);
    });
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
        rowSelection={{ type: 'checkbox', selectedRowKeys: ['2'] }}
      />
    );
    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0]).not.toHaveClass('selected');
    expect(rows[1]).toHaveClass('selected');
    expect(rows[2]).not.toHaveClass('selected');
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
          getCheckboxProps: record => ({ disabled: record.key === '1' }),
        }}
      />
    );
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
    fireEvent.click(selectionCells[0]);
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['1'], [testData[0]]);
    });
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
    const headerSelection = container.querySelector(
      'thead .cream-table-selection-column'
    );
    expect(headerSelection).toBeInTheDocument();
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
