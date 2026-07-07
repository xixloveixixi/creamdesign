import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardProps,
  Button,
  ButtonType,
  ConfigProvider,
  enterpriseTheme,
} from 'creamdesign-lib';

const meta: Meta<CardProps> = {
  title: 'Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '卡片标题',
    },
    extra: {
      control: false,
      description: '标题栏右侧附加内容（ReactNode）',
    },
    cover: {
      control: false,
      description: '卡片封面（ReactNode）',
    },
    actions: {
      control: false,
      description: '卡片底部操作按钮数组',
    },
    bordered: {
      control: 'boolean',
      description: '是否显示边框',
    },
    hoverable: {
      control: 'boolean',
      description: '鼠标悬停时是否显示阴影',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'small'],
      description: '卡片尺寸',
    },
    loading: {
      control: 'boolean',
      description: '是否显示加载骨架屏',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '卡片标题',
    bordered: true,
    hoverable: false,
    size: 'default',
    loading: false,
  },
  render: args => (
    <div style={{ width: 360 }}>
      <Card {...args}>
        <p style={{ margin: 0 }}>
          这是卡片的内容区域，可以放置任意内容，例如文字、图片或其他组件。
        </p>
      </Card>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Card
        title="项目卡片"
        extra={<a href="#">查看更多</a>}
        actions={[
          <Button key="edit" btnType={ButtonType.Primary} size="small">
            编辑
          </Button>,
          <Button key="delete" btnType={ButtonType.Danger} size="small">
            删除
          </Button>,
        ]}
      >
        <p style={{ margin: 0 }}>
          这是一个带有操作按钮和标题右侧附加内容的卡片示例。
        </p>
      </Card>
    </div>
  ),
};
WithActions.storyName = '带操作按钮';

export const WithCover: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Card
        cover={
          <img
            src="https://picsum.photos/360/200"
            alt="封面图"
            style={{ width: '100%', height: 200, objectFit: 'cover' }}
          />
        }
        title="图文卡片"
        actions={[
          <Button key="like" btnType={ButtonType.Ghost} size="small">
            👍 点赞
          </Button>,
          <Button key="share" btnType={ButtonType.Ghost} size="small">
            🔗 分享
          </Button>,
        ]}
      >
        <p style={{ margin: 0 }}>
          带封面图的卡片，常用于文章列表、商品展示等场景。
        </p>
      </Card>
    </div>
  ),
};
WithCover.storyName = '带封面图';

export const NoBorder: Story = {
  render: () => (
    <div
      style={{
        width: 360,
        background: 'var(--cream-color-primary-bg, #f5f3ff)',
        padding: 24,
        borderRadius: 8,
      }}
    >
      <Card bordered={false} title="无边框卡片">
        <p style={{ margin: 0 }}>
          无边框卡片通过阴影区分层级，适合放置在彩色背景上。
        </p>
      </Card>
    </div>
  ),
};
NoBorder.storyName = '无边框';

export const Hoverable: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Card title="悬停卡片" hoverable>
        <p style={{ margin: 0 }}>
          将鼠标悬停在此卡片上，可以看到上浮和阴影效果。
        </p>
      </Card>
    </div>
  ),
};
Hoverable.storyName = '悬停效果';

export const Small: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Card
        title="小尺寸卡片"
        size="small"
        extra={<span>附加</span>}
        actions={[
          <Button key="ok" btnType={ButtonType.Primary} size="small">
            确认
          </Button>,
        ]}
      >
        <p style={{ margin: 0, fontSize: 14 }}>
          小尺寸卡片适用于信息密集的布局场景。
        </p>
      </Card>
    </div>
  ),
};
Small.storyName = '小尺寸';

export const Loading: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Card title="加载中" loading>
        <p style={{ margin: 0 }}>该内容不会显示。</p>
      </Card>
    </div>
  ),
};
Loading.storyName = '加载骨架屏';

export const ContentOnly: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Card>
        <p style={{ margin: 0 }}>
          这是一张仅有内容区域的简洁卡片，没有标题和操作按钮。
        </p>
      </Card>
    </div>
  ),
};
ContentOnly.storyName = '仅内容';

export const CardList: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', width: 760 }}>
      {['设计', '开发', '测试'].map((tag, i) => (
        <div key={i} style={{ width: 220 }}>
          <Card
            title={`${tag}任务`}
            hoverable
            extra={
              <span
                style={{
                  color: 'var(--cream-color-primary, #9333ea)',
                  fontSize: 12,
                }}
              >
                进行中
              </span>
            }
            actions={[
              <Button key="detail" btnType={ButtonType.Text} size="small">
                详情
              </Button>,
            ]}
          >
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: 'var(--cream-color-text-secondary, #616161)',
              }}
            >
              这是 {tag} 阶段的任务说明，点击详情查看更多。
            </p>
          </Card>
        </div>
      ))}
    </div>
  ),
};
CardList.storyName = '卡片列表';

export const EnterpriseThemeCard: Story = {
  render: () => (
    <ConfigProvider theme={enterpriseTheme}>
      <div
        style={{
          width: 760,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 16,
          padding: 24,
          background: 'var(--cream-color-bg-elevated)',
          borderRadius: 12,
        }}
      >
        <Card
          title="项目概览"
          hoverable
          extra={
            <span
              style={{
                color: 'var(--cream-color-primary)',
                fontSize: 12,
              }}
            >
              进行中
            </span>
          }
          actions={[
            <Button key="detail" btnType={ButtonType.Text} size="small">
              查看
            </Button>,
            <Button key="edit" btnType={ButtonType.Primary} size="small">
              编辑
            </Button>,
          ]}
        >
          <p style={{ margin: 0 }}>
            企业主题下，卡片背景、边框、文字、主色和阴影都继承全局 token。
          </p>
        </Card>

        <Card title="加载状态" loading>
          <p style={{ margin: 0 }}>该内容不会显示。</p>
        </Card>

        <Card bordered={false} title="无边框层级">
          <p style={{ margin: 0 }}>
            无边框卡片使用主题阴影表达层级，适合信息聚合区域。
          </p>
        </Card>

        <Card
          title="紧凑任务"
          size="small"
          extra={
            <span
              style={{
                color: 'var(--cream-color-text-secondary)',
                fontSize: 12,
              }}
            >
              3 项
            </span>
          }
        >
          <p style={{ margin: 0 }}>小尺寸卡片保持相同主题变量继承链路。</p>
        </Card>
      </div>
    </ConfigProvider>
  ),
};
EnterpriseThemeCard.storyName = '企业级主题';
