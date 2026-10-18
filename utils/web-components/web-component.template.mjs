/** @type {CSSStyleSheet[]} */
const stylesheets = []

export class WebComponent extends HTMLElement {
    constructor() {
        super()
        const root = this.createRenderRoot()
        root.adoptedStyleSheets.push(...stylesheets)
        root.replaceChildren(...children())
    }

    /** @returns {Node[]} */
    children() {
        return []
    }

    /** @returns {Element | ShadowRoot} */
    createRenderRoot() {
        return this.attachShadow({ mode: 'open' })
    }
}

globalThis.customElements.define('web-component', WebComponent)
