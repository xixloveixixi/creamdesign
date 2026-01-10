// 主要渲染html原生的表单

import { createContext, Dispatch, FC, ReactNode } from 'react';
import './Form.scss';
import useStore from './useStore';
import React from 'react';
import validateAllFields from './useStore';
import { ValidateError } from 'async-validator';
export interface FormProps {
  name?: string;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => void;
}
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
export const Form: FC<FormProps> = props => {
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
  const {
    form,
    setForm,
    fields,
    dispatchFields,
    validateField,
    validateAllFields,
  } = useStore();
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
    if (isValid && onFinish) {
      onFinish(values);
    } else if (onFinishFailed) {
      onFinishFailed(values, errors);
    }
  }
  return (
    <div>
      <form className="cream-form" style={style} onSubmit={onFormSubmit}>
        <FormContext.Provider value={contextValue}>
          {children}
        </FormContext.Provider>
      </form>
      <div>
        <pre>{JSON.stringify(fields, null, 2)}</pre>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </div>
  );
};

Form.defaultProps = {
  name: 'form',
};
