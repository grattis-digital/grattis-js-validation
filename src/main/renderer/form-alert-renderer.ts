import { FormAlertInputConf } from "../conf/form-alert-conf.type";
import { HTMLCheckboxElement } from "../form/html-check-box-element";
import { ValidationRenderer } from "./validation-renderer.interface";

export class FormAlertRenderer implements ValidationRenderer<void> {

    constructor(
        private el: HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement,
        private alertClassConf: FormAlertInputConf,
        private $document: Document
    ) {}

    private getLabelElement(): Element | null {
        const id = this.el.id;
        return this.$document.querySelector(`label[for="${id}"]`); 
    }
    
    render(): void {
        const labelElement = this.getLabelElement();
        this.alertClassConf.labelClassList.forEach((alertClass) => labelElement?.classList.add(alertClass));
        this.alertClassConf.inputClassList.forEach((alertClass) => this.el.classList.add(alertClass));
    }

    clean(): void {
        const labelElement = this.getLabelElement();
        this.alertClassConf.labelClassList.forEach((alertClass) => labelElement?.classList.remove(alertClass));
        this.alertClassConf.inputClassList.forEach((alertClass) => this.el.classList.remove(alertClass));
    }
}