/**
 * 响应式测试 Story
 * 用于测试 Table 组件在不同设备上的表现
 */

import { Meta, StoryObj } from '@storybook/react';
import Table, { TableProps } from './TableContainer';
import { useState } from 'react';
import Button from '../Button';
import { ButtonSize, ButtonType } from '../Button/buttion';

const meta: Meta<typeof Table> = {
  title: 'Table组件/响应式测试',
  component: Table,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = Array.from({ length: 50 }, (_, i) => ({
  key: String(i + 1),
  name: `用户 ${i + 1}`,
  age: 20 + (i % 30),
  address: `地址 ${i + 1} 号，这是一个比较长的地址信息用于测试响应式布局`,
  tags: i % 2 === 0 ? ['nice', 'developer'] : ['cool'],
}));

const columns: TableProps<DataType>['columns'] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => tags.join(', '),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Button
          btnType={ButtonType.Primary}
          size={ButtonSize.Small}
          onClick={() => console.log('编辑', record.name)}
        >
          编辑
        </Button>
        <Button
          btnType={ButtonType.Danger}
          size={ButtonSize.Small}
          onClick={() => console.log('删除', record.name)}
        >
          删除
        </Button>
      </div>
    ),
  },
];

// 手机端测试
export const MobileTest: Story = {
  render: () => (
    <div
      style={{
        width: '375px',
        height: '667px',
        margin: '0 auto',
        border: '2px solid #ccc',
      }}
    >
      <Table<DataType> columns={columns} dataSource={data} virtual={false} />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// 平板端测试
export const TabletTest: Story = {
  render: () => (
    <div
      style={{
        width: '768px',
        height: '1024px',
        margin: '0 auto',
        border: '2px solid #ccc',
      }}
    >
      <Table<DataType> columns={columns} dataSource={data} virtual={true} />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

// 桌面端测试
export const DesktopTest: Story = {
  render: () => (
    <div
      style={{
        width: '1920px',
        height: '1080px',
        margin: '0 auto',
        border: '2px solid #ccc',
      }}
    >
      <Table<DataType> columns={columns} dataSource={data} virtual={true} />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

// 动态尺寸测试组件
const DynamicSizeTestComponent = () => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  return (
    <div>
      <div
        style={{
          padding: '1rem',
          background: '#f0f0f0',
          marginBottom: '1rem',
        }}
      >
        <h3>动态尺寸测试</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            宽度:{' '}
            <input
              type="number"
              value={width}
              onChange={e => setWidth(Number(e.target.value))}
              style={{ width: '100px' }}
            />{' '}
            px
          </label>
          <br />
          <label>
            高度:{' '}
            <input
              type="number"
              value={height}
              onChange={e => setHeight(Number(e.target.value))}
              style={{ width: '100px' }}
            />{' '}
            px
          </label>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setWidth(375);
              setHeight(667);
            }}
          >
            iPhone SE
          </button>
          <button
            onClick={() => {
              setWidth(390);
              setHeight(844);
            }}
          >
            iPhone 12
          </button>
          <button
            onClick={() => {
              setWidth(768);
              setHeight(1024);
            }}
          >
            iPad
          </button>
          <button
            onClick={() => {
              setWidth(1024);
              setHeight(1366);
            }}
          >
            iPad Pro
          </button>
          <button
            onClick={() => {
              setWidth(1920);
              setHeight(1080);
            }}
          >
            Desktop
          </button>
        </div>
      </div>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          margin: '0 auto',
          border: '2px solid #ccc',
          overflow: 'auto',
        }}
      >
        <Table<DataType>
          columns={columns}
          dataSource={data}
          virtual={width >= 992}
        />
      </div>
    </div>
  );
};

// 动态尺寸测试
export const DynamicSizeTest: Story = {
  render: () => <DynamicSizeTestComponent />,
};

// 真实设备测试说明
export const RealDeviceTest: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h2>真实设备测试步骤</h2>
      <ol style={{ lineHeight: '2' }}>
        <li>
          <strong>确保设备和电脑在同一网络</strong>
        </li>
        <li>
          <strong>启动 Storybook:</strong>
          <pre
            style={{
              background: '#f0f0f0',
              padding: '0.5rem',
              borderRadius: '0.25rem',
            }}
          >
            npm run storybook
          </pre>
        </li>
        <li>
          <strong>获取本机 IP 地址:</strong>
          <pre
            style={{
              background: '#f0f0f0',
              padding: '0.5rem',
              borderRadius: '0.25rem',
            }}
          >
            # Mac/Linux ifconfig | grep "inet " # Windows ipconfig
          </pre>
        </li>
        <li>
          <strong>在设备浏览器访问:</strong>
          <pre
            style={{
              background: '#f0f0f0',
              padding: '0.5rem',
              borderRadius: '0.25rem',
            }}
          >
            http://你的IP:6006
          </pre>
        </li>
        <li>
          <strong>测试项目:</strong>
          <ul>
            <li>✅ 布局是否适配</li>
            <li>✅ 触摸目标是否足够大</li>
            <li>✅ 滚动是否流畅</li>
            <li>✅ 交互是否正常</li>
          </ul>
        </li>
      </ol>
    </div>
  ),
};
