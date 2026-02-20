import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './index';

describe('Pagination Component', () => {
  // ==================== 基础渲染 ====================
  test('渲染带 aria-label 的导航元素', () => {
    const { getByRole } = render(<Pagination total={100} />);
    expect(getByRole('navigation', { name: '分页导航' })).toBeInTheDocument();
  });

  test('total=50 pageSize=10 时渲染 5 个页码按钮', () => {
    const { getByLabelText } = render(<Pagination total={50} pageSize={10} />);
    for (let i = 1; i <= 5; i++) {
      expect(getByLabelText(`第 ${i} 页`)).toBeInTheDocument();
    }
  });

  test('默认渲染上一页/下一页按钮', () => {
    const { getByLabelText } = render(<Pagination total={50} />);
    expect(getByLabelText('上一页')).toBeInTheDocument();
    expect(getByLabelText('下一页')).toBeInTheDocument();
  });

  test('showPrevNext=false 时隐藏上一页/下一页按钮', () => {
    const { queryByLabelText } = render(
      <Pagination total={50} showPrevNext={false} />
    );
    expect(queryByLabelText('上一页')).not.toBeInTheDocument();
    expect(queryByLabelText('下一页')).not.toBeInTheDocument();
  });

  // ==================== 边界状态 ====================
  test('当前页为第 1 页时，上一页按钮禁用', () => {
    const { getByLabelText } = render(<Pagination total={100} current={1} />);
    expect(getByLabelText('上一页')).toBeDisabled();
  });

  test('当前页为最后一页时，下一页按钮禁用', () => {
    const { getByLabelText } = render(
      <Pagination total={50} current={5} pageSize={10} />
    );
    expect(getByLabelText('下一页')).toBeDisabled();
  });

  test('当前页不是第 1 页时，上一页按钮可点击', () => {
    const { getByLabelText } = render(<Pagination total={100} current={3} />);
    expect(getByLabelText('上一页')).not.toBeDisabled();
  });

  test('当前页不是最后一页时，下一页按钮可点击', () => {
    const { getByLabelText } = render(<Pagination total={100} current={3} />);
    expect(getByLabelText('下一页')).not.toBeDisabled();
  });

  // ==================== 激活页 ====================
  test('当前页按钮带有 active 类和 aria-current 属性', () => {
    const { getByLabelText } = render(
      <Pagination total={50} current={3} pageSize={10} />
    );
    const activeBtn = getByLabelText('第 3 页');
    expect(activeBtn).toHaveClass('cream-pagination-item-active');
    expect(activeBtn).toHaveAttribute('aria-current', 'page');
  });

  test('非当前页按钮不带 aria-current 属性', () => {
    const { getByLabelText } = render(
      <Pagination total={50} current={1} pageSize={10} />
    );
    const nonActiveBtn = getByLabelText('第 2 页');
    expect(nonActiveBtn).not.toHaveAttribute('aria-current');
    expect(nonActiveBtn).not.toHaveClass('cream-pagination-item-active');
  });

  // ==================== 点击事件 ====================
  test('点击页码触发 onChange(page, pageSize)', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination total={50} pageSize={10} onChange={onChange} />
    );
    fireEvent.click(getByLabelText('第 2 页'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  test('点击下一页触发 onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination total={50} pageSize={10} current={1} onChange={onChange} />
    );
    fireEvent.click(getByLabelText('下一页'));
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  test('点击上一页触发 onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination total={50} pageSize={10} current={3} onChange={onChange} />
    );
    fireEvent.click(getByLabelText('上一页'));
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  test('点击当前激活页不触发 onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination total={50} current={1} pageSize={10} onChange={onChange} />
    );
    fireEvent.click(getByLabelText('第 1 页'));
    expect(onChange).not.toHaveBeenCalled();
  });

  // ==================== showTotal ====================
  test('showTotal=true 时显示总条数', () => {
    const { container } = render(<Pagination total={100} showTotal={true} />);
    const totalEl = container.querySelector('.cream-pagination-total');
    expect(totalEl).toBeInTheDocument();
    expect(totalEl?.querySelector('strong')).toHaveTextContent('100');
  });

  test('showTotal=false 时不显示总条数', () => {
    const { container } = render(<Pagination total={100} showTotal={false} />);
    expect(
      container.querySelector('.cream-pagination-total')
    ).not.toBeInTheDocument();
  });

  // ==================== showSizeChanger ====================
  test('showSizeChanger=true 时显示每页条数选择器', () => {
    const { getByLabelText } = render(
      <Pagination total={100} showSizeChanger={true} />
    );
    expect(getByLabelText('每页显示条数')).toBeInTheDocument();
  });

  test('showSizeChanger 默认不显示', () => {
    const { queryByLabelText } = render(<Pagination total={100} />);
    expect(queryByLabelText('每页显示条数')).not.toBeInTheDocument();
  });

  test('更改每页条数选择器触发 onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination total={100} showSizeChanger={true} onChange={onChange} />
    );
    fireEvent.change(getByLabelText('每页显示条数'), {
      target: { value: '20' },
    });
    expect(onChange).toHaveBeenCalled();
  });

  test('更改每页条数触发 onPageSizeChange', () => {
    const onPageSizeChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination
        total={100}
        showSizeChanger={true}
        onPageSizeChange={onPageSizeChange}
      />
    );
    fireEvent.change(getByLabelText('每页显示条数'), {
      target: { value: '50' },
    });
    expect(onPageSizeChange).toHaveBeenCalledWith(50);
  });

  test('pageSizeOptions 自定义选项正确渲染', () => {
    const { getByLabelText } = render(
      <Pagination
        total={100}
        showSizeChanger={true}
        pageSizeOptions={[5, 15, 30]}
      />
    );
    const select = getByLabelText('每页显示条数') as HTMLSelectElement;
    const options = Array.from(select.options).map(o => Number(o.value));
    expect(options).toEqual([5, 15, 30]);
  });

  // ==================== disabled ====================
  test('disabled=true 时所有按钮禁用', () => {
    const { getAllByRole } = render(
      <Pagination total={100} disabled={true} current={3} />
    );
    const buttons = getAllByRole('button');
    buttons.forEach(btn => {
      expect(btn).toBeDisabled();
    });
  });

  test('disabled=true 时容器带有 cream-pagination-disabled 类', () => {
    const { container } = render(<Pagination total={100} disabled={true} />);
    expect(container.querySelector('.cream-pagination')).toHaveClass(
      'cream-pagination-disabled'
    );
  });

  test('disabled=true 时点击页码不触发 onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination
        total={50}
        current={1}
        pageSize={10}
        disabled={true}
        onChange={onChange}
      />
    );
    fireEvent.click(getByLabelText('第 2 页'));
    expect(onChange).not.toHaveBeenCalled();
  });

  test('disabled=true 时每页条数选择器禁用', () => {
    const { getByLabelText } = render(
      <Pagination total={100} showSizeChanger={true} disabled={true} />
    );
    expect(getByLabelText('每页显示条数')).toBeDisabled();
  });

  // ==================== 省略号 ====================
  test('总页数超过 7 时显示省略号', () => {
    const { container } = render(
      <Pagination total={200} pageSize={10} current={1} />
    );
    expect(
      container.querySelector('.cream-pagination-ellipsis')
    ).toBeInTheDocument();
  });

  test('总页数不超过 7 时不显示省略号', () => {
    const { container } = render(
      <Pagination total={50} pageSize={10} current={1} />
    );
    expect(
      container.querySelector('.cream-pagination-ellipsis')
    ).not.toBeInTheDocument();
  });

  test('当前页在中间时显示两个省略号', () => {
    const { container } = render(
      <Pagination total={300} pageSize={10} current={15} />
    );
    const ellipses = container.querySelectorAll('.cream-pagination-ellipsis');
    expect(ellipses.length).toBe(2);
  });

  // ==================== 自定义 className ====================
  test('应用自定义 className', () => {
    const { container } = render(
      <Pagination total={50} className="my-custom-pagination" />
    );
    expect(container.querySelector('.cream-pagination')).toHaveClass(
      'my-custom-pagination'
    );
  });

  // ==================== 非受控模式 ====================
  test('非受控模式下点击页码更新激活状态', () => {
    const { getByLabelText } = render(<Pagination total={50} pageSize={10} />);
    fireEvent.click(getByLabelText('第 3 页'));
    expect(getByLabelText('第 3 页')).toHaveClass(
      'cream-pagination-item-active'
    );
  });

  // ==================== total=0 边界 ====================
  test('total=0 时最少显示 1 页', () => {
    const { getByLabelText } = render(<Pagination total={0} />);
    expect(getByLabelText('第 1 页')).toBeInTheDocument();
  });

  // ==================== 快照 ====================
  test('基础分页器快照', () => {
    const { container } = render(
      <Pagination total={50} pageSize={10} current={1} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('含 showTotal + showSizeChanger 分页器快照', () => {
    const { container } = render(
      <Pagination
        total={100}
        pageSize={10}
        current={1}
        showTotal={true}
        showSizeChanger={true}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
