import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form, FormProps } from './form';
import { FormItem } from '../Form/formItem';
import { Input } from '../Input/input';
import Button, { ButtonType } from '../Button';
import { CustomRule, CustomRuleFunc } from './useStore';
import Schema from 'async-validator';
let originalWarn: any;
// 在测试前抑制警告
beforeAll(() => {
  // 保存原始方法
  const originalWarn = Schema.warning;

  // 替换为静默版本
  Schema.warning = () => {};

  // 或者只在当前测试文件中抑制
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  // 修复 JSDOM 中 form.submit() 的问题
  HTMLFormElement.prototype.submit = jest.fn();
});

// 测试后恢复
afterAll(() => {
  Schema.warning = originalWarn;
  jest.restoreAllMocks();
});
// Mock lodash-es 以解决 Jest 无法解析 ES6 模块的问题
jest.mock('lodash-es', () => ({
  each: jest.fn((obj: any, iteratee: any) => {
    if (Array.isArray(obj)) {
      obj.forEach(iteratee);
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => iteratee(obj[key], key));
    }
  }),
  mapValues: jest.fn((obj: any, iteratee: any) => {
    // 如果 obj 是 null 或 undefined，返回空对象
    if (obj == null) {
      return {};
    }
    // 如果 obj 不是对象类型，返回空对象
    if (typeof obj !== 'object') {
      return {};
    }
    // 处理对象，映射每个字段的值
    const result: any = {};
    // 确保 iteratee 是一个函数
    if (typeof iteratee !== 'function') {
      return result;
    }
    Object.keys(obj).forEach(key => {
      const field = obj[key];
      // 如果字段存在，使用 iteratee 处理
      if (field != null) {
        result[key] = iteratee(field, key);
      }
    });
    return result;
  }),
}));

const testProps: FormProps = {
  name: 'test-form',
  initialValues: { name: 'cream', password: '12345', confirmPwd: '23456' },
  onFinish: jest.fn(),
  onFinishFailed: jest.fn(),
};

let nameInput: HTMLInputElement;
let pwdInput: HTMLInputElement;
let conPwdInput: HTMLInputElement;
let submitButton: HTMLButtonElement;

describe('testing Form component', () => {
  let container: HTMLElement;
  beforeEach(async () => {
    const result = render(
      <Form {...testProps}>
        <FormItem
          label="Name"
          name="name"
          rules={[
            { type: 'string', required: true, message: 'name error' },
            { type: 'string', min: 3, message: 'less than 3' },
          ]}
          valuePropsName="value"
          trigger="onChange"
          getValueFormEvent={(e: any) => e.target.value}
        >
          <Input />
        </FormItem>
        <FormItem
          label="Password"
          name="password"
          rules={[
            { type: 'string', required: true, message: 'password error' },
            { type: 'string', min: 4, message: 'less then 4' },
          ]}
        >
          <Input type="password" />
        </FormItem>
        <FormItem
          label="Confirm"
          name="confirmPwd"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'confirm password error',
            },
            { type: 'string', min: 4, message: 'less then 4' },
            (({ getFieldValue }) => ({
              validator: (
                rule: any,
                value: any,
                callback: (error?: Error) => void
              ) => {
                const password = getFieldValue('password');
                if (value !== password) {
                  callback(new Error('Do not match!'));
                } else {
                  callback();
                }
              },
            })) as CustomRuleFunc,
          ]}
        >
          <Input type="password" />
        </FormItem>
        <Button type="submit" btnType={ButtonType.Primary}>
          Log in
        </Button>
      </Form>
    );

    container = result.container;

    // 等待字段注册完成
    // 注意：password 类型的 input 无法使用 getByDisplayValue，因为浏览器不会显示其值
    const { getByDisplayValue, getByText } = screen;

    // 等待 name input 渲染完成
    nameInput = getByDisplayValue('cream') as HTMLInputElement;

    // 等待 password input 渲染完成
    // 使用 container.querySelectorAll 查找所有 password 类型的 input
    // 由于 Input 组件被包裹在多层 div 中，且 label 和 input 不在同一父元素中
    // 直接查找所有 password input 更可靠
    await waitFor(() => {
      const passwordInputs = container.querySelectorAll(
        'input[type="password"]'
      );
      expect(passwordInputs.length).toBeGreaterThanOrEqual(2);
    });

    const passwordInputs = container.querySelectorAll('input[type="password"]');
    pwdInput = passwordInputs[0] as HTMLInputElement; // 第一个 password input (Password)
    conPwdInput = passwordInputs[1] as HTMLInputElement; // 第二个 password input (Confirm)

    submitButton = getByText('Log in') as HTMLButtonElement;
  });

  it('should render the correct Form component', () => {
    // 在这里就检查出来了一个错误，label如果没有和input嵌套就要添加for和id属性，不然会报错
    // 但是input是我门使用cloneElement进行混合的，添加id属性即可
    const { getByText } = screen;
    // should contains two labels
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
    // should fill in three inputs
    expect(nameInput).toBeInTheDocument();
    expect(pwdInput).toBeInTheDocument();
    expect(conPwdInput).toBeInTheDocument();
    // should render the submit button
    expect(submitButton).toBeInTheDocument();
  });

  //   it('submit form with invalid values should show the error message', async () => {
  //     const { getByText } = screen;

  //     // 1. 清空输入并触发 blur（验证触发事件）
  //     fireEvent.change(nameInput, { target: { value: '' } });
  //     fireEvent.blur(nameInput);

  //     fireEvent.change(pwdInput, { target: { value: '' } });
  //     fireEvent.blur(pwdInput);

  //     // 2. 等待验证完成和错误信息显示
  //     await waitFor(
  //       () => {
  //         expect(getByText('name error')).toBeInTheDocument();
  //         expect(getByText('password error')).toBeInTheDocument();
  //       },
  //       { timeout: 2000 }
  //     );

  //     // 3. 额外等待确保状态更新完成
  //     await new Promise(resolve => setTimeout(resolve, 100));

  //     // 4. 提交表单 - 使用 fireEvent.submit 而不是 fireEvent.click
  //     const formElement = container.querySelector('form');
  //     expect(formElement).toBeInTheDocument();
  //     fireEvent.submit(formElement!);

  //     // 5. 等待表单处理
  //     await waitFor(
  //       () => {
  //         // 检查 onFinishFailed 是否被调用
  //         expect(testProps.onFinishFailed).toHaveBeenCalled();
  //       },
  //       { timeout: 3000 }
  //     );
  //   });

  it('change single input to invalid values should trigger the validate', async () => {
    const { getByText } = screen;
    // name input, type: string
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(getByText('name error')).toBeInTheDocument();
    });

    fireEvent.change(nameInput, { target: { value: '12' } });
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(getByText('less than 3')).toBeInTheDocument();
    });
  });

  it('custom rules should work', async () => {
    const { getByText, queryByText } = screen;
    // change and blur confirmPwd
    fireEvent.change(conPwdInput, { target: { value: '23456' } });
    fireEvent.blur(conPwdInput);

    await waitFor(() => {
      expect(getByText('Do not match!')).toBeInTheDocument();
    });

    // change to the same
    fireEvent.change(conPwdInput, { target: { value: '12345' } });
    fireEvent.blur(conPwdInput);

    await waitFor(() => {
      expect(queryByText('Do not match!')).not.toBeInTheDocument();
    });

    fireEvent.click(submitButton);
    // submit the form with the right data
    await waitFor(() => {
      expect(testProps.onFinish).toHaveBeenCalled();
    });
  });
});
