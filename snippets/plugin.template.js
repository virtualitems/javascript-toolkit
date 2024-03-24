/**
 * @fileoverview Browser library template
 * @version 0.0.1
 */


// ----------------------------------------
// Checks
// ----------------------------------------


if (! window.alert) {
  throw new Error('alert not found');
}


// ----------------------------------------
// Namespaces
// ----------------------------------------


if ('undefined' !== typeof window.Lib) {
  throw new Error('Lib is already defined');
}

window.Lib = (function (alert) {

'use strict';


// ----------------------------------------
// Entities
// ----------------------------------------



// ----------------------------------------
// Services
// ----------------------------------------



// ----------------------------------------
// Adapters
// ----------------------------------------



// ----------------------------------------
// Exports
// ----------------------------------------


const _version = '0.0.1';

function _greet() {
  alert('Hello, World!');
}

return {
  version: _version,
  greet: _greet,
};


// ----------------------------------------


})(
  window.alert
);
