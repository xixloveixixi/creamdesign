import React from 'react';
import './Button.scss';
export declare enum ButtonType {
    Primary = "primary",
    Secondary = "secondary",
    Danger = "danger",
    Warning = "warning",
    Info = "info",
    Success = "success",
    Outline = "outline",
    Ghost = "ghost",
    Text = "text"
}
export declare enum ButtonSize {
    Large = "large",
    Normal = "normal",
    Small = "small"
}
export type ButtonTypeValue = ButtonType | 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success' | 'outline' | 'ghost' | 'text';
export type ButtonSizeValue = ButtonSize | 'large' | 'normal' | 'small';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnType?: ButtonTypeValue;
    size?: ButtonSizeValue;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    'aria-label'?: string;
}
export declare const Button: React.FC<ButtonProps>;
export default Button;
//# sourceMappingURL=Button.d.ts.map