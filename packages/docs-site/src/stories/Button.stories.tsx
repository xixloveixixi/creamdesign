import { Button, ButtonSize, ButtonType } from 'creamdesign-lib';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonProps } from 'creamdesign-lib';

const buttonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['large', 'normal', 'small'],
      description: '按钮尺寸',
    },
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

export const Default: StoryObj<typeof Button> = {
  args: {
    children: 'Default Button',
  },
  render: (args: ButtonProps) => <Button {...args} />,
};

export const Large: StoryObj<typeof Button> = {
  args: {
    children: 'Large Button',
  },
  render: (args: ButtonProps) => <Button size={ButtonSize.Large} {...args} />,
};
Large.storyName = 'Large';

export const Small: StoryObj<typeof Button> = {
  args: {
    children: 'Small Button',
  },
  render: (args: ButtonProps) => <Button size={ButtonSize.Small} {...args} />,
};
Small.storyName = 'Small';

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: 'Primary Button',
  },
  render: (args: ButtonProps) => (
    <Button btnType={ButtonType.Primary} {...args} />
  ),
};
Primary.storyName = 'Primary';

export const Outline: StoryObj<typeof Button> = {
  args: {
    children: 'Outline Button',
  },
  render: (args: ButtonProps) => (
    <Button btnType={ButtonType.Outline} {...args} />
  ),
};
Outline.storyName = 'Outline';

export const Danger: StoryObj<typeof Button> = {
  args: {
    children: 'Danger Button',
  },
  render: (args: ButtonProps) => (
    <Button btnType={ButtonType.Danger} {...args} />
  ),
};
Danger.storyName = 'Danger';

export const Info: StoryObj<typeof Button> = {
  args: {
    children: 'Info Button',
  },
  render: (args: ButtonProps) => <Button btnType={ButtonType.Info} {...args} />,
};
Info.storyName = 'Info';

export const Success: StoryObj<typeof Button> = {
  args: {
    children: 'Success Button',
  },
  render: (args: ButtonProps) => (
    <Button btnType={ButtonType.Success} {...args} />
  ),
};
Success.storyName = 'Success';
