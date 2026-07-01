/**
 * @param {RequestInfo | URL} input
 * @param {RequestInit?} init
 * @returns {HTMLElement}
 */
export async function html(input, init) {
  const response = await fetch(input, init)
  if (response.ok === false) throw new Error(response.statusText)
  const html = await response.text()
  const range = document.createRange()
  const fragment = range.createContextualFragment(html)
  return fragment
}

/**
 * @param {RequestInfo | URL} input
 * @param {RequestInit?} init
 * @returns {CSSStyleSheet}
 */
export async function css(input, init) {
  const response = await fetch(input, init)
  if (response.ok === false) throw new Error(response.statusText)
  const css = await response.text()
  const sheet = new CSSStyleSheet()
  await sheet.replace(css)
  return sheet
}
