import { css, html } from './utils.mjs'

/** @type {CSSStyleSheet[]} */
const stylesheets = [css('')]

export class WebComponent extends HTMLElement {
    constructor() {
        super()
        const root = this.attachShadow({ mode: 'open' })
        root.adoptedStyleSheets.push(...stylesheets)
        root.replaceChildren(html(''))
    }
}

globalThis.customElements.define('web-component', WebComponent)
