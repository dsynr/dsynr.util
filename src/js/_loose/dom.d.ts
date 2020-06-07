declare function addDiv(id?: string, classes?: string, parent?: HTMLElement): HTMLElement;
declare function addText(txt: string | undefined, root: HTMLElement): void;
declare function getElementsBySelector(selector: string): any;
declare function getElementsByTag(tagName: string): NodeListOf<Element>;
declare function getElementsByClass(className: string): HTMLCollection;
declare function getElementById(elementID: string): HTMLElement;
declare function addJS(src: string, id?: string): void;