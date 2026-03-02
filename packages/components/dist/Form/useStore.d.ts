import { RuleItem, ValidateError } from 'async-validator';
export type CustomRuleFunc = ({ getFieldValue, }: {
    getFieldValue: (name: string) => string;
}) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;
export interface FieldDetail {
    name: string;
    value: string;
    rules: CustomRule[];
    isValid: boolean;
    errors: ValidateError[];
}
export interface FieldsState {
    [key: string]: FieldDetail;
}
export interface FormState {
    isValid: boolean;
    isSubmitting?: boolean;
    errors?: Record<string, ValidateError>;
}
export interface FieldsAction {
    type: 'addField' | 'updateField' | 'updateValidateResult';
    name: string;
    value: any;
}
export interface FormErrors extends Error {
    fields?: Record<string, ValidateError[]>;
    errors?: ValidateError[];
}
declare function useStore(initialValues?: Record<string, any>): {
    form: FormState;
    setForm: import("react").Dispatch<import("react").SetStateAction<FormState>>;
    fields: FieldsState;
    dispatchFields: import("react").ActionDispatch<[action: FieldsAction]>;
    validateField: (name: string) => Promise<void>;
    getFieldValue: (name: string) => string;
    validateAllFields: () => Promise<{
        isValid: boolean;
        errors: Record<string, ValidateError[]>;
        values: {
            [x: string]: string;
        };
    }>;
    resetFields: () => void;
    getAllFields: () => {
        [x: string]: string;
    };
    setFieldValue: (name: string, value: any) => void;
};
export default useStore;
//# sourceMappingURL=useStore.d.ts.map