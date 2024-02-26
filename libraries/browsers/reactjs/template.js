/**
 * React Application
 *
 * @requires react
 * @requires react-dom
 * @see https://react.dev/
 *
 * @requires remix-run-router
 * @requires react-router
 * @requires react-router-dom
 * @see https://reactrouter.com/
 *
 * @param {HTMLElement} rootElement
 * @param {Window} window
 * @param {Object} window.React
 * @param {Object} window.ReactDOM
 * @param {Object} window.ReactRouterDOM
 */
(function(rootElement, window, extras) {
'use strict';

// ----------------------------------------
// Checks
// ----------------------------------------

if (! (typeof rootElement === 'object')) {
  throw new Error('Root element not found');
}

if (! (typeof window === 'object')) {
  throw new Error('Window not found');
}

if (! (typeof window.document === 'object')) {
  throw new Error('window.document not found');
}

if (! (typeof window.React === 'object')) {
  throw new Error('window.React not found');
}

if (! (typeof window.ReactDOM === 'object')) {
  throw new Error('window.ReactDOM not found');
}

if (! (typeof window.ReactRouterDOM === 'object')) {
  throw new Error('window.ReactRouterDOM not found');
}


// ----------------------------------------
// Constants
// ----------------------------------------

const {
  document,
  React,
  ReactDOM,
  ReactRouterDOM,

} = window;

const {
  createElement: ce,
  Fragment,
  StrictMode,

} = React;

const {
  BrowserRouter,
  Route,
  Routes,

} = ReactRouterDOM;


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
// Atomics
// ----------------------------------------

/**
 * atomic component
 * @param {Object} props
 */
function Title(props) {
  // render
  return ce('h1', props, props.children);
};


// ----------------------------------------
// Composites
// ----------------------------------------

/**
 * content component
 * @param {Object} props
 */
function Header(props) {
  // contents
  const title = ce(Title, null, 'Ladder Architecture!');

  // render
  return ce('header', props, title);
}


/**
 * Container component
 * @param {Object} props
 */
function Layout(props) {
  // slots
  const center = props.center;

  // render
  return ce('section', null, center);
}


/**
 * Content component
 * @param {Object} props
 */
function HomePage(props) {
  // contents
  const header = ce(Header);

  // containers
  const layout = ce(Layout, { center: header });

  // render
  return ce(Fragment, null, layout);
}


/**
 * Container component
 * @param {Object} props
 */
function Router(props) {
  // slots
  const routes = props.routes;

  // render
  return ce(BrowserRouter, null,
    ce(Routes, null,
      routes.map((route, key) => ce(Route,
        {
          key,
          path: route.path,
          element: route.element
        }
      ))
    )
  );
}


// ----------------------------------------
// Bootstrap
// ----------------------------------------

/**
 * Bootstrap component
 * @param {Object} props
 */
const Bootstrap = function(props) {
  // contents
  const routes = [
    { path: '/', element: ce(HomePage) }
  ]

  // containers
  const router = ce(Router, { routes });

  // render
  return ce(StrictMode, null, router);
};


// ----------------------------------------
// Root
// ----------------------------------------

ReactDOM
  .createRoot(rootElement)
  .render(ce(Bootstrap));

})(
  window.document.getElementById('root').attachShadow({mode: 'open'}),
  window,
  {}
);
