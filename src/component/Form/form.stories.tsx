import { Meta } from '@storybook/react';
import { FormItem } from './formItem';
import { Form } from './form';
import Button, { ButtonType } from '../Button';
import { CustomRule } from './useStore';
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
export const BasicForm = () => (
  <Form style={{ width: '400px' }}>
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
      <Button btnType={ButtonType.Primary}>提交</Button>
    </FormItem>
  </Form>
);

// 带必填字段的表单示例：
export const RequiredForm = () => (
  <Form
    style={{ width: '400px' }}
    initialValues={{
      username: 'jyx',
      checkbox: true,
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
      <Button btnType={ButtonType.Primary}>提交</Button>
    </div>
  </Form>
);

// 带验证错误的表单示例：
export const ErrorForm = () => (
  <Form style={{ width: '400px' }}>
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
      <Button btnType={ButtonType.Primary}>提交</Button>
    </div>
  </Form>
);

// 自定义宽度的表单示例：
export const CustomWidthForm = () => (
  <Form style={{ width: '500px' }}>
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
      <Button btnType={ButtonType.Primary}>提交</Button>
    </div>
  </Form>
);
