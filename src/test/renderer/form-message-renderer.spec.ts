import { FormMessageRenderer } from "../../main/renderer/form-message-renderer";


describe('FormMessageRenderer', () => {
    let mockElement: Partial<HTMLInputElement> & { classList: { add: jest.Mock; remove: jest.Mock }, parentNode: Partial<Node> };
    let mockAlertConf: any;
    let mockDocument: Partial<Document>;
    let formMessageRenderer: FormMessageRenderer;

    beforeAll(() => {
        mockElement = {
            id: 'testElement',
            classList: {
                add: jest.fn(),
                remove: jest.fn(),
            },
            parentNode: {
                insertBefore: jest.fn(),
            },
        } as any;

        mockAlertConf = {
            paragraphClassList: ['para-class-1', 'para-class-2'],
        };

        mockDocument = {
            getElementById: jest.fn(),
            createElement: jest.fn(() => ({
                classList: {
                    add: jest.fn(),
                },
                id: '',
                textContent: ''
            })),
        } as any;

        formMessageRenderer = new FormMessageRenderer(mockElement as any, mockAlertConf, mockDocument as Document);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create and insert an error message element when render is called with messages', () => {
        const messages = ['Error 1', 'Error 2'];
        formMessageRenderer.render(messages);
        expect(mockDocument.getElementById).toHaveBeenCalledWith('testElement-error');
        expect(mockDocument.createElement).toHaveBeenCalledWith('p');
        expect(mockElement.parentNode?.insertBefore).toHaveBeenCalled();
    });

    it('should remove the error message element when clean is called', () => {
        formMessageRenderer.clean();
        expect(mockDocument.getElementById).toHaveBeenCalledWith('testElement-error');
    });
});
