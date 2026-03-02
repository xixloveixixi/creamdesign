import { jsxs, jsx } from 'react/jsx-runtime';
import classNames from 'classnames';

const Card = ({ title, extra, cover, actions, bordered = true, hoverable = false, size = 'default', loading = false, className, style, children, }) => {
    const cardClassName = classNames('cream-card', {
        'cream-card--bordered': bordered,
        'cream-card--hoverable': hoverable,
        'cream-card--small': size === 'small',
        'cream-card--loading': loading,
    }, className);
    const hasHeader = title !== undefined || extra !== undefined;
    return (jsxs("div", { className: cardClassName, style: style, role: "article", children: [cover && (jsx("div", { className: "cream-card__cover", "aria-hidden": "true", children: cover })), hasHeader && (jsxs("div", { className: "cream-card__header", children: [title && (jsx("div", { className: "cream-card__title", children: typeof title === 'string' ? (jsx("h4", { className: "cream-card__title-text", children: title })) : (title) })), extra && jsx("div", { className: "cream-card__extra", children: extra })] })), jsx("div", { className: "cream-card__body", children: loading ? (jsxs("div", { className: "cream-card__skeleton", "aria-label": "\u52A0\u8F7D\u4E2D", children: [jsx("div", { className: "cream-card__skeleton-row cream-card__skeleton-row--title" }), jsx("div", { className: "cream-card__skeleton-row" }), jsx("div", { className: "cream-card__skeleton-row" }), jsx("div", { className: "cream-card__skeleton-row cream-card__skeleton-row--short" })] })) : (children) }), actions && actions.length > 0 && (jsx("div", { className: "cream-card__actions", role: "group", "aria-label": "\u5361\u7247\u64CD\u4F5C", children: actions.map((action, index) => (jsx("div", { className: "cream-card__action-item", children: action }, index))) }))] }));
};

export { Card as default };
//# sourceMappingURL=index.js.map
