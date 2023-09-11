
import { Validator, ValidatorResult } from "./validator.interface";

export type PatternValidatorConf = {
    pattern: string;
    message?: string;
    isolate?: boolean;
}

export class PatternValidator implements Validator<HTMLInputElement | HTMLTextAreaElement> {

    constructor(
        private conf: PatternValidatorConf
    ) {}


    supportsType(element: any): element is HTMLInputElement | HTMLTextAreaElement {
        return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
    }

    isolate(): boolean {
        return this.conf.isolate ? this.conf.isolate : false;
    }

    validate(element: HTMLInputElement | HTMLTextAreaElement): ValidatorResult {
        const value = element.value;
        const isValid = new RegExp(this.conf.pattern).test(value);
        if(!isValid) {
            return {
                isValid: false,
                message: this.conf.message ? this.conf.message : undefined
            }
        }
        return {
            isValid: true
        };
    }
}