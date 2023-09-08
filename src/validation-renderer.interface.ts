export interface ValidationRenderer<T> {
    render(renderValue: T): void
    clean(): void;
}