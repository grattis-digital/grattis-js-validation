import { HTMLCheckboxElement } from "../../main/form/html-check-box-element";
import { RequiredValidator } from "../../main/validator/required-validator";


describe('RequiredValidator', () => {
    let requiredValidator: RequiredValidator;

    describe('supportsType', () => {
        beforeEach(() => {
            requiredValidator = new RequiredValidator({ isRequired: true });
        });

        it('should return true for HTMLInputElement instances', () => {
            expect(requiredValidator.supportsType(document.createElement('input'))).toBe(true);
        });

        it('should return true for HTMLTextAreaElement instances', () => {
            expect(requiredValidator.supportsType(document.createElement('textarea'))).toBe(true);
        });

        it('should return true for HTMLCheckboxElement instances', () => {
            const checkboxElement = new HTMLCheckboxElement(document.createElement('input'));
            expect(requiredValidator.supportsType(checkboxElement)).toBe(true);
        });

        it('should return false for other element types', () => {
            expect(requiredValidator.supportsType(document.createElement('div'))).toBe(false);
        });
    });

    describe('isolate', () => {
        it('should return the configured isolate value', () => {
            requiredValidator = new RequiredValidator({ isRequired: true, isolate: true });
            expect(requiredValidator.isolate()).toBe(true);
        });

        it('should return false if isolate is not configured', () => {
            requiredValidator = new RequiredValidator({ isRequired: true });
            expect(requiredValidator.isolate()).toBe(false);
        });
    });

    describe('validate', () => {
        it('should validate element value based on isRequired configuration', () => {
            const inputElement = document.createElement('input');
            inputElement.value = '';

            requiredValidator = new RequiredValidator({ isRequired: true, errorMessage: 'Field is required' });
            expect(requiredValidator.validate(inputElement)).toEqual({ isValid: false, message: 'Field is required' });

            inputElement.value = 'some value';
            expect(requiredValidator.validate(inputElement)).toEqual({ isValid: true });

            const textAreaElement = document.createElement('textarea');
            textAreaElement.value = '';
            expect(requiredValidator.validate(textAreaElement)).toEqual({ isValid: false, message: 'Field is required' });

            textAreaElement.value = 'some text';
            expect(requiredValidator.validate(textAreaElement)).toEqual({ isValid: true });

            const checkboxElement = new HTMLCheckboxElement(document.createElement('input'));
            checkboxElement.checked = false;
            expect(requiredValidator.validate(checkboxElement)).toEqual({ isValid: false, message: 'Field is required' });

            checkboxElement.checked = true;
            expect(requiredValidator.validate(checkboxElement)).toEqual({ isValid: true });
        });
    });
});
