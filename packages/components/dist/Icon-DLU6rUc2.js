import { jsx } from 'react/jsx-runtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

const Icon = props => {
    const { className, theme, ...rest } = props;
    const classnames = classNames('cream-icon', className, {
        [`icon-${theme}`]: theme,
    });
    return jsx(FontAwesomeIcon, { ...rest, className: classnames });
};

export { Icon as I };
