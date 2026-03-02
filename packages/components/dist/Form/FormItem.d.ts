import { FC, ReactNode } from 'react';
import './Form.scss';
import { CustomRule } from './useStore';
export type SomeRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
export interface FormItemProps {
    name?: string;
    children?: ReactNode;
    label?: string;
    required?: boolean;
    error?: string;
    labelWidth?: string;
    controlWidth?: string;
    className?: string;
    rules?: CustomRule[];
    validateTrigger?: string;
    valuePropsName?: string;
    trigger?: string;
    getValueFormEvent?: (e: any) => any;
}
export declare const FormItem: FC<FormItemProps>;
//# sourceMappingURL=FormItem.d.ts.map