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

  if (props !== undefined && ('object' !== typeof props || Array.isArray(props))) {
    throw new Error('Props must be an object');
  }

  let element = null;

  if (tagName === '') {
    element = document.createDocumentFragment();

  } else {
    element = document.createElement(tagName);
    Object.assign(element, props);

  }

  for (child of children) {
    element.appendChild(
      child instanceof Node
        ? child
        : document.createTextNode(child)
    );
  }

  return element;
}
