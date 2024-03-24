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


/**
 * @description React component
 * @param {import('react').HTMLProps} props
 */
function App(props) {

  const [counterState, setCounterState] = useState(0);

  const handleClick = () => {
    setCounterState(counterState + 1);
  };

  return ce('div', null,
    ce('h1', null, 'React Application'),
    ce('h2', null, `Counter: ${counterState}`),
    ce('button', { onClick: handleClick }, 'Increment'),
  );

}  //:: App


// ----------------------------------------
// Slotted components
// ----------------------------------------



// ----------------------------------------
// Root
// ----------------------------------------


ReactDOM
  .createRoot(rootElement)
  .render(ce(StrictMode, null, ce(App)));

})(
  window.document.getElementById('root'),
  window.React,
  window.ReactDOM,
  {}
);
