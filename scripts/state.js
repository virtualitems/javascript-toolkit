(function(window, document) {
'use strict';

// ----------------------------------------
// Checks
// ----------------------------------------

if (!window.React) {
  console.error('React is not loaded');
  return;
}

if (!window.ReactDOM) {
  console.error('ReactDOM is not loaded');
  return;
}


// ----------------------------------------
// Globals
// ----------------------------------------
const React = window.React;
const ReactDOM = window.ReactDOM;


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
// Layouts
// ----------------------------------------



// ----------------------------------------
// View
// ----------------------------------------

const App = function() {
  const [counter, setCounter] = React.useState(0);

  const increment = function() {
    setCounter(counter + 1);
  };

  return React.createElement('button', { onClick: increment }, counter);

};


// ----------------------------------------
// Root
// ----------------------------------------

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(React.createElement(React.StrictMode, null,
    React.createElement(App))
  );


})(window, document);
