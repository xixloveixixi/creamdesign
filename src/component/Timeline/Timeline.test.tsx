import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Timeline } from './Timeline';
import type { TimelineItemProps } from './Timeline';

// ===== 测试数据 =====
const basicItems: TimelineItemProps[] = [
  {
    title: '步骤一',
    content: '内容一',
    timestamp: '2026-01-01',
    status: 'completed',
  },
  {
    title: '步骤二',
    content: '内容二',
    timestamp: '2026-01-02',
    status: 'processing',
  },
  {
    title: '步骤三',
    content: '内容三',
    timestamp: '2026-01-03',
    status: 'pending',
  },
];

describe('Timeline 组件', () => {
  // ===== 1. 基础渲染测试 =====
  describe('基础渲染', () => {
    it('应正确渲染时间轴根元素', () => {
      render(<Timeline items={basicItems} />);
      expect(screen.getByRole('list', { name: '时间轴' })).toBeInTheDocument();
    });

    it('应渲染正确数量的节点', () => {
      render(<Timeline items={basicItems} />);
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(3);
    });

    it('空 items 数组时应渲染空列表', () => {
      render(<Timeline items={[]} />);
      const list = screen.getByRole('list', { name: '时间轴' });
      expect(list).toBeInTheDocument();
      expect(list.children).toHaveLength(0);
    });

    it('默认应包含 cream-timeline 和 cream-timeline--vertical 类名', () => {
      const { container } = render(<Timeline items={basicItems} />);
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveClass('cream-timeline');
      expect(root).toHaveClass('cream-timeline--vertical');
    });
  });

  // ===== 2. 节点内容测试 =====
  describe('节点内容', () => {
    it('应渲染节点标题', () => {
      render(<Timeline items={basicItems} />);
      expect(screen.getByText('步骤一')).toBeInTheDocument();
      expect(screen.getByText('步骤二')).toBeInTheDocument();
      expect(screen.getByText('步骤三')).toBeInTheDocument();
    });

    it('应渲染节点正文内容', () => {
      render(<Timeline items={basicItems} />);
      expect(screen.getByText('内容一')).toBeInTheDocument();
      expect(screen.getByText('内容二')).toBeInTheDocument();
      expect(screen.getByText('内容三')).toBeInTheDocument();
    });

    it('应渲染时间戳', () => {
      render(<Timeline items={basicItems} />);
      expect(screen.getByText('2026-01-01')).toBeInTheDocument();
      expect(screen.getByText('2026-01-02')).toBeInTheDocument();
      expect(screen.getByText('2026-01-03')).toBeInTheDocument();
    });

    it('时间戳应使用 <time> 标签渲染', () => {
      const { container } = render(
        <Timeline
          items={[
            { title: '节点', timestamp: '2026-01-01', status: 'completed' },
          ]}
        />
      );
      const timeEl = container.querySelector('time');
      expect(timeEl).toBeInTheDocument();
      expect(timeEl).toHaveAttribute('dateTime', '2026-01-01');
    });

    it('无 title 时不渲染标题区域', () => {
      const { container } = render(
        <Timeline items={[{ content: '只有内容', status: 'pending' }]} />
      );
      expect(
        container.querySelector('.cream-timeline__title')
      ).not.toBeInTheDocument();
    });

    it('无 content 时不渲染正文区域', () => {
      const { container } = render(
        <Timeline items={[{ title: '只有标题', status: 'pending' }]} />
      );
      expect(
        container.querySelector('.cream-timeline__body')
      ).not.toBeInTheDocument();
    });

    it('无 timestamp 时不渲染时间戳区域', () => {
      const { container } = render(
        <Timeline items={[{ title: '无时间戳', status: 'pending' }]} />
      );
      expect(
        container.querySelector('.cream-timeline__timestamp')
      ).not.toBeInTheDocument();
    });

    it('ReactNode title 应直接渲染', () => {
      render(
        <Timeline
          items={[
            {
              title: <span data-testid="rich-title">富文本标题</span>,
              status: 'pending',
            },
          ]}
        />
      );
      expect(screen.getByTestId('rich-title')).toBeInTheDocument();
    });
  });

  // ===== 3. 状态测试 =====
  describe('节点状态', () => {
    it('已完成节点应包含 cream-timeline__item--completed 类名', () => {
      const { container } = render(
        <Timeline items={[{ title: '已完成', status: 'completed' }]} />
      );
      const item = container.querySelector('.cream-timeline__item--completed');
      expect(item).toBeInTheDocument();
    });

    it('进行中节点应包含 cream-timeline__item--processing 类名', () => {
      const { container } = render(
        <Timeline items={[{ title: '进行中', status: 'processing' }]} />
      );
      const item = container.querySelector('.cream-timeline__item--processing');
      expect(item).toBeInTheDocument();
    });

    it('待处理节点应包含 cream-timeline__item--pending 类名', () => {
      const { container } = render(
        <Timeline items={[{ title: '待处理', status: 'pending' }]} />
      );
      const item = container.querySelector('.cream-timeline__item--pending');
      expect(item).toBeInTheDocument();
    });

    it('状态默认值为 pending', () => {
      const { container } = render(<Timeline items={[{ title: '无状态' }]} />);
      expect(
        container.querySelector('.cream-timeline__item--pending')
      ).toBeInTheDocument();
    });

    it('进行中节点应渲染脉冲动画元素', () => {
      const { container } = render(
        <Timeline items={[{ title: '进行中', status: 'processing' }]} />
      );
      expect(
        container.querySelector('.cream-timeline__processing-dot')
      ).toBeInTheDocument();
    });
  });

  // ===== 4. 自定义图标测试 =====
  describe('自定义图标', () => {
    it('传入 icon 时应渲染自定义图标', () => {
      render(
        <Timeline
          items={[
            {
              title: '自定义',
              icon: <span data-testid="custom-icon">🚀</span>,
              status: 'pending',
            },
          ]}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('传入 icon 时节点应包含 cream-timeline__node--custom 类名', () => {
      const { container } = render(
        <Timeline items={[{ title: '自定义', icon: '★', status: 'pending' }]} />
      );
      expect(
        container.querySelector('.cream-timeline__node--custom')
      ).toBeInTheDocument();
    });

    it('未传入 icon 时不应包含 cream-timeline__node--custom 类名', () => {
      const { container } = render(
        <Timeline items={[{ title: '默认', status: 'pending' }]} />
      );
      expect(
        container.querySelector('.cream-timeline__node--custom')
      ).not.toBeInTheDocument();
    });
  });

  // ===== 5. 自定义颜色测试 =====
  describe('自定义节点颜色', () => {
    it('传入 color 时节点应应用自定义颜色样式', () => {
      const { container } = render(
        <Timeline
          items={[{ title: '彩色节点', color: '#a855f7', status: 'pending' }]}
        />
      );
      const node = container.querySelector(
        '.cream-timeline__node'
      ) as HTMLElement;
      expect(node).toHaveStyle({ backgroundColor: '#a855f7' });
    });

    it('未传入 color 时节点不应有内联 backgroundColor 样式', () => {
      const { container } = render(
        <Timeline items={[{ title: '默认节点', status: 'pending' }]} />
      );
      const node = container.querySelector(
        '.cream-timeline__node'
      ) as HTMLElement;
      expect(node.style.backgroundColor).toBe('');
    });
  });

  // ===== 6. direction 属性测试 =====
  describe('direction 属性', () => {
    it('默认方向为垂直，应包含 cream-timeline--vertical 类名', () => {
      const { container } = render(<Timeline items={basicItems} />);
      expect(container.firstChild).toHaveClass('cream-timeline--vertical');
    });

    it('direction=horizontal 应包含 cream-timeline--horizontal 类名', () => {
      const { container } = render(
        <Timeline items={basicItems} direction="horizontal" />
      );
      expect(container.firstChild).toHaveClass('cream-timeline--horizontal');
    });

    it('direction=horizontal 不应包含 cream-timeline--vertical 类名', () => {
      const { container } = render(
        <Timeline items={basicItems} direction="horizontal" />
      );
      expect(container.firstChild).not.toHaveClass('cream-timeline--vertical');
    });
  });

  // ===== 7. mode 属性测试 =====
  describe('mode 属性（垂直方向）', () => {
    it('默认 mode=left，应包含 cream-timeline--mode-left 类名', () => {
      const { container } = render(
        <Timeline items={basicItems} direction="vertical" />
      );
      expect(container.firstChild).toHaveClass('cream-timeline--mode-left');
    });

    it('mode=right 应包含 cream-timeline--mode-right 类名', () => {
      const { container } = render(
        <Timeline items={basicItems} direction="vertical" mode="right" />
      );
      expect(container.firstChild).toHaveClass('cream-timeline--mode-right');
    });

    it('mode=alternate 应包含 cream-timeline--mode-alternate 类名', () => {
      const { container } = render(
        <Timeline items={basicItems} direction="vertical" mode="alternate" />
      );
      expect(container.firstChild).toHaveClass(
        'cream-timeline--mode-alternate'
      );
    });

    it('水平方向不应包含 cream-timeline--mode-left 类名', () => {
      const { container } = render(
        <Timeline items={basicItems} direction="horizontal" />
      );
      expect(container.firstChild).not.toHaveClass('cream-timeline--mode-left');
    });
  });

  // ===== 8. 最后一个节点测试 =====
  describe('最后节点无连接线', () => {
    it('最后一个节点应包含 cream-timeline__item--last 类名', () => {
      const { container } = render(<Timeline items={basicItems} />);
      const allItems = container.querySelectorAll('.cream-timeline__item');
      const lastItem = allItems[allItems.length - 1];
      expect(lastItem).toHaveClass('cream-timeline__item--last');
    });

    it('最后一个节点不应渲染连接线', () => {
      const { container } = render(<Timeline items={basicItems} />);
      const allItems = container.querySelectorAll('.cream-timeline__item');
      const lastItem = allItems[allItems.length - 1];
      expect(
        lastItem.querySelector('.cream-timeline__tail')
      ).not.toBeInTheDocument();
    });

    it('非最后节点应渲染连接线', () => {
      const { container } = render(<Timeline items={basicItems} />);
      const allItems = container.querySelectorAll('.cream-timeline__item');
      const firstItem = allItems[0];
      expect(
        firstItem.querySelector('.cream-timeline__tail')
      ).toBeInTheDocument();
    });
  });

  // ===== 9. className 与 style 属性测试 =====
  describe('className 和 style 属性', () => {
    it('应合并自定义 className', () => {
      const { container } = render(
        <Timeline items={basicItems} className="my-timeline" />
      );
      expect(container.firstChild).toHaveClass('cream-timeline');
      expect(container.firstChild).toHaveClass('my-timeline');
    });

    it('应正确传递 style 属性', () => {
      const { container } = render(
        <Timeline items={basicItems} style={{ maxWidth: 600 }} />
      );
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveStyle({ maxWidth: '600px' });
    });

    it('节点自定义 className 应被合并', () => {
      const { container } = render(
        <Timeline
          items={[{ title: '节点', status: 'pending', className: 'my-item' }]}
        />
      );
      expect(container.querySelector('.my-item')).toBeInTheDocument();
    });
  });

  // ===== 10. 无障碍测试 =====
  describe('无障碍访问', () => {
    it('根元素应有 aria-label="时间轴"', () => {
      render(<Timeline items={basicItems} />);
      expect(screen.getByRole('list', { name: '时间轴' })).toBeInTheDocument();
    });

    it('每个节点应有描述状态的 aria-label', () => {
      render(<Timeline items={[{ title: '步骤', status: 'completed' }]} />);
      expect(
        screen.getByRole('listitem', { name: /时间节点：已完成/ })
      ).toBeInTheDocument();
    });

    it('进行中状态节点 aria-label 应包含"进行中"', () => {
      render(<Timeline items={[{ title: '进行', status: 'processing' }]} />);
      expect(
        screen.getByRole('listitem', { name: /时间节点：进行中/ })
      ).toBeInTheDocument();
    });

    it('待处理状态节点 aria-label 应包含"待处理"', () => {
      render(<Timeline items={[{ title: '待处理', status: 'pending' }]} />);
      expect(
        screen.getByRole('listitem', { name: /时间节点：待处理/ })
      ).toBeInTheDocument();
    });

    it('根元素应使用语义化 <ol> 标签', () => {
      const { container } = render(<Timeline items={basicItems} />);
      expect(container.querySelector('ol')).toBeInTheDocument();
    });
  });

  // ===== 11. 快照测试 =====
  describe('快照测试', () => {
    it('默认垂直时间轴快照', () => {
      const { container } = render(<Timeline items={basicItems} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('水平时间轴快照', () => {
      const { container } = render(
        <Timeline items={basicItems} direction="horizontal" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('交替模式时间轴快照', () => {
      const { container } = render(
        <Timeline items={basicItems} direction="vertical" mode="alternate" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('包含自定义图标和颜色的快照', () => {
      const { container } = render(
        <Timeline
          items={[
            {
              title: '自定义图标',
              icon: '★',
              color: '#a855f7',
              status: 'completed',
              timestamp: '2026-01-01',
            },
            { title: '进行中', status: 'processing', content: '正在处理' },
          ]}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
