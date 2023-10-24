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
    model.userId = json.userId;
    model.id = json.id;
    model.title = json.title;
    model.completed = json.completed;
    return model;
  }
};


// Request configuration
const fecthTarget = 'https://jsonplaceholder.typicode.com/todos/';

const fetchOptions = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};


// on request
fetch(fecthTarget, fetchOptions)

  // on response
  .then(response => new Promise((resolve, reject) => {

    // on decode
    response.json()
      .then(data => {

        // nothing to do
        if (response.ok) return data;

        // handle 4xx and 5xx errors
        console.warn(data);

        // jump to catch
        throw new Error(`${response.status} ${response.statusText}`);

      })

      // on transform
      .then(rawData => {
        const models = rawData.map(Model.fromJSON)
        resolve(models);
      })

      // on error
      .catch(error => reject(error));

  }))

  // on data
  .then(data => console.log(data))

  // on error
  .catch(error => console.error(error))

  // stop loading
  .finally(() => console.log('stop loading'));


// start loading
console.log('start loading');
