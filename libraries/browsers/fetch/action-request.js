// Step by step data request with fetch API

// Model definition
const Model = class {
  constructor() {
    this.userId = null;
    this.id = null;
    this.title = null;
    this.completed = null;
  }
  static fromJSON(json) {
    const model = new Model();
    Object.assign(model, json);
    return model;
  }
};


// Request configuration
const fecthTarget = 'https://jsonplaceholder.typicode.com/todos/';

const fetchOptions = {
  method: 'POST',
  headers: {
    'Accept': 'application/json'
  }
};


// on request
fetch(fecthTarget, fetchOptions)

  // on response
  .then(response => {

    // nothing to do
    if (response.ok) return;

    // handle 4xx and 5xx errors
    console.warn();

    // jump to catch
    throw new Error(`${response.status} ${response.statusText}`);

  })

  // on complete
  .then(() => console.log('completed'))

  // on error
  .catch(error => console.error(error))

  // stop loading
  .finally(() => console.log('stop loading'));


// start loading
console.log('start loading');
