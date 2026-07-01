export class Header {
  static #id = 'header'

  static element() {
    return document.getElementById(this.#id)
  }
}
