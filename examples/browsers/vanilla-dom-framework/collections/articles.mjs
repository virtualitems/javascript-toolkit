import { DeleteArticleSubject, events } from '../subjects/delete-article.mjs'

export class Articles {
  static #query = 'article'

  static elements() {
    return document.querySelectorAll(this.#query)
  }

  static init() {
    const articles = this.elements()

    for (const article of articles) {
      article.addEventListener('click', () => {
        const payload = { detail: article }
        const event = new CustomEvent(events.deleteArticle, payload)
        const subject = DeleteArticleSubject.getInstance()
        subject.dispatchEvent(event)
      })

      article.style.cursor = 'pointer'
    }
  }
}
