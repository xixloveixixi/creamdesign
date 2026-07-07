import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { ConfigProvider, enterpriseTheme } from '../ConfigProvider';

const meta: Meta<typeof Tag> = {
  title: 'Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '标签',
  },
};

export const SemanticTheme: Story = {
  render: () => (
    <ConfigProvider theme={enterpriseTheme}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
