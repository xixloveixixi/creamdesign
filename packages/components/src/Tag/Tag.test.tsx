import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tag, TagColor, TagSize } from './Tag';

describe('Tag', () => {
  it('should render correctly', () => {
    render(<Tag>标签内容</Tag>);
    expect(screen.getByText('标签内容')).toBeInTheDocument();
  });

  it('should call onClick when clickable and clicked', () => {
    const handleClick = vi.fn();
    render(<Tag clickable onClick={handleClick}>可点击</Tag>);
    fireEvent.click(screen.getByText('可点击'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when not clickable', () => {
    const handleClick = vi.fn();
    render(<Tag onClick={handleClick}>不可点击</Tag>);
    fireEvent.click(screen.getByText('不可点击'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should call onClose when closable and close button clicked', () => {
    const handleClose = vi.fn();
    render(<Tag closable onClose={handleClose}>可关闭</Tag>);
    fireEvent.click(screen.getByRole('button', { name: /关闭/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should apply custom className', () => {
    const { container } = render(<Tag className="custom-tag">自定义</Tag>);
    expect(container.firstChild).toHaveClass('custom-tag');
  });
});
