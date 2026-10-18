import { Subject, css, html } from './vanilla-backpack.mjs'

/** @type {CSSStyleSheet[]} */
const stylesheets = [css(':host { font-size: 4em; cursor: pointer; user-select: none; }')]

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
        this.onClick = () => {
            this.state.update((prev) => prev + 1)
            root.innerHTML = this.state.current()
        }
    }

    connectedCallback() {
        this.addEventListener('click', this.onClick)
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.onClick)
    }
}

globalThis.customElements.define('web-component', WebComponent)
