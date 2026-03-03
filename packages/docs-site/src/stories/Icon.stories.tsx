import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from 'creamdesign-lib';
import type { IconTheme } from 'creamdesign-lib/Icon/Icon.d';
import {
  faUser,
  faStar,
  faCircleCheck,
  faCircleXmark,
  faTriangleExclamation,
  faCircleInfo,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faSpinner,
  faGear,
  faPlus,
  faTrash,
  faPen,
  faDownload,
  faHouse,
  faBell,
  faHeart,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Icon> = {
  title: 'Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ] as IconTheme[],
      description: '图标主题颜色',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', '1x', 'lg', '2x', '3x', '4x', '5x'],
      description: '图标大小',
    },
    spin: {
      control: 'boolean',
      description: '旋转动画',
    },
    pulse: {
      control: 'boolean',
      description: '脉冲动画',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Icon> = {
  args: {
    icon: faUser,
    theme: 'primary',
    size: '2x',
  },
};
Default.storyName = '默认图标';

const THEMES = [
  { theme: 'primary' },
  { theme: 'secondary' },
  { theme: 'success' },
  { theme: 'danger' },
  { theme: 'warning' },
  { theme: 'info' },
  { theme: 'light', bg: '#333' },
  { theme: 'dark' },
];

export const Themes: StoryObj<typeof Icon> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',
        padding: '24px',
      }}
    >
      {THEMES.map(({ theme, bg }) => (
        <div
          key={theme as string}
          style={{
            textAlign: 'center',
            padding: '12px',
            borderRadius: '8px',
            background: bg ?? 'transparent',
            minWidth: '72px',
          }}
        >
          <Icon icon={faStar} theme={theme as IconTheme} size="2x" />
          <div
            style={{
              marginTop: '10px',
              fontSize: '12px',
              color: bg ? '#fff' : 'inherit',
              fontWeight: 500,
            }}
          >
            {theme}
          </div>
        </div>
      ))}
    </div>
  ),
};
Themes.storyName = '主题颜色';

const SIZES = ['xs', 'sm', '1x', 'lg', '2x', '3x', '4x', '5x'];

export const Sizes: StoryObj<typeof Icon> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        alignItems: 'flex-end',
        padding: '24px',
        flexWrap: 'wrap',
      }}
    >
      {SIZES.map(size => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Icon icon={faUser} size={size} theme="primary" />
          <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 500 }}>
            {size}
          </div>
        </div>
      ))}
    </div>
  ),
};
Sizes.storyName = '图标尺寸';

const STATUS_ICONS = [
  {
    icon: faCircleCheck,
    theme: 'success' as IconTheme,
    label: '成功',
    color: '#4caf50',
  },
  {
    icon: faCircleXmark,
    theme: 'danger' as IconTheme,
    label: '失败',
    color: '#f44336',
  },
  {
    icon: faTriangleExclamation,
    theme: 'warning' as IconTheme,
    label: '警告',
    color: '#ffc107',
  },
  {
    icon: faCircleInfo,
    theme: 'info' as IconTheme,
    label: '信息',
    color: '#2196f3',
  },
];

export const StatusIcons: StoryObj<typeof Icon> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '40px',
        padding: '24px',
        alignItems: 'center',
      }}
    >
      {STATUS_ICONS.map(({ icon, theme, label, color }) => (
        <div key={label} style={{ textAlign: 'center' }}>
          <Icon icon={icon} theme={theme} size="3x" />
          <div
            style={{
              marginTop: '10px',
              fontSize: '13px',
              color,
              fontWeight: 600,
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  ),
};
StatusIcons.storyName = '状态图标';

export const ArrowIcons: StoryObj<typeof Icon> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        padding: '24px',
        alignItems: 'center',
      }}
    >
      {[
        { icon: faArrowLeft, label: '向左' },
        { icon: faArrowRight, label: '向右' },
        { icon: faArrowUp, label: '向上' },
        { icon: faArrowDown, label: '向下' },
      ].map(({ icon, label }) => (
        <div key={label} style={{ textAlign: 'center' }}>
          <Icon icon={icon} theme="primary" size="2x" />
          <div style={{ marginTop: '8px', fontSize: '12px' }}>{label}</div>
        </div>
      ))}
    </div>
  ),
};
ArrowIcons.storyName = '方向图标';

export const SpinningIcons: StoryObj<typeof Icon> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '40px',
        padding: '24px',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Icon icon={faSpinner} theme="primary" size="3x" spin />
        <div style={{ marginTop: '12px', fontSize: '12px' }}>spin</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon={faGear} theme="secondary" size="3x" spin />
        <div style={{ marginTop: '12px', fontSize: '12px' }}>faGear + spin</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon={faSpinner} theme="info" size="3x" pulse />
        <div style={{ marginTop: '12px', fontSize: '12px' }}>pulse</div>
      </div>
    </div>
  ),
};
SpinningIcons.storyName = '旋转动画';

const COMMON_ICONS = [
  { icon: faUser, label: 'faUser' },
  { icon: faHouse, label: 'faHouse' },
  { icon: faGear, label: 'faGear' },
  { icon: faBell, label: 'faBell' },
  { icon: faHeart, label: 'faHeart' },
  { icon: faStar, label: 'faStar' },
  { icon: faMagnifyingGlass, label: 'faSearch' },
  { icon: faTrash, label: 'faTrash' },
  { icon: faPen, label: 'faPen' },
  { icon: faPlus, label: 'faPlus' },
  { icon: faDownload, label: 'faDownload' },
];

export const CommonIcons: StoryObj<typeof Icon> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        padding: '24px',
      }}
    >
      {COMMON_ICONS.map(({ icon, label }) => (
        <div
          key={label}
          style={{
            textAlign: 'center',
            width: '88px',
            padding: '12px 8px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
          }}
        >
          <Icon icon={icon} size="2x" theme="primary" />
          <div
            style={{ marginTop: '10px', fontSize: '10px', color: '#616161' }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  ),
};
CommonIcons.storyName = '常用图标';

export const InButtonContext: StoryObj<typeof Icon> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        padding: '24px',
        flexWrap: 'wrap',
      }}
    >
      {[
        { icon: faPlus, label: '新增', bg: '#9333ea', color: '#fff' },
        { icon: faTrash, label: '删除', bg: '#f44336', color: '#fff' },
        { icon: faPen, label: '编辑', bg: '#2196f3', color: '#fff' },
        { icon: faDownload, label: '下载', bg: '#4caf50', color: '#fff' },
      ].map(({ icon, label, bg, color }) => (
        <button
          key={label}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            background: bg,
            color,
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          <Icon icon={icon} />
          {label}
        </button>
      ))}
    </div>
  ),
};
InButtonContext.storyName = '图标按钮示例';
