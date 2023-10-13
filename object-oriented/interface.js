// there is not interfaces in javascript
// but we can check if an object has a method or not

// definition:
const isDoable = function(obj) {
  return obj && typeof obj.do === 'function';
};

const Model = class {
  constructor(id) {
    this.id = id;
  }
  do() {
    console.log('do something');
  }
};

// usage:
const obj = new Model(1);

if (isDoable(obj))
  obj.do();
else
  console.error('not doable');
