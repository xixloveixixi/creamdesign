'use strict';

var jsxRuntime = require('react/jsx-runtime');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var classNames = require('classnames');

const Icon = props => {
    const { className, theme, ...rest } = props;
    const classnames = classNames('cream-icon', className, {
        [`icon-${theme}`]: theme,
    });
    return jsxRuntime.jsx(reactFontawesome.FontAwesomeIcon, { ...rest, className: classnames });
};

exports.Icon = Icon;
//# sourceMappingURL=Icon-BohTSe52.cjs.js.map
