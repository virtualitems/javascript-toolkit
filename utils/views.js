/**
 * @fileoverview HTML controllers for template tags.
 */


class TemplateView {

  /**
   * @param {HTMLTemplateElement} template
   * @param {HTMLElement} parent
   */
  constructor(template, parent) {

    const contents = template.content.cloneNode(true);

    this.root = contents.firstElementChild;
    this.bindings = new Map();

    const boundElements = contents.querySelectorAll('[data-bind]');

    boundElements.forEach(element => {
      const key = element.dataset.bind;
      this.bindings.set(key, element);
    });

    parent.appendChild(contents);

  }

  /**
   * @param {{[key: string]: unknown}} data
   */
  update(data) {

    if (this.bindings === null) {
      throw new Error('The element has been removed');
    }

    for (const key in data) {
      const element = this.bindings.get(key);

      if (element === undefined) {
        throw new Error(`Binding not found for key: ${key}`);
      }

      element.textContent = data[key];
    }
  }

  remove() {
    this.root.remove();
    this.root = null;
    this.bindings = null;
  }

}
