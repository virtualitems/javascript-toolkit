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

if (!(Plugins instanceof Object)) {
  Plugins = {};
}


const {
  createElement: ce,
  Fragment,
  StrictMode,
  useState,

} = React;


const ExampleComponent = function(props) {

  const [count, setCount] = useState(0);

  const plus = ce('button', {
      onClick: () => setCount(count + 1),
      style: { marginRight: '.5em' }
    },
    '+'
  );

  const minus = ce('button', {
      onClick: () => setCount(count - 1),
      style: { marginRight: '.5em' }
    },
    '-'
  );

  const display = ce('span', null, `Counter: ${count}`);

  return ce(Fragment, null, plus, minus, display);
};


ReactDOM
  .createRoot(rootElement)
  .render(ce(StrictMode, null, ce(ExampleComponent)));


})(
  window.document.getElementById('root'),
  window.React,
  window.ReactDOM,
);