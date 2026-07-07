import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  ButtonType,
  Card,
  ConfigProvider,
  Input,
  Progress,
  Tag,
  defaultTheme,
  enterpriseTheme,
} from 'creamdesign-lib';
import type { ThemeConfig } from 'creamdesign-lib';

const meta = {
  title: '主题/Theme',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type ThemeMode = 'default' | 'enterprise' | 'buttonOverride';

const buttonOverrideTheme: ThemeConfig = {
  ...enterpriseTheme,
  components: {
    Button: {
      colorPrimary: '#0f766e',
      colorPrimaryHover: '#0d9488',
      colorPrimaryActive: '#115e59',
      borderRadius: 4,
    },
  },
};

const themeOptions: Array<{
  label: string;
  value: ThemeMode;
  theme?: ThemeConfig;
}> = [
  {
    label: '默认主题',
    value: 'default',
  },
  {
    label: '企业级主题',
    value: 'enterprise',
    theme: enterpriseTheme,
  },
  {
    label: 'Button 覆盖',
    value: 'buttonOverride',
    theme: buttonOverrideTheme,
  },
];

const tokenGroups = [
  {
    title: 'Global Token',
    rows: [
      ['colorPrimary', '--cream-color-primary', '品牌主色'],
      ['colorPrimaryBg', '--cream-color-primary-bg', '主色浅背景'],
      ['colorText', '--cream-color-text', '正文文本色'],
      ['colorTextSecondary', '--cream-color-text-secondary', '次级文本色'],
      ['colorTextPlaceholder', '--cream-color-text-placeholder', '占位文本色'],
      ['colorTextDisabled', '--cream-color-text-disabled', '禁用文本色'],
      ['colorBorder', '--cream-color-border', '通用边框色'],
      ['colorBgContainer', '--cream-color-bg-container', '容器背景'],
      ['colorBgElevated', '--cream-color-bg-elevated', '浮层背景'],
      ['colorBgDisabled', '--cream-color-bg-disabled', '禁用背景'],
      ['borderRadius', '--cream-border-radius', '通用圆角'],
      ['boxShadow', '--cream-box-shadow', '浮层阴影'],
      ['controlFocusShadow', '--cream-control-focus-shadow', '控件焦点阴影'],
    ],
  },
  {
    title: 'Semantic Token',
    rows: [
      ['colorSuccess', '--cream-color-success', '成功状态主色'],
      ['colorSuccessBg', '--cream-color-success-bg', '成功状态背景'],
      ['colorSuccessBorder', '--cream-color-success-border', '成功状态边框'],
      ['colorWarning', '--cream-color-warning', '警告状态主色'],
      ['colorWarningBg', '--cream-color-warning-bg', '警告状态背景'],
      ['colorWarningBorder', '--cream-color-warning-border', '警告状态边框'],
      ['colorError', '--cream-color-error', '错误状态主色'],
      ['colorErrorBg', '--cream-color-error-bg', '错误状态背景'],
      ['colorErrorBorder', '--cream-color-error-border', '错误状态边框'],
      ['colorInfo', '--cream-color-info', '信息状态主色'],
      ['colorInfoBg', '--cream-color-info-bg', '信息状态背景'],
      ['colorInfoBorder', '--cream-color-info-border', '信息状态边框'],
    ],
  },
  {
    title: 'Component Token',
    rows: [
      [
        'Button.colorPrimary',
        '--cream-button-color-primary',
        'Button 主按钮色',
      ],
      [
        'Button.colorPrimaryHover',
        '--cream-button-color-primary-hover',
        'Button 主按钮 hover 色',
      ],
      [
        'Button.colorPrimaryActive',
        '--cream-button-color-primary-active',
        'Button 主按钮 active 色',
      ],
      ['Button.borderRadius', '--cream-button-border-radius', 'Button 圆角'],
      ['Table.headerBg', '--cream-table-header-bg', 'Table 表头背景'],
      ['Table.headerColor', '--cream-table-header-color', 'Table 表头文本'],
      ['Table.rowHoverBg', '--cream-table-row-hover-bg', 'Table 行 hover 背景'],
      [
        'Table.rowSelectedBg',
        '--cream-table-row-selected-bg',
        'Table 选中行背景',
      ],
      [
        'Table.cellBorderColor',
        '--cream-table-cell-border-color',
        'Table 单元格边框',
      ],
    ],
  },
];

const surfaceStyle = {
  width: 420,
} as const;

const panelStyle = {
  display: 'grid',
  gap: 16,
} as const;

const stackStyle = {
  display: 'grid',
  gap: 20,
  width: 760,
  maxWidth: 'calc(100vw - 48px)',
} as const;

const toolbarStyle = {
  display: 'inline-flex',
  gap: 8,
  padding: 4,
  border: '1px solid var(--cream-color-border, #e0e0e0)',
  borderRadius: 8,
  background: 'var(--cream-color-bg-container, #ffffff)',
} as const;

const sectionStyle = {
  display: 'grid',
  gap: 12,
} as const;

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 14,
} as const;

const cellStyle = {
  padding: '10px 12px',
  borderBottom: '1px solid var(--cream-color-border, #e0e0e0)',
  textAlign: 'left',
} as const;

const DemoSurface = () => (
  <Card
    title="业务概览"
    extra={<Tag color="success">运行中</Tag>}
    style={surfaceStyle}
    hoverable
  >
    <div style={panelStyle}>
      <Input placeholder="搜索项目或负责人" />
      <Progress percent={72} theme="success" />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Tag color="primary">重点项目</Tag>
        <Tag color="warning">待复核</Tag>
        <Tag color="info">自动同步</Tag>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button btnType={ButtonType.Primary}>查看详情</Button>
        <Button btnType={ButtonType.Outline}>导出</Button>
      </div>
    </div>
  </Card>
);

const ThemeSwitcherDemo = () => {
  const [mode, setMode] = useState<ThemeMode>('enterprise');

  const activeTheme = useMemo(
    () => themeOptions.find(option => option.value === mode)?.theme,
    [mode]
  );

  return (
    <ConfigProvider theme={activeTheme}>
      <div style={stackStyle}>
        <div style={toolbarStyle}>
          {themeOptions.map(option => (
            <Button
              key={option.value}
              btnType={
                mode === option.value ? ButtonType.Primary : ButtonType.Outline
              }
              size="small"
              onClick={() => setMode(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <DemoSurface />
      </div>
    </ConfigProvider>
  );
};

const TokenDocs = () => (
  <ConfigProvider theme={enterpriseTheme}>
    <div style={stackStyle}>
      <section style={sectionStyle}>
        <h2 style={{ margin: 0, fontSize: 24 }}>主题接入</h2>
        <p
          style={{
            margin: 0,
            color: 'var(--cream-color-text-secondary, #757575)',
            lineHeight: 1.7,
          }}
        >
          主题通过 ConfigProvider 注入 CSS Variables。组件优先读取 global token
          和 semantic token；只有 Button、Table
          这类存在稳定私有视觉语义的组件保留 component token。
        </p>
      </section>

      <section style={sectionStyle}>
        <h3 style={{ margin: 0, fontSize: 18 }}>基本用法</h3>
        <pre
          style={{
            margin: 0,
            padding: 16,
            overflow: 'auto',
            borderRadius: 8,
            color: 'var(--cream-color-text, #212121)',
            background: 'var(--cream-color-bg-disabled, #f0f0f0)',
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          {`<ConfigProvider theme={enterpriseTheme}>
  <Button btnType={ButtonType.Primary}>提交</Button>
</ConfigProvider>`}
        </pre>
      </section>

      {tokenGroups.map(group => (
        <section key={group.title} style={sectionStyle}>
          <h3 style={{ margin: 0, fontSize: 18 }}>{group.title}</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>Token</th>
                <th style={cellStyle}>CSS Variable</th>
                <th style={cellStyle}>用途</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map(([token, cssVariable, usage]) => (
                <tr key={token}>
                  <td style={cellStyle}>
                    <code>{token}</code>
                  </td>
                  <td style={cellStyle}>
                    <code>{cssVariable}</code>
                  </td>
                  <td style={cellStyle}>{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  </ConfigProvider>
);

export const 默认主题: Story = {
  render: () => (
    <ConfigProvider theme={defaultTheme}>
      <DemoSurface />
    </ConfigProvider>
  ),
};

export const 企业级主题: Story = {
  render: () => (
    <ConfigProvider theme={enterpriseTheme}>
      <DemoSurface />
    </ConfigProvider>
  ),
};

export const 组件级覆盖: Story = {
  render: () => (
    <ConfigProvider theme={buttonOverrideTheme}>
      <DemoSurface />
    </ConfigProvider>
  ),
};

export const 运行时切换: Story = {
  render: () => <ThemeSwitcherDemo />,
};

export const Token对照表: Story = {
  render: () => <TokenDocs />,
};
