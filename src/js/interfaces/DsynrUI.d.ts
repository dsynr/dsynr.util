declare interface DsynrUI {
    parent: HTMLElement;
    instance: HTMLElement;
    setPref(preferences: object): void;
    setDefaults(reset: boolean): void;
    setup(): void;
    show(): void;
    attention(): void;
    hide(): void;
    destroy(): void;
}
