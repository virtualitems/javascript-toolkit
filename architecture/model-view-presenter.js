// ----------------------------------------
// Model View Presenter (MVP) architecture
// ----------------------------------------

const Model = class {
  constructor() {
    this.value = null;
  }
};


const View = class {
  constructor(input, span) {
    this.input = input;
    this.span = span;
  }

  updateSpan(value) {
    this.span.innerHTML = value;
  }

  onInputKeyUp(callback) {
    this.input.addEventListener('keyup', callback);
  }
};


const Presenter = class {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    const proxy = new Proxy(this.model, {
      set: (target, property, value) => {
        target[property] = value;
        // model -notifies-> presenter -updates-> view
        this.view.updateSpan(this.model.value);
        return true;
      }
    });

    this.view.onInputKeyUp((event) => {
      // view -notifies-> presenter -updates-> model
      proxy.value = event.target.value;
    });

  }

};


// ----------------------------------------
// Usage
// ----------------------------------------

const model = new Model();
const view = new View(document.querySelector('input'), document.querySelector('span'));
const presenter = new Presenter(view, model);
