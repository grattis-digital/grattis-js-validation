import { FormAlertMessageConf } from "../conf/form-alert-conf.type";
import { HTMLCheckboxElement } from "../form/html-check-box-element";
import { ValidationRenderer } from "./validation-renderer.interface";


export class FormMessageRenderer implements ValidationRenderer<string[]> {

    constructor(
        private el: HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement,
        private alertClassConf: FormAlertMessageConf,
        private $document: Document
    ) {}

    render(messages: string[]): void {
        if(messages.length > 0) {
            const id = this.el.id;
            const errorElementId = `${id}-error`;
            const errorElement = this.$document.getElementById(errorElementId) || this.$document.createElement('p');
            errorElement.textContent = messages.join(' ');
            errorElement.id = errorElementId;
            this.alertClassConf.paragraphClassList.forEach((alertClass) => errorElement.classList.add(alertClass));
            this.el.parentNode?.insertBefore(errorElement, this.el.nextSibling);
        }
    }

    clean(): void {
        const id = this.el.id;
        this.$document.getElementById(`${id}-error`)?.remove();
    }
}