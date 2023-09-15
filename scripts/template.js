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
(function(rootElement, React, ReactDOM, Plugins=null) {
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
// Providers
// ----------------------------------------

const Context = React.createContext();


const ContextProvider = function(props) {
  const { children } = props;

  const value = {
    //
  };

  return ce(Context.Provider, { value }, children);
};


const ResourcesProvider = function(props) {
  const { children, links, scripts } = props;

  return ce(
    Fragment,
    null,
    links.map((link, index) => ce('link', { key: index, ...link })),
    children,
    scripts.map((script, index) => ce('script', { key: index, ...script })),
  );
};


// ----------------------------------------
// Models
// ----------------------------------------

const BaseModel = class {
  constructor(key=null) {
    this.key = key;
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
  .render(
    ce(StrictMode, null,
      // Providers
      ce(View)
    )
  );


})(
  window.document.getElementById('root'), // may be shadowRoot
  window.React,
  window.ReactDOM,
  // Plugins
);