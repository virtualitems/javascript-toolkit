export class ArticleTemplate {
  static #id = 'article-template'

  static element() {
    return document.getElementById(this.#id)
  }

  static clone() {
    return this.element().content.cloneNode(true)
  }
}
