let node = new WeakRef(null)

export function get() {
  const ref = node.deref()
  let el = null

  if (ref instanceof HTMLTemplateElement === false) {
    el = document.querySelector('.template') // unique query
    node = new WeakRef(el) // unique query
  }

  return el
}

export function clone() {
  const template = get()

  if (template instanceof HTMLTemplateElement === false) {
    throw new TypeError('Expected a <template> element')
  }

  return template.content.cloneNode(true)
}

export default node // default export
