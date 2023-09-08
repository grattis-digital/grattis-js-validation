import { FormAlertRenderer } from "./form-alert-renderer";
import { FormMessageRenderer } from "./form-message-renderer";
import { FormValidationConf } from "./form-validation-conf.type";
import { ValidationRenderer } from "./validation-renderer.interface";
import { Validator } from "./validator.interface";

export class FormValidationInitializer {   


    constructor(
        private $window: Window,
        private $document: Document
    ) {}

    registerEvents(
        formValidationConf: FormValidationConf
    ): void {
        
        const formElement = this.getFormElement(formValidationConf.formName);

        if(formElement) {
            this.registerForElements(
                formElement, 
                formValidationConf, 
                (
                    el: HTMLInputElement | HTMLTextAreaElement, 
                    validatorList: Validator[]
                ) => {
                    this.registerRenderer(
                        new FormAlertRenderer(el, formValidationConf.alertClassConf.inputConf),
                        new FormMessageRenderer(el, formValidationConf.alertClassConf.messageConf, this.$document),
                        el,
                        validatorList
                    );
            });
        }

    }

    private getFormElement(formName: string): HTMLFormElement | null {
        const formNode = this.$document.getElementsByName(formName)[0];
        return formNode && formNode instanceof HTMLFormElement ? formNode : null;
    } 

    private registerForElements(
        formElement: HTMLFormElement, 
        validationConf: FormValidationConf, 
        callBack: (el: HTMLInputElement | HTMLTextAreaElement, validator: Validator[]) => void
        ): void {
        validationConf.elements.forEach((conf) => {
            const inputElement = formElement.elements.namedItem(conf.formElementName);
            if(inputElement && (inputElement instanceof HTMLInputElement || inputElement instanceof HTMLTextAreaElement)) {
                callBack(inputElement, conf.validatorList);
            }
        });
        formElement.addEventListener('submit', (event) => {   
            event.preventDefault();
            validationConf.elements.forEach((conf) => {
                const inputElement = formElement.elements.namedItem(conf.formElementName);
                if(inputElement && (inputElement instanceof HTMLInputElement || inputElement instanceof HTMLTextAreaElement)) {
                    inputElement.dispatchEvent(new Event('focusout'));
                    const errorElement = formElement.querySelectorAll('.' + validationConf.errorStateMarkerClass)[0];
                    if(!errorElement) {
                        formElement.submit();
                    } else if(errorElement instanceof HTMLElement) {
                        this.$window.scrollTo(0, 0);
                        const labelElement = this.$document.querySelector(`label[for="${errorElement.id}"]`);
                        labelElement?.scrollIntoView();
                        this.$window.scrollBy(0, -100);
                    }
                }
            });
        });
    }

    private registerRenderer(
        alertRenderer: ValidationRenderer<void>,
        messageRenderer: ValidationRenderer<string[]>,
        inputElement: HTMLInputElement | HTMLTextAreaElement,
        validatorList: Validator[]
    ): void {

        ['focusout', 'change'].forEach((eventName) => {
            inputElement.addEventListener(eventName, () => {
                const value = inputElement.value;
                const validatorResults = validatorList.map((validator) => {
                   return validator.validate(value);     
                });
    
                const isolatedValidations = validatorList.filter((el) => el.isolate());
                const nonIsolatedValidations = validatorList.filter((el) => !el.isolate());
    
                const isolatedValidationsResults = this.getValidationMessages(isolatedValidations, value);
                const nonIsolatedValidationsResults = this.getValidationMessages(nonIsolatedValidations, value);  

                if(isolatedValidationsResults.length > 0 || nonIsolatedValidationsResults.length > 0) {
                    alertRenderer.render();
                }
                if(isolatedValidationsResults.length > 0) {
                   messageRenderer.render(isolatedValidationsResults);
                } else if(nonIsolatedValidationsResults.length > 0) {
                   messageRenderer.render(nonIsolatedValidationsResults);
                } 
    
           });
        });

        inputElement.addEventListener('focusin', () => {
            messageRenderer.clean();
            alertRenderer.clean();
        });
    }

    private getValidationMessages(validators: Validator[], value: string): string[] {
        return validators.map(v => v.validate(value)).filter(res => !res.isValid).map(res => res.message).filter(msg => msg != undefined) as string[];
    }

}