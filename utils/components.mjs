const { assert } = console;
const { document } = window;

if (!document) {
  throw new Error('Document is not available');
}

if (!assert) {
  throw new Error('Console assert is not available');
}

/**
 * Creates a deep clone of the content of an HTML template element.
 *
 * @param {HTMLTemplateElement} template - The template element to clone.
 * @param {Array<Node|string>} children - An array of child nodes or strings to append to the template's content.
 * @returns {DocumentFragment} A deep clone of the template's content.
 *
 * @throws {Error} If the provided parameter is not an instance of HTMLTemplateElement.
 */
export function clone(base, deep = true) {
  assert(
    base instanceof HTMLElement,
    'base param must be a instance of HTMLElement',
  );

  const target = base.content ?? base;
  return target.cloneNode(Boolean(deep));
}

/**
 * Appends an array of children to a parent node.
 *
 * @param {Node} parent - The parent node to which the children will be appended.
 * @param {Array<Node|string>} children - An array of child nodes or strings to be appended to the parent.
 *
 * @throws {Error} Throws an error if the parent is not a Node.
 */
function appendChildren(parent, children) {
  assert(parent instanceof Node, 'Parent must be a instance of Node');
  for (const child of children) {
    parent.appendChild(child instanceof Node ? child : document.createTextNode(child));
  }
}

/**
 * Creates a DocumentFragment and appends the provided children to it.
 *
 * @param {Array<Node>} children - The child nodes to append to the DocumentFragment.
 *
 * @returns {DocumentFragment} The created DocumentFragment with the appended children.
 */
export function fragment(...children) {
  const fragment = document.createDocumentFragment();
  appendChildren(fragment, children);
  return fragment;
}


/**
 * Creates a new DOM element with the specified tagName, properties, and children.
 *
 * @param {string} tagName - The tag name of the element to create. If the tagName is an empty string, a document fragment will be created.
 * @param {undefined|Object} [props] - An object containing properties to set on the element.
 * @param {undefined|Array<string|HTMLElement|DocumentFragment>} [children] - An array of children to append to the element.
 *
 * @returns {HTMLElement|DocumentFragment} The created DOM element or document fragment.
 */
export function ce(tagName, props, ...children) {
  assert(typeof tagName === 'string', 'Tag name must be a string');
  assert(
    typeof props === null || props === undefined || props.constructor === Object,
    'Props must be an object or undefined',
  );
  assert(
    /^[a-zA-Z0-9-]*$/.test(tagName),
    'Tag name must contain only letters, numbers, hyphens, or be an empty string.',
  );

  if (tagName === '') {
    return createFragment(...children);
  }

  let element = document.createElement(tagName);

  appendChildren(element.content ?? element, children);

  if (props === null || props === undefined) {
    return element;
  }

  for (const key in props) {
    if ('object' === typeof props[key]) {
      if (!(key in element)) {
        element[key] = {};
      }

      Object.assign(element[key], props[key]);
      continue;
    }

    element[key] = props[key];
  }

  return element;
}

/**
 * Replaces the content of a target HTMLElement with the provided content.
 *
 * @param {*} target - The target HTMLElement whose content will be replaced.
 * @param {*} content - The new content to replace the existing content.
 */
export function hydrate(target, ...content) {
  assert(
    target instanceof HTMLElement,
    'Target must be an instance of HTMLElement',
  );

  target.innerHTML = '';
  appendChildren(target, content);
}
