export class Articles {
  static #query = 'article'

  static elements() {
    return document.querySelectorAll(this.#query)
  }

  static init() {
    const articles = this.elements()

    for (const article of articles) {
      article.addEventListener('click', () => {
        article.remove()
      })
    }
  }
}
