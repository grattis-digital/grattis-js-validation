import { FormAlertInputConf } from "./form-alert-conf.type";
import { ValidationRenderer } from "./validation-renderer.interface";

export class FormAlertRenderer implements ValidationRenderer<void> {

    constructor(
        private el: HTMLInputElement | HTMLTextAreaElement,
        private alertClassConf: FormAlertInputConf
    ) {}

    private getLabelElement(): Element | null {
        const id = this.el.id;
        return document.querySelector(`label[for="${id}"]`); 
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