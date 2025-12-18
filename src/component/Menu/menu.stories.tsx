import React from 'react';
import Menu from './Menu';
import MenuItem from './MenuItems';
import SubMenu from './SubMenu';
import type { Meta, StoryObj } from '@storybook/react';

const menuMeta: Meta<typeof Menu> = {
  title: 'Menu',
  component: Menu,
  tags: ['autodocs'],
};

export default menuMeta;
// 基本水平菜单
export const 水平菜单: StoryObj<typeof Menu> = {
  render: () => (
    <Menu>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品中心</MenuItem>
      <MenuItem>解决方案</MenuItem>
      <MenuItem>关于我们</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
};

// 垂直菜单
export const 垂直菜单: StoryObj<typeof Menu> = {
  render: () => (
    <Menu mode="vertical" style={{ width: 200 }}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品中心</MenuItem>
      <MenuItem>解决方案</MenuItem>
      <MenuItem>关于我们</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
};

// 带有子菜单的菜单
export const 带有子菜单的菜单: StoryObj<typeof Menu> = {
  render: () => (
    <Menu>
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
};

// 带有禁用项的菜单
export const 带有禁用项的菜单: StoryObj<typeof Menu> = {
  render: () => (
    <Menu>
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
};

// 带有默认选中项的菜单
export const 带有默认选中项的菜单: StoryObj<typeof Menu> = {
  render: () => (
    <Menu defaultIndex={2}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品中心</MenuItem>
      <MenuItem>解决方案</MenuItem>
      <MenuItem>关于我们</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
};

// 垂直菜单带有子菜单
export const 垂直菜单带有子菜单: StoryObj<typeof Menu> = {
  render: () => (
    <Menu mode="vertical" style={{ width: 200 }}>
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
};

// 自定义样式的菜单
export const MenuWithCustomStyle: StoryObj<typeof Menu> = {
  render: () => (
    <Menu
      className="custom-menu"
      style={{
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        padding: '8px',
      }}
    >
      <MenuItem style={{ color: '#333' }}>首页</MenuItem>
      <MenuItem style={{ color: '#333' }}>产品中心</MenuItem>
      <MenuItem style={{ color: '#333' }}>解决方案</MenuItem>
      <MenuItem style={{ color: '#333' }}>关于我们</MenuItem>
      <MenuItem style={{ color: '#333' }}>联系我们</MenuItem>
    </Menu>
  ),
};
