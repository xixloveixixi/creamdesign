import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Progress from './index';

describe('Progress Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // ==================== 基础渲染 ====================
  test('渲染基础进度条结构', () => {
    const { container } = render(<Progress percent={0} />);
    expect(container.querySelector('.progress-container')).toBeInTheDocument();
    expect(container.querySelector('.progress-bar')).toBeInTheDocument();
    expect(container.querySelector('.progress-fill')).toBeInTheDocument();
  });

  // ==================== strokeHeight ====================
  test('默认 strokeHeight 为 15px', () => {
    const { container } = render(<Progress percent={0} />);
    const progressBar = container.querySelector('.progress-bar') as HTMLElement;
    expect(progressBar).toHaveStyle({ height: '15px' });
  });

  test('自定义 strokeHeight 正确设置高度', () => {
    const { container } = render(<Progress percent={50} strokeHeight={30} />);
    const progressBar = container.querySelector('.progress-bar') as HTMLElement;
    expect(progressBar).toHaveStyle({ height: '30px' });
  });

  test('strokeHeight 为 8px 时正确渲染', () => {
    const { container } = render(<Progress percent={0} strokeHeight={8} />);
    const progressBar = container.querySelector('.progress-bar') as HTMLElement;
    expect(progressBar).toHaveStyle({ height: '8px' });
  });

  // ==================== 自定义样式 ====================
  test('自定义 styles 应用到容器', () => {
    const customStyles: React.CSSProperties = {
      marginTop: '20px',
      opacity: 0.8,
    };
    const { container } = render(
      <Progress percent={0} styles={customStyles} />
    );
    const progressContainer = container.querySelector(
      '.progress-container'
    ) as HTMLElement;
    expect(progressContainer).toHaveStyle({ marginTop: '20px' });
  });

  // ==================== theme 主题 ====================
  test('默认 theme 为 primary，应用 progress-fill-primary 类', () => {
    const { container } = render(<Progress percent={0} />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).toHaveClass('progress-fill-primary');
  });

  test('theme="success" 应用 progress-fill-success 类', () => {
    const { container } = render(<Progress percent={50} theme="success" />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).toHaveClass('progress-fill-success');
  });

  test('theme="danger" 应用 progress-fill-danger 类', () => {
    const { container } = render(<Progress percent={50} theme="danger" />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).toHaveClass('progress-fill-danger');
  });

  test('theme="warning" 应用 progress-fill-warning 类', () => {
    const { container } = render(<Progress percent={50} theme="warning" />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).toHaveClass('progress-fill-warning');
  });

  test('theme="info" 应用 progress-fill-info 类', () => {
    const { container } = render(<Progress percent={50} theme="info" />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).toHaveClass('progress-fill-info');
  });

  // ==================== percent=0 的行为 ====================
  test('percent=0 时，进度填充宽度为 0%', () => {
    const { container } = render(<Progress percent={0} />);
    const fill = container.querySelector('.progress-fill') as HTMLElement;
    expect(fill).toHaveStyle({ width: '0%' });
  });

  test('percent=0 时，不显示文字（displayPercent 为 0）', () => {
    const { container } = render(<Progress percent={0} />);
    expect(container.querySelector('.progress-text')).not.toBeInTheDocument();
  });

  test('percent=0 时，不添加 progress-animated 类', () => {
    const { container } = render(<Progress percent={0} />);
    const fill = container.querySelector('.progress-fill');
    expect(fill).not.toHaveClass('progress-animated');
  });

  // ==================== showText 控制文字显示 ====================
  test('showText=false 时，即使进度推进也不显示文字', async () => {
    const { container } = render(<Progress percent={50} showText={false} />);
    await act(async () => {
      jest.runAllTimers();
    });
    expect(container.querySelector('.progress-text')).not.toBeInTheDocument();
  });

  test('showText 默认 true，但 percent=0 时无文字', () => {
    const { container } = render(<Progress percent={0} showText={true} />);
    expect(container.querySelector('.progress-text')).not.toBeInTheDocument();
  });

  // ==================== 动画行为 ====================
  test('percent > 0 时，effect 运行后 displayPercent 大于 0', async () => {
    const { container } = render(<Progress percent={50} />);
    await act(async () => {
      jest.runAllTimers();
    });
    const fill = container.querySelector('.progress-fill') as HTMLElement;
    const widthValue = parseFloat(fill.style.width);
    expect(widthValue).toBeGreaterThan(0);
  });

  test('percent=100 时，progress-fill 宽度最终大于 0', async () => {
    const { container } = render(
      <Progress percent={100} minimumDisplayTime={0} />
    );
    await act(async () => {
      jest.runAllTimers();
    });
    const fill = container.querySelector('.progress-fill') as HTMLElement;
    const widthValue = parseFloat(fill.style.width);
    expect(widthValue).toBeGreaterThan(0);
  });

  // ==================== 快照测试 ====================
  test('percent=0 时渲染结构快照', () => {
    const { container } = render(<Progress percent={0} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('自定义 strokeHeight + theme 渲染快照', () => {
    const { container } = render(
      <Progress percent={0} strokeHeight={20} theme="success" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
