import { Validator, ValidatorResult } from "./validator.interface";

export type RequiredValidatorConf = {
    isRequired: boolean;
    errorMessage?: string;
    isolate?: boolean;
}

export class RequiredValidator implements Validator {
    constructor(
        private conf: RequiredValidatorConf
    ) {}

    isolate(): boolean {
        return this.conf.isolate ? this.conf.isolate : false;
    }

    validate(value: string): ValidatorResult {
        if(this.conf.isRequired && value.length == 0) {
            return {
                isValid: false,
                message: this.conf.errorMessage ? this.conf.errorMessage : undefined
            };
        } 
        return {
            isValid: true
        };
    }
}