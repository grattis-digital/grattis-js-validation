
import { Validator, ValidatorResult } from "./validator.interface";

export type PatternValidatorConf = {
    pattern: string;
    message?: string;
    isolate?: boolean;
}

export class PatternValidator implements Validator {

    constructor(
        private conf: PatternValidatorConf
    ) {}

    isolate(): boolean {
        return this.conf.isolate ? this.conf.isolate : false;
    }

    validate(value: string): ValidatorResult {
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