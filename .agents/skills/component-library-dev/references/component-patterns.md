# CreamDesign 组件设计模式

## 组件分类

### 1. 基础组件 (Basic)

- Button - 按钮
- Icon - 图标
- Input - 输入框

**特点：**

- 原子级组件
- 高度可复用
- 状态简单（disabled, loading, active）

### 2. 表单组件 (Form)

- Form - 表单容器
- Input - 输入框
- Upload - 上传

**特点：**

- 受控/非受控模式
- 表单验证集成
- 值管理（value/defaultValue）

### 3. 展示组件 (Data Display)

- Table - 表格
- Pagination - 分页
- Progress - 进度条
- Card - 卡片

**特点：**

- 数据驱动
- 配置化渲染
- 支持空状态

### 4. 导航组件 (Navigation)

- Menu - 菜单

**特点：**

- 层级结构
- 选中状态管理
- 路由集成

## 通用 Props 模式

### 标准 Props

```typescript
interface StandardProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
}
```

### 状态 Props

```typescript
interface StateProps {
  /** 加载状态 */
  loading?: boolean;
  /** 选中状态 */
  checked?: boolean;
  /** 激活状态 */
  active?: boolean;
}
```

### 事件 Props

```typescript
interface EventProps {
  /** 点击事件 */
  onClick?: (event: React.MouseEvent) => void;
  /** 变化事件 */
  onChange?: (value: any) => void;
  /** 聚焦事件 */
  onFocus?: (event: React.FocusEvent) => void;
  /** 失焦事件 */
  onBlur?: (event: React.FocusEvent) => void;
}
```

## 状态管理模式

### 简单状态

```typescript
const [visible, setVisible] = useState(false);
const [value, setValue] = useState(defaultValue);
```

### 复杂状态

```typescript
type Action =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SET_VALUE'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OPEN':
      return { ...state, visible: true };
    case 'CLOSE':
      return { ...state, visible: false };
    case 'SET_VALUE':
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);
```

### 受控/非受控模式

```typescript
interface Props {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const Component: React.FC<Props> = ({ value, defaultValue, onChange }) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);

  const currentValue = isControlled ? value : internalValue;

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };
};
```

## 样式类名规范

### BEM 命名

```
Block: .cream-component
Element: .cream-component__element
Modifier: .cream-component--modifier
Modifier Value: .cream-component--modifier-value
```

### 状态类名

```scss
.cream-component {
  &--disabled {
  }
  &--active {
  }
  &--loading {
  }
  &--checked {
  }
  &--selected {
  }
  &--focused {
  }
  &--error {
  }
}
```

### 尺寸类名

```scss
.cream-component {
  &--small {
  }
  &--medium {
  }
  &--large {
  }
}
```

## 可访问性模式

### 基础要求

```typescript
// 语义化标签
<button>, <input>, <nav>, <main>

// ARIA 属性
role="button"
aria-label="描述"
aria-disabled={disabled}
aria-hidden={!visible}

// 键盘支持
tabIndex={disabled ? -1 : 0}
onKeyDown={handleKeyDown}
```

### 焦点管理

```typescript
const elementRef = useRef<HTMLDivElement>(null);

const focus = () => {
  elementRef.current?.focus();
};

const blur = () => {
  elementRef.current?.blur();
};
```
