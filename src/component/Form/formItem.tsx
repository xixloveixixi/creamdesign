// 接收传入的组件，渲染到form-item中
import { FC, ReactElement, ReactNode, useContext, useEffect } from 'react';
import './Form.scss';
import classNames from 'classnames';
import { FormContext } from './form';
import React from 'react';

export interface FormItemProps {
  name?: string;
  children?: ReactNode;
  label?: string;
  required?: boolean;
  error?: string;
  labelWidth?: string; // 可选：自定义标签宽度
  controlWidth?: string; // 可选：自定义控件宽度
  className?: string;
  // 添加三个属性来适应不同的事件和value属性名称
  valuePropsName?: string;
  trigger?: string;
  getValueFormEvent?: (e: any) => any;
}

export const FormItem: FC<FormItemProps> = props => {
  const {
    name,
    children,
    label,
    required = false,
    error,
    className,
    valuePropsName,
    trigger,
    getValueFormEvent,
  } = props;
  const rowClassName = classNames(
    'cream-row',
    label ? '' : 'cream-row-no-label',
    className
  );
  // 构造标签样式
  const labelClassName = classNames(
    'cream-form-item-label',
    label ? 'cream-form-item-required' : '',
    className
  );

  // 构造控件样式
  const controlClassName = classNames(
    'cream-form-item',
    error ? 'cream-form-item-has-error' : '',
    className
  );
  // 从context中获取dispatchFields和fields
  const { dispatchFields, fields } = useContext(FormContext);
  // 通过name获取fields中的字段-就是value
  const field = fields[name || 'form'];
  // 使用空字符串作为默认值，避免 uncontrolled -> controlled 警告
  const value = field?.value ?? '';
  const onValueUpdate = (e: any) => {
    const value = getValueFormEvent!(e);
    // console.log('newValue', value);
    // console.log('newValue e.target', e.target);
    dispatchFields({
      type: 'updateField',
      name: name || 'form',
      value: {
        value,
      },
    });
  };
  // 1.手动创建一个列表,需要有value和onChange属性
  const propsList: Record<string, any> = {};
  // Q:需要适应不同的事件和value属性名称
  // 需要验证children类型并显示警告
  // 目前仅支持单一表单元素作为children
  propsList[valuePropsName!] = value;
  propsList[trigger!] = onValueUpdate;
  // 2.我们要获取children数组的第一个元素
  const childList = React.Children.toArray(children);
  // 对childList进行判断，只有一个元素才行
  if (childList.length !== 1) {
    console.warn('FormItem组件只能有一个子元素');
  }
  const child = childList[0] as ReactElement<any, string>;
  // 3.使用cloneElement,混合这个child以及手动的属性列表
  const clonedChild = React.cloneElement(child, {
    ...child.props,
    ...propsList,
  });
  // 在挂载的时候挂载一次form-item
  useEffect(() => {
    if (name) {
      dispatchFields({
        type: 'addField',
        name,
        // 传入字段基本信息：name、label等
        value: { label, name, value: '' },
      });
    }
  }, [name, dispatchFields]);
  return (
    <div className={rowClassName}>
      {label && (
        <div className={labelClassName}>
          <label>{label}</label>
        </div>
      )}
      <div className={controlClassName}>
        <div className="cream-input-wrapper">{clonedChild}</div>
        {error && <div className="cream-form-item-explain">{error}</div>}
      </div>
    </div>
  );
};

FormItem.defaultProps = {
  name: 'form-item',
  valuePropsName: 'value',
  trigger: 'onChange',
  getValueFormEvent: (e: any) => {
    return e.target.value;
  },
};
