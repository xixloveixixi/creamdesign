import { jsxs, jsx } from 'react/jsx-runtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

/**
 * 输入框组件:通过鼠标和键盘输入内容,是最基础的表单组件
 *
 *  ~~~
 * //这样引用
 * import { Input } from 'creamdesign';
 * ~~~
 * 支持所有原生input属性
 */
const Input = ({ size = 'small', disabled = false, icon, prefix, suffix, className, ...rest }) => {
    const isDisabled = disabled;
    const inputClassName = classNames('input', `input-${size}`, {
        'input-disabled': isDisabled,
    }, className);
    //解决state初始值为undefined时，从非受控变为受控会触发警告
    const fixValue = (value) => {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    // 处理value和defaultValue的冲突
    if ('value' in rest) {
        delete rest.defaultValue;
        rest.value = fixValue(rest.value);
    }
    return (jsxs("div", { className: inputClassName, children: [prefix && jsx("div", { className: "input-prefix", children: prefix }), jsx("input", { ...rest, disabled: isDisabled }), icon && jsx(FontAwesomeIcon, { icon: icon, className: "input-icon" }), suffix && jsx("div", { className: "input-suffix", children: suffix })] }));
};

export { Input as default };
//# sourceMappingURL=index.js.map
