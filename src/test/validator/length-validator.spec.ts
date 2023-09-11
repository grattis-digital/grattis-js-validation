import { LengthValidator } from "../../main/validator/length-validator";


describe('LengthValidator', () => {
    let lengthValidator: LengthValidator;

    describe('supportsType', () => {
        beforeEach(() => {
            lengthValidator = new LengthValidator({});
        });

        it('should return true for HTMLInputElement instances', () => {
            expect(lengthValidator.supportsType(document.createElement('input'))).toBe(true);
        });

        it('should return true for HTMLTextAreaElement instances', () => {
            expect(lengthValidator.supportsType(document.createElement('textarea'))).toBe(true);
        });

        it('should return false for other element types', () => {
            expect(lengthValidator.supportsType(document.createElement('div'))).toBe(false);
        });
    });

    describe('isolate', () => {
        it('should return the configured isolate value', () => {
            lengthValidator = new LengthValidator({ isolate: true });
            expect(lengthValidator.isolate()).toBe(true);
        });

        it('should return false if isolate is not configured', () => {
            lengthValidator = new LengthValidator({});
            expect(lengthValidator.isolate()).toBe(false);
        });
    });

    describe('validate', () => {
        it('should validate element value length against configured min and max length', () => {
            const inputElement = document.createElement('input');
            inputElement.value = 'test';

            lengthValidator = new LengthValidator({ minLength: 3, maxLength: 5, message: 'Length must be between {min} and {max}' });
            expect(lengthValidator.validate(inputElement)).toEqual({ isValid: true });

            inputElement.value = 'te';
            expect(lengthValidator.validate(inputElement)).toEqual({ isValid: false, message: 'Length must be between 3 and 5' });

            inputElement.value = 'testing';
            expect(lengthValidator.validate(inputElement)).toEqual({ isValid: false, message: 'Length must be between 3 and 5' });
        });
    });
});
