import React from 'react';
import {
  ConfigProvider,
  enterpriseTheme,
  Menu,
  MenuProps,
} from 'creamdesign-lib';
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
      <div
        style={{
          margin: '20px',
          padding: '10px',
          border: '1px solid var(--cream-color-border, #ccc)',
        }}
      >
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

export const 企业级主题: StoryObj<MenuProps> = {
  render: args => (
    <ConfigProvider theme={enterpriseTheme}>
      <div style={{ display: 'grid', gap: 24 }}>
        <Menu {...args}>
          <MenuItem>工作台</MenuItem>
          <SubMenu title="业务管理">
            <MenuItem>客户列表</MenuItem>
            <MenuItem>商机跟进</MenuItem>
            <MenuItem>合同审批</MenuItem>
          </SubMenu>
          <SubMenu title="数据中心">
            <MenuItem>经营看板</MenuItem>
            <MenuItem>报表导出</MenuItem>
          </SubMenu>
          <MenuItem>系统设置</MenuItem>
        </Menu>
        <Menu mode="vertical" defaultIndex={1} style={{ width: 220 }}>
          <MenuItem>概览</MenuItem>
          <SubMenu title="组织架构">
            <MenuItem>成员管理</MenuItem>
            <MenuItem>角色权限</MenuItem>
          </SubMenu>
          <SubMenu title="审计日志">
            <MenuItem>登录记录</MenuItem>
            <MenuItem>操作记录</MenuItem>
          </SubMenu>
          <MenuItem disabled>高级设置</MenuItem>
        </Menu>
      </div>
    </ConfigProvider>
  ),
  args: {
    mode: 'horizontal',
    defaultIndex: 0,
  },
};
