// 进度条组件
// 可配置进度条的宽度、高度、进度颜色、背景颜色等
// 核心参数：
// percent：必需参数，表示进度百分比，类型为number
// strokeHeight：可选参数，控制进度条整体高度，默认值15
// showText：布尔值，控制是否显示百分比文字，默认true
// styles：自定义样式，类型为React.CSSProperties
// theme：主题颜色，继承自Icon组件的主题系统
import classNames from 'classnames';
import { IconTheme } from '../Icon/icon';
import './progress.scss';
interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: IconTheme;
}
const Progress: React.FC<ProgressProps> = props => {
  const {
    percent,
    strokeHeight = 15,
    showText = true,
    styles,
    theme = 'primary',
  } = props;
  return (
    <div className="progress-container" style={styles}>
      <div className="progress-bar" style={{ height: `${strokeHeight}px` }}>
        <div
          className={classNames('progress-fill', {
            [`progress-fill-${theme}`]: theme,
          })}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="progress-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

export default Progress;
