import { Timeline } from './Timeline';
export default Timeline;
export { Timeline } from './Timeline';
export type { TimelineProps, TimelineItemProps, TimelineStatus, TimelineDirection, TimelineMode, } from './Timeline';
//# sourceMappingURL=index.d.ts.mapeight: "10", fill: "none", "aria-hidden": "true", children: jsx("path", { d: "M2.5 8l4 4 7-7", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
    }
    if (status === 'processing') {
        return (jsx("span", { className: "cream-timeline__processing-dot", "aria-hidden": "true" }));
    }
    return null;
};
const TimelineItem = ({ title, content, timestamp, status = 'pending', icon, color, className, isLast, mode, direction, index, }) => {
    const isAlternateRight = direction === 'vertical' && mode === 'alternate' && index % 2 !== 0;
    const itemClassName = classNames('cream-timeline__item', `cream-timeline__item--${status}`, {
        'cream-timeline__item--last': isLast,
        'cream-timeline__item--alternate-right': isAlternateRight,
        'cream-timeline__item--mode-right': direction === 'vertical' && mode === 'right',
    }, className);
    const nodeStyle = color
        ? { backgroundColor: color, borderColor: color }
        : {};
    const statusLabel = status === 'completed'
        ? '已完成'
        : status === 'processing'
            ? '进行中'
            : '待处理';
    return (jsxs("li", { className: itemClassName, "aria-label": `时间节点：${statusLabel}`, children: [!isLast && jsx("div", { className: "cream-timeline__tail", "aria-hidden": "true" }), jsx("div", { className: classNames('cream-timeline__node', {
                    'cream-timeline__node--custom': !!icon,
                }), style: nodeStyle, "aria-hidden": "true", children: icon ? (jsx("span", { className: "cream-timeline__node-inner", children: icon })) : (jsx("span", { className: "cream-timeline__node-inner", children: jsx(DefaultIcon, { status: status }) })) }), jsxs("div", { className: "cream-timeline__content", children: [timestamp && (jsx("time", { className: "cream-timeline__timestamp", dateTime: timestamp, children: timestamp })), title && (jsx("div", { className: "cream-timeline__title", children: typeof title === 'string' ? (jsx("span", { className: "cream-timeline__title-text", children: title })) : (title) })), content && jsx("div", { className: "cream-timeline__body", children: content })] })] }));
};
// ===== Timeline 主组件 =====
const Timeline = ({ items = [], direction = 'vertical', mode = 'left', className, style, }) => {
    const rootClassName = classNames('cream-timeline', `cream-timeline--${direction}`, {
        [`cream-timeline--mode-${mode}`]: direction === 'vertical',
    }, className);
    return (jsx("ol", { className: rootClassName, style: style, "aria-label": "\u65F6\u95F4\u8F74", children: items.map((item, index) => (jsx(TimelineItem, { ...item, isLast: index === items.length - 1, mode: mode, direction: direction, index: index }, index))) }));
};

export { Timeline, Timeline as default };
