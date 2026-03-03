import React from 'react';
import { Menu, MenuProps } from 'creamdesign-lib';
import { MenuItem } from 'creamdesign-lib/Menu/MenuItems';
import { SubMenu } from 'creamdesign-lib/Menu/SubMenu';
import type { Meta, StoryObj } from '@storybook/react';

const menuMeta: Meta<MenuProps> = {
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
  },
  decorators: [
    Story => (
      <div style={{ margin: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3 style={{ marginBottom: '15px' }}>Menu组件示例</h3>
        <Story />
      </div>
    ),
  ],
};

export default menuMeta;

export const 默认菜单: StoryObj<MenuProps> = {
  render: args => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品中心</MenuItem>
      <MenuItem>解决方案</MenuItem>
      <MenuItem>关于我们</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
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

export const 带有子菜单的菜单: StoryObj<MenuProps> = {
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
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '菜单的布局模式',
    },
  },
  args: {
    mode: 'horizontal',
  },
};
带有子菜单的菜单.storyName = '带子菜单';

export const 带有禁用项的菜单: StoryObj<MenuProps> = {
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
  argTypes: {
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    mode: 'horizontal',
  },
};
带有禁用项的菜单.storyName = '带禁用项';

export const 带有默认选中项的菜单: StoryObj<MenuProps> = {
  render: args => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品中心</MenuItem>
      <MenuItem>解决方案</MenuItem>
      <MenuItem>关于我们</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
  args: {
    mode: 'horizontal',
    defaultIndex: 2,
  },
};
带有默认选中项的菜单.storyName = '带默认选中';

export const 垂直菜单带有子菜单: StoryObj<MenuProps> = {
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
  args: {
    mode: 'vertical',
    defaultIndex: 0,
  },
};
垂直菜单带有子菜单.storyName = '垂直菜单';
