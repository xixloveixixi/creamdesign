import type { Meta, StoryObj } from '@storybook/react';
import { ConfigProvider, enterpriseTheme } from 'creamdesign-lib';
import { Tag, TagProps, TagColor, TagSize } from 'creamdesign-lib/Tag/Tag';

const meta: Meta<TagProps> = {
  title: 'Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: Object.values(TagColor),
      description: '标签颜色',
    },
    size: {
      control: { type: 'select' },
      options: Object.values(TagSize),
      description: '标签尺寸',
    },
    clickable: {
      control: 'boolean',
      description: '是否可点击',
    },
    closable: {
      control: 'boolean',
      description: '是否可删除',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '标签',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag color="default">Default</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="danger">Danger</Tag>
      <Tag color="info">Info</Tag>
    </div>
  ),
};
Colors.storyName = '各种颜色';

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tag size="small">Small</Tag>
      <Tag size="medium">Medium</Tag>
      <Tag size="large">Large</Tag>
    </div>
  ),
};
Sizes.storyName = '各种尺寸';

export const Clickable: Story = {
  args: {
    children: '可点击标签',
    clickable: true,
  },
};

export const Closable: Story = {
  args: {
    children: '可删除标签',
    closable: true,
  },
};

export const TagsGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag color="primary">标签一</Tag>
      <Tag color="success">标签二</Tag>
      <Tag color="warning">标签三</Tag>
      <Tag color="danger">标签四</Tag>
      <Tag color="info">标签五</Tag>
    </div>
  ),
};
TagsGroup.storyName = '标签组';

export const SemanticTheme: Story = {
  args: {
    color: 'success',
    size: 'large',
  },

  render: args => (
    <ConfigProvider theme={enterpriseTheme}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Tag {...args}>Controlled</Tag>
        <Tag color="primary">Primary</Tag>
        <Tag color="success">Success</Tag>
        <Tag color="warning">Warning</Tag>
        <Tag color="danger">Danger</Tag>
        <Tag color="info">Info</Tag>
      </div>
    </ConfigProvider>
  ),
};
SemanticTheme.storyName = '企业级主题';
