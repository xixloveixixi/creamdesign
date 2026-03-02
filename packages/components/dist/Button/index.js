import { jsxs, jsx } from 'react/jsx-runtime';

// 创建枚举：type和size
var ButtonType;
(function (ButtonType) {
    ButtonType["Primary"] = "primary";
    ButtonType["Secondary"] = "secondary";
    ButtonType["Danger"] = "danger";
    ButtonType["Warning"] = "warning";
    ButtonType["Info"] = "info";
    ButtonType["Success"] = "success";
    ButtonType["Outline"] = "outline";
    ButtonType["Ghost"] = "ghost";
    ButtonType["Text"] = "text";
})(ButtonType || (ButtonType = {}));
var ButtonSize;
(function (ButtonSize) {
    ButtonSize["Large"] = "large";
    ButtonSize["Normal"] = "normal";
    ButtonSize["Small"] = "small";
})(ButtonSize || (ButtonSize = {}));
// 3、创建Button组件
const Button = ({ btnType = ButtonType.Primary, size = ButtonSize.Normal, disabled = false, loading = false, icon, children, className, onClick, ...rest }) => {
    const isDisabled = disabled || loading;
    const buttonClassName = `btn btn-${btnType} btn-${size} ${isDisabled ? 'btn-disabled' : ''} ${loading ? 'btn-loading' : ''} ${className || ''}`.trim();
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
    return (jsxs("button", { className: buttonClassName, disabled: isDisabled, onClick: onClick, ...buttonProps, children: [loading && (jsx("span", { className: "btn-loading-spinner", "aria-hidden": "true" })), icon && !loading && (jsx("span", { className: "btn-icon", "aria-hidden": !hasOnlyIcon, children: icon })), children] }));
};

export { ButtonSize, ButtonType, Button as default };
//# sourceMappingURL=index.js.map
