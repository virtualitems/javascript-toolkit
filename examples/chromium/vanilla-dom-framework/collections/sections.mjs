export class Sections {
  static #query = 'section'

  static elements() {
    return document.querySelectorAll(this.#query)
  }

  static create(...children) {
    const section = document.createElement('section')
    const heading = document.createElement('h2')

    heading.textContent = 'Section Title'

    section.appendChild(heading)

    for (const child of children) {
      section.appendChild(child)
    }

    return section
  }
}
