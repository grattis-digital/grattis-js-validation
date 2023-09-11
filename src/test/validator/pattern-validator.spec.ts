import { PatternValidator } from "../../main/validator/pattern-validator";

describe('PatternValidator', () => {
    let patternValidator: PatternValidator;

    describe('supportsType', () => {
        beforeEach(() => {
            patternValidator = new PatternValidator({ pattern: '\\d+' });
        });

        it('should return true for HTMLInputElement instances', () => {
            expect(patternValidator.supportsType(document.createElement('input'))).toBe(true);
        });

        it('should return true for HTMLTextAreaElement instances', () => {
            expect(patternValidator.supportsType(document.createElement('textarea'))).toBe(true);
        });

        it('should return false for other element types', () => {
            expect(patternValidator.supportsType(document.createElement('div'))).toBe(false);
        });
    });

    describe('isolate', () => {
        it('should return the configured isolate value', () => {
            patternValidator = new PatternValidator({ pattern: '\\d+', isolate: true });
            expect(patternValidator.isolate()).toBe(true);
        });

        it('should return false if isolate is not configured', () => {
            patternValidator = new PatternValidator({ pattern: '\\d+' });
            expect(patternValidator.isolate()).toBe(false);
        });
    });

    describe('validate', () => {
        it('should validate element value against the configured pattern', () => {
            const inputElement = document.createElement('input');
            inputElement.value = '123';

            patternValidator = new PatternValidator({ pattern: '\\d+', message: 'Value must match pattern xyz' });
            expect(patternValidator.validate(inputElement)).toEqual({ isValid: true });

            inputElement.value = 'abc';
            expect(patternValidator.validate(inputElement)).toEqual({ isValid: false, message: 'Value must match pattern xyz' });
        });
    });
});
