/**
 * @fileoverview Model View Presenter (MVP) architecture
 *
 * @example
 *
 * [html]
 *
 * <input id="one" type="text">
 * <input id="two" type="text">
 * <span></span>
 *
 * [javascript]
 *
 * const model = Model.create();
 *
 * const view = new View(document.getElementById('one'), document.querySelector('span'));
 * const presenter = new Presenter(view, model);
 *
 * const view2 = new View(document.getElementById('two'), document.querySelector('span'));
 * const presenter2 = new Presenter(view2, model);
 */


class Publisher {

  constructor() {
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
  }

  notify() {
    for (const fn of this.observers) {
      fn(this);
    }
  }

}


class Model extends Publisher {

  constructor() {
    super();
    this.value = null;
  }

  static create() {
    return new Proxy(new Model(), {
      set: (target, key, value) => {
        target[key] = value;
        target.notify();
        return true;
      }
    });
  }

}


class View {
  constructor(input, span) {
    this.input = input;
    this.span = span;
  }

  setSpanTextContent(value) {
    this.span.textContent = value;
  }

  getInputValue() {
    return this.input.value;
  }

  setInputValue(value) {
    this.input.value = value;
  }

  addInputKeyUpListener(cb) {
    this.input.addEventListener('keyup', cb);
  }

};


class Presenter {

  /**
   * @param {View} view
   * @param {Model} model
   */
  constructor(view, model) {
    this.view = view;
    this.model = model;

    // view -notifies-> presenter -updates-> model
    this.view.addInputKeyUpListener(e => this.onKeyUp(e));

    // model -notifies-> presenter -updates-> view
    this.model.subscribe(m => this.onModelChange(m));

  }

  /**
   * @param {Event} event
   */
  async onKeyUp(event) {
    this.model.value = event.target.value;
  }

  async onModelChange(model) {
    this.view.setSpanTextContent(model.value);
    this.view.setInputValue(model.value);
  }

};
