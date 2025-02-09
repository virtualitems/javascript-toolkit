/** @class */
class Model {

  constructor() {
    if (new.target === Model) {
      throw new TypeError('Cannot instantiate abstract class.');
    }

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

  /**
   * Updates the current object with the provided values and notifies listeners.
   *
   * @param {Object} values - An object containing the new values to update.
   */
  update(values) {
    Object.assign(this, values);
    this.notify();
  }

}


/** @class */
class Presenter {

  /**
   * @param {object} view
   * @param {Model} model
   */
  constructor(view, model) {

    if (new.target === Presenter) {
      throw new TypeError('Cannot instantiate abstract class.');
    }

    this.view = view;
    this.model = model;
  }

}
