import { FormAlertRenderer } from "./renderer/form-alert-renderer";
import { FormMessageRenderer } from "./renderer/form-message-renderer";
import { FormValidationConf } from "./conf/form-validation-conf.type";
import { HTMLCheckboxElement } from "./form/html-check-box-element";
import { HTMLFormElementList } from "./form/html-form-element-list";
import { ValidationRenderer } from "./renderer/validation-renderer.interface";
import { Validator } from "./validator/validator.interface";
import { FormAlertInputConf, FormAlertMessageConf } from "./conf/form-alert-conf.type";


export class FormValidationInitializerConfiguration {

    elementList(formName: string, d: Document): HTMLFormElementList {
        return new HTMLFormElementList(formName, d);
    }
    
    alertRenderer(el: HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement, alertClassConf: FormAlertInputConf, d: Document): ValidationRenderer<void> {
        return new FormAlertRenderer(el, alertClassConf, d);
    }

    messageRenderer(el: HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement, messageConf: FormAlertMessageConf, d: Document): ValidationRenderer<string[]> {
        return new FormMessageRenderer(el, messageConf, d);
    }
}

export class FormValidationInitializer {   


    constructor(
        private $window: Window,
        private $document: Document,
        private configuration: FormValidationInitializerConfiguration = new FormValidationInitializerConfiguration()
    ) {}

    registerEvents(
        formValidationConf: FormValidationConf
    ): void {
        
        const formElement = this.getFormElement(formValidationConf.formName);

        if(formElement) {
            this.registerForElements(
                formElement, 
                formValidationConf
            );
        }

    }

    private getFormElement(formName: string): HTMLFormElement | null {
        return this.$document.forms.namedItem(formName);
    } 

    private registerForElements(
        formElement: HTMLFormElement, 
        validationConf: FormValidationConf): void {

        validationConf.elements.forEach((conf) => {
            const htmlFormElementList = this.configuration.elementList(validationConf.formName, this.$document);
            const element = htmlFormElementList.findByName(conf.formElementName);
            if(element) {
                const validatorList = conf.validatorList.filter((validator) => validator.supportsType(element)) as Validator<HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement>[];
                this.registerRenderer(
                    this.configuration.alertRenderer(element, validationConf.alertClassConf.inputConf, this.$document),
                    this.configuration.messageRenderer(element, validationConf.alertClassConf.messageConf, this.$document),
                    element,
                    validatorList
                )
            }
        });
        formElement.addEventListener('submit', (event) => {   
            event.preventDefault();
            validationConf.elements.forEach((conf) => {
                const htmlFormElementList = this.configuration.elementList(validationConf.formName, this.$document);
                const inputElement = htmlFormElementList.findByName(conf.formElementName);
                if(inputElement) {
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
        inputElement: HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement,
        validatorList: Validator<HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement>[]
    ): void {

        ['focusout', 'change'].forEach((eventName) => {
            inputElement.addEventListener(eventName, () => {
                const validatorResults = validatorList.map((validator) => {
                   return validator.validate(inputElement);     
                });
    
                const isolatedValidations = validatorList.filter((el) => el.isolate());
                const nonIsolatedValidations = validatorList.filter((el) => !el.isolate());
    
                const isolatedValidationsResults = this.getValidationMessages(isolatedValidations, inputElement);
                const nonIsolatedValidationsResults = this.getValidationMessages(nonIsolatedValidations, inputElement);  

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

    private getValidationMessages(validators: Validator<HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement>[], value: HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement): string[] {
        return validators.map(v => v.validate(value)).filter(res => !res.isValid).map(res => res.message).filter(msg => msg != undefined) as string[];
    }

}