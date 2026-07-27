export class BaseWebComponent extends HTMLElement {
  static cssString = null

  static htmlString = null

  /** @type {Record<string, HTMLElement>} */
  refs;

  /** @type {Record<string, EventListenerObject>} */
  handlers;

  /** @type {Record<string, unknown} */
  state;

  constructor() {
    super()

    if (new.target === BaseWebComponent) {
      throw new TypeError(
        'BaseWebComponent is an abstract class and cannot be instantiated directly'
      )
    }

    const { cssString, htmlString } = this.constructor

    if (typeof cssString !== 'string') {
      throw new TypeError('cssString must be a string')
    }

    if (typeof htmlString !== 'string') {
      throw new TypeError('htmlString must be a string')
    }

    this.handlers = {}
    this.refs = {}
    this.state = {}

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = htmlString

    const stylesheet = new CSSStyleSheet()
    stylesheet.replace(cssString)
    this.shadowRoot.adoptedStyleSheets.push(stylesheet)
  }

  static define(tagName) {
    if ('customElements' in window === false) {
      throw new Error('Custom Elements are not supported in this environment')
    }

    if (typeof tagName !== 'string' || tagName.trim() === '') {
      throw new TypeError('tagName must be a non-empty string')
    }

    customElements.define(tagName, this)
  }
}
