/**
 * @fileoverview Model View Presenter (MVP) architecture
 *
 * @example
 *
 * [html]
 *
 * <input type="text" id="input-1">
 * <input type="text" id="input-2">
 * <span id="span"></span>
 *
 * [javascript]
 *
 * const input1 = document.getElementById('input-1');
 * const input2 = document.getElementById('input-2');
 * const span = document.querySelector('span');
 *
 * const model = new Model();
 *
 * const presenter1 = new Presenter({input: input1, span}, model);
 * const presenter2 = new Presenter({input: input2, span}, model);
 */


/** @class */
class Publisher {

  constructor() {
    this._listeners = new Set();
  }

  /**
   * Adds a listener function to the set of listeners.
   *
   * @param {Function} fn - The listener function to be added.
   */
  addListener(fn) {
    this._listeners.add(fn);
  }

  /**
   * Removes a listener function from the listeners set.
   *
   * @param {Function} fn - The listener function to be removed.
   */
  removeListener(fn) {
    this._listeners.delete(fn);
  }


  /**
   * Notifies all registered listeners by calling each listener function
   * with the current context (`this`).
   */
  notify() {
    for (const fn of this._listeners) fn(this);
  }

}


/** @class */
class Model extends Publisher {
  constructor() {
    super();
    this.value = null;
  }
}


/** @class */
class Presenter {

  /**
   * @param {object} view
   * @param {Model} model
   */
  constructor(view, model) {
    this.view = view;
    this.model = model;

    // view -notifies-> presenter -updates-> model
    this.view.input.addEventListener('keyup', event => {
      this.model.value = event.target.value;
      this.model.notify();
    });

    // model -notifies-> presenter -updates-> view
    this.model.addListener(model => {
      this.view.span.textContent = model.value;
      this.view.input.value = model.value;
    });

  }

}
