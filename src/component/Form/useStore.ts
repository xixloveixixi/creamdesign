// name: 字段名称，对应表单控件的唯一标识
// value: 字段当前值，初始为空字符串
// rules: 验证规则数组，类型为any[]以便灵活扩展
// isValid: 字段验证状态，布尔类型

import { useReducer, useState } from 'react';

// errors: 错误信息数组，存储多条验证错误信息
export interface FieldDetail {
  name: string;
  value: string;
  rules: any[];
  isValid: boolean;
  errors: any[];
}

// 采用键值对形式，键为字符串类型字段名
// 每个字段对应一个FieldDetail对象
export interface FieldsState {
  [key: string]: FieldDetail;
}

// 表单全局状态
// isValid: 表单验证状态，布尔类型
export interface FormState {
  isValid: boolean;
}

// 为了管理包含多个子值的复杂状态逻辑
// 我们使用useReducer来管理表单状态
export interface FieldsAction {
  type: 'addField' | 'updateField';
  name: string;
  value: any;
}
function filedsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: { ...action.value },
      };
    case 'updateField':
      return {
        ...state,
        [action.name]: { ...state[action.name], ...action.value },
      };
    default:
      return state;
  }
}
function useStore() {
  const [form, setForm] = useState<FormState>({
    isValid: true,
  });
  //   创建Reducer:返回更新的数据和dispatch函数
  const [fields, dispatchFields] = useReducer(filedsReducer, {});
  return {
    form,
    setForm,
    fields,
    dispatchFields,
  };
}

export default useStore;
