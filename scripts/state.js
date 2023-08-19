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
const ce = React.createElement;
const useState = React.useState;

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
  const [counter, setCounter] = useState(0);

  const onClick = function() {
    setCounter(counter + 1);
  };

  const style = {
    display: 'inline-block',
    margin: '1rem',
    padding: '0.5em 1em',
    backgroundColor: '#eee',
    border: '1px solid #ccc',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  return ce('button', { onClick, style }, counter);

};


// ----------------------------------------
// Root
// ----------------------------------------

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(ce(React.StrictMode, null, ce(App)));


})(window, document);
