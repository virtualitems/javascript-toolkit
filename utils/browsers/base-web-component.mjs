export class BaseWebComponent extends HTMLElement {
  /**
   * @description CSS styles as string
   * @type {string|null}
   */
  static cssString = null

  /**
   * @description HTML template as string
   * @type {string|null}
   */
  static htmlString = null

  /**
   * @description Tag name for the custom element
   * @type {string|null}
   */
  static tagName = null

  /**
   * @property {NamedNodeMap} attributes
   * @property {ShadowRoot} shadowRoot
   */
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

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = this.constructor.htmlString

    const stylesheet = new CSSStyleSheet()
    stylesheet.replace(this.constructor.cssString)
    this.shadowRoot.adoptedStyleSheets.push(stylesheet)
  }

  /**
   * Names of all attributes for which the element needs to change
   */
  static get observedAttributes() {
    return ['class', 'id', 'lang', 'style', 'title']
  }

  /**
   * Called each time the element is added to the document
   */
  connectedCallback() {}

  /**
   * Called each time the element is removed from the document
   */
  disconnectedCallback() {}

  /**
   * Called each time the element is moved by using Element.moveBefore()
   */
  connectedMoveCallback() {}

  /**
   * Called each time the element is moved to a new document
   */
  adoptedCallback() {}

  /**
   * Called when attributes are changed, added, removed, or replaced
   *
   * @param {string} attributeName
   * @param {string|null} oldValue
   * @param {string|null} newValue
   */
  attributeChangedCallback(attributeName, oldValue, newValue) {}
}
