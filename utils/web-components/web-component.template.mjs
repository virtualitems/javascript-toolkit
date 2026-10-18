export class WebComponent extends HTMLElement {
    /** @type {CSSStyleSheet[]} */
    static stylesheets = []

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
}

globalThis.customElements.define('web-component', WebComponent)
