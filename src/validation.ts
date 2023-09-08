import { FormValidationInitializer } from './form-validation-initializer';
import { LengthValidator } from './length-validator';
import { PatternValidator } from './pattern-validator';
import { RequiredValidator } from './required-validator';

const formValidationConf = {
    formName: 'testForm',
    errorStateMarkerClass: 'error-state',
    alertClassConf: {
        inputConf: {
            labelClassList: [            
                'text-red-700'
            ],
            inputClassList: [
                'border-red-500',
                'text-red-900',
                'bg-red-50'
            ]
        },
        messageConf: {
            paragraphClassList: [
                'mt-2', 
                'text-sm',
                'text-red-600'
            ]
        }
    },
    elements: [
        {
            validatorList: [
                new RequiredValidator({
                    isRequired: true,
                    errorMessage: "Name ist ein Pflichtfeld.",
                    isolate: true
                }),
                new LengthValidator({
                    minLength: 2,
                    maxLength: 80,
                    message: `Der Name sollte zwischen '{min} und '{max}' Zeichen lang sein.`
                }),
                new PatternValidator({
                    pattern: '^[a-z]+$',
                    message: 'Der Name sollte aus kleinen Buchstaben des Alphabets bestehen.'
                })
            ],
            formElementName: 'name'
        }
    ]
};

(($window, $document) => {
    const formValidationInitializer = new FormValidationInitializer($window, $document);
    formValidationInitializer.registerEvents(formValidationConf);
})(window, document);