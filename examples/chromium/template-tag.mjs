/**
 * @param {HTMLTemplateElement} template
 */
export function clone(template) {
  const fragment = template.content
  const clone = fragment.cloneNode(true)
  const element = clone.firstElementChild
  element.textContent += ' (cloned)'
  return clone
}
