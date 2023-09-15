/**
 * React Application
 *
 * @requires React
 * @requires React-DOM
 * @see https://react.dev/
 *
 * @param {HTMLElement} rootElement
 * @param {Object} React
 * @param {Object} ReactDOM
 * @param {Object} Plugins
 */
(function(rootElement, React, ReactDOM, Plugins) {
'use strict';

// ----------------------------------------
// Checks
// ----------------------------------------

if (!rootElement) {
  console.error('Root element is not found');
  return;
}

if (!React) {
  console.error('React is not loaded');
  return;
}

if (!ReactDOM) {
  console.error('ReactDOM is not loaded');
  return;
}


// ----------------------------------------
// Globals
// ----------------------------------------

const {
  createElement: ce,
  Fragment,
  StrictMode

} = React;


// ----------------------------------------
// Errors
// ----------------------------------------



// ----------------------------------------
// Utils
// ----------------------------------------



// ----------------------------------------
// Hooks
// ----------------------------------------



// ----------------------------------------
// Context
// ----------------------------------------



// ----------------------------------------
// Models
// ----------------------------------------



// ----------------------------------------
// Contents
// ----------------------------------------



// ----------------------------------------
// Containers
// ----------------------------------------



// ----------------------------------------
// Composites
// ----------------------------------------



// ----------------------------------------
// Layout
// ----------------------------------------

const Layout = function() {
  return ce(Fragment);
};


// ----------------------------------------
// View
// ----------------------------------------

const View = function() {
  return ce(Fragment, null, ce(Layout));
};


// ----------------------------------------
// Root
// ----------------------------------------

ReactDOM
  .createRoot(rootElement)
  .render(ce(StrictMode, null, ce(View)));


})(
  window.document.getElementById('root'),
  // window.document.getElementById('root').attachShadow({ mode: 'open' }),
  window.React,
  window.ReactDOM,
  {
    // Plugins
  },
);