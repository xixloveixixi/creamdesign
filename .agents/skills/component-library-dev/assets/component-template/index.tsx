import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import './style.scss';

export interface {{ComponentName}}Props {
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 点击回调
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const {{ComponentName}}: React.FC<{{ComponentName}}Props> = ({
  className,
  style,
  disabled = false,
  children,
  onClick,
  ...restProps
}) => {
  const [internalState, setInternalState] = useState(false);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      setInternalState((prev) => !prev);
      onClick?.(event);
    },
    [disabled, onClick]
  );

  const classes = classNames(
    'cream-{{component-name}}',
    {
      'cream-{{component-name}}--disabled': disabled,
      'cream-{{component-name}}--active': internalState,
    },
    className
  );

  return (
    <div
      className={classes}
      style={style}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...restProps}
    >
      {children}
    </div>
  );
};

{{ComponentName}}.displayName = '{{ComponentName}}';

export default {{ComponentName}};
