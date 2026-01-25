import { Input, InputProps } from './input';
import { AutoComplate, AutoComplateProps } from './autoComplate';
import { FC } from 'react';

export type InputComponent = FC<InputProps> & {
  AutoComplate: FC<AutoComplateProps>;
};

const TransInput = Input as InputComponent;
TransInput.AutoComplate = AutoComplate;

export default TransInput;
