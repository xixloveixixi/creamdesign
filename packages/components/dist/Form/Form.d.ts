import { ReactNode } from 'react';
import './Form.scss';
import useStore, { FormState } from './useStore';
import React from 'react';
import { ValidateError } from 'async-validator';
export interface FormProps {
    name?: string;
    children?: ReactNode | ReactProps;
    className?: string;
    style?: React.CSSProperties;
    initialValues?: Record<string, any>;
    onFinish?: (values: Record<string, any>) => void;
    onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export type FormRefType = Omit<ReturnType<typeof useStore>, 'form' | 'dispatchFields' | 'fields'>;
export type ReactProps = (formProps: FormState) => ReactNode;
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatchFields' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>;
export declare const FormContext: React.Context<IFormContext>;
export declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<FormRefType>>;
//# sourceMappingURL=Form.d.ts.map