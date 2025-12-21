import { Button, ButtonSize, ButtonType } from './index';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const buttonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    // 为size属性配置控件，显式指定可用选项
    size: {
      control: {
        type: 'select',
      },
      options: ['large', 'normal', 'small'],
      description: '按钮尺寸',
    },
    // 为btnType属性配置控件，显式指定可用选项
    btnType: {
      control: {
        type: 'select',
      },
      options: Object.values(ButtonType),
      description: '按钮类型',
    },
  },
};

export default buttonMeta;
// 使用Storybook 8.x的新语法定义Default故事
export const Default: StoryObj<typeof Button> = {
  args: {
    children: 'Default Button',
  },
  render: args => <Button {...args} />,
};

export const Large: StoryObj<typeof Button> = {
  args: {
    children: 'Large Button',
  },
  render: args => <Button size={ButtonSize.Large} {...args} />,
};
Large.storyName = 'Large';

export const Small: StoryObj<typeof Button> = {
  args: {
    children: 'Small Button',
  },
  render: args => <Button size={ButtonSize.Small} {...args} />,
};
Small.storyName = 'Small';

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: 'Primary Button',
  },
  render: args => <Button btnType={ButtonType.Primary} {...args} />,
};
Primary.storyName = 'Primary';

export const Outline: StoryObj<typeof Button> = {
  args: {
    children: 'Outline Button',
  },
  render: args => <Button btnType={ButtonType.Outline} {...args} />,
};
Outline.storyName = 'Outline';

export const Danger: StoryObj<typeof Button> = {
  args: {
    children: 'Danger Button',
  },
  render: args => <Button btnType={ButtonType.Danger} {...args} />,
};
Danger.storyName = 'Danger';

export const Info: StoryObj<typeof Button> = {
  args: {
    children: 'Info Button',
  },
  render: args => <Button btnType={ButtonType.Info} {...args} />,
};
Info.storyName = 'Info';

export const Success: StoryObj<typeof Button> = {
  args: {
    children: 'Success Button',
  },
  render: args => <Button btnType={ButtonType.Success} {...args} />,
};
Success.storyName = 'Success';
