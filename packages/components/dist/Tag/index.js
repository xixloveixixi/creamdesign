import { jsxs, jsx } from 'react/jsx-runtime';

var TagColor;
(function (TagColor) {
    TagColor["Default"] = "default";
    TagColor["Primary"] = "primary";
    TagColor["Success"] = "success";
    TagColor["Warning"] = "warning";
    TagColor["Danger"] = "danger";
    TagColor["Info"] = "info";
})(TagColor || (TagColor = {}));
var TagSize;
(function (TagSize) {
    TagSize["Small"] = "small";
    TagSize["Medium"] = "medium";
    TagSize["Large"] = "large";
})(TagSize || (TagSize = {}));
const Tag = ({ children, color = TagColor.Default, size = TagSize.Medium, clickable = false, closable = false, onClick, onClose, className, }) => {
    const handleClick = (e) => {
        if (clickable && onClick) {
            onClick(e);
        }
    };
    const handleClose = (e) => {
        e.stopPropagation();
        onClose === null || onClose === void 0 ? void 0 : onClose(e);
    };
    return (jsxs("span", { className: `cream-tag cream-tag--${color} cream-tag--${size} ${clickable ? 'cream-tag--clickable' : ''} ${className || ''}`, onClick: handleClick, children: [jsx("span", { className: "cream-tag__text", children: children }), closable && (jsx("span", { className: "cream-tag__close", onClick: handleClose, role: "button", tabIndex: 0, "aria-label": "\u5173\u95ED", children: "\u00D7" }))] }));
};

export { Tag, TagColor, TagSize };
//# sourceMappingURL=index.js.map
