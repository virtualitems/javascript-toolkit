/**
 * @description Abstract class for custom web components
 */
export class BaseWebComponent extends HTMLElement {
    /** @type {ShadowRootInit} */
    static shadowRootOptions = { mode: 'open' }

    /** @type {CSSStyleSheet | string | undefined} */
    static styles

    /** @type {Node | string | undefined} */
    static children

    constructor() {
        super()

        if (new.target === BaseWebComponent) {
            throw new TypeError(
                'BaseWebComponent is an abstract class and cannot be instantiated directly'
            )
        }

        const { styles, children } = this.constructor

        const root = this.attachShadow(this.constructor.shadowRootOptions)

        if (typeof styles === 'string') {
            const stylesheet = new CSSStyleSheet()
            stylesheet.replace(styles)
            root.adoptedStyleSheets.push(stylesheet)
        }
        else if (styles instanceof CSSStyleSheet) {
            root.adoptedStyleSheets.push(styles)
        }
        else if (styles !== undefined) {
            throw new TypeError('styles must be a CSSStyleSheet, string, or undefined')
        }

        if (typeof children === 'string') {
            root.innerHTML = children
        }
        else if (children instanceof Node) {
            root.replaceChildren(children)
        }
        else if (children !== undefined) {
            throw new TypeError('children must be a Node, string, or undefined')
        }
    }
}

/**
 * @template {Record<string, unknown>} T
 */
export class Subject extends EventTarget {
    /** @type {T} */
    #state

    /** @param {T} initialState */
    constructor(initialState) {
        super()
        this.#state = initialState
    }

    get state() {
        return this.#state
    }

    /** @param {Event} event */
    dispatchEvent(event) {
        if (event instanceof CustomEvent) {
            this.#state = event.detail
        }
        return super.dispatchEvent(event)
    }
}
