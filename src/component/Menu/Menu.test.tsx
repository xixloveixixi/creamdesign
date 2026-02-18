import React from 'react';
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItems';
const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test-menu',
};
const testVerticalProps: MenuProps = {
  ...testProps,
  mode: 'vertical',
};
const normalMenu = (props: MenuProps) => (
  <Menu {...props}>
    <MenuItem>active</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>Item 3</MenuItem>
    <li>
      <a href="https://github.com/creamdesign/creamdesign">GitHub Repository</a>
    </li>
  </Menu>
);
const verticalMenu = (props: MenuProps) => (
  <Menu {...props}>
    <MenuItem>Item 1</MenuItem>
    <MenuItem>Item 2</MenuItem>
    <MenuItem>Item 3</MenuItem>
  </Menu>
);
// 通用的放在beforeEach中
let wrapper: RenderResult,
  activeItem: HTMLElement,
  disabledItem: HTMLElement,
  menuItems: HTMLElement[];
describe('Menu Component', () => {
  beforeEach(() => {
    wrapper = render(normalMenu(testProps));
    menuItems = Array.from(
      wrapper.getByTestId('menu-list').querySelectorAll('li')
    );
    activeItem = wrapper.getByText('active');
    disabledItem = wrapper.getByText('disabled');
  });
  //   提供默认属性，会不会渲染成功
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(wrapper.getByTestId('menu-list')).toBeInTheDocument();
    expect(wrapper.getByTestId('menu-list')).toHaveClass('menu');
    expect(menuItems.length).toEqual(3);
    expect(activeItem).toHaveClass('menu-item-active');
    expect(disabledItem).toHaveClass('menu-item-disabled');
  });
  // 点击行为
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('Item 3');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('menu-item-active');
    expect(activeItem).not.toHaveClass('menu-item-active');
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    // 点击禁用项不触发回调
    fireEvent.click(disabledItem);
    expect(disabledItem).not.toHaveClass('menu-item-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });
  // 垂直
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(verticalMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId('menu-list');
    expect(menuElement).toHaveClass('menu-vertical');
  });
});
