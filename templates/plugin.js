/**
 * @fileoverview Browser library template
 * @version 0.0.1
 *
 * @example [html] <script> window.Lib.greet(); </script>
 */


// ----------------------------------------
// Checks
// ----------------------------------------


if (!window.alert) {
  throw new Error('alert not found');
}


// ----------------------------------------
// Namespaces
// ----------------------------------------

const namespace = 'Lib';


if (namespace in window) {
  throw new Error('Lib is already defined');
}


window[namespace] = (function (alert) {

  'use strict';

  function greet() {
    alert('Hello, World!');
  }


  // ----------------------------------------
  // Exports
  // ----------------------------------------

  return { greet };


  // ----------------------------------------
  // Imports
  // ----------------------------------------

})(window.alert);
