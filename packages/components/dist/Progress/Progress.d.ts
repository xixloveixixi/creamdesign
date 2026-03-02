import type { IconTheme } from '../Icon/Icon.d';
import './Progress.scss';
interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: IconTheme;
    minimumDisplayTime?: number;
}
declare const Progress: React.FC<ProgressProps>;
export default Progress;
//# sourceMappingURL=Progress.d.ts.map