import { HTMLCheckboxElement } from "./html-check-box-element";

export class HTMLFormElementList {

    private formElement: HTMLFormElement | null;


    constructor(formName: string, $document: Document) {
        this.formElement = $document.forms.namedItem(formName);
    }

    findByName(name: string): HTMLInputElement | HTMLTextAreaElement | HTMLCheckboxElement | null {
        return this.htmlTextElements().find((el) => el.name === name) ||
               this.htmlTextAreaElements().find((el) => el.name === name) ||
               this.htmlCheckboxElements().find((el) => el.name === name) || null;
    }
    
    htmlTextElements(): HTMLInputElement[] {
        return this.formElement ? Array.from(this.formElement.querySelectorAll('input[type="text"]')) : [];
    }

    htmlTextAreaElements(): HTMLTextAreaElement[] {
        return this.formElement ? Array.from(this.formElement.querySelectorAll('textarea')) : [];
    }

    htmlCheckboxElements(): HTMLCheckboxElement[] {
        return this.formElement ? Array.from(this.formElement.querySelectorAll('input[type="checkbox"]')).map((el) => new HTMLCheckboxElement(el as HTMLInputElement)) : [];
    }
}