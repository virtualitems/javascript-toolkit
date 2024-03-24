(function (global, factory) {

  // commonjs
  if ('object' === typeof module && 'object' === typeof module.exports) {
    module.exports = factory(/* send dependencies */);
  }

  // amd
  else if (typeof define === 'function' && define.amd) {
    define([/* send dependencies */], factory);
  }

  // browser
  else {
    global.UMD = factory(/* send dependencies */);
  }

})((typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this), (function (/* receive dependencies */) {
  'use strict';

  const exports = {};

  // ----------------------------------------

  // ... your code here

  // ----------------------------------------

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}));
