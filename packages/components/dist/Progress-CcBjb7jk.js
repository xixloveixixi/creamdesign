import { jsx, jsxs } from 'react/jsx-runtime';
import classNames from 'classnames';
import { useState, useEffect } from 'react';

const Progress = props => {
    const { percent, strokeHeight = 15, showText = true, styles, theme = 'primary', minimumDisplayTime = 3000, } = props;
    // 控制进度显示状态
    const [displayPercent, setDisplayPercent] = useState(0);
    const [startTime] = useState(Date.now());
    const [hasStarted, setHasStarted] = useState(false);
    useEffect(() => {
        if (percent > 0 && !hasStarted) {
            setHasStarted(true);
        }
        // 如果进度大于0且还没有开始显示，开始显示
        if (percent > 0 && !hasStarted) {
            setDisplayPercent(10); // 从10%开始显示
            setHasStarted(true);
        }
        // 如果已经开始了，根据真实进度更新显示
        if (hasStarted) {
            const elapsed = Date.now() - startTime;
            const progressRatio = elapsed / minimumDisplayTime;
            if (percent < 100) {
                // 上传过程中，显示较慢的进度
                const slowPercent = Math.min(percent * 0.7 + progressRatio * 30, percent);
                setDisplayPercent(slowPercent);
            }
            else {
                // 上传完成，平滑过渡到100%
                const finalPercent = Math.min(displayPercent + 5, 100);
                setDisplayPercent(finalPercent);
                // 如果达到100%，延迟隐藏
                if (finalPercent >= 100) {
                    const timer = setTimeout(() => {
                        setDisplayPercent(100);
                    }, 500);
                    return () => clearTimeout(timer);
                }
            }
        }
    }, [percent, startTime, hasStarted, displayPercent, minimumDisplayTime]);
    return (jsx("div", { className: "progress-container", style: styles, children: jsx("div", { className: "progress-bar", style: { height: `${strokeHeight}px` }, children: jsx("div", { className: classNames('progress-fill', {
                    [`progress-fill-${theme}`]: theme,
                    'progress-animated': displayPercent > 0 && displayPercent < 100,
                }), style: { width: `${displayPercent}%` }, children: showText && displayPercent > 0 && (jsxs("span", { className: "progress-text", children: [Math.round(displayPercent), "%"] })) }) }) }));
};

export { Progress as P };
