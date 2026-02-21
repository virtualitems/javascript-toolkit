import { Articles } from './collections/articles.mjs'
import { ArticleTemplate } from './elements/template.mjs'
import { Footer } from './elements/footer.mjs'
import { Header } from './elements/header.mjs'
import { Main } from './elements/main.mjs'

console.log(
  Header.element(),
  Main.element(),
  Footer.element()
)

document.addEventListener('DOMContentLoaded', () => {
  const main = Main.element()
  main.appendChild(ArticleTemplate.clone())
  main.appendChild(ArticleTemplate.clone())
  main.appendChild(ArticleTemplate.clone())
  main.appendChild(ArticleTemplate.clone())

  Articles.init()
})
