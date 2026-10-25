export class WebComponent extends HTMLElement {
    /** @type {boolean} */
    autocorrect = false

    /** @type {number} */
    headingOffset = 0

    /** @type {boolean} */
    headingReset = false

    /** @type {Element | null} */
    ariaActiveDescendantElement = null

    /** @type {Element[]} */
    ariaControlsElements = []

    /** @type {Element[]} */
    ariaDescribedByElements = []

    /** @type {Element[]} */
    ariaDetailsElements = []

    /** @type {Element[]} */
    ariaErrorMessageElements = []

    /** @type {Element[]} */
    ariaFlowToElements = []

    /** @type {Element[]} */
    ariaLabelledByElements = []

    /** @type {Element[]} */
    ariaOwnsElements = []

    /** @type {string[]} */
    static disabledFeatures = []

    /** @type {boolean} */
    static formAssociated = false

    /** @type {CSSStyleSheet[]} */
    static stylesheets = []

    /** @type {string[]} */
    static get observedAttributes() {
        return []
    }

    /** @returns {Node[]} */
    static children() {
        return []
    }

    constructor() {
        super()
        const root = this.createRenderRoot()
        root.adoptedStyleSheets.push(...WebComponent.stylesheets)
        root.replaceChildren(...WebComponent.children())
    }

    /** @returns {Element | ShadowRoot} */
    createRenderRoot() {
        return this.attachShadow({ mode: 'open' })
    }

    /** @returns {ElementInternals} */
    createInternals() {
        return this.attachInternals()
    }

    /**
     * @param {string} announcement
     * @param {{ priority?: 'normal' | 'high' }} [options]
     */
    ariaNotify(announcement, options) {
        console.debug('ariaNotify', announcement, options)
    }

    connectedCallback() {
        console.debug('connectedCallback')
    }

    disconnectedCallback() {
        console.debug('disconnectedCallback')
    }

    connectedMoveCallback() {
        console.debug('connectedMoveCallback')
    }

    /**
     * @param {Document} oldDocument
     * @param {Document} newDocument
     */
    adoptedCallback(oldDocument, newDocument) {
        console.debug('adoptedCallback', oldDocument, newDocument)
    }

    /**
     * @param {string} name
     * @param {string | null} oldValue
     * @param {string | null} newValue
     * @param {string | null} namespace
     */
    attributeChangedCallback(name, oldValue, newValue, namespace) {
        console.debug('attributeChangedCallback', name, oldValue, newValue, namespace)
    }

    /** @param {HTMLFormElement | null} form */
    formAssociatedCallback(form) {
        console.debug('formAssociatedCallback', form)
    }

    /** @param {boolean} disabled */
    formDisabledCallback(disabled) {
        console.debug('formDisabledCallback', disabled)
    }

    formResetCallback() {
        console.debug('formResetCallback')
    }

    /**
     * @param {string | File | FormData | null} state
     * @param {'restore' | 'autocomplete'} reason
     */
    formStateRestoreCallback(state, reason) {
        console.debug('formStateRestoreCallback', state, reason)
    }
}

globalThis.customElements.define('web-component', WebComponent)
