import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';

describe('Card 组件', () => {
  // ===== 1. 基础渲染测试 =====
  describe('基础渲染', () => {
    it('应正确渲染默认卡片', () => {
      render(<Card>内容</Card>);
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByText('内容')).toBeInTheDocument();
    });

    it('默认应包含 cream-card 基础类名', () => {
      render(<Card>内容</Card>);
      const card = screen.getByRole('article');
      expect(card).toHaveClass('cream-card');
    });

    it('无标题时不渲染头部区域', () => {
      render(<Card>内容</Card>);
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('无 actions 时不渲染操作区', () => {
      render(<Card>内容</Card>);
      expect(screen.queryByRole('group')).not.toBeInTheDocument();
    });
  });

  // ===== 2. title 属性测试 =====
  describe('title 属性', () => {
    it('字符串 title 应渲染为 h4 标签', () => {
      render(<Card title="卡片标题">内容</Card>);
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('卡片标题');
      expect(heading).toHaveClass('cream-card__title-text');
    });

    it('ReactNode title 应直接渲染', () => {
      render(
        <Card title={<span data-testid="custom-title">自定义标题</span>}>
          内容
        </Card>
      );
      expect(screen.getByTestId('custom-title')).toBeInTheDocument();
    });

    it('有标题时应渲染 cream-card__header 区域', () => {
      const { container } = render(<Card title="标题">内容</Card>);
      expect(
        container.querySelector('.cream-card__header')
      ).toBeInTheDocument();
    });
  });

  // ===== 3. extra 属性测试 =====
  describe('extra 属性', () => {
    it('应渲染 extra 内容', () => {
      render(
        <Card title="标题" extra={<a href="#">查看</a>}>
          内容
        </Card>
      );
      expect(screen.getByText('查看')).toBeInTheDocument();
    });

    it('仅有 extra 没有 title 时也应渲染头部', () => {
      const { container } = render(<Card extra={<span>附加</span>}>内容</Card>);
      expect(
        container.querySelector('.cream-card__header')
      ).toBeInTheDocument();
    });

    it('extra 应在头部右侧渲染（包含 cream-card__extra 类）', () => {
      const { container } = render(
        <Card title="标题" extra={<span>附加</span>}>
          内容
        </Card>
      );
      expect(container.querySelector('.cream-card__extra')).toBeInTheDocument();
    });
  });

  // ===== 4. cover 属性测试 =====
  describe('cover 属性', () => {
    it('应渲染封面内容', () => {
      render(<Card cover={<img src="test.jpg" alt="封面" />}>内容</Card>);
      expect(screen.getByAltText('封面')).toBeInTheDocument();
    });

    it('封面区域应有 cream-card__cover 类名', () => {
      const { container } = render(
        <Card cover={<img src="test.jpg" alt="封面" />}>内容</Card>
      );
      expect(container.querySelector('.cream-card__cover')).toBeInTheDocument();
    });

    it('无 cover 时不渲染封面区域', () => {
      const { container } = render(<Card>内容</Card>);
      expect(
        container.querySelector('.cream-card__cover')
      ).not.toBeInTheDocument();
    });
  });

  // ===== 5. actions 属性测试 =====
  describe('actions 属性', () => {
    it('应渲染操作按钮', () => {
      render(
        <Card
          actions={[
            <button key="ok">确认</button>,
            <button key="cancel">取消</button>,
          ]}
        >
          内容
        </Card>
      );
      expect(screen.getByText('确认')).toBeInTheDocument();
      expect(screen.getByText('取消')).toBeInTheDocument();
    });

    it('actions 区域应有 role="group" 属性', () => {
      render(<Card actions={[<button key="btn">按钮</button>]}>内容</Card>);
      expect(
        screen.getByRole('group', { name: '卡片操作' })
      ).toBeInTheDocument();
    });

    it('空数组 actions 时不渲染操作区', () => {
      render(<Card actions={[]}>内容</Card>);
      expect(screen.queryByRole('group')).not.toBeInTheDocument();
    });
  });

  // ===== 6. bordered 属性测试 =====
  describe('bordered 属性', () => {
    it('bordered 默认为 true，应包含 cream-card--bordered 类名', () => {
      render(<Card>内容</Card>);
      expect(screen.getByRole('article')).toHaveClass('cream-card--bordered');
    });

    it('bordered=false 时不应包含 cream-card--bordered 类名', () => {
      render(<Card bordered={false}>内容</Card>);
      expect(screen.getByRole('article')).not.toHaveClass(
        'cream-card--bordered'
      );
    });
  });

  // ===== 7. hoverable 属性测试 =====
  describe('hoverable 属性', () => {
    it('hoverable 默认为 false，不应包含 cream-card--hoverable 类名', () => {
      render(<Card>内容</Card>);
      expect(screen.getByRole('article')).not.toHaveClass(
        'cream-card--hoverable'
      );
    });

    it('hoverable=true 时应包含 cream-card--hoverable 类名', () => {
      render(<Card hoverable>内容</Card>);
      expect(screen.getByRole('article')).toHaveClass('cream-card--hoverable');
    });
  });

  // ===== 8. size 属性测试 =====
  describe('size 属性', () => {
    it('size 默认为 default，不应包含 cream-card--small 类名', () => {
      render(<Card>内容</Card>);
      expect(screen.getByRole('article')).not.toHaveClass('cream-card--small');
    });

    it('size=small 时应包含 cream-card--small 类名', () => {
      render(<Card size="small">内容</Card>);
      expect(screen.getByRole('article')).toHaveClass('cream-card--small');
    });
  });

  // ===== 9. loading 属性测试 =====
  describe('loading 属性', () => {
    it('loading=true 时应渲染骨架屏而非 children', () => {
      render(<Card loading>真实内容</Card>);
      expect(screen.queryByText('真实内容')).not.toBeInTheDocument();
      expect(screen.getByLabelText('加载中')).toBeInTheDocument();
    });

    it('loading=true 时应包含 cream-card--loading 类名', () => {
      render(<Card loading>内容</Card>);
      expect(screen.getByRole('article')).toHaveClass('cream-card--loading');
    });

    it('loading=false 时应正常渲染 children', () => {
      render(<Card loading={false}>真实内容</Card>);
      expect(screen.getByText('真实内容')).toBeInTheDocument();
    });
  });

  // ===== 10. className 与 style 属性测试 =====
  describe('className 和 style 属性', () => {
    it('应合并自定义 className', () => {
      render(<Card className="my-card">内容</Card>);
      const card = screen.getByRole('article');
      expect(card).toHaveClass('cream-card');
      expect(card).toHaveClass('my-card');
    });

    it('应正确传递 style 属性', () => {
      render(<Card style={{ width: 300 }}>内容</Card>);
      const card = screen.getByRole('article');
      expect(card).toHaveStyle({ width: '300px' });
    });
  });

  // ===== 11. 无障碍访问测试 =====
  describe('无障碍访问', () => {
    it('卡片根元素应有 role="article"', () => {
      render(<Card>内容</Card>);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('操作区域应有正确的 aria-label', () => {
      render(<Card actions={[<button key="btn">操作</button>]}>内容</Card>);
      expect(
        screen.getByRole('group', { name: '卡片操作' })
      ).toBeInTheDocument();
    });

    it('骨架屏应有 aria-label 以提示屏幕阅读器', () => {
      render(<Card loading>内容</Card>);
      expect(screen.getByLabelText('加载中')).toBeInTheDocument();
    });

    it('封面区域应有 aria-hidden 属性', () => {
      const { container } = render(
        <Card cover={<img src="test.jpg" alt="封面" />}>内容</Card>
      );
      const coverEl = container.querySelector('.cream-card__cover');
      expect(coverEl).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // ===== 12. 快照测试 =====
  describe('快照测试', () => {
    it('默认卡片快照', () => {
      const { container } = render(
        <Card title="快照标题" bordered hoverable={false}>
          快照内容
        </Card>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('完整功能卡片快照', () => {
      const { container } = render(
        <Card
          title="完整卡片"
          extra={<a href="#">更多</a>}
          cover={<img src="cover.jpg" alt="封面" />}
          actions={[<button key="btn">操作</button>]}
          bordered
          hoverable
          size="small"
        >
          完整内容
        </Card>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('加载中状态快照', () => {
      const { container } = render(<Card title="加载卡片" loading />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
