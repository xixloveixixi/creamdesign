import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { ConfigProvider } from '../ConfigProvider';

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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7c3aed',
          colorPrimaryBg: '#f3e8ff',
          colorSuccess: '#16a34a',
          colorSuccessBg: '#ecfdf3',
          colorWarning: '#ca8a04',
          colorWarningBg: '#fffbeb',
          colorError: '#dc2626',
          colorErrorBg: '#fef2f2',
          colorInfo: '#2563eb',
          colorInfoBg: '#eff6ff',
        },
      }}
    >
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
