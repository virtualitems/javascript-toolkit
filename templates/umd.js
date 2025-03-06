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

    const namespace = 'UMD';

    if (global[namespace] !== 'undefined') {
      throw new Error(namespace + ' is already defined');
    }

    global[namespace] = factory(/* send dependencies */);
  }

})((typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this), (function () {
  'use strict';

  const [/* receive dependencies */] = arguments;

  const exports = {};

  Object.defineProperty(exports, '__esModule', { value: true });

  // ----------------------------------------

  // ... your code here

  // ----------------------------------------

  return exports;

}));
