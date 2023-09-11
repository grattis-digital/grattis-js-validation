import { HTMLCheckboxElement } from "../../main/form/html-check-box-element";
import { HTMLFormElementList } from "../../main/form/html-form-element-list";


describe("HTMLFormElementList", () => {

    let mockDocument: Partial<Document>;
    let mockForm: Partial<HTMLFormElement>;
    let inputText: Partial<HTMLInputElement>;
    let textArea: Partial<HTMLTextAreaElement>;
    let inputCheckbox: Partial<HTMLInputElement>;
    let mockDOMTokenList: Partial<DOMTokenList>;

    beforeAll(() => {
        inputText = { type: 'text', name: 'textName' };
        textArea = { name: 'textAreaName' };
        inputCheckbox = { 
            type: 'checkbox', 
            name: 'checkboxName', 
            id: 'checkboxId',
            classList: mockDOMTokenList as DOMTokenList, 
            parentNode: null, 
            checked: false, 
            nextSibling: null, 
            addEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        };

        mockForm = {
            querySelectorAll: jest.fn((selector) => {
                switch (selector) {
                    case 'input[type="text"]':
                        return [inputText];
                    case 'textarea':
                        return [textArea];
                    case 'input[type="checkbox"]':
                        return [inputCheckbox];
                    default:
                        return [];
                }
            }) as any
        };

        mockDocument = {
            forms: {
                namedItem: jest.fn(() => mockForm) as (name: string) => HTMLFormElement | null
            } as HTMLCollectionOf<HTMLFormElement>
        };
    });

    test("findByName", () => {
        const formElementList = new HTMLFormElementList('testForm', mockDocument as Document);
        expect(formElementList.findByName('textName')).toBe(inputText);
        expect(formElementList.findByName('textAreaName')).toBe(textArea);
        expect((formElementList.findByName('checkboxName') as HTMLCheckboxElement).getUnderlying()).toBe(inputCheckbox);
        expect(formElementList.findByName('nonexistentName')).toBeNull();
    });

    test("htmlTextElements", () => {
        const formElementList = new HTMLFormElementList('testForm', mockDocument as Document);
        expect(formElementList.htmlTextElements()).toEqual([inputText]);
    });

    test("htmlTextAreaElements", () => {
        const formElementList = new HTMLFormElementList('testForm', mockDocument as Document);
        expect(formElementList.htmlTextAreaElements()).toEqual([textArea]);
    });

    test("htmlCheckboxElements", () => {
        const formElementList = new HTMLFormElementList('testForm', mockDocument as Document);
        expect(formElementList.htmlCheckboxElements().map((el) => el.getUnderlying())).toEqual([inputCheckbox]);
    });
});