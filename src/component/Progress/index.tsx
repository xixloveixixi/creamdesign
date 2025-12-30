// 进度条组件
// 可配置进度条的宽度、高度、进度颜色、背景颜色等
// 核心参数：
// percent：必需参数，表示进度百分比，类型为number
// strokeHeight：可选参数，控制进度条整体高度，默认值15
// showText：布尔值，控制是否显示百分比文字，默认true
// styles：自定义样式，类型为React.CSSProperties
// theme：主题颜色，继承自Icon组件的主题系统
// minimumDisplayTime：最小显示时间（毫秒），确保小文件也能看到进度条，默认3000ms
import classNames from 'classnames';
import { IconTheme } from '../Icon/icon';
import { useEffect, useState } from 'react';
import './progress.scss';
interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: IconTheme;
  minimumDisplayTime?: number;
}
const Progress: React.FC<ProgressProps> = props => {
  const {
    percent,
    strokeHeight = 15,
    showText = true,
    styles,
    theme = 'primary',
    minimumDisplayTime = 3000,
  } = props;

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
        const slowPercent = Math.min(
          percent * 0.7 + progressRatio * 30,
          percent
        );
        setDisplayPercent(slowPercent);
      } else {
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

  return (
    <div className="progress-container" style={styles}>
      <div className="progress-bar" style={{ height: `${strokeHeight}px` }}>
        <div
          className={classNames('progress-fill', {
            [`progress-fill-${theme}`]: theme,
            'progress-animated': displayPercent > 0 && displayPercent < 100,
          })}
          style={{ width: `${displayPercent}%` }}
        >
          {showText && displayPercent > 0 && (
            <span className="progress-text">{Math.round(displayPercent)}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;
