/**
 * @fileoverview React application
 * @version 0.0.1
 *
 * @requires react
 * @see https://www.npmjs.com/package/react
 *
 * @requires react-dom
 * @see https://www.npmjs.com/package/react-dom
 */


// ----------------------------------------
// Checks
// ----------------------------------------


if (! window.React) {
  throw new Error('React not found');
}

if (! window.ReactDOM) {
  throw new Error('ReactDOM not found');
}


// ----------------------------------------
// Namespaces
// ----------------------------------------


if (window.hasOwnProperty('App')) {
  throw new Error('App already defined');
}

window.App = (function(React, ReactDOM) {

'use strict';


// ----------------------------------------
// Constants
// ----------------------------------------


const {
  createElement: ce,
  StrictMode,
  useState,

} = React;


// ----------------------------------------
// Entities
// ----------------------------------------



// ----------------------------------------
// Services
// ----------------------------------------



// ----------------------------------------
// Hooks
// ----------------------------------------



// ----------------------------------------
// Content components
// ----------------------------------------

const LazyComponent = React.lazy(() => import('./LazyComponent.js'));

/**
 * @description React component
 * @param {import('react').HTMLProps} props
 */
function App(props) {

  return ce(
    React.Suspense,
    {
      fallback: ce('div', null, 'Loading...')
    },
    ce(LazyComponent, null, 'Lazy component loaded!'),
  );

}  //:: App


// ----------------------------------------
// Slotted components
// ----------------------------------------



// ----------------------------------------
// Exports
// ----------------------------------------


const exports = {};

exports.version = '0.0.1';

exports.render = function(root) {
  ReactDOM.createRoot(root).render(ce(StrictMode, null, ce(App)));
};

return exports;


// ----------------------------------------


})(
  window.React,
  window.ReactDOM
);
