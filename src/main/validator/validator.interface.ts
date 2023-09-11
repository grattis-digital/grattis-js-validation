
export type ValidatorResult = {
    isValid: boolean;
    message?: string;
}

export interface Validator<T> {
    supportsType(element: any): element is T;
    validate(value: T): ValidatorResult;
    isolate(): boolean;
}