import {
  Button,
  ButtonSize,
  ButtonType,
  ConfigProvider,
  enterpriseTheme,
} from 'creamdesign-lib';
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

export const EnterpriseThemeButtons: StoryObj<typeof Button> = {
  render: () => (
    <ConfigProvider
      theme={{
        ...enterpriseTheme,
        components: {
          Button: {
            colorPrimary: '#0f766e',
            colorPrimaryHover: '#0d9488',
            colorPrimaryActive: '#115e59',
            borderRadius: 4,
          },
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          maxWidth: 560,
        }}
      >
        <Button btnType={ButtonType.Primary}>Primary</Button>
        <Button btnType={ButtonType.Secondary}>Secondary</Button>
        <Button btnType={ButtonType.Outline}>Outline</Button>
        <Button btnType={ButtonType.Ghost}>Ghost</Button>
        <Button btnType={ButtonType.Text}>Text</Button>
        <Button btnType={ButtonType.Success}>Success</Button>
        <Button btnType={ButtonType.Warning}>Warning</Button>
        <Button btnType={ButtonType.Info}>Info</Button>
        <Button btnType={ButtonType.Danger}>Danger</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
    </ConfigProvider>
  ),
};
EnterpriseThemeButtons.storyName = '企业级主题';
