export class WebComponent extends HTMLElement {
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
    console.debug('ƒ constructor', this)
    const { cssString, htmlString } = this.constructor

    if (typeof cssString !== 'string') {
      throw new TypeError('cssString must be a string')
    }

    if (typeof htmlString !== 'string') {
      throw new TypeError('htmlString must be a string')
    }

    // html
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = this.constructor.htmlString

    // css
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
  connectedCallback() {
    console.debug('ƒ connectedCallback')
  }

  /**
   * Called each time the element is removed from the document
   * - dispose DOM elements
   * - nullify references
   * - remove event listeners
   * - stop intervals
   * - stop observers
   */
  disconnectedCallback() {
    console.debug('ƒ disconnectedCallback')
  }

  /**
   * Called each time the element is moved by using Element.moveBefore()
   */
  connectedMoveCallback() {
    console.debug('ƒ connectedMoveCallback')
  }

  /**
   * Called each time the element is moved to a new document
   */
  adoptedCallback() {
    console.debug('ƒ adoptedCallback')
  }

  /**
   * Called when attributes are changed, added, removed, or replaced
   *
   * @param {string} attributeName
   * @param {string|null} oldValue
   * @param {string|null} newValue
   */
  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.debug('ƒ attributeChangedCallback', attributeName, oldValue, newValue)
  }
}

WebComponent.tagName = 'web-component'

WebComponent.htmlString = `
  <h1>
    <slot></slot>
  </h1>
  <p>
    <slot name="text"></slot>
  </p>
`

WebComponent.cssString = `
  :host {
    display: block;
    border: 1px dashed black;
    padding: 1rem;
    margin: 1rem;
    font-family: sans-serif;
    text-align: center;
    user-select: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  :host(:hover) {
    background-color: beige;
  }
  :host(.active) {
    background-color: lightblue;
  }
  ::slotted(span) {
    color: magenta;
  }
  h1 {
    color: blue;
  }
`
