/**
 * @fileoverview HTML Elements Manager
 * @version 1.0.0
 *
 * @example [html] <script> console.log(GUI.createElement('div', { id: 'my-div' }, 'Hello, World!')); </script>
 */


// ----------------------------------------
// Checks
// ----------------------------------------


// ----------------------------------------
// Namespaces
// ----------------------------------------

const namespace = 'GUI';

if (namespace in window) {
  throw new Error(`"${namespace}" already defined in window`);
}


window[namespace] = (function (window) {

  'use strict';

  const document = window.document;

  /**
   * Appends an array of children to a parent node.
   *
   * @param {Node} parent - The parent node to which the children will be appended.
   * @param {Array<Node|string>} children - An array of child nodes or strings to be appended to the parent.
   *
   * @throws {Error} Throws an error if the parent is not a Node.
   */
  function appendChildren(parent, children) {

    if (!(parent instanceof Node)) {
      throw new TypeError('Parent must be a Node');
    }

    for (const child of children) {
      parent.appendChild(
        child instanceof Node
          ? child
          : document.createTextNode(child)
      );
    }
  }


  /**
   * Creates a DocumentFragment and appends the provided children to it.
   *
   * @param {Array<Node>} children - The child nodes to append to the DocumentFragment.
   *
   * @returns {DocumentFragment} The created DocumentFragment with the appended children.
   */
  function createFragment(...children) {
    const fragment = document.createDocumentFragment();
    appendChildren(fragment, children);
    return fragment;
  }


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
   * @throws {Error} If the tagName contains invalid characters.
   * @throws {Error} If props is not an object, null, or undefined.
   */
  function createElement(tagName, props, ...children) {

    if (tagName === '') {
      return createFragment(...children);
    }

    if ('string' !== typeof tagName) {
      throw new TypeError('Type must be a string');
    }

    if (!/^[a-zA-Z0-9-]*$/.test(tagName)) {
      throw new Error('Tag name must contain only letters, numbers, hyphens, or be an empty string.');
    }

    const thereAreProps = (props !== null) && (props !== undefined);

    if (thereAreProps && props.constructor !== Object) {
      throw new TypeError('Props must be a plain object or null.');
    }

    let element = document.createElement(tagName);

    if (tagName === 'template') {
      appendChildren(element.content, children);
    } else {
      appendChildren(element, children);
    }

    if (!thereAreProps) {
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
   * Creates a deep clone of the content of an HTML template element.
   *
   * @param {HTMLTemplateElement} template - The template element to clone.
   * @param {Array<Node|string>} children - An array of child nodes or strings to append to the template's content.
   * @returns {DocumentFragment} A deep clone of the template's content.
   *
   * @throws {Error} If the provided parameter is not an instance of HTMLTemplateElement.
   */
  function createClone(template, deep=true) {

    if (!(template instanceof HTMLTemplateElement)) {
      throw new TypeError('template param must be an HTMLTemplateElement');
    }

    const fragment = template.content.cloneNode(Boolean(deep));

    return fragment;
  }


  // ----------------------------------------
  // Exports
  // ----------------------------------------

  return {
    createClone,
    createFragment,
    createElement,
  };


  // ----------------------------------------
  // Imports
  // ----------------------------------------

})(window);
