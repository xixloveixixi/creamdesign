import React from 'react';
import Menu from './Menu';
import MenuItem from './MenuItems';
import SubMenu from './SubMenu';
import type { Meta, StoryObj } from '@storybook/react';

const menuMeta: Meta<typeof Menu> = {
  title: 'Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
        { name: 'dark', value: '#333' },
      ],
    },
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
  },
  // 组件级别装饰器：为所有Menu组件的story添加统一的外层样式
  decorators: [
    Story => (
      <div
        style={{ margin: '20px', padding: '10px', border: '1px solid #ccc' }}
      >
        <h3 style={{ marginBottom: '15px' }}>Menu组件示例</h3>
        <Story />
      </div>
    ),
  ],
};

export default menuMeta;
/**
 * 默认菜单 - 基础水平布局的菜单组件示例
 * 展示了Menu组件的最基本用法，包含水平排列的菜单项
 * @param {Object} args - 菜单组件的参数
 */
export const 默认菜单: StoryObj<typeof Menu> = {
  render: args => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品中心</MenuItem>
      <MenuItem>解决方案</MenuItem>
      <MenuItem>关于我们</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
  // 添加简单的controls配置，允许在Storybook中调整菜单模式
  argTypes: {
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '菜单的布局模式',
    },
    defaultIndex: {
      control: 'number',
      description: '默认选中的菜单项索引',
    },
  },
  // 设置默认参数值
  args: {
    mode: 'horizontal',
    defaultIndex: 0,
  },
};

/**
 * 带有子菜单的菜单 - 展示包含子菜单的菜单组件
 * 演示了Menu组件如何包含可展开/收起的子菜单
 * @param {Object} args - 菜单组件的参数
 */
export const 带有子菜单的菜单: StoryObj<typeof Menu> = {
  render: args => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <SubMenu title="产品中心">
        <MenuItem>产品1</MenuItem>
        <MenuItem>产品2</MenuItem>
        <MenuItem>产品3</MenuItem>
      </SubMenu>
      <SubMenu title="解决方案">
        <MenuItem>方案1</MenuItem>
        <MenuItem>方案2</MenuItem>
      </SubMenu>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story:
          '这是包含子菜单的Menu组件用法，展示了如何创建可展开/收起的嵌套菜单。',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '菜单的布局模式',
    },
    defaultIndex: {
      control: 'number',
      description: '默认选中的菜单项索引',
    },
  },
  args: {
    mode: 'horizontal',
    defaultIndex: 0,
  },
};

/**
 * 带有禁用项的菜单 - 展示包含禁用状态菜单项的菜单组件
 * 演示了Menu组件如何处理禁用状态的菜单项和子菜单
 * @param {Object} args - 菜单组件的参数
 */
export const 带有禁用项的菜单: StoryObj<typeof Menu> = {
  render: args => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem disabled>产品中心</MenuItem>
      <SubMenu title="解决方案" disabled>
        <MenuItem>方案1</MenuItem>
        <MenuItem>方案2</MenuItem>
      </SubMenu>
      <MenuItem>关于我们</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story:
          '这是包含禁用项的Menu组件用法，展示了如何创建禁用状态的菜单项和子菜单。',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '菜单的布局模式',
    },
    defaultIndex: {
      control: 'number',
      description: '默认选中的菜单项索引',
    },
  },
  args: {
    mode: 'horizontal',
    defaultIndex: 0,
  },
};

/**
 * 带有默认选中项的菜单 - 展示具有默认选中状态的菜单组件
 * 演示了如何设置Menu组件的默认选中项
 * @param {Object} args - 菜单组件的参数
 */
export const 带有默认选中项的菜单: StoryObj<typeof Menu> = {
  render: args => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品中心</MenuItem>
      <MenuItem>解决方案</MenuItem>
      <MenuItem>关于我们</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story:
          '这是带有默认选中项的Menu组件用法，展示了如何设置默认激活的菜单项。',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '菜单的布局模式',
    },
    defaultIndex: {
      control: 'number',
      description: '默认选中的菜单项索引',
    },
  },
  args: {
    mode: 'horizontal',
    defaultIndex: 2,
  },
};

/**
 * 垂直菜单带有子菜单 - 展示垂直布局下包含嵌套子菜单的菜单组件
 * 演示了Menu组件在垂直模式下如何处理多层嵌套的子菜单
 * @param {Object} args - 菜单组件的参数
 */
export const 垂直菜单带有子菜单: StoryObj<typeof Menu> = {
  render: args => (
    <Menu {...args} style={{ width: 200, ...args.style }}>
      <MenuItem>首页</MenuItem>
      <SubMenu title="产品中心">
        <MenuItem>产品1</MenuItem>
        <MenuItem>产品2</MenuItem>
        <MenuItem>产品3</MenuItem>
      </SubMenu>
      <SubMenu title="解决方案">
        <MenuItem>方案1</MenuItem>
        <MenuItem>方案2</MenuItem>
        <SubMenu title="方案3">
          <MenuItem>子方案1</MenuItem>
          <MenuItem>子方案2</MenuItem>
        </SubMenu>
      </SubMenu>
      <MenuItem>关于我们</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story:
          '这是垂直布局下带有嵌套子菜单的Menu组件用法，展示了多层级菜单结构。',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '菜单的布局模式',
    },
    defaultIndex: {
      control: 'number',
      description: '默认选中的菜单项索引',
    },
    style: {
      control: 'object',
      description: '自定义样式',
    },
  },
  args: {
    mode: 'vertical',
    defaultIndex: 0,
  },
};
