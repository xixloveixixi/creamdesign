import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
type IconTheme = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
interface IconProps extends FontAwesomeIconProps {
    theme?: IconTheme;
    className?: string;
}
declare const Icon: React.FC<IconProps>;
export default Icon;
//# sourceMappingURL=Icon.d.ts.map