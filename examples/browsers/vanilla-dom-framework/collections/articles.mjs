import { DeleteArticleSubject, events } from '../subjects/delete-article.mjs'

DeleteArticleSubject.getInstance().addEventListener(events.deleteArticle, (event) => {
  if (event.detail instanceof HTMLElement) event.detail.remove()
})

export class Articles {
  static #query = 'article'

  static elements() {
    return document.querySelectorAll(this.#query)
  }

  static init() {
    const articles = this.elements()

    for (const article of articles) {
      article.addEventListener('click', () => {
        const event = new CustomEvent(events.deleteArticle, {
          detail: article
        })
        DeleteArticleSubject.getInstance().dispatchEvent(event)
      })
    }
  }
}
