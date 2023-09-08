import { Validator, ValidatorResult } from "./validator.interface";

export type LengthValidatorConf = {
    minLength?: number;
    maxLength?: number;
    message?: string;
    isolate?: boolean;
}

export class LengthValidator implements Validator {

    constructor(private conf: LengthValidatorConf) {}

    isolate(): boolean {
        return this.conf.isolate ? this.conf.isolate : false;
    }
    
    validate(value: string): ValidatorResult {  
        const isValidMinLength = this.conf.minLength ? value.length >= this.conf.minLength : true;
        const isValidMaxLength = this.conf.maxLength ? value.length < this.conf.maxLength : true; 

        if(!isValidMinLength || !isValidMaxLength) {
            const message = this.conf.message ? this.conf.message
                .replace('{min}', this.conf.minLength ? this.conf.minLength.toString() : '{min}')
                .replace('{max}', this.conf.maxLength ? this.conf.maxLength.toString() : '{max}') : undefined;
            return {
                isValid: false,
                message: message
            };
        } 
        return {
            isValid: true
        };
    }
}
