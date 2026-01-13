// 主要渲染html原生的表单

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';
import './Form.scss';
import useStore, { FormState } from './useStore';
import React from 'react';
import validateAllFields from './useStore';
import { ValidateError } from 'async-validator';
import { forwardRef } from 'react';
export interface FormProps {
  name?: string;
  children?: ReactNode | ReactProps;
  className?: string;
  style?: React.CSSProperties;
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => void;
}
export type FormRefType = Omit<
  ReturnType<typeof useStore>,
  'form' | 'dispatchFields' | 'fields'
>;
export type ReactProps = (formProps: FormState) => ReactNode;
// 这是ts的一个高级写法，可以获取useStore的返回值类型
// 而且只获取dispatchFields这个属性
export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  'dispatchFields' | 'fields' | 'validateField'
> &
  Pick<FormProps, 'initialValues'>;
export const FormContext = createContext<IFormContext>({
  dispatchFields: () => {},
  fields: {},
  validateField: async (name: string) => {},
  initialValues: {},
});
// 注意这里的类型要使用泛型来定义，因为ref是React.RefObject<HTMLFormElement>类型
export const Form = forwardRef<FormRefType, FormProps>((props, ref) => {
  const {
    name,
    children,
    className,
    style,
    initialValues,
    onFinish,
    onFinishFailed,
  } = props;
  // 初始化store
  const { form, setForm, fields, dispatchFields, ...restProps } =
    useStore(initialValues);
  const { validateField, validateAllFields } = restProps;

  // 创建内部 ref 用于 DOM 元素
  const formRef = useRef<HTMLFormElement>(null);

  // 使用 useImperativeHandle 暴露表单方法给外部 ref
  useImperativeHandle(ref, () => ({
    ...restProps,
    setForm, // 添加 setForm，因为 FormRefType 需要它
  }));
  // filedItem挂载之后需要修改store的状态，使用dispatchFields进行修改
  // 父传子显然是行不通的
  // 我们采用context进行状态管理
  const contextValue: IFormContext = {
    dispatchFields,
    fields,
    validateField,
    initialValues,
  };

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    // 执行表单验证
    const { isValid, errors, values } = await validateAllFields();
    // 根据验证结果调用相应的回调
    if (isValid) {
      if (onFinish) {
        onFinish(values);
      }
    } else {
      if (onFinishFailed) {
        onFinishFailed(values, errors);
      }
    }
  }
  let childrenNode = null;
  if (typeof children === 'function') {
    childrenNode = children(form);
  } else {
    childrenNode = children;
  }
  return (
    <div>
      <form
        className="cream-form"
        style={style}
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        <FormContext.Provider value={contextValue}>
          {childrenNode}
        </FormContext.Provider>
      </form>
      <div>
        <pre>{JSON.stringify(fields, null, 2)}</pre>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </div>
  );
});

Form.defaultProps = {
  name: 'form',
};
