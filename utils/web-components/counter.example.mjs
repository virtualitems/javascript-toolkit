import { Subject, css, html } from './vanilla-backpack.mjs'

/** @type {CSSStyleSheet[]} */
const stylesheets = [css(':host { font-size: 4em; cursor: pointer; user-select: none; }')]

class ClickHandler {
    /** @param {WebComponent} host */
    constructor(host) {
        this.host = host
    }

    handleEvent() {
        const { state, shadowRoot } = this.host
        state.update(this.increment)
        shadowRoot.innerHTML = state.current()
    }

    increment(prev) {
        return prev + 1
    }
}

export class WebComponent extends HTMLElement {
    constructor() {
        super()

        // render root
        const root = this.attachShadow({ mode: 'open' })

        // stylesheets
        root.adoptedStyleSheets.push(...stylesheets)

        // children
        root.replaceChildren(html('0'))

        // state
        this.state = new Subject(0)

        // event handlers
        this.clickHandler = new ClickHandler(this)
    }

    connectedCallback() {
        this.addEventListener('click', this.clickHandler)
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.clickHandler)
    }
}

globalThis.customElements.define('web-component', WebComponent)
