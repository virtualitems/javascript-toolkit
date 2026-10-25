/**
 * @description Base class for custom elements that render static styles and content in an
 * open shadow root. Subclasses may set {@link BaseWebComponent.styles} and
 * {@link BaseWebComponent.children} as static properties.
 *
 * @abstract
 * @extends HTMLElement
 */
export class BaseWebComponent extends HTMLElement {
    /**
     * @description Options passed to {@link HTMLElement#attachShadow} when an instance is
     * created. Subclasses can override this property.
     *
     * @type {ShadowRootInit}
     */
    static shadowRootOptions = { mode: 'open' }

    /**
     * @description Styles applied to each instance's shadow root. A string is converted to
     * a constructed stylesheet; a stylesheet is adopted directly.
     *
     * @type {CSSStyleSheet | string | undefined}
     */
    static styles

    /**
     * @description Initial shadow-root content. A string is assigned as HTML; a node
     * replaces the root's children and is moved from its current parent.
     *
     * @type {Node | string | undefined}
     */
    static children

    /**
     * @description Creates the component's shadow root and applies the static styles and
     * children declared by its subclass.
     *
     * @throws {TypeError} If BaseWebComponent is instantiated directly.
     * @throws {TypeError} If styles is not a CSSStyleSheet, string, or undefined.
     * @throws {TypeError} If children is not a Node, string, or undefined.
     */
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
 * @description Observable state container. Dispatching a CustomEvent replaces its state
 * with the event's detail before notifying listeners. Other event types leave
 * the state unchanged.
 *
 * @template {Record<string, unknown>} T
 * @extends EventTarget
 */
export class Subject extends EventTarget {
    /** @type {T} */
    #state

    /**
     * @description Creates a subject with an initial state.
     *
     * @param {T} initialState State exposed until a CustomEvent is dispatched.
     */
    constructor(initialState) {
        super()
        this.#state = initialState
    }

    /**
     * @description Returns the most recently assigned state.
     *
     * @returns {T} The current state.
     */
    get state() {
        return this.#state
    }

    /**
     * @description Updates the state from a CustomEvent and dispatches the event to this
     * subject's listeners.
     *
     * @param {Event} event Event to dispatch.
     * @returns {boolean} Whether the event was not canceled.
     */
    dispatchEvent(event) {
        if (event instanceof CustomEvent) {
            this.#state = event.detail
        }
        return super.dispatchEvent(event)
    }
}

/**
 * @description Base object for event handlers that need access to a host object. Subclasses
 * provide the event-handling behavior.
 */
export class EventHandler {
    /**
     * @description Creates an event-handler base object.
     *
     * @param {unknown} host Object associated with the handler.
     */
    constructor(host) {
        this.host = host
    }
}
