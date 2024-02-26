// there is not interfaces in javascript
// but we can check if an object has a method or not

// definition:
function isDoable(obj) {
  return obj && typeof obj.do === 'function';
};

class Model {
  constructor(id) {
    this.id = id;
  }
  do() {
    console.log('do something');
  }
};

// usage:
const obj = new Model(1);

if (isDoable(obj)) {
  obj.do();

} else {
  console.error('not doable');

}
