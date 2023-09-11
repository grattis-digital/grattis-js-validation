import { HTMLCheckboxElement } from "../form/html-check-box-element";
import { Validator, ValidatorResult } from "./validator.interface";

export type RequiredValidatorConf = {
    isRequired: boolean;
    errorMessage?: string;
    isolate?: boolean;
}

export class RequiredValidator implements Validator<HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement> {

    constructor(
        private conf: RequiredValidatorConf
    ) {

    }

    supportsType(element: any): element is HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement {
        return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLCheckboxElement;
    }
    
    isolate(): boolean {
        return this.conf.isolate ? this.conf.isolate : false;
    }

    validate(element: HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement): ValidatorResult {
        if(this.conf.isRequired) {
            const inputFailed = (element instanceof HTMLInputElement) ? element.value.length === 0 : false;
            const textAreaFailed = (element instanceof HTMLTextAreaElement) ? element.value.length === 0 : false;
            const checkboxFailed = (element instanceof HTMLCheckboxElement) ? !element.checked : false;
            if(inputFailed || textAreaFailed || checkboxFailed) {
                return {
                    isValid: false,
                    message: this.conf.errorMessage ? this.conf.errorMessage : undefined
                };
            }
        }
        return {
            isValid: true
        };
    }
}