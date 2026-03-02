import React, { InputHTMLAttributes } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './Input.scss';
type InputSize = 'large' | 'small';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
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
export declare const Input: React.FC<InputProps>;
export {};
//# sourceMappingURL=Input.d.ts.map