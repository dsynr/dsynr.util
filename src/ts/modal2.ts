class modal {

    private root: HTMLElement;
    private context: HTMLElement;
    private content: HTMLElement;
    private modal: HTMLElement;
    private underlay: HTMLElement;

    private rootClasses: string;
    private modalClasses: string;
    private underlayClasses: string;
    private overlayClasses: string;
    private animationClasses: string;

    private prefix: string;
    private suffix: string;

    private disableUnderlay: boolean;
    private useOverlay: boolean;
    private isOverlayOn: boolean;
    private animate: boolean;

    constructor(modalContent: HTMLElement, options: object | null = null) {
        lfn('constructor-modal');

        let alignmentClasses: string = 'top left';
        let positionClasses: string = 'position-absolute';

        this.animate = addProp(this, 'animate', true);
        this.isOverlayOn = addProp(this, 'isOverlayOn', false);
        this.useOverlay = addProp(this, 'useOverlay', true);
        this.disableUnderlay = addProp(this, 'disableUnderlay', true);
        this.suffix = addProp(this, 'suffix', totModals.toString());
        this.prefix = addProp(this, 'prefix', 'dsynrModal');
        this.animationClasses = addProp(this, 'animationClasses', 'animated fadeIn');
        this.overlayClasses = addProp(this, 'overlayClasses', 'o05 bg-dark');
        this.underlayClasses = addProp(this, 'underlayClasses', this.stringup([positionClasses, alignmentClasses, 'z1 wmax hmax']));
        this.modalClasses = addProp(this, 'modalClasses', this.stringup([positionClasses, 'z2']));
        this.rootClasses = addProp(this, 'rootClasses', 'z3 o0');


        this.content = modalContent;
        this.updateOptions(options);
        this.setup();
        this.showModal();
    }

    private setup() {
        lfn('setup');

        if (this.animate) {
            this.modalClasses = this.stringup([this.modalClasses, this.animationClasses]);
            this.underlayClasses = this.stringup([this.underlayClasses, this.animationClasses]);
        }

        this.root = addDiv(this.setName('root', this.content.id), this.rootClasses, this.context);


        if (this.disableUnderlay) {
            this.root.style.width = getCssDimension(this.context.clientWidth);
            this.root.style.height = getCssDimension(this.context.clientHeight);

            if (this.useOverlay) {
                this.underlayClasses = this.stringup([this.underlayClasses, this.overlayClasses]);
            }

            this.underlay = addDiv(this.setName('underlay', this.content.id), this.underlayClasses, this.root);
        }

        this.modal = addDiv(this.setName('modal', this.context.id), this.modalClasses, this.root);
        //addListener('xModal', 'click', this.closeCurModal());
        if (this.animate) {
            curModal.addEventListener(transitionEvent, this.modalHidden);
        }
        //update to detect parent (context) resizing opposed to just window
        window.addEventListener('resize', this.align);
        this.modal.appendChild(this.content);
        this.align();
        this.setActive();
    }

    private setActive() {
        activeModal = this.root;
        this.content.focus();
    }

    private setName(context: string, n: string): string {
        return this.stringup([this.prefix, context, this.suffix], '-');
    }

    private stringup(strings: Array<any>, seperator: string = ' '): string {
        return strings.join(seperator);
    }

    public updateOptions(options: object | null) {
        lfn('updateOptions');

        let preferences: any = getData(this.content, 'dsynr-options');
        if (preferences !== null) {
            options = JSON.parse(preferences);
        } else if (options !== null) {
            updateProps(this, options);
        }
        l(this);
    }

    showBlanket(): void {
        let blanket: HTMLElement;
        blanket = addDiv('blanket', this.overlayClasses, document.body);
        addDiv('blanketcoat', this.underlayClasses, blanket);
        blanket.classList.remove('o0');
        blanket.addEventListener(transitionEvent, blanketHidden);
        this.isOverlayOn = true;
    }

    hideBlanket() {
        let blanket: HTMLElement;
        blanket = getElementById('blanket');
        blanket.classList.remove('fadeIn');
        blanket.classList.add('fadeOut');
    }

    blanketHidden(event) {
        // Do something when the transition ends
        let blanket: HTMLElement;
        blanket = getElementById('blanket');
        if (event.animationName == 'fadeOut') {
            blanket.removeEventListener(transitionEvent, blanketHidden);
            blanket.remove();
            this.isOverlayOn = false;
        }
    }

    showModal(): void {
        if (this.useOverlay) {
            this.showBlanket();
        }

        totModals++;
    }

    closeCurModal(): void {
        if (this.isOverlayOn) {
            this.hideBlanket();
            curModal.classList.remove('zoomIn');
            curModal.classList.add('zoomOut');
        }
    }

    align() {
        if (this.isOverlayOn) {
            centereStage(this.modal);
        }
    }

    modalHidden(event) {
        // Do something when the transition ends
        if (event.animationName == 'zoomOut') {
            curModal.classList.add('d-none');
            curModal.classList.remove('zoomOut');
            curModal.removeEventListener(transitionEvent, this.modalHidden);
        }
    }
}

function autoModalize(modalClass: string = 'dsynrModal') {
    lfn('autoModalize');
    makeArray(getElementsByClass(modalClass)).forEach(function (mdl, index) {
        mdl.style.display = 'none';
        l(getData(mdl, 'dsynr-options'));
        let modl = new modal(mdl);
        modals.push(mdl);
    });
}

let activeModal: HTMLElement, totModals: number = 0, modals: Array<modal>;
