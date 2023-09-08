export type ValidatorResult = {
    isValid: boolean;
    message?: string;
}

export interface Validator {
    validate(value: string): ValidatorResult;
    isolate(): boolean;
}