import { ChangeEvent, useState } from 'react';
import { InputProps, Input } from './input';

// 整体需求：
// （AutoComplate）
//    - 接收用户输入并根据输入值展示建议列表。
//    - 支持自定义建议项的渲染。
//    - 提供选择建议项后的回调函数。
//    - 支持异步数据获取。

// Suggestion 不一定是string，可能是对象等其他类型
interface DataSourceObject {
  value: DataSourceType;
}
//!泛型设计：定义DataSourceType<T = {}>类型，通过泛型参数T与DataSourceObject形成交叉类型（T & DataSourceObject）
export type DataSourceType<T = {}> = T & DataSourceObject;
// 1、定义 AutoComplateProps 接口，继承 InputProps 并省略 onSelect 属性
export interface AutoComplateProps extends Omit<InputProps, 'onSelect'> {
  // fetchSuggestions 属性，类型为异步函数，返回 Promise<DataSourceType[]>
  fetchSuggestions: (value: string) => Promise<DataSourceType[]>;
  // onSelect 属性，类型为函数，参数为 DataSourceType，无返回值
  onSelect: (value: DataSourceType) => void;
  // renderOption 属性，类型为函数，参数为 DataSourceType，返回 React.ReactNode
  renderOption?: (item: DataSourceType) => React.ReactNode;
}

export const AutoComplate: React.FC<AutoComplateProps> = ({
  fetchSuggestions,
  onSelect,
  renderOption,
  value,
  ...rest
}) => {
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [inputValue, setInputValue] = useState(value || '');
  // 2、定义 handleChange 函数，处理输入值变化
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      // 当有输入值时，调用 fetchSuggestions 函数获取建议列表，并更新 suggestions 状态
      fetchSuggestions(value).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  // 3、定义 handleSelect 函数，处理选择建议项
  // 当选择建议项时，调用 onSelect 函数，更新输入值为选中项的值，清空建议列表
  const handleSelect = (item: DataSourceType) => {
    onSelect(item);
    setInputValue(item.value);
    setSuggestions([]);
  };
  // 4、定义 renderTemplate 函数，根据是否有自定义渲染函数 renderOption 来渲染建议项
  const renderTemplate = (item: DataSourceType) => {
    if (renderOption) {
      return renderOption(item);
    }
    return item.value;
  };
  // 5、定义 generateDropdown 函数，根据 suggestions 状态生成下拉列表
  // 当 suggestions 非空时，渲染下拉列表，每个建议项绑定点击事件 handleSelect
  const generateDropdown = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div className="auto-complate-dropdown">
        {suggestions.map((item, index) => (
          <li
            key={index}
            className="auto-complate-dropdown-item"
            onClick={() => handleSelect(item)}
          >
            {renderTemplate(item)}
          </li>
        ))}
      </div>
    );
  };
  // 6、UI
  return (
    <div className="auto-complate">
      <Input {...rest} onChange={handleChange} value={inputValue} />
      {generateDropdown()}
    </div>
  );
};
