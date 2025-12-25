import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  AutoComplate,
  AutoComplateProps,
  DataSourceType,
} from './autoComplate';
interface MockDataSourceObject {
  number: number;
  value: string;
}
const testArr = [
  { value: 'ab', number: 1 },
  { value: 'ac', number: 2 },
  { value: 'sxeqw', number: 3 },
  { value: 'sqwdew', number: 4 },
  { value: 'ooo', number: 5 },
];

let wrapper: RenderResult;
let inputElement: HTMLInputElement;
let testProps: AutoComplateProps<MockDataSourceObject>;

describe('test AutoComplate', () => {
  beforeEach(() => {
    // 在每个测试用例前重新创建testProps，确保mock函数状态干净
    testProps = {
      fetchSuggestions: jest.fn(
        async (
          value: string
        ): Promise<DataSourceType<MockDataSourceObject>[]> => {
          // 模拟网络延迟，使用较短的时间以加快测试
          await new Promise(resolve => setTimeout(resolve, 50));

          // 根据输入值过滤建议，返回正确类型的数组
          return testArr.filter(item =>
            item.value.toLowerCase().includes(value.toLowerCase())
          ) as DataSourceType<MockDataSourceObject>[];
        }
      ),
      onSelect: jest.fn(),
      placeholder: '请输入',
    };
    wrapper = render(<AutoComplate<MockDataSourceObject> {...testProps} />);
    inputElement = wrapper.getByPlaceholderText('请输入') as HTMLInputElement;
  });

  afterEach(() => {
    // 每个测试后清理DOM
    cleanup();
  });

  it('test basic AutoComplate behavior', async () => {
    fireEvent.change(inputElement, { target: { value: 'ab' } });

    // 等待建议项渲染到DOM中
    await waitFor(
      () => {
        expect(
          wrapper.container.querySelectorAll('.suggestion-item').length
        ).toEqual(1);
      },
      { timeout: 1000 }
    );

    // 验证fetchSuggestions被正确调用
    expect(testProps.fetchSuggestions).toHaveBeenCalledWith('ab');

    // 测试选择建议项
    fireEvent.click(wrapper.getByText('ab'));
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 1 });
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
    expect(inputElement.value).toBe('ab');
  });

  it('test keyboard navigation', async () => {
    fireEvent.change(inputElement, { target: { value: 'a' } });

    // 等待建议项渲染到DOM中
    await waitFor(
      () => {
        expect(
          wrapper.container.querySelectorAll('.suggestion-item').length
        ).toEqual(2);
      },
      { timeout: 1000 }
    );
    let firstSuggestion = wrapper.getByText('ab');
    let secondSuggestion = wrapper.getByText('ac');
    fireEvent.keyDown(inputElement, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(firstSuggestion).toHaveFocus();
    fireEvent.keyDown(inputElement, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(secondSuggestion).toHaveFocus();
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ac', number: 2 });
  });

  it('test click outside to close suggestions', async () => {
    fireEvent.change(inputElement, { target: { value: 'a' } });
    // 等待建议项渲染到DOM中
    await waitFor(
      () => {
        expect(
          wrapper.container.querySelectorAll('.suggestion-item').length
        ).toEqual(2);
      },
      { timeout: 1000 }
    );
    // 点击建议项外部
    fireEvent.click(document.body);
    // 验证建议项被移除
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
    expect(wrapper.queryByText('ac')).not.toBeInTheDocument();
  });

  // 支持异步请求
  it('test async fetchSuggestions', async () => {
    fireEvent.change(inputElement, { target: { value: 'a' } });
    // 等待建议项渲染到DOM中
    await waitFor(
      () => {
        expect(
          wrapper.container.querySelectorAll('.suggestion-item').length
        ).toEqual(2);
      },
      { timeout: 1000 }
    );
    // 验证fetchSuggestions被正确调用
    expect(testProps.fetchSuggestions).toHaveBeenCalledWith('a');
  });

  // 测试自定义渲染建议项
  it('test render suggestions', async () => {
    // 定义渲染建议项的函数
    const renderOption = (item: DataSourceType<MockDataSourceObject>) => (
      <>
        <span className="custom-option-icon">🍎</span>
        <span className="custom-option-id">{item.number}</span>
        <span className="custom-option-text">{item.value}</span>
      </>
    );

    // 重新渲染带有自定义渲染函数的组件
    const { container } = render(
      <AutoComplate<MockDataSourceObject>
        {...testProps}
        renderOption={renderOption}
      />
    );

    const customInputElement = container.querySelector(
      'input'
    ) as HTMLInputElement;

    // 触发输入事件
    fireEvent.change(customInputElement, { target: { value: 'ab' } });

    // 等待建议项渲染
    await waitFor(
      () => {
        expect(container.querySelectorAll('.suggestion-item').length).toEqual(
          1
        );
      },
      { timeout: 1000 }
    );

    // 验证自定义渲染的元素是否存在
    expect(container.querySelector('.custom-option-icon')).toBeInTheDocument();
    expect(container.querySelector('.custom-option-id')).toBeInTheDocument();
    expect(container.querySelector('.custom-option-text')).toBeInTheDocument();

    // 验证emoji和数字文本是否存在
    expect(container.textContent).toContain('🍎');
    expect(container.textContent).toContain('1');
    expect(container.textContent).toContain('ab');
  });
});
// ## 问题诊断和解决方案总结
// ### 🔍 问题现象
// 从终端输出显示的HTML结构可以看到，DOM中存在两个 auto-complate 实例：

// - 第一个实例：包含输入值"ab"和建议项
// - 第二个实例：包含空的输入值
// 这导致了测试中无法正确定位元素，因为存在多个相同的占位符。

// ### 🛠️ 根本原因
// 问题出现在自定义渲染测试中：

// 1. 在 beforeEach 中已经渲染了一个 AutoComplete 组件
// 2. 在自定义渲染测试中又重新渲染了另一个实例
// 3. 没有清理之前的DOM实例，导致多个组件共存
// ### ✅ 修复措施
// 1. 添加清理导入

// ```
// import {
//   act,
//   cleanup,  // ← 新增
//   fireEvent,
//   render,
//   RenderResult,
//   waitFor,
// } from '@testing-library/react';
// ```
// 2. 添加测试后清理钩子

// ```
// afterEach(() => {
//   // 每个测试后清理DOM
//   cleanup();
// });
// ```
// 3. 重构自定义渲染测试

// ```
// // 修改前：使用全局wrapper，可能与其他测
// 试冲突
// wrapper = render
// (<AutoComplate<MockDataSourceObject>
//  {...testProps} renderOption=
// {renderOption} />);

// // 修改后：使用局部变量，避免全局状态污染
// const { container } = render(
//   <AutoComplate<MockDataSourceObject
//   >
//     {...testProps}
//     renderOption={renderOption}
//   />
// );
// ```
// 4. 优化元素查询方式

// ```
// // 修改前：可能查询到多个元素
// inputElement = wrapper.
// queryAllByPlaceholderText('请输入')
// [0] as HTMLInputElement;

// // 修改后：使用容器直接查询
// const customInputElement =
// container.querySelector('input') as
// HTMLInputElement;
// ```
// ### 🎯 修复效果
// - 确保每个测试用例都有干净的DOM环境
// - 避免测试间的相互干扰
// - 提高测试的可靠性和可重复性
// - 解决了"multiple elements with placeholder"错误
// ### 📚 关键技术概念
// - 测试隔离 ：每个测试应该独立运行，不受其他测试影响
// - DOM清理 ：使用 cleanup() 和 afterEach() 确保测试后清理
// - 局部作用域 ：使用局部变量避免全局状态污染
// - 容器查询 ：直接查询容器内的元素而非通过wrapper
// 这个修复确保了AutoComplete组件的所有测试都能独立运行，解决了DOM污染导致的测试失败问题
