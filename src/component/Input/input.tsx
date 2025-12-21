/*
input需求：
尺寸控制：
小号Input（紧凑型）
大号Input（突出显示型）
状态控制：
Disabled状态：禁止用户编辑
带图标状态：右侧显示功能图标（如日历图标）
扩展功能：
前缀/后缀：可添加固定内容（如"https://"前缀或".com"后缀）
开发要点：
通过属性控制class name变化
动态控制元素显示（图标/前后缀的显隐）
继承原生HTML input元素的所有属性
*/
import React, { InputHTMLAttributes } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import './inputStyle.scss';

// size
type InputSize = 'large' | 'small';

// 2、创建interface：InputProps
// toDo:原生size属性为number类型，与自定义string类型冲突
// 使用Omit工具类型排除原生size、prefix、suffix属性
export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix' | 'suffix'
> {
  /**
   * 输入框尺寸
   * @default 'small'
   */
  size?: InputSize;
  /**
   * 是否禁用输入
   * @default false
   */
  disabled?: boolean;
  /**
   * 图标
   */
  icon?: IconProp;
  /**
   * 前缀组件
   */
  prefix?: string | React.ReactNode;
  /**
   * 后缀组件
   */
  suffix?: string | React.ReactNode;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}
/**
 * 输入框组件:通过鼠标和键盘输入内容,是最基础的表单组件
 *
 *  ~~~
 * //这样引用
 * import { Input } from 'creamdesign';
 * ~~~
 * 支持所有原生input属性
 */
export const Input: React.FC<InputProps> = ({
  size = 'small',
  disabled = false,
  icon,
  prefix,
  suffix,
  className,
  ...rest
}) => {
  const isDisabled = disabled;
  const inputClassName = classNames(
    'input',
    `input-${size}`,
    {
      'input-disabled': isDisabled,
    },
    className
  );
  //解决state初始值为undefined时，从非受控变为受控会触发警告
  const fixValue = (value: string | undefined) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  };
  // 处理value和defaultValue的冲突
  if ('value' in rest) {
    delete rest.defaultValue;
    rest.value = fixValue(rest.value as string | undefined);
  }
  return (
    <div className={inputClassName}>
      {prefix && <div className="input-prefix">{prefix}</div>}
      <input {...rest} disabled={isDisabled} />
      {icon && <FontAwesomeIcon icon={icon} className="input-icon" />}
      {suffix && <div className="input-suffix">{suffix}</div>}
    </div>
  );
};
