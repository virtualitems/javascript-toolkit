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

  render() {
    console.log('ƒ render');
    this.shadowRoot.innerHTML = '<h1><slot></slot></h1>';
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
