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
 * @param {Window} window
 */
(function(rootElement, React, ReactDOM, window) {
'use strict';


// ----------------------------------------
// Checks
// ----------------------------------------

/**
 * Check if a value is valuable
 *
 * @param {any} value
 * @returns {Boolean}
 */
const isValuable = (value) => (value !== undefined && value !== null && !Object.is(value, NaN));

if (!isValuable(rootElement)) {
  throw new Error('Root element not found');
}

if (!isValuable(React)) {
  throw new Error('React not found');
}

if (!isValuable(ReactDOM)) {
  throw new Error('ReactDOM not found');
}

if (!isValuable(window)) {
  throw new Error('Window not found');
}


// ----------------------------------------
// Globals
// ----------------------------------------

const {
  document

} = window;

const {
  createElement: ce,
  Fragment,
  StrictMode,

} = React;


// ----------------------------------------
// Errors
// ----------------------------------------



// ----------------------------------------
// Utils
// ----------------------------------------



// ----------------------------------------
// Models
// ----------------------------------------



// ----------------------------------------
// Hooks
// ----------------------------------------



// ----------------------------------------
// Providers
// ----------------------------------------



// ----------------------------------------
// Contents
// ----------------------------------------

const Content = function(props) {
  return ce('h1', props, 'React Application')
};


// ----------------------------------------
// Containers
// ----------------------------------------

const Container = function(props) {
  const { children } = props;

  return ce('header', props, children);
};


// ----------------------------------------
// Composites
// ----------------------------------------

const Composite = function(props) {
  const content = ce(Content);
  const container = ce(Container, null, content);

  return ce('main', props, container);
};


// ----------------------------------------
// Layout
// ----------------------------------------

const Layout = function(props) {
  const { center } = props;

  return ce(Fragment, null, center);
};


// ----------------------------------------
// View
// ----------------------------------------

const View = function(props) {
  const center = ce(Composite);
  const layout = ce(Layout, { center });

  return ce(Fragment, null, layout);
};


// ----------------------------------------
// Root
// ----------------------------------------
ReactDOM
  .createRoot(rootElement)
  .render(ce(StrictMode, null, ce(View)));


})(
  window.document.getElementById('root'),
  window.React,
  window.ReactDOM,
  window,
);
