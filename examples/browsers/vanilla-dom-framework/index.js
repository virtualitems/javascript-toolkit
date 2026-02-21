import { Articles } from './collections/articles.mjs'
import { ArticleTemplate } from './elements/template.mjs'
import { Sections } from './collections/sections.mjs'
import { Footer } from './elements/footer.mjs'
import { Header } from './elements/header.mjs'
import { Main } from './elements/main.mjs'

console.log(Header.element(), Main.element(), Footer.element())

document.addEventListener('DOMContentLoaded', () => {
  const main = Main.element()
  main.appendChild(ArticleTemplate.clone('Sunt nisi eu proident ullamco excepteur eu.'))
  main.appendChild(ArticleTemplate.clone('Nostrud ut incididunt aute esse minim ipsum anim proident.'))
  main.appendChild(Sections.create(document.createTextNode('Duis occaecat laboris enim ipsum deserunt ut velit eiusmod enim incididunt.')))
  main.appendChild(Sections.create(document.createTextNode('Sunt voluptate quis officia quis occaecat.')))

  Articles.init()
})
