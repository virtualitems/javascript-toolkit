export const events = {
  deleteArticle: 'delete-article'
}

export class DeleteArticleSubject extends EventTarget {
  static #instance = null

  static getInstance() {
    if (this.#instance === null) {
      this.#instance = new DeleteArticleSubject()
    }

    return this.#instance
  }
}
