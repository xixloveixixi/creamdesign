// 按钮的组件：
// 1、大小：large、medium、small
// 2、btnType：primary、secondary、danger、warning、info、success
// 3、禁用状态：是否禁用按钮点击
import React from 'react';
import './Button.scss';

// 创建枚举：type和size
export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Success = 'success',
  Outline = 'outline',
  Ghost = 'ghost',
  Text = 'text',
}
export enum ButtonSize {
  Large = 'large',
  Normal = 'normal',
  Small = 'small',
}

// 类型别名：支持枚举和字符串字面量
export type ButtonTypeValue =
  | ButtonType
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'info'
  | 'success'
  | 'outline'
  | 'ghost'
  | 'text';
export type ButtonSizeValue = ButtonSize | 'large' | 'normal' | 'small';

// 2、创建interface：ButtonProps
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: ButtonTypeValue;
  size?: ButtonSizeValue;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  'aria-label'?: string;
}
// 3、创建Button组件
export const Button: React.FC<ButtonProps> = ({
  btnType = ButtonType.Primary,
  size = ButtonSize.Normal,
  disabled = false,
  loading = false,
  icon,
  children,
  className,
  onClick,
  ...rest
}) => {
  const isDisabled = disabled || loading;
  const buttonClassName = `btn btn-${btnType} btn-${size} ${
    isDisabled ? 'btn-disabled' : ''
  } ${loading ? 'btn-loading' : ''} ${className || ''}`.trim();
  // 为无障碍访问添加ARIA属性
  const ariaProps = {
    'aria-disabled': isDisabled,
    'aria-busy': loading,
  };

  // 如果按钮只有图标没有文字，则必须提供aria-label
  const hasOnlyIcon = !children && icon;
  const buttonProps = {
    ...ariaProps,
    ...rest,
  };

  return (
    <button
      className={buttonClassName}
      disabled={isDisabled}
      onClick={onClick}
      {...buttonProps}
    >
      {loading && (
        <span className="btn-loading-spinner" aria-hidden="true"></span>
      )}
      {icon && !loading && (
        <span className="btn-icon" aria-hidden={!hasOnlyIcon}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};
// 4、导出Button组件
// export { Button };
export default Button;
