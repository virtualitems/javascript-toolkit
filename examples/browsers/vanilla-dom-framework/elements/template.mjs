export class ArticleTemplate {
  static #id = 'article-template'

  static element() {
    return document.getElementById(this.#id)
  }

  static clone(text) {
    const fragment = this.element().content.cloneNode(true)
    fragment.querySelector('[data-text]').textContent = text
    return fragment
  }
}
