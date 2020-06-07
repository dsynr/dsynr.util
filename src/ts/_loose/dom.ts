function addDiv(id: string = '', classes: string = '', parent: HTMLElement = document.body): HTMLElement {
    let div: HTMLElement = document.createElement('DIV');
    div.id = id;
    div.className = classes;
    parent.appendChild(div);
    return div;
}

function addText(txt: string = '', root: HTMLElement): void {
    root.appendChild(document.createTextNode(txt));
}

function getElementsBySelector(selector: string): any {
    return document.querySelectorAll(selector);
}

function getElementsByTag(tagName: string) {
    return document.querySelectorAll(tagName);
}

function getElementsByClass(className: string): HTMLCollection {
    return document.getElementsByClassName(className);
}

function getElementById(elementID: string): HTMLElement {
    return window[elementID];
}

function addJS(src: string, id: string = ''): void {
    let js = document.createElement('script');
    js.setAttribute('src', src);
    js.id = id;
    document.head.appendChild(js);
}