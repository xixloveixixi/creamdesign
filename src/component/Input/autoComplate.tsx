import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import { InputProps, Input } from './input';
import { useDebounce } from '../../hooks/useDebounce';
import classNames from 'classnames';
import { useClickOutSide } from '../../hooks/useClickOutside';
// 整体需求：
// （AutoComplate）
//    - 接收用户输入并根据输入值展示建议列表。
//    - 支持自定义建议项的渲染。
//    - 提供选择建议项后的回调函数。
//    - 支持异步数据获取。
//!泛型设计：定义DataSourceType<T = {}>类型，通过泛型参数T与DataSourceObject形成交叉类型（T & DataSourceObject）
export type DataSourceType<T = {}> = T & DataSourceObject;
// Suggestion 不一定是string，可能是对象等其他类型
interface DataSourceObject {
  value: string;
}
// 1、定义 AutoComplateProps 接口，继承 InputProps 并省略 onSelect 属性
export interface AutoComplateProps<T = {}> extends Omit<
  InputProps,
  'onSelect'
> {
  // fetchSuggestions 属性，类型为异步函数，返回 Promise<DataSourceType<T>[]>
  fetchSuggestions: (value: string) => Promise<DataSourceType<T>[]>;
  // onSelect 属性，类型为函数，参数为 DataSourceType<T>，无返回值
  onSelect: (value: DataSourceType<T>) => void;
  // renderOption 属性，类型为函数，参数为 DataSourceType<T>，返回 React.ReactNode
  renderOption?: (item: DataSourceType<T>) => React.ReactNode;
}

export const AutoComplate = <T,>({
  fetchSuggestions,
  onSelect,
  renderOption,
  value,
  ...rest
}: AutoComplateProps<T>) => {
  const [suggestions, setSuggestions] = useState<DataSourceType<T>[]>([]);
  const [inputValue, setInputValue] = useState(value || '');
  const [isLoading, setIsLoading] = useState(false);
  const debouncedValue = useDebounce(inputValue, 300);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const triggerSearch = useRef(true);
  // 点击外面时，清空建议列表
  const componentRef = useRef<HTMLDivElement>(
    null
  ) as RefObject<HTMLDivElement>;
  useClickOutSide(componentRef, () => {
    setSuggestions([]);
  });
  // 创建建议项的ref数组，用于焦点管理
  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

  // 当高亮索引变化时，将焦点设置到对应的建议项
  useEffect(() => {
    if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
      suggestionRefs.current[highlightedIndex]?.focus();
    }
  }, [highlightedIndex, suggestions.length]);
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setIsLoading(true);
      fetchSuggestions(debouncedValue)
        .then(setSuggestions)
        .finally(() => setIsLoading(false));
    } else {
      setSuggestions([]);
    }
  }, [debouncedValue, fetchSuggestions]);
  // 2、定义 handleChange 函数，处理输入值变化
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // 输入值变化时，重置 triggerSearch 为 true
    triggerSearch.current = true;
    setInputValue(value);
  };
  // 3、定义 handleSelect 函数，处理选择建议项
  // 当选择建议项时，调用 onSelect 函数，更新输入值为选中项的值，清空建议列表
  const handleSelect = (item: DataSourceType<T>) => {
    onSelect(item);
    // 选择的时候不触发搜索
    triggerSearch.current = false;
    setInputValue(item?.value);
    setSuggestions([]);
  };
  // 4、定义 renderTemplate 函数，根据是否有自定义渲染函数 renderOption 来渲染建议项
  const renderTemplate = (item: DataSourceType<T>) => {
    if (renderOption) {
      return renderOption(item);
    }
    return item.value;
  };
  // 5、定义 generateDropdown 函数，根据 suggestions 状态生成下拉列表
  // 当 suggestions 非空时，渲染下拉列表，每个建议项绑定点击事件 handleSelect
  // 6、定义 handleKeyDown 函数，处理键盘事件
  // 遇到问题啦,第一次enter之后会再次触发一次搜索
  const handleHighlight = (index: number) => {
    let newIndex = index;

    // 检查边界，实现循环导航
    if (newIndex >= suggestions.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = suggestions.length - 1;
    }

    setHighlightedIndex(newIndex);
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      handleHighlight(highlightedIndex - 1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      handleHighlight(highlightedIndex + 1);
    } else if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault();
      handleSelect(suggestions[highlightedIndex]);
    } else if (event.key === 'Escape') {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };
  const generateDropdown = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div className="auto-complate-dropdown" ref={componentRef}>
        {suggestions.map((item, index) => (
          <li
            key={item.value}
            ref={el => (suggestionRefs.current[index] = el)}
            tabIndex={0}
            className={classNames('suggestion-item', {
              'suggestion-item-highlighted': index === highlightedIndex,
            })}
            onClick={() => handleSelect(item)}
            onKeyDown={e => handleKeyDown(e)}
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
      <Input
        {...rest}
        onChange={handleChange}
        value={inputValue}
        onKeyDown={handleKeyDown}
      />
      {generateDropdown()}
    </div>
  );
};
