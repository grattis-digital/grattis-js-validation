import { FormValidationConf } from "../main/conf/form-validation-conf.type";
import { FormValidationInitializer, FormValidationInitializerConfiguration } from "../main/form-validation-initializer";
import { HTMLFormElementList } from "../main/form/html-form-element-list";
import { FormAlertRenderer } from "../main/renderer/form-alert-renderer";
import { FormMessageRenderer } from "../main/renderer/form-message-renderer";
import { LengthValidator } from "../main/validator/length-validator";
import { PatternValidator } from "../main/validator/pattern-validator";
import { RequiredValidator } from "../main/validator/required-validator";

describe('FormValidationInitializer', () => {

  let windowMock: Partial<Window>;
  let documentMock: Partial<Document>;
  let formMock: Partial<HTMLFormElement>;
  let formValidationInitializer: FormValidationInitializer;
  let mockConfiguration: jest.Mocked<FormValidationInitializerConfiguration>;
  let mockHtmElementList: jest.Mocked<HTMLFormElementList>;
  let mockedAlertRenderer: jest.Mocked<FormAlertRenderer>;
  let mockedMessageRenderer: jest.Mocked<FormMessageRenderer>;
  let formValidationConf: FormValidationConf;
  let sampleInput: HTMLInputElement;

  beforeEach(() => {
    formValidationConf = {
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

    mockHtmElementList = {
        findByName: jest.fn()
    } as any;

    mockedAlertRenderer = {
        render: jest.fn(),
        clean: jest.fn()
    } as any;

    mockedMessageRenderer = {
        render: jest.fn(),
        clean: jest.fn()
    } as any;

    mockConfiguration = {
        elementList: jest.fn(),
        alertRenderer: jest.fn(),
        messageRenderer: jest.fn()
      } as any;

    windowMock = {
      scrollTo: jest.fn(),
      scrollBy: jest.fn()
    };

    documentMock = {
      forms: {
        namedItem: jest.fn(),
      },
      createElement: jest.fn(),
      querySelector: jest.fn(),

    } as any;

    formMock = {
        addEventListener: jest.fn(),
        querySelectorAll: jest.fn(),
        submit: jest.fn()
    } as any;

    if(documentMock.forms) {
        jest.spyOn(documentMock.forms, 'namedItem').mockReturnValue(formMock as any);
    }

    sampleInput = document.createElement('input');
    jest.spyOn(mockHtmElementList, 'findByName').mockReturnValue(sampleInput);
    jest.spyOn(mockConfiguration, 'elementList').mockReturnValue(mockHtmElementList);
    jest.spyOn(mockConfiguration, 'alertRenderer').mockReturnValue(mockedAlertRenderer);
    jest.spyOn(mockConfiguration, 'messageRenderer').mockReturnValue(mockedMessageRenderer);


    formValidationInitializer = new FormValidationInitializer(windowMock as Window, documentMock as Document, mockConfiguration);

  });

  describe('registerEvents', () => {
    it('should register form validation events on a given form element and validate on focusout', () => {
        jest.spyOn(sampleInput, 'addEventListener');
        jest.spyOn(mockedMessageRenderer, 'render');
        jest.spyOn(mockedAlertRenderer, 'render');

        formValidationInitializer.registerEvents(formValidationConf);
        const focusCallBack = (sampleInput.addEventListener as jest.Mock).mock.calls.find(call => call[0] === 'focusout')[1];
        focusCallBack(new FocusEvent('focusout'));
        expect(sampleInput.addEventListener).toHaveBeenCalledWith('focusout', expect.any(Function));
        expect(mockedMessageRenderer.render).toHaveBeenCalledWith(['Name ist ein Pflichtfeld.']);
        expect(mockedAlertRenderer.render).toHaveBeenCalled();
    });

    it('should register form validation events on a given form element and validate on change', () => {
        jest.spyOn(sampleInput, 'addEventListener');
        jest.spyOn(mockedMessageRenderer, 'render');
        jest.spyOn(mockedAlertRenderer, 'render');

        formValidationInitializer.registerEvents(formValidationConf);
        const focusCallBack = (sampleInput.addEventListener as jest.Mock).mock.calls.find(call => call[0] === 'change')[1];
        focusCallBack(new FocusEvent('change'));
        expect(sampleInput.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
        expect(mockedMessageRenderer.render).toHaveBeenCalledWith(['Name ist ein Pflichtfeld.']);
        expect(mockedAlertRenderer.render).toHaveBeenCalled();
    });

    it('should register form validation events on a given form element and clean on focusin', () => {
        jest.spyOn(sampleInput, 'addEventListener');
        jest.spyOn(mockedMessageRenderer, 'clean');
        jest.spyOn(mockedAlertRenderer, 'clean');

        formValidationInitializer.registerEvents(formValidationConf);
        const focusCallBack = (sampleInput.addEventListener as jest.Mock).mock.calls.find(call => call[0] === 'focusin')[1];
        focusCallBack(new FocusEvent('focusin'));
        expect(sampleInput.addEventListener).toHaveBeenCalledWith('focusin', expect.any(Function));
        expect(mockedMessageRenderer.clean).toHaveBeenCalled();
        expect(mockedAlertRenderer.clean).toHaveBeenCalled();
    });

    it('should register form validation events on a given form element and validate on form submit', () => {
        jest.spyOn(formMock, 'addEventListener');
        jest.spyOn(formMock, 'querySelectorAll').mockReturnValue([document.createElement('div')] as any);
        jest.spyOn(mockedMessageRenderer, 'render');
        jest.spyOn(mockedAlertRenderer, 'render');

        formValidationInitializer.registerEvents(formValidationConf);
        const focusCallBack = (formMock.addEventListener as jest.Mock).mock.calls.find(call => call[0] === 'submit')[1];
        focusCallBack(new FocusEvent('submit'));
        expect(formMock.addEventListener).toHaveBeenCalledWith('submit', expect.any(Function));
        expect(mockedMessageRenderer.render).toHaveBeenCalledWith(['Name ist ein Pflichtfeld.']);
        expect(mockedAlertRenderer.render).toHaveBeenCalled();
        expect(formMock.submit).not.toHaveBeenCalled();
    });

    it('should register form validation events on a given form element and submit form if there are no errors', () => {
        jest.spyOn(formMock, 'addEventListener');
        jest.spyOn(formMock, 'querySelectorAll').mockReturnValue([] as any);
        formValidationInitializer.registerEvents(formValidationConf);
        const focusCallBack = (formMock.addEventListener as jest.Mock).mock.calls.find(call => call[0] === 'submit')[1];
        focusCallBack(new FocusEvent('submit'));
        expect(formMock.addEventListener).toHaveBeenCalledWith('submit', expect.any(Function));
        expect(formMock.submit).toHaveBeenCalled();
    });

  });

});
