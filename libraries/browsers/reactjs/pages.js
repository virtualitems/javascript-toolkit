/**
 * React Application
 *
 * @requires react
 * @requires react-dom
 * @see https://react.dev/
 *
 * @param {HTMLElement} rootElement
 * @param {import('react')} React
 * @param {import('react-dom')} ReactDOM
 * @param {Object} extras
 * @param {Object} extras.ReactRouterDOM
 */
(function(rootElement, React, ReactDOM, extras) {
'use strict';


// ----------------------------------------
// Checks
// ----------------------------------------

if (! (typeof rootElement === 'object')) {
  throw new Error('Root element not found');
}

if (! (typeof React === 'object')) {
  throw new Error('React not found');
}

if (! (typeof ReactDOM === 'object')) {
  throw new Error('ReactDOM not found');
}

if (! (typeof extras === 'object')) {
  throw new Error('Extras must be an object');
}

if (! (typeof extras.ReactRouterDOM === 'object')) {
  throw new Error('ReactRouterDOM not found');
}


// ----------------------------------------
// Constants
// ----------------------------------------


const {
  createElement: ce,
  StrictMode,
  useState,

} = React;

const {
  createBrowserRouter,
  Link,
  RouterProvider,

} = extras.ReactRouterDOM;


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


/**
 * @description React component
 * @param {import('react').HTMLProps} props
 */
function App(props) {

  return ce('div', null,
    ce('h1', null, 'React Application'),
    ce(Link, { to: '/not-found' }, 'Click me!'),
  );

}  //:: App


/**
 * @description React component
 * @param {import('react').HTMLProps} props
 */
function NotFoundErrorPage(props) {

  return ce('h1', null, '404 Not Found');

}  //:: NotFoundErrorPage


/**
 * @description React component
 * @param {import('react').HTMLProps} props
 */
function RoutingProvider(props) {

  const routes = [
    {
      path: '/',
      element: ce(App)
    },
    {
      path: '*',
      element: ce(NotFoundErrorPage)
    }
  ];

  const router = createBrowserRouter(routes);

  return ce(RouterProvider, { router });

}  //:: RoutingProvider


// ----------------------------------------
// Slotted components
// ----------------------------------------



// ----------------------------------------
// Root
// ----------------------------------------


ReactDOM
  .createRoot(rootElement)
  .render(ce(StrictMode, null, ce(RoutingProvider)));

})(
  window.document.getElementById('root'),
  window.React,
  window.ReactDOM,
  {
    ReactRouterDOM: window.ReactRouterDOM
  }
);
