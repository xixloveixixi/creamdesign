// name: 字段名称，对应表单控件的唯一标识
// value: 字段当前值，初始为空字符串
// rules: 验证规则数组，类型为any[]以便灵活扩展
// isValid: 字段验证状态，布尔类型

import { useReducer, useState } from 'react';
import Schema, { RuleItem, ValidateError } from 'async-validator';
import { each, mapValues } from 'lodash-es';
// 创建一个函数的类型，支持返回 Promise 的自定义验证
// CustomRuleFunc: 接收包含getFieldValue方法的对象，返回 Promise
// 如果验证失败，返回 Promise.reject({ message: string })
// 如果验证成功，返回 Promise.resolve()
// CustomRule: RuleItem与CustomRuleFunc的联合类型
export type CustomRuleFunc = ({
  getFieldValue,
}: {
  getFieldValue: (name: string) => string;
}) => RuleItem;

export type CustomRule = RuleItem | CustomRuleFunc;
// errors: 错误信息数组，存储多条验证错误信息
export interface FieldDetail {
  name: string;
  value: string;
  rules: CustomRule[]; // 验证规则数组，类型为RuleItem[]以便灵活扩展
  isValid: boolean; // 字段验证状态，布尔类型
  errors: ValidateError[]; // 错误信息数组，存储多条验证错误信息
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
  // 用于整体表单的验证
  isSubmitting?: boolean;
  errors?: Record<string, ValidateError>;
}

// 为了管理包含多个子值的复杂状态逻辑
// 我们使用useReducer来管理表单状态
export interface FieldsAction {
  type: 'addField' | 'updateField' | 'updateValidateResult';
  name: string;
  value: any;
}

// 错误的类型包括fileds和errors，创建一个错误类型的接口
export interface FormErrors extends Error {
  fields?: Record<string, ValidateError[]>;
  errors?: ValidateError[];
}
function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
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
    case 'updateValidateResult':
      return {
        ...state,
        [action.name]: { ...state[action.name], ...action.value },
      };
    default:
      return state;
  }
}
function useStore(initialValues?: Record<string, any>) {
  const [form, setForm] = useState<FormState>({
    isValid: true,
  });
  //   创建Reducer:返回更新的数据和dispatch函数
  const [fields, dispatchFields] = useReducer(fieldsReducer, {});
  const getFieldValue = (name: string) => {
    return fields[name]?.value;
  };
  // 因为descriptor的类型是{ [x: string]: CustomRule[]; }，所以需要转换为{ [x: string]: RuleItem[]; }
  const transformedRules = function (
    rules: CustomRule[] | undefined
  ): RuleItem[] {
    // 如果 rules 为空或 undefined，返回空数组
    if (!rules || rules.length === 0) {
      return [];
    }
    const result: RuleItem[] = []; // 结果数组
    rules.forEach(rule => {
      if (typeof rule === 'function') {
        const customRule = rule({ getFieldValue });
        result.push(customRule);
      } else {
        // 如果规则是 RuleItem，直接添加
        result.push(rule);
      }
    }); // 遍历规则数组，如果规则是函数，则转换为 RuleItem，否则直接添加到结果数组
    return result;
  };

  const validateField = async (name: string) => {
    const field = fields[name];
    if (!field) return;
    const { value, rules } = field;
    const valueMap = { [name]: value };
    // 转换规则并包装成 descriptor 对象格式
    // 注意！！！而 Schema 需要对象格式的 descriptor
    const transformedRuleItems = transformedRules(rules);
    const descriptor = { [name]: transformedRuleItems };
    // 创建 Schema 实例并验证
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors: ValidateError[] = [];

    try {
      await validator.validate(valueMap);
      isValid = true;
      errors = [];
    } catch (e: any) {
      isValid = false;
      // async-validator 的错误对象有 errors 属性
      errors = e.errors || [];
    }

    dispatchFields({
      type: 'updateValidateResult',
      name,
      value: { isValid, errors },
    });
  };

  // 整体表单验证函数
  const validateAllFields = async () => {
    let fieldErrors: Record<string, ValidateError[]> = {};
    let isValid = true;
    // 获取值和规则，我们使用lodash-es的mapValues方法
    const valueMap = mapValues(fields, field => field.value);
    // 进行转换：将CustomRule[]转换为RuleItem[]
    // 只处理有规则的字段
    const rulesMap: Record<string, RuleItem[]> = {};
    each(fields, (field, name) => {
      if (field.rules && field.rules.length > 0) {
        const transformedRuleItems = transformedRules(field.rules);
        if (transformedRuleItems.length > 0) {
          rulesMap[name] = transformedRuleItems;
        }
      }
    });

    // 如果没有需要验证的字段，直接返回
    if (Object.keys(rulesMap).length === 0) {
      return {
        isValid: true,
        errors: {},
        values: valueMap,
      };
    }

    // 创建Schema实例进行验证
    const validator = new Schema(rulesMap);
    // 设置表单状态为开始验证
    setForm({ ...form, isSubmitting: true });
    try {
      await validator.validate(valueMap);
      // 验证通过，清除所有字段的错误
      each(fields, (field, name) => {
        if (field.rules && field.rules.length > 0) {
          dispatchFields({
            type: 'updateField',
            name,
            value: {
              isValid: true,
              errors: [],
            },
          });
        }
      });
    } catch (e: any) {
      isValid = false;
      // async-validator 的错误对象格式：{ errors: ValidateError[], fields: Record<string, ValidateError[]> }
      const errorFields = e.fields || {};
      fieldErrors = errorFields;

      // 遍历所有字段，更新错误状态
      each(fields, (field, name) => {
        const fieldErrorList = errorFields[name] || [];
        if (fieldErrorList.length > 0) {
          // 字段有错误
          dispatchFields({
            type: 'updateField',
            name,
            value: {
              isValid: false,
              errors: fieldErrorList,
            },
          });
        } else if (field.rules && field.rules.length > 0) {
          // 字段没有错误且有规则，验证通过
          dispatchFields({
            type: 'updateField',
            name,
            value: {
              isValid: true,
              errors: [],
            },
          });
        }
      });
    } finally {
      setForm({ ...form, isSubmitting: false, isValid });
    }
    // 返回信息为
    return {
      isValid,
      errors: fieldErrors,
      values: valueMap,
    };
  };
  // 获取所有值
  const getAllFields = () => {
    return mapValues(fields, field => field.value);
  };
  // 设置值
  const setFieldValue = (name: string, value: any) => {
    if (fields[name]) {
      dispatchFields({
        type: 'updateField',
        name,
        value,
      });
    }
  };
  // 重置字段值
  const resetFields = () => {
    // 重置所有字段的值和错误状态
    each(fields, (field, name) => {
      // 如果有 initialValues，使用 initialValues 中的值，否则使用空值
      const resetValue =
        initialValues && initialValues[name] !== undefined
          ? initialValues[name]
          : '';

      dispatchFields({
        type: 'updateField',
        name,
        value: {
          value: resetValue,
          isValid: true,
          errors: [],
        },
      });
    });
    // 重置表单状态
    setForm({ isValid: true, isSubmitting: false });
  };
  return {
    form,
    setForm,
    fields,
    dispatchFields,
    validateField,
    getFieldValue,
    validateAllFields,
    resetFields,
    getAllFields,
    setFieldValue,
  };
}

export default useStore;
