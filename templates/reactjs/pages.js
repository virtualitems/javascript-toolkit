/**
 * @fileoverview React application
 * @version 0.0.1
 *
 * @requires react
 * @see https://www.npmjs.com/package/react
 *
 * @requires react-dom
 * @see https://www.npmjs.com/package/react-dom
 *
 * @requires router
 * @see https://www.npmjs.com/package/@remix-run/router
 *
 * @requires react-router
 * @see https://www.npmjs.com/package/react-router
 *
 * @requires react-router-dom
 * @see https://www.npmjs.com/package/react-router-dom
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

if (! window.RemixRouter) {
  throw new Error('RemixRouter not found');
}

if (! window.ReactRouter) {
  throw new Error('ReactRouter not found');
}

if (! window.ReactRouterDOM) {
  throw new Error('ReactRouterDOM not found');
}


// ----------------------------------------
// Namespaces
// ----------------------------------------


if (window.hasOwnProperty('App')) {
  throw new Error('App already defined');
}

window.App = (function(React, ReactDOM, RemixRouter, ReactRouter, ReactRouterDOM) {

'use strict';


// ----------------------------------------
// Constants
// ----------------------------------------


const {
  createElement: ce,
  StrictMode,

} = React;

const {
  createBrowserRouter,
  Link,
  RouterProvider,

} = ReactRouterDOM;


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
// Exports
// ----------------------------------------


const exports = {};

exports.version = '0.0.1';

exports.render = function(root) {
  ReactDOM.createRoot(root).render(ce(App));
};

return exports;


// ----------------------------------------



})(
  window.React,
  window.ReactDOM,
  window.RemixRouter,
  window.ReactRouter,
  window.ReactRouterDOM
);
