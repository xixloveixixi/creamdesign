import { Meta } from '@storybook/react';
import { FormItem } from './formItem';
import { Form } from './form';
import Button, { ButtonType } from '../Button';

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

// 基础表单示例：
export const BasicForm = () => (
  <Form style={{ width: '400px' }}>
    <FormItem name="username" label="用户名">
      <input type="text" />
    </FormItem>
    <FormItem name="password" label="密码">
      <input type="password" />
    </FormItem>
    <FormItem name="email">
      <input type="email" />
    </FormItem>
    <FormItem>
      <Button btnType={ButtonType.Primary}>提交</Button>
    </FormItem>
  </Form>
);

// 带必填字段的表单示例：
export const RequiredForm = () => (
  <Form style={{ width: '400px' }}>
    <FormItem name="username" label="用户名" required>
      <input type="text" />
    </FormItem>
    <FormItem name="password" label="密码" required>
      <input type="password" />
    </FormItem>
    <FormItem name="email" label="邮箱" required>
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
    <FormItem name="username" label="用户名" required error="用户名不能为空">
      <input type="text" />
    </FormItem>
    <FormItem name="password" label="密码" required error="密码至少需要8位字符">
      <input type="password" />
    </FormItem>
    <FormItem name="email" label="邮箱" error="请输入有效的邮箱地址">
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
    >
      <input type="text" />
    </FormItem>
    <FormItem
      name="longLabel"
      label="这是一个非常长的标签文本"
      labelWidth="40%"
      controlWidth="60%"
      required
    >
      <input type="text" />
    </FormItem>
    <FormItem
      name="customWidth"
      label="自定义宽度"
      labelWidth="25%"
      controlWidth="75%"
      required
    >
      <input type="text" />
    </FormItem>
    <div>
      <Button btnType={ButtonType.Primary}>提交</Button>
    </div>
  </Form>
);
