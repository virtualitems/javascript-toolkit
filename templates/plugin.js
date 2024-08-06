/**
 * @fileoverview Browser library template
 * @version 0.0.1
 *
 * @example [html] <script> window.Lib.greet(); </script>
 */


// ----------------------------------------
// Checks
// ----------------------------------------


if (!window.alert) { // add dependency check
  throw new Error('alert not found');
}


// ----------------------------------------
// Namespaces
// ----------------------------------------

const namespace = 'Lib';


if (namespace in window) { // check if library namespace is already defined
  throw new Error('Lib is already defined');
}


window[namespace] = (function (alert) { // create library namespace and add dependencies

  'use strict';

  function greet() {
    alert('Hello, World!');
  }


  // ----------------------------------------


  return { version, greet };


  // ----------------------------------------


})(
  window.alert // add dependency injection
);
