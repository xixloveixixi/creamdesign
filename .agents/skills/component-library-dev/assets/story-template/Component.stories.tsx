import type { Meta, StoryObj } from '@storybook/react';
import { {{ComponentName}} } from './index';

/**
 * {{ComponentName}} 组件用于 [功能描述]
 *
 * ### 何时使用
 * - [使用场景 1]
 * - [使用场景 2]
 *
 * ### 代码示例
 * ```tsx
 * import { {{ComponentName}} } from 'creamdesign';
 *
 * function App() {
 *   return <{{ComponentName}}>内容</{{ComponentName}}>;
 * }
 * ```
 */
const meta: Meta<typeof {{ComponentName}}> = {
  title: 'Components/{{ComponentName}}',
  component: {{ComponentName}},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '{{ComponentName}} 组件文档',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: '自定义类名',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    style: {
      description: '自定义样式',
      control: 'object',
      table: {
        type: { summary: 'CSSProperties' },
        defaultValue: { summary: '-' },
      },
    },
    disabled: {
      description: '是否禁用',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      description: '子元素',
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '-' },
      },
    },
    onClick: {
      description: '点击回调',
      action: 'clicked',
      table: {
        type: { summary: '(event) => void' },
        defaultValue: { summary: '-' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 默认状态
 */
export const Default: Story = {
  args: {
    children: '{{ComponentName}} 内容',
  },
};

/**
 * 禁用状态
 */
export const Disabled: Story = {
  args: {
    children: '禁用状态',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '禁用状态下的 {{ComponentName}}，无法交互',
      },
    },
  },
};

/**
 * 自定义样式
 */
export const CustomStyle: Story = {
  args: {
    children: '自定义样式',
    style: {
      backgroundColor: '#f0f0f0',
      padding: '20px',
    },
  },
  parameters: {
    docs: {
      description: {
        story: '通过 style 属性自定义组件样式',
      },
    },
  },
};

/**
 * 完整示例
 */
export const CompleteExample: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <{{ComponentName}} onClick={() => setCount((c) => c + 1)}>
          点击次数: {count}
        </{{ComponentName}}>
        <{{ComponentName}} disabled>禁用按钮</{{ComponentName}}>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '展示 {{ComponentName}} 的交互能力和多种状态',
      },
    },
  },
};
