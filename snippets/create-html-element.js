/**
 * Creates a new DOM element with the specified tagName, properties, and children.
 *
 * @param {string} tagName - The tag name of the element to create. If the tagName is an empty string, a document fragment will be created.
 * @param {Object} [props] - An object containing properties to set on the element.
 * @param {Array<string|HTMLElement|DocumentFragment>} [children] - An array of children to append to the element.
 *
 * @returns {HTMLElement|DocumentFragment} The created DOM element or document fragment.
 *
 * @throws {Error} If the tagName is not a string.
 * @throws {Error} If props is not an object or is an array.
 */
function createElement(tagName, props, ...children) {

  if ('string' !== typeof tagName) {
    throw new Error('Type must be a string');
  }

  tagName = tagName.trim();

  if (!/^[a-zA-Z0-9-]*$/.test(tagName)) {
    throw new Error('Tag name must contain only letters, numbers, hyphens, or be an empty string.');
  }

  if (props !== undefined && props !== null && props.constructor !== Object) {
    throw new Error('Props must be a plain object or null.');
  }

  let element = (
    tagName === ''
      ? document.createDocumentFragment()
      : document.createElement(tagName)
  );

  const { dataset, ...rest } = props ?? {};

  Object.assign(element.dataset, dataset ?? {});
  Object.assign(element, rest);

  for (child of children) {
    element.appendChild(
      child instanceof Node
        ? child
        : document.createTextNode(child)
    );
  }

  return element;
}
