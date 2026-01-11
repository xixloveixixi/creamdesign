import { Meta } from '@storybook/react';
import { FormItem } from './formItem';
import { Form, FormRefType } from './form';
import Button, { ButtonType } from '../Button';
import { CustomRule } from './useStore';
import { useRef } from 'react';
const meta: Meta<typeof Form> = {
  title: 'Form组件',
  component: Form,
  subcomponents: { FormItem: FormItem as any },
  decorators: [
    Story => (
      <div style={{ padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export default meta;
const customRule: CustomRule[] = [
  { type: 'string', required: true, message: ' 请再次输入密码' },
  { min: 3, message: '用户名长度不能小于3位' },
  { max: 10, message: '用户名长度不能大于10位' },
  ({ getFieldValue }) => {
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
  },
];
// 基础表单示例：
export const BasicForm = (args: any) => {
  const ref = useRef<FormRefType>(null);
  return (
    <Form
      style={{ width: '400px' }}
      {...args}
      ref={ref}
      initialValues={{
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
      }}
      onFinish={values => {
        console.log('表单提交成功:', values);
      }}
      onFinishFailed={(values, errors) => {
        console.log('表单提交失败:', values, errors);
      }}
    >
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
              getValueFormEvent={(e: any) => e.target.value}
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
            <FormItem
              valuePropsName="value"
              trigger="onChange"
              getValueFormEvent={(e: any) => e.target.value}
            >
              <Button btnType={ButtonType.Primary} type="submit">
                {formState.isValid ? '提交' : '提交失败'}
              </Button>
            </FormItem>
            <div>
              <Button
                btnType={ButtonType.Primary}
                type="button"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  ref.current?.resetFields();
                }}
              >
                重置
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
};

// 带必填字段的表单示例：
export const RequiredForm = () => (
  <Form
    style={{ width: '400px' }}
    initialValues={{
      username: 'jyx',
      checkbox: true,
    }}
    onFinish={values => {
      console.log('表单提交成功:', values);
    }}
    onFinishFailed={(values, errors) => {
      console.log('表单提交失败:', values, errors);
    }}
  >
    <FormItem
      name="username"
      label="用户名"
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
      required
    >
      <input type="text" />
    </FormItem>
    <FormItem
      name="password"
      label="密码"
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
      required
    >
      <input type="password" />
    </FormItem>
    <FormItem
      name="email"
      label="邮箱"
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
      required
    >
      <input type="email" />
    </FormItem>
    {/* 验证不同的事件和value属性名称 */}
    <FormItem
      name="checkbox"
      label="复选框"
      required
      valuePropsName="checked"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.checked}
    >
      <input type="checkbox" />
      <a href="https://www.baidu.com" target="_blank">
        同意
      </a>
    </FormItem>
    <div>
      <Button btnType={ButtonType.Primary} type="submit">
        提交
      </Button>
    </div>
  </Form>
);

// 带验证错误的表单示例：
export const ErrorForm = () => (
  <Form
    style={{ width: '400px' }}
    onFinish={values => {
      console.log('表单提交成功:', values);
    }}
    onFinishFailed={(values, errors) => {
      console.log('表单提交失败:', values, errors);
    }}
  >
    <FormItem
      name="username"
      label="用户名"
      required
      error="用户名不能为空"
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
    >
      <input type="text" />
    </FormItem>
    <FormItem
      name="password"
      label="密码"
      required
      error="密码至少需要8位字符"
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
    >
      <input type="password" />
    </FormItem>
    <FormItem
      name="email"
      label="邮箱"
      error="请输入有效的邮箱地址"
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
    >
      <input type="email" />
    </FormItem>
    <div>
      <Button btnType={ButtonType.Primary} type="submit">
        提交
      </Button>
    </div>
  </Form>
);

// 自定义宽度的表单示例：
export const CustomWidthForm = () => (
  <Form
    style={{ width: '500px' }}
    onFinish={values => {
      console.log('表单提交成功:', values);
    }}
    onFinishFailed={(values, errors) => {
      console.log('表单提交失败:', values, errors);
    }}
  >
    <FormItem
      name="shortLabel"
      label="短"
      labelWidth="10%"
      controlWidth="90%"
      required
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
    >
      <input type="text" />
    </FormItem>
    <FormItem
      name="longLabel"
      label="这是一个非常长的标签文本"
      labelWidth="40%"
      controlWidth="60%"
      required
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
    >
      <input type="text" />
    </FormItem>
    <FormItem
      name="customWidth"
      label="自定义宽度"
      labelWidth="25%"
      controlWidth="75%"
      required
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
    >
      <input type="text" />
    </FormItem>
    <div>
      <Button btnType={ButtonType.Primary} type="submit">
        提交
      </Button>
    </div>
  </Form>
);

// 使用 ref 控制表单的示例：
export const FormWithRef = () => {
  const formRef = useRef<FormRefType>(null);
  return (
    <Form
      style={{ width: '400px' }}
      ref={formRef}
      initialValues={{
        username: 'test',
        password: '',
      }}
    >
      <FormItem
        name="username"
        label="用户名"
        valuePropsName="value"
        trigger="onChange"
        getValueFormEvent={(e: any) => e.target.value}
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}
        validateTrigger="onBlur"
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
        ]}
        validateTrigger="onBlur"
      >
        <input type="password" />
      </FormItem>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button btnType={ButtonType.Primary} type="submit">
          提交
        </Button>
        <Button
          btnType={ButtonType.Secondary}
          type="button"
          onClick={() => {
            formRef.current?.resetFields();
          }}
        >
          重置
        </Button>
        <Button
          btnType={ButtonType.Secondary}
          type="button"
          onClick={async () => {
            await formRef.current?.validateAllFields();
          }}
        >
          验证全部
        </Button>
        <Button
          btnType={ButtonType.Secondary}
          type="button"
          onClick={() => {
            const values = formRef.current?.getAllFields?.();
            console.log('当前表单值:', values);
          }}
        >
          获取所有值
        </Button>
      </div>
    </Form>
  );
};

// 多种输入类型的表单示例：
export const MultipleInputTypesForm = () => (
  <Form
    style={{ width: '400px' }}
    onFinish={values => {
      console.log('表单提交成功:', values);
    }}
  >
    <FormItem
      name="text"
      label="文本输入"
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
    >
      <input type="text" placeholder="请输入文本" />
    </FormItem>
    <FormItem
      name="number"
      label="数字输入"
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
    >
      <input type="number" placeholder="请输入数字" />
    </FormItem>
    <FormItem
      name="email"
      label="邮箱输入"
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
      rules={[
        {
          type: 'email',
          message: '请输入有效的邮箱地址',
        },
      ]}
      validateTrigger="onBlur"
    >
      <input type="email" placeholder="请输入邮箱" />
    </FormItem>
    <FormItem
      name="date"
      label="日期输入"
      valuePropsName="value"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.value}
    >
      <input type="date" />
    </FormItem>
    <FormItem
      name="checkbox"
      label="复选框"
      valuePropsName="checked"
      trigger="onChange"
      getValueFormEvent={(e: any) => e.target.checked}
    >
      <input type="checkbox" />
      <span style={{ marginLeft: '8px' }}>我同意</span>
    </FormItem>
    <div>
      <Button btnType={ButtonType.Primary} type="submit">
        提交
      </Button>
    </div>
  </Form>
);

// 复杂验证规则的表单示例：
export const ComplexValidationForm = () => {
  const phoneRule: CustomRule[] = [
    {
      required: true,
      message: '请输入手机号',
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入有效的手机号',
    },
  ];

  const emailRule: CustomRule[] = [
    {
      required: true,
      message: '请输入邮箱',
    },
    {
      type: 'email',
      message: '请输入有效的邮箱地址',
    },
  ];

  return (
    <Form
      style={{ width: '400px' }}
      onFinish={values => {
        console.log('表单提交成功:', values);
      }}
      onFinishFailed={(values, errors) => {
        console.log('表单提交失败:', values, errors);
      }}
    >
      <FormItem
        name="phone"
        label="手机号"
        valuePropsName="value"
        trigger="onChange"
        getValueFormEvent={(e: any) => e.target.value}
        rules={phoneRule}
        validateTrigger="onBlur"
      >
        <input type="tel" placeholder="请输入手机号" />
      </FormItem>
      <FormItem
        name="email"
        label="邮箱"
        valuePropsName="value"
        trigger="onChange"
        getValueFormEvent={(e: any) => e.target.value}
        rules={emailRule}
        validateTrigger="onBlur"
      >
        <input type="email" placeholder="请输入邮箱" />
      </FormItem>
      <FormItem
        name="age"
        label="年龄"
        valuePropsName="value"
        trigger="onChange"
        getValueFormEvent={(e: any) => e.target.value}
        rules={[
          {
            required: true,
            message: '请输入年龄',
          },
          {
            type: 'number',
            min: 18,
            max: 100,
            message: '年龄必须在18-100之间',
            transform: value => Number(value),
          },
        ]}
        validateTrigger="onBlur"
      >
        <input type="number" placeholder="请输入年龄" />
      </FormItem>
      <div>
        <Button btnType={ButtonType.Primary} type="submit">
          提交
        </Button>
      </div>
    </Form>
  );
};
