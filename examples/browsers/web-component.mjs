export class BaseCustomElement extends HTMLElement {

  static tagName = null;

  static htmlString = null;

  static cssString = null;

  static eventNames = Object.freeze({
    statechange: 'ce.statechange',
  });

  #state = null;

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

  get state() {
    return this.#state;
  }

  set state(newState) {

    if (newState !== undefined && (newState !== null && newState.constructor !== Object)) {
      throw new TypeError(' State must be a plain object or null.');
    }

    if (Object.is(this.#state, newState)) {
      // no change, no event
      return;
    }

    else if (newState === null) {
      // nullify state
      this.#state = null;
    }

    else {
      // update state
      const data = Object.assign({}, newState);
      Object.freeze(data);
      this.#state = data;
    }

    const name = this.constructor.eventNames.statechange;
    const detail = { element: this, state: this.#state };
    const payload = { detail, bubbles: true, composed: true };
    const event = new CustomEvent(name, payload);
    this.dispatchEvent(event);
  };
}

export class WebComponent extends BaseCustomElement {

  /**
   * @property {NamedNodeMap} attributes
   * @property {ShadowRoot} shadowRoot
   * @property {Object|null} state
   */
  constructor() {
    super();
    console.log('ƒ constructor', this);
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
    // dispose DOM elements
    // nullify references
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
