# CreamDesign 测试规范

## 测试覆盖率要求

- **语句覆盖率 (Statements)**: ≥ 80%
- **分支覆盖率 (Branches)**: ≥ 80%
- **函数覆盖率 (Functions)**: ≥ 80%
- **行覆盖率 (Lines)**: ≥ 80%

## 测试文件结构

```typescript
describe('ComponentName', () => {
  // 1. 基础渲染测试
  describe('Rendering', () => {});

  // 2. Props 测试
  describe('Props', () => {});

  // 3. 事件测试
  describe('Events', () => {});

  // 4. 可访问性测试
  describe('Accessibility', () => {});

  // 5. 快照测试
  describe('Snapshots', () => {});

  // 6. 边界情况测试
  describe('Edge Cases', () => {});
});
```

## 测试用例模板

### 基础渲染测试

```typescript
describe('Rendering', () => {
  it('should render correctly with default props', () => {
    const { container } = render(<Component />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const { container } = render(<Component className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('should render with custom style', () => {
    const style = { color: 'red' };
    const { container } = render(<Component style={style} />);
    expect(container.firstChild).toHaveStyle(style);
  });

  it('should render children correctly', () => {
    render(<Component><span data-testid="child">Child</span></Component>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
```

### Props 测试

```typescript
describe('Props', () => {
  it('should apply [prop] class when [condition]', () => {
    const { container } = render(<Component propName />);
    expect(container.firstChild).toHaveClass('cream-component--modifier');
  });

  it('should have correct default [prop] value', () => {
    const { container } = render(<Component />);
    expect(container.firstChild).not.toHaveClass('cream-component--modifier');
  });

  it('should spread rest props to root element', () => {
    const { container } = render(<Component data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
```

### 事件测试

```typescript
describe('Events', () => {
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Component onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Component disabled onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should call onClick with correct event', () => {
    const handleClick = jest.fn();
    render(<Component onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
  });
});
```

### 可访问性测试

```typescript
describe('Accessibility', () => {
  it('should have correct role attribute', () => {
    const { container } = render(<Component />);
    expect(container.firstChild).toHaveAttribute('role', 'button');
  });

  it('should have correct aria-disabled when disabled', () => {
    const { container } = render(<Component disabled />);
    expect(container.firstChild).toHaveAttribute('aria-disabled', 'true');
  });

  it('should be focusable when enabled', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '0');
  });

  it('should not be focusable when disabled', () => {
    render(<Component disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '-1');
  });
});
```

### 快照测试

```typescript
describe('Snapshots', () => {
  it('should match snapshot with default props', () => {
    const { container } = render(<Component />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot when disabled', () => {
    const { container } = render(<Component disabled />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

## 常用测试工具

### 查询方法优先级

1. `getByRole` - 最推荐，语义化
2. `getByLabelText` - 表单元素
3. `getByPlaceholderText` - 输入框
4. `getByText` - 文本内容
5. `getByDisplayValue` - 表单值
6. `getByAltText` - 图片
7. `getByTitle` - title 属性
8. `getByTestId` - 最后手段

### 用户事件

```typescript
import userEvent from '@testing-library/user-event';

// 点击
await userEvent.click(element);

// 输入
await userEvent.type(input, 'hello');

// 清除
await userEvent.clear(input);

// 键盘
await userEvent.keyboard('{Enter}');
await userEvent.keyboard('{Tab}');
await userEvent.keyboard('{Escape}');
```

### 异步测试

```typescript
// 等待元素出现
await screen.findByText('Loaded');

// 等待元素消失
await waitForElementToBeRemoved(() => screen.queryByText('Loading'));

// 等待条件满足
await waitFor(() => {
  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

## 覆盖率检查

```bash
# 运行测试并生成覆盖率报告
npm test -- --coverage

# 检查特定文件覆盖率
npm test -- --coverage --collectCoverageFrom="src/components/Component/**/*"
```
