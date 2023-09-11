import { FormAlertRenderer } from "../../main/renderer/form-alert-renderer";


describe('FormAlertRenderer', () => {
    let mockElement: Partial<HTMLInputElement> & { classList: { add: jest.Mock; remove: jest.Mock } };
    let mockAlertConf: any;
    let mockDocument: Partial<Document>;
    let formAlertRenderer: FormAlertRenderer;

    beforeAll(() => {
        mockElement = {
            id: 'testId',
            classList: {
                add: jest.fn(),
                remove: jest.fn()
            }
        } as any;

        mockAlertConf = {
            labelClassList: ['label-class-1', 'label-class-2'],
            inputClassList: ['input-class-1', 'input-class-2']
        };

        mockDocument = {
            querySelector: jest.fn(() => ({
                classList: {
                    add: jest.fn(),
                    remove: jest.fn(),
                },
            })),
        };

        formAlertRenderer = new FormAlertRenderer(mockElement as any, mockAlertConf, mockDocument as Document);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add classes to label and input elements when render is called', () => {
        formAlertRenderer.render();
        expect(mockDocument.querySelector).toHaveBeenCalledWith('label[for="testId"]');
        expect(mockElement.classList.add).toHaveBeenCalledWith('input-class-1');
        expect(mockElement.classList.add).toHaveBeenCalledWith('input-class-2');
    });

    it('should remove classes from label and input elements when clean is called', () => {
        formAlertRenderer.clean();
        expect(mockDocument.querySelector).toHaveBeenCalledWith('label[for="testId"]');
        expect(mockElement.classList.remove).toHaveBeenCalledWith('input-class-1');
        expect(mockElement.classList.remove).toHaveBeenCalledWith('input-class-2');
    });
});
