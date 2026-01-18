import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form, FormProps } from './form';
import { FormItem } from '../Form/formItem';
import { Input } from '../Input/input';
import Button from '../Button';
import { ButtonType } from '../Button/buttion';
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
  // 允许 console.log 输出，方便调试
  // jest.spyOn(console, 'log').mockImplementation(() => {});
});

// 测试后恢复
afterAll(() => {
  Schema.warning = originalWarn;
  jest.restoreAllMocks();
});
// Mock lodash-es 以解决 Jest 无法解析 ES6 模块的问题
const mapValuesImpl = (obj: any, iteratee: any) => {
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
};

const eachImpl = (obj: any, iteratee: any) => {
  if (Array.isArray(obj)) {
    obj.forEach(iteratee);
  } else if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(key => iteratee(obj[key], key));
  }
};

jest.mock('lodash-es', () => ({
  each: eachImpl,
  mapValues: mapValuesImpl,
}));

// 使用与 BasicForm 相同的自定义验证规则
const customRule: CustomRule[] = [
  { type: 'string', required: true, message: ' 请再次输入密码' },
  { min: 3, message: '用户名长度不能小于3位' },
  { max: 10, message: '用户名长度不能大于10位' },
  (({ getFieldValue }) => {
    return {
      validator: (rule: any, value: any, callback: (error?: Error) => void) => {
        const password = getFieldValue('password');
        const passwordConfirm = getFieldValue('passwordConfirm');
        // 使用 Promise 进行验证，但通过 callback 返回结果
        // 验证逻辑：如果密码不一致，reject；否则 resolve
        const validationPromise =
          password !== passwordConfirm
            ? Promise.reject({ message: '密码和确认密码不一致' })
            : Promise.resolve();

        validationPromise
          .then(() => {
            // 验证通过
            callback();
          })
          .catch((error: any) => {
            // 验证失败
            const message = error?.message || '验证失败';
            callback(new Error(message));
          });
      },
    };
  }) as CustomRuleFunc,
];

const testProps: FormProps = {
  name: 'test-form',
  initialValues: {
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
  },
  onFinish: jest.fn(),
  onFinishFailed: jest.fn(),
};

let usernameInput: HTMLInputElement;
let passwordInput: HTMLInputElement;
let passwordConfirmInput: HTMLInputElement;
let submitButton: HTMLButtonElement;

describe('testing Form component', () => {
  let container: HTMLElement;
  beforeEach(async () => {
    const result = render(
      <Form {...testProps}>
        {formState => {
          return (
            <>
              <FormItem
                name="username"
                label="用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                  {
                    min: 3,
                    message: '用户名长度不能小于3位',
                  },
                  {
                    max: 10,
                    message: '用户名长度不能大于10位',
                  },
                ]}
                validateTrigger="onBlur"
                valuePropsName="value"
                trigger="onChange"
                // getValueFormEvent={(e: any) => e.target.value}
              >
                <input type="text" />
              </FormItem>
              <FormItem
                name="password"
                label="密码"
                valuePropsName="value"
                trigger="onChange"
                getValueFormEvent={(e: any) => e.target.value}
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                  { min: 8, message: '密码长度不能小于8位' },
                  { max: 16, message: '密码长度不能大于16位' },
                ]}
                validateTrigger="onBlur"
              >
                <input type="password" />
              </FormItem>
              <FormItem
                name="passwordConfirm"
                label="确认密码"
                valuePropsName="value"
                trigger="onChange"
                getValueFormEvent={(e: any) => e.target.value}
                rules={customRule}
                validateTrigger="onBlur"
              >
                <input type="password" />
              </FormItem>
              <FormItem
                name="email"
                valuePropsName="value"
                trigger="onChange"
                getValueFormEvent={(e: any) => e.target.value}
              >
                <input type="email" />
              </FormItem>
              <Button btnType={ButtonType.Primary} type="submit">
                {formState.isValid ? '提交' : '提交失败'}
              </Button>
            </>
          );
        }}
      </Form>
    );

    container = result.container;

    // 等待字段注册完成
    const { getByLabelText, getByText } = screen;

    // 等待输入框渲染完成
    await waitFor(() => {
      expect(getByLabelText('用户名')).toBeInTheDocument();
      expect(getByLabelText('密码')).toBeInTheDocument();
      expect(getByLabelText('确认密码')).toBeInTheDocument();
    });

    // 使用 getByLabelText 获取输入框（更可靠）
    usernameInput = getByLabelText('用户名') as HTMLInputElement;
    passwordInput = getByLabelText('密码') as HTMLInputElement;
    passwordConfirmInput = getByLabelText('确认密码') as HTMLInputElement;

    submitButton = getByText('提交') as HTMLButtonElement;
  });

  it('should render the correct Form component', () => {
    const { getByText, getByLabelText } = screen;
    // should contains labels
    expect(getByText('用户名')).toBeInTheDocument();
    expect(getByText('密码')).toBeInTheDocument();
    expect(getByText('确认密码')).toBeInTheDocument();
    // should fill in inputs
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    // should render the submit button
    expect(submitButton).toBeInTheDocument();
  });

  it('submit form with invalid values should show the error message', async () => {
    const { getByText } = screen;

    // 1. 清空输入并触发 blur（验证触发事件）
    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.blur(usernameInput);

    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput);

    // 2. 等待验证完成和错误信息显示
    await waitFor(
      () => {
        expect(getByText('请输入用户名')).toBeInTheDocument();
        expect(getByText('请输入密码')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // 3. 提交表单 - 使用 fireEvent.submit 而不是 fireEvent.click
    const formElement = container.querySelector('form');
    expect(formElement).toBeInTheDocument();

    // 提交表单
    fireEvent.submit(formElement!);

    await waitFor(
      () => {
        // 检查 onFinishFailed 是否被调用
        expect(testProps.onFinishFailed).toHaveBeenCalled();
      },
      { timeout: 5000 }
    );

    // 验证调用参数（在 waitFor 之后，确保函数已被调用）
    expect(testProps.onFinishFailed).toHaveBeenCalledWith(
      expect.objectContaining({
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
      }),
      expect.objectContaining({
        username: expect.any(Array),
        password: expect.any(Array),
        passwordConfirm: expect.any(Array),
      })
    );

    // 确保 onFinish 没有被调用
    expect(testProps.onFinish).not.toHaveBeenCalled();
  });

  it('change single input to invalid values should trigger the validate', async () => {
    const { getByText } = screen;
    // username input, type: string
    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.blur(usernameInput);

    await waitFor(() => {
      expect(getByText('请输入用户名')).toBeInTheDocument();
    });

    fireEvent.change(usernameInput, { target: { value: '12' } });
    fireEvent.blur(usernameInput);

    await waitFor(() => {
      expect(getByText('用户名长度不能小于3位')).toBeInTheDocument();
    });
  });

  it('custom rules should work', async () => {
    const { getByText, queryByText } = screen;

    // 先设置密码
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.blur(passwordInput);

    // change and blur passwordConfirm
    fireEvent.change(passwordConfirmInput, { target: { value: '87654321' } });
    fireEvent.blur(passwordConfirmInput);

    await waitFor(() => {
      expect(getByText('密码和确认密码不一致')).toBeInTheDocument();
    });

    // change to the same
    fireEvent.change(passwordConfirmInput, { target: { value: '12345678' } });
    fireEvent.blur(passwordConfirmInput);

    await waitFor(() => {
      expect(queryByText('密码和确认密码不一致')).not.toBeInTheDocument();
    });

    // 设置用户名以满足验证要求
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.blur(usernameInput);

    // 提交表单
    const formElement = container.querySelector('form');
    expect(formElement).toBeInTheDocument();
    fireEvent.submit(formElement!);

    // submit the form with the right data
    await waitFor(() => {
      expect(testProps.onFinish).toHaveBeenCalled();
    });
  });
});
