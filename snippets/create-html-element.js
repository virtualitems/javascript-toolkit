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
  const stateMap = new WeakMap();

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
      throw new Error('Parent must be a Node');
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
  function createDocumentFragment(...children) {
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
      return createDocumentFragment(...children);
    }

    if ('string' !== typeof tagName) {
      throw new Error('Type must be a string');
    }

    if (!/^[a-zA-Z0-9-]*$/.test(tagName)) {
      throw new Error('Tag name must contain only letters, numbers, hyphens, or be an empty string.');
    }

    let element = document.createElement(tagName);

    appendChildren(element, children);

    if (props === undefined || props === null) {
      return element;
    }

    if (props.constructor !== Object) {
      throw new Error('Props must be a plain object or null.');
    }

    for (const key in props) {

      if (props[key]?.constructor === Object) {
        Object.assign(element[key], props[key]);
        continue;
      }

      element[key] = props[key];
    }

    return element;
  }


  /**
   * Sets the state for a given element.
   *
   * @param {HTMLElement} element - The element for which to set the state.
   * @param {Object} state - The state to set for the element.
   */
  function setState(element, state) {
    if (!(element instanceof Node)) {
      throw new Error('Element must be a Node');
    }

    stateMap.set(element, state);
  }

  /**
   * Gets the state for a given element.
   *
   * @param {Node} element - The element for which to get the state.
   * @returns {any} The state of the element, or undefined if no state is set.
   */
  function getState(element) {
    if (!(element instanceof Node)) {
      throw new Error('Element must be a Node');
    }

    return stateMap.get(element);
  }


  // ----------------------------------------
  // Exports
  // ----------------------------------------

  return {
    createDocumentFragment,
    createElement,
    getState,
    setState
  };


  // ----------------------------------------
  // Imports
  // ----------------------------------------

})(window);
