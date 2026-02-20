import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { {{ComponentName}} } from './index';

describe('{{ComponentName}}', () => {
  // ==================== 基础渲染测试 ====================
  describe('Rendering', () => {
    it('should render correctly with default props', () => {
      const { container } = render(<{{ComponentName}}>Test Content</{{ComponentName}}>);
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = render(
        <{{ComponentName}} className="custom-class">Content</{{ComponentName}}>
      );
      expect(container.firstChild).toHaveClass('custom-class');
      expect(container.firstChild).toHaveClass('cream-{{component-name}}');
    });

    it('should render with custom style', () => {
      const customStyle = { backgroundColor: 'red', padding: '10px' };
      const { container } = render(
        <{{ComponentName}} style={customStyle}>Content</{{ComponentName}}>
      );
      expect(container.firstChild).toHaveStyle(customStyle);
    });

    it('should render children correctly', () => {
      render(
        <{{ComponentName}}>
          <span data-testid="child">Child Element</span>
        </{{ComponentName}}>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  // ==================== Props 测试 ====================
  describe('Props', () => {
    it('should apply disabled class when disabled is true', () => {
      const { container } = render(<{{ComponentName}} disabled>Disabled</{{ComponentName}}>);
      expect(container.firstChild).toHaveClass('cream-{{component-name}}--disabled');
    });

    it('should have correct default disabled value', () => {
      const { container } = render(<{{ComponentName}}>Default</{{ComponentName}}>);
      expect(container.firstChild).not.toHaveClass('cream-{{component-name}}--disabled');
    });

    it('should spread rest props to root element', () => {
      const { container } = render(
        <{{ComponentName}} data-testid="custom-testid" aria-label="test">
          Content
        </{{ComponentName}}>
      );
      expect(container.firstChild).toHaveAttribute('data-testid', 'custom-testid');
      expect(container.firstChild).toHaveAttribute('aria-label', 'test');
    });
  });

  // ==================== 事件测试 ====================
  describe('Events', () => {
    it('should call onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<{{ComponentName}} onClick={handleClick}>Clickable</{{ComponentName}}>);
      
      fireEvent.click(screen.getByText('Clickable'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(
        <{{ComponentName}} disabled onClick={handleClick}>
          Disabled
        </{{ComponentName}}>
      );
      
      fireEvent.click(screen.getByText('Disabled'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should handle keyboard interaction', async () => {
      const handleClick = jest.fn();
      render(<{{ComponentName}} onClick={handleClick}>Keyboard</{{ComponentName}}>);
      
      const element = screen.getByText('Keyboard');
      element.focus();
      await userEvent.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not respond to keyboard when disabled', async () => {
      const handleClick = jest.fn();
      render(
        <{{ComponentName}} disabled onClick={handleClick}>
          Disabled
        </{{ComponentName}}>
      );
      
      const element = screen.getByText('Disabled');
      expect(element).toHaveAttribute('tabIndex', '-1');
    });
  });

  // ==================== 可访问性测试 ====================
  describe('Accessibility', () => {
    it('should have correct role attribute', () => {
      const { container } = render(<{{ComponentName}}>Accessible</{{ComponentName}}>);
      expect(container.firstChild).toHaveAttribute('role', 'button');
    });

    it('should have correct aria-disabled when disabled', () => {
      const { container } = render(<{{ComponentName}} disabled>Disabled</{{ComponentName}}>);
      expect(container.firstChild).toHaveAttribute('aria-disabled', 'true');
    });

    it('should have correct aria-disabled when not disabled', () => {
      const { container } = render(<{{ComponentName}}>Enabled</{{ComponentName}}>);
      expect(container.firstChild).toHaveAttribute('aria-disabled', 'false');
    });

    it('should be focusable when enabled', () => {
      render(<{{ComponentName}}>Focusable</{{ComponentName}}>);
      const element = screen.getByText('Focusable');
      expect(element).toHaveAttribute('tabIndex', '0');
    });

    it('should not be focusable when disabled', () => {
      render(<{{ComponentName}} disabled>Not Focusable</{{ComponentName}}>);
      const element = screen.getByText('Not Focusable');
      expect(element).toHaveAttribute('tabIndex', '-1');
    });
  });

  // ==================== 快照测试 ====================
  describe('Snapshots', () => {
    it('should match snapshot with default props', () => {
      const { container } = render(<{{ComponentName}}>Snapshot</{{ComponentName}}>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot when disabled', () => {
      const { container } = render(<{{ComponentName}} disabled>Disabled</{{ComponentName}}>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with custom className', () => {
      const { container } = render(
        <{{ComponentName}} className="custom-class">Custom</{{ComponentName}}>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  // ==================== 边界情况测试 ====================
  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      const { container } = render(<{{ComponentName}} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle rapid clicks', () => {
      const handleClick = jest.fn();
      render(<{{ComponentName}} onClick={handleClick}>Rapid</{{ComponentName}}>);
      
      const element = screen.getByText('Rapid');
      fireEvent.click(element);
      fireEvent.click(element);
      fireEvent.click(element);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('should maintain state consistency', () => {
      const { rerender } = render(<{{ComponentName}}>State Test</{{ComponentName}}>);
      
      rerender(<{{ComponentName}} disabled>State Test</{{ComponentName}}>);
      expect(screen.getByText('State Test')).toHaveClass('cream-{{component-name}}--disabled');
      
      rerender(<{{ComponentName}}>State Test</{{ComponentName}}>);
      expect(screen.getByText('State Test')).not.toHaveClass('cream-{{component-name}}--disabled');
    });
  });
});
