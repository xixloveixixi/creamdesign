import { Meta } from '@storybook/react';
import { Form, FormRefType } from 'creamdesign-lib';
import { FormItem } from 'creamdesign-lib/Form/FormItem';
import { Button, ButtonType } from 'creamdesign-lib';
import { CustomRule } from 'creamdesign-lib/Form/useStore';
import { useRef } from 'react';

const meta: Meta<typeof Form> = {
  title: 'Form',
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
  { type: 'string', required: true, message: '请再次输入密码' },
  { min: 3, message: '用户名长度不能小于3位' },
  { max: 10, message: '用户名长度不能大于10位' },
  ({ getFieldValue }) => {
    return {
      validator: (rule: any, value: any, callback: (error?: Error) => void) => {
        const password = getFieldValue('password');
        const passwordConfirm = getFieldValue('passwordConfirm');
        const validationPromise =
          password !== passwordConfirm
            ? Promise.reject({ message: '密码和确认密码不一致' })
            : Promise.resolve();

        validationPromise
          .then(() => {
            callback();
          })
          .catch((error: any) => {
            const message = error?.message || '验证失败';
            callback(new Error(message));
          });
      },
    };
  },
];

export const BasicForm = {
  render: () => {
    const ref = useRef<FormRefType>(null);
    return (
      <Form
        style={{ width: '400px' }}
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
                  { required: true, message: '请输入用户名' },
                  { min: 3, message: '用户名长度不能小于3位' },
                  { max: 10, message: '用户名长度不能大于10位' },
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
                  { required: true, message: '请输入密码' },
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
  },
};
BasicForm.storyName = '基础表单';

export const RequiredForm = {
  render: () => (
    <Form
      style={{ width: '400px' }}
      initialValues={{
        username: 'jyx',
        checkbox: true,
      }}
      onFinish={values => {
        console.log('表单提交成功:', values);
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
        name="checkbox"
        label="复选框"
        required
        valuePropsName="checked"
        trigger="onChange"
        getValueFormEvent={(e: any) => e.target.checked}
      >
        <input type="checkbox" />
        <a href="https://www.baidu.com" target="_blank" rel="noreferrer">
          同意
        </a>
      </FormItem>
      <div>
        <Button btnType={ButtonType.Primary} type="submit">
          提交
        </Button>
      </div>
    </Form>
  ),
};
RequiredForm.storyName = '必填字段表单';

export const ErrorForm = {
  render: () => (
    <Form
      style={{ width: '400px' }}
      onFinish={values => {
        console.log('表单提交成功:', values);
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
      <div>
        <Button btnType={ButtonType.Primary} type="submit">
          提交
        </Button>
      </div>
    </Form>
  ),
};
ErrorForm.storyName = '带错误提示';

export const FormWithRef = {
  render: () => {
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
          rules={[{ required: true, message: '请输入用户名' }]}
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
          rules={[{ required: true, message: '请输入密码' }]}
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
        </div>
      </Form>
    );
  },
};
FormWithRef.storyName = '使用 Ref 控制';
