/**
 * @fileoverview Browser library template
 * @version 0.0.1
 */


// ----------------------------------------
// Checks
// ----------------------------------------


if (! window.alert) { // add dependency check
  throw new Error('alert not found');
}


// ----------------------------------------
// Namespaces
// ----------------------------------------


if ('undefined' !== typeof window.Lib) { // check if library namespace is already defined
  throw new Error('Lib is already defined');
}

window.Lib = (function (alert) { // create library namespace and add dependencies namespaces

'use strict';


// ----------------------------------------
// Constants
// ----------------------------------------


const _version = '0.0.1';


// ----------------------------------------
// Entities
// ----------------------------------------



// ----------------------------------------
// Services
// ----------------------------------------



// ----------------------------------------
// Adapters
// ----------------------------------------


function _greet() {
  alert('Hello, World!');
}


// ----------------------------------------
// Exports
// ----------------------------------------


return {
  version: _version,
  greet: _greet,
};


// ----------------------------------------


})(
  window.alert // add dependency injection
);
