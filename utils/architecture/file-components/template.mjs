const node = document.querySelector('.template') // unique query

export function clone() {
  if (node instanceof HTMLTemplateElement === false) {
    throw new TypeError('Expected a <template> element')
  }

  return node.content.cloneNode(true)
}

export default node // default export
