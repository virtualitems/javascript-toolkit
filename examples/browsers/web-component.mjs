export class WebComponent extends HTMLElement {

  static tagName = 'web-component';

  static eventNames = {
    statechange: this.tagName + '.statechange'
  };

  static htmlString = null;

  static cssString = null;

  /**
   * @property {NamedNodeMap} attributes
   * @property {ShadowRoot} shadowRoot
   */
  constructor() {
    super();

    // shadow
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.constructor.htmlString;

    // css
    const styles = new CSSStyleSheet();
    styles.replaceSync(this.constructor.cssString);
    this.shadowRoot.adoptedStyleSheets.push(styles);

    // state
    this.state = new Proxy({}, {
      set: (target, prop, value) => {
        target[prop] = value;
        const name = this.constructor.eventNames.statechange;
        const detail = { element: this, prop, value };
        const payload = { detail, bubbles: true, composed: true };
        const event = new CustomEvent(name, payload);
        this.dispatchEvent(event);
        return true;
      }
    });
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
