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
  StrictMode,

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

const Context = React.createContext();

const ContextProvider = function(props) {
  const { children } = props;

  const value = {
    //
  };

  return ce(Context.Provider, { value }, children);
};


// ----------------------------------------
// Models
// ----------------------------------------

const Model = class {
  constructor() {
    //
  }
};


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

  return ce(Fragment, props, center);
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
  // .render(ce(StrictMode, null, ce(ContextProvider, null, ce(View))));

})(
  window.document.getElementById('root'),
  // window.document.getElementById('root').attachShadow({ mode: 'open' }),
  window.React,
  window.ReactDOM,
  {
    // Plugins
  },
);