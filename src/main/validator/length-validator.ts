import { Validator, ValidatorResult } from "./validator.interface";

export type LengthValidatorConf = {
    minLength?: number;
    maxLength?: number;
    message?: string;
    isolate?: boolean;
}

export class LengthValidator implements Validator<HTMLInputElement | HTMLTextAreaElement> {


    constructor(private conf: LengthValidatorConf) {}

    supportsType(element: any): element is HTMLInputElement | HTMLTextAreaElement {
        return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
    }

    isolate(): boolean {
        return this.conf.isolate ? this.conf.isolate : false;
    }
    
    validate(element: HTMLInputElement | HTMLTextAreaElement): ValidatorResult {  
        const value = element.value;
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
