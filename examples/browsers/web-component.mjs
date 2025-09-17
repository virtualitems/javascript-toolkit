export class BaseCustomElement extends HTMLElement {

  static tagName = null;

  static htmlString = null;

  static cssString = null;

  static eventNames = Object.freeze({});

  constructor() {
    super();

    if (new.target === BaseCustomElement) {
      throw new TypeError('BaseCustomElement is an abstract class and cannot be instantiated directly.');
    }

    // shadow
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.constructor.htmlString;

    // css
    const styles = new CSSStyleSheet();
    styles.replaceSync(this.constructor.cssString);
    this.shadowRoot.adoptedStyleSheets.push(styles);

  }
}

export class WebComponent extends BaseCustomElement {

  /**
   * @property {NamedNodeMap} attributes
   * @property {ShadowRoot} shadowRoot
   */
  constructor() {
    super();
    console.log('ƒ constructor', this);

    this.addEventListener('click', this.handleClick);
  }

  static get observedAttributes() {
    return ['class', 'id', 'lang', 'style', 'title'];
  }

  connectedCallback() {
    console.log('ƒ connectedCallback');
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.log('ƒ attributeChangedCallback', attributeName, oldValue, newValue);
  }

  adoptedCallback() {
    console.log('ƒ adoptedCallback');
  }

  disconnectedCallback() {
    console.log('ƒ disconnectedCallback');
    // stop intervals
    // remove event listeners
    this.removeEventListener('click', this.handleClick);
    // dispose DOM elements
    // nullify references
  }

  handleClick() {
    console.log('ƒ handleClick');
    this.classList.toggle('active');
    const targetSelector = this.getAttribute('data-target');

    if (typeof targetSelector !== 'string' || targetSelector.length === 0) {
      return;
    }

    const target = document.querySelector(targetSelector);

    if (target === null) {
      console.warn(`No element matches selector "${targetSelector}".`);
      return;
    }

    target.remove();
  }
}

/**
 * HTML template as string
 *
 * @type {string}
 */
WebComponent.htmlString = `
  <h1>
    <slot></slot>
  </h1>
  <p>
    <slot name="text"></slot>
  </p>
`;

/**
 * CSS styles as string
 *
 * @type {string}
 */
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
  :host(.active),
  :host(:hover) {
    background-color: beige;
  }
  ::slotted(span) {
    color: magenta;
  }
  h1 {
    color: blue;
  }
`;

/**
 * Custom element tag name
 *
 * @type {string}
 */
WebComponent.tagName = 'web-component';
