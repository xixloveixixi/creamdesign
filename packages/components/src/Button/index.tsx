import {
  Button,
  ButtonType,
  ButtonSize,
  ButtonTypeValue,
  ButtonSizeValue,
} from './Button';

export default Button;
// 枚举是值，需要作为值导出
export { ButtonType, ButtonSize };
// 类型别名作为类型导出
export type { ButtonTypeValue, ButtonSizeValue };
