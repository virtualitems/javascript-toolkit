class WebComponent extends HTMLElement {

  /**
   * @property {NamedNodeMap} attributes
   * @property {ShadowRoot} shadowRoot
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    // return an array of attribute names
    return ['class', 'id', 'lang', 'style', 'title'];
  }

  get html() {
    return '<h1><slot></slot></h1>';
  }

  get css() {
    return 'h1 { color: red; }';
  }

  render() {
    console.log('ƒ render');
    const css = new CSSStyleSheet();
    css.replaceSync(this.css);
    this.shadowRoot.adoptedStyleSheets.push(css);
    this.shadowRoot.innerHTML = this.html;
  }

  dispose() {
    console.log('ƒ dispose');
    // stop intervals
    // remove event listeners
    // dispose DOM elements
    // nullify references
  }

  connectedCallback() {
    console.log('ƒ connectedCallback');
    this.render();
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.log('ƒ attributeChangedCallback', attributeName, oldValue, newValue);
    this.dispose();
    this.render();
  }

  adoptedCallback() {
    console.log('ƒ adoptedCallback');
    this.dispose();
    this.render();
  }

  disconnectedCallback() {
    console.log('ƒ disconnectedCallback');
    this.dispose();
  }
}

customElements.define('web-component', WebComponent);
