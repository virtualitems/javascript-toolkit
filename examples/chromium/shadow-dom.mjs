// <div id="root"></div>

/**
 * @param {HTMLElement} root
 * @param {CSSStyleSheet[]} stylesheets
 * @param {Node[]} children
 */
export function shadowDOM(root, stylesheets = [], children = []) {
  const shadow = root.attachShadow({ mode: 'open' })
  for (const sheet of stylesheets) shadow.adoptedStyleSheets.push(sheet)
  for (const child of children) shadow.appendChild(child)
  return shadow
}

const root = document.getElementById('root')

const sheet = new CSSStyleSheet()
sheet.replace`
h1 {
  color: red;
  font-family: sans-serif;
}`

const content = document.createElement('h1')
content.textContent = 'Shadow DOM'

shadowDOM(root, [sheet], [content])
