import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
type IconTheme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';
interface IconProps extends FontAwesomeIconProps {
  theme?: IconTheme;
  className?: string;
}

const Icon: React.FC<IconProps> = props => {
  const { className, theme, ...rest } = props;
  const classnames = classNames('cream-icon', className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon {...rest} className={classnames} />;
};

export default Icon;
