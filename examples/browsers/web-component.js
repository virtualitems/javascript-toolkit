class WebComponent extends HTMLElement {

  /**
   * @property {NamedNodeMap} attributes
   * @property {ShadowRoot} shadowRoot
   */
  constructor() {
    super();

    // shadow
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.html;

    // css
    const styles = new CSSStyleSheet();
    styles.replaceSync(this.css);
    this.shadowRoot.adoptedStyleSheets.push(styles);

    // state
    const attrs = {};

    for (let attr of this.attributes) {
      attrs[attr.name] = attr.value;
    }

    this.state = new Proxy(attrs, {
      set: (target, key, value) => {
        target[key] = value;
        ('object' !== typeof value) && this.setAttribute(key, value);
        return true;
      }
    });

  }

  static get observedAttributes() {
    return ['class', 'id', 'lang', 'style', 'title'];
  }

  get html() {
    return '<h1><slot></slot></h1>' + '<p><slot name="text"></slot></p>';
  }

  get css() {
    return 'h1 { color: darkred; }';
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

customElements.define('web-component', WebComponent);
