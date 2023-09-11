export class HTMLCheckboxElement {
    constructor(
        private underlying: HTMLInputElement
    ) {}

    getUnderlying(): HTMLInputElement {
        return this.underlying;
    }

    name: string = this.underlying.name;
    id: string = this.underlying.id;
    classList: DOMTokenList = this.underlying.classList;    
    parentNode: Node | null = this.underlying.parentNode;
    checked: boolean = this.underlying.checked;
    nextSibling: Node | null = this.underlying.nextSibling;
    addEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined) => void = this.underlying.addEventListener.bind(this.underlying);
    dispatchEvent: (event: Event) => boolean = this.underlying.dispatchEvent.bind(this.underlying);
}