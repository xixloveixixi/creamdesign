import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ConfigProvider,
  enterpriseTheme,
  Timeline,
  TimelineProps,
  TimelineItemProps,
} from 'creamdesign-lib';

const meta: Meta<TimelineProps> = {
  title: 'Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: '排列方向',
    },
    mode: {
      control: { type: 'select' },
      options: ['left', 'right', 'alternate'],
      description: '内容排列模式',
    },
  },
};

export default meta;

const baseItems: TimelineItemProps[] = [
  {
    title: '需求评审',
    content: '完成产品需求文档评审，确认功能范围与优先级。',
    timestamp: '2026-01-10 10:00',
    status: 'completed',
  },
  {
    title: '设计稿完成',
    content: '完成 UI/UX 设计稿，并通过设计评审。',
    timestamp: '2026-01-15 14:30',
    status: 'completed',
  },
  {
    title: '开发中',
    content: '前端组件开发，目前正在进行中。',
    timestamp: '2026-02-01 09:00',
    status: 'processing',
  },
  {
    title: '测试阶段',
    content: '功能测试、性能测试与兼容性测试。',
    timestamp: '2026-02-20 10:00',
    status: 'pending',
  },
  {
    title: '上线发布',
    content: '部署至生产环境，完成上线。',
    timestamp: '2026-03-01 18:00',
    status: 'pending',
  },
];

export const Default: StoryObj<TimelineProps> = {
  args: {
    items: baseItems,
    direction: 'vertical',
    mode: 'left',
  },
  render: args => (
    <div style={{ width: 480 }}>
      <Timeline items={baseItems} {...args} />
    </div>
  ),
};
Default.storyName = '默认时间轴';

export const StatusVariants: StoryObj<TimelineProps> = {
  render: () => (
    <div style={{ width: 480 }}>
      <Timeline
        items={[
          {
            title: '已完成（completed）',
            content: '该步骤已成功完成。',
            timestamp: '2026-01-10',
            status: 'completed',
          },
          {
            title: '进行中（processing）',
            content: '该步骤正在进行中，带有脉冲动画。',
            timestamp: '2026-02-01',
            status: 'processing',
          },
          {
            title: '待处理（pending）',
            content: '该步骤尚未开始。',
            timestamp: '2026-03-01',
            status: 'pending',
          },
        ]}
      />
    </div>
  ),
};
StatusVariants.storyName = '三种节点状态';

export const CustomIcon: StoryObj<TimelineProps> = {
  render: () => (
    <div style={{ width: 480 }}>
      <Timeline
        items={[
          {
            title: '创建账号',
            content: '填写基本信息完成注册。',
            timestamp: '2026-01-01',
            status: 'completed',
            icon: '👤',
          },
          {
            title: '绑定手机',
            content: '验证手机号码以保障账号安全。',
            timestamp: '2026-01-02',
            status: 'completed',
            icon: '📱',
          },
          {
            title: '实名认证',
            content: '上传证件完成身份认证，处理中。',
            timestamp: '2026-01-03',
            status: 'processing',
            icon: '🪪',
          },
          {
            title: '开通服务',
            content: '认证完成后即可开通相关服务。',
            timestamp: '2026-01-10',
            status: 'pending',
            icon: '🚀',
          },
        ]}
      />
    </div>
  ),
};
CustomIcon.storyName = '自定义图标';

export const CustomColor: StoryObj<TimelineProps> = {
  render: () => (
    <div style={{ width: 480 }}>
      <Timeline
        items={[
          {
            title: '紫色节点',
            content: '使用品牌主色。',
            timestamp: '2026-01-01',
            color: '#a855f7',
          },
          {
            title: '橙色节点',
            content: '使用警告色。',
            timestamp: '2026-01-02',
            color: '#f97316',
          },
          {
            title: '蓝色节点',
            content: '使用信息色。',
            timestamp: '2026-01-03',
            color: '#2196f3',
          },
          {
            title: '红色节点',
            content: '使用错误色。',
            timestamp: '2026-01-04',
            color: '#f44336',
          },
        ]}
      />
    </div>
  ),
};
CustomColor.storyName = '自定义节点颜色';

export const ModeRight: StoryObj<TimelineProps> = {
  render: () => (
    <div style={{ width: 480 }}>
      <Timeline items={baseItems} direction="vertical" mode="right" />
    </div>
  ),
};
ModeRight.storyName = '垂直居右模式';

export const ModeAlternate: StoryObj<TimelineProps> = {
  render: () => (
    <div style={{ width: 640 }}>
      <Timeline items={baseItems} direction="vertical" mode="alternate" />
    </div>
  ),
};
ModeAlternate.storyName = '垂直交替模式';

export const Horizontal: StoryObj<TimelineProps> = {
  render: () => (
    <div style={{ width: '100%', maxWidth: 720 }}>
      <Timeline
        direction="horizontal"
        items={[
          { title: '立项', timestamp: '1月', status: 'completed' },
          { title: '设计', timestamp: '2月', status: 'completed' },
          { title: '开发', timestamp: '3月', status: 'processing' },
          { title: '测试', timestamp: '4月', status: 'pending' },
          { title: '发布', timestamp: '5月', status: 'pending' },
        ]}
      />
    </div>
  ),
};
Horizontal.storyName = '水平时间轴';

export const TitleOnly: StoryObj<TimelineProps> = {
  render: () => (
    <div style={{ width: 360 }}>
      <Timeline
        items={[
          { title: '提交申请', timestamp: '周一', status: 'completed' },
          { title: '审核中', timestamp: '周三', status: 'processing' },
          { title: '等待审批', timestamp: '周五', status: 'pending' },
        ]}
      />
    </div>
  ),
};
TitleOnly.storyName = '仅标题模式';

export const RichTitle: StoryObj<TimelineProps> = {
  render: () => (
    <div style={{ width: 480 }}>
      <Timeline
        items={[
          {
            title: (
              <span>
                需求评审{' '}
                <span
                  style={{
                    fontSize: 12,
                    color: '#4caf50',
                    background: '#e8f5e9',
                    borderRadius: 4,
                    padding: '1px 6px',
                    marginLeft: 6,
                  }}
                >
                  已完成
                </span>
              </span>
            ),
            content: '完成产品需求文档评审。',
            timestamp: '2026-01-10',
            status: 'completed',
          },
          {
            title: (
              <span>
                开发阶段{' '}
                <span
                  style={{
                    fontSize: 12,
                    color: '#9333ea',
                    background: '#f5f3ff',
                    borderRadius: 4,
                    padding: '1px 6px',
                    marginLeft: 6,
                  }}
                >
                  进行中
                </span>
              </span>
            ),
            content: '前端、后端并行开发。',
            timestamp: '2026-02-01',
            status: 'processing',
          },
          {
            title: '上线发布',
            content: '生产环境部署。',
            timestamp: '2026-03-01',
            status: 'pending',
          },
        ]}
      />
    </div>
  ),
};
RichTitle.storyName = '富文本标题';

export const EnterpriseTheme: StoryObj<TimelineProps> = {
  render: args => (
    <ConfigProvider theme={enterpriseTheme}>
      <div style={{ display: 'grid', gap: 32 }}>
        <div style={{ width: 520 }}>
          <Timeline {...args} />
        </div>
        <div style={{ maxWidth: 760 }}>
          <Timeline
            direction="horizontal"
            items={[
              { title: '立项', timestamp: 'Q1', status: 'completed' },
              { title: '方案确认', timestamp: 'Q2', status: 'completed' },
              { title: '上线准备', timestamp: 'Q3', status: 'processing' },
              { title: '复盘归档', timestamp: 'Q4', status: 'pending' },
            ]}
          />
        </div>
      </div>
    </ConfigProvider>
  ),
  args: {
    items: [
      {
        title: '需求确认',
        content: '完成业务范围、验收口径和排期确认。',
        timestamp: '2026-01-08',
        status: 'completed',
      },
      {
        title: '设计评审',
        content: '完成交互、视觉和组件状态评审。',
        timestamp: '2026-01-18',
        status: 'completed',
      },
      {
        title: '开发联调',
        content: '主题变量迁移和业务接入同步推进。',
        timestamp: '2026-02-05',
        status: 'processing',
      },
      {
        title: '发布验收',
        content: '完成回归、文档和发布检查。',
        timestamp: '2026-02-20',
        status: 'pending',
      },
    ],
    direction: 'vertical',
    mode: 'left',
  },
};
EnterpriseTheme.storyName = '企业级主题';
