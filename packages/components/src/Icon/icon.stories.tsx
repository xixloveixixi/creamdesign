import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Icon from './index';
import type { IconTheme } from './Icon.d';
import {
  faUser,
  faHouse,
  faCog,
  faBell,
  faHeart,
  faStar,
  faMagnifyingGlass,
  faTrash,
  faPen,
  faPlus,
  faMinus,
  faEnvelope,
  faPhone,
  faLock,
  faUnlock,
  faCloud,
  faCircleCheck,
  faCircleXmark,
  faTriangleExclamation,
  faCircleInfo,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faSpinner,
  faCheck,
  faTimes,
  faDownload,
  faUpload,
  faShareNodes,
  faCalendar,
  faClock,
  faBookmark,
  faTag,
  faFolder,
  faFile,
  faImage,
  faVideo,
  faMusic,
  faPaperPlane,
  faGear,
  faEye,
  faEyeSlash,
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

type Story = StoryObj<typeof Icon>;

// ==================== 默认图标 ====================
export const Default: Story = {
  name: '默认图标',
  args: {
    icon: faUser,
    theme: 'primary',
    size: '2x',
  },
};

// ==================== 主题颜色 ====================
const THEMES: { theme: IconTheme; bg?: string; color?: string }[] = [
  { theme: 'primary' },
  { theme: 'secondary' },
  { theme: 'success' },
  { theme: 'danger' },
  { theme: 'warning' },
  { theme: 'info' },
  { theme: 'light', bg: '#333' },
  { theme: 'dark' },
];

export const Themes: Story = {
  name: '主题颜色',
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
          key={theme}
          style={{
            textAlign: 'center',
            padding: '12px',
            borderRadius: '8px',
            background: bg ?? 'transparent',
            minWidth: '72px',
          }}
        >
          <Icon icon={faStar} theme={theme} size="2x" />
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

// ==================== 图标尺寸 ====================
const SIZES = ['xs', 'sm', '1x', 'lg', '2x', '3x', '4x', '5x'] as const;

export const Sizes: Story = {
  name: '图标尺寸',
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

// ==================== 状态图标 ====================
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

export const StatusIcons: Story = {
  name: '状态图标',
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

// ==================== 方向导航图标 ====================
export const ArrowIcons: Story = {
  name: '方向图标',
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

// ==================== 旋转动画图标 ====================
export const SpinningIcons: Story = {
  name: '旋转动画',
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
        <div style={{ marginTop: '12px', fontSize: '12px' }}>
          spin（连续旋转）
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon={faGear} theme="secondary" size="3x" spin />
        <div style={{ marginTop: '12px', fontSize: '12px' }}>faGear + spin</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon={faSpinner} theme="info" size="3x" pulse />
        <div style={{ marginTop: '12px', fontSize: '12px' }}>
          pulse（跳跃旋转）
        </div>
      </div>
    </div>
  ),
};

// ==================== 常用图标集合 ====================
const COMMON_ICONS = [
  { icon: faUser, label: 'faUser' },
  { icon: faHouse, label: 'faHouse' },
  { icon: faCog, label: 'faCog' },
  { icon: faGear, label: 'faGear' },
  { icon: faBell, label: 'faBell' },
  { icon: faHeart, label: 'faHeart' },
  { icon: faStar, label: 'faStar' },
  { icon: faMagnifyingGlass, label: 'faSearch' },
  { icon: faTrash, label: 'faTrash' },
  { icon: faPen, label: 'faPen' },
  { icon: faPlus, label: 'faPlus' },
  { icon: faMinus, label: 'faMinus' },
  { icon: faCheck, label: 'faCheck' },
  { icon: faTimes, label: 'faTimes' },
  { icon: faEnvelope, label: 'faEnvelope' },
  { icon: faPhone, label: 'faPhone' },
  { icon: faLock, label: 'faLock' },
  { icon: faUnlock, label: 'faUnlock' },
  { icon: faCloud, label: 'faCloud' },
  { icon: faDownload, label: 'faDownload' },
  { icon: faUpload, label: 'faUpload' },
  { icon: faShareNodes, label: 'faShareNodes' },
  { icon: faCalendar, label: 'faCalendar' },
  { icon: faClock, label: 'faClock' },
  { icon: faBookmark, label: 'faBookmark' },
  { icon: faTag, label: 'faTag' },
  { icon: faFolder, label: 'faFolder' },
  { icon: faFile, label: 'faFile' },
  { icon: faImage, label: 'faImage' },
  { icon: faVideo, label: 'faVideo' },
  { icon: faMusic, label: 'faMusic' },
  { icon: faPaperPlane, label: 'faPaperPlane' },
  { icon: faEye, label: 'faEye' },
  { icon: faEyeSlash, label: 'faEyeSlash' },
];

export const CommonIcons: Story = {
  name: '常用图标集合',
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
            cursor: 'default',
            transition: 'box-shadow 0.2s',
          }}
        >
          <Icon icon={icon} size="2x" theme="primary" />
          <div
            style={{
              marginTop: '10px',
              fontSize: '10px',
              color: '#616161',
              wordBreak: 'break-all',
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ==================== 自定义颜色（不使用 theme） ====================
export const CustomColor: Story = {
  name: '自定义颜色（style）',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        padding: '24px',
        alignItems: 'center',
      }}
    >
      {[
        { color: '#9333ea', label: '紫色' },
        { color: '#06b6d4', label: '青色' },
        { color: '#f97316', label: '橙色' },
        { color: '#ec4899', label: '粉色' },
        { color: '#84cc16', label: '黄绿色' },
      ].map(({ color, label }) => (
        <div key={label} style={{ textAlign: 'center' }}>
          <Icon icon={faStar} size="2x" style={{ color }} />
          <div style={{ marginTop: '10px', fontSize: '12px', color }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ==================== 图标在按钮中使用（组合示例） ====================
export const InButtonContext: Story = {
  name: '图标按钮示例',
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
