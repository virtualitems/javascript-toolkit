/**
 * @fileoverview React application
 * @version 0.0.1
 *
 * @requires react
 * @see https://www.npmjs.com/package/react
 *
 * @requires react-dom
 * @see https://www.npmjs.com/package/react-dom
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


// ----------------------------------------
// Namespaces
// ----------------------------------------


if (window.hasOwnProperty('App')) {
  throw new Error('App already defined');
}

window.App = (function(React, ReactDOM) {

'use strict';


// ----------------------------------------
// Constants
// ----------------------------------------


const {
  Fragment,
  createElement: ce,
  useCallback,
  useEffect,
  useMemo,
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
function Lifecycle(props) {

  console.log('\n\n===== ƒ Component() =====');

  const [counterState, setCounterState] = useState(0);

  console.log('props', props);
  console.log('counterState', counterState);
  console.log('----------')

  useEffect(() => {
    console.log('!! component did mount');
    return () => console.log('!! component will unmount');
  }, []);

  useEffect(
    () => {
      console.log('!! component generic effect');
      return () => console.log('!! component generic cleanup');
    },
  );

  useEffect(
    () => {
      console.log('!! component dependency effect');
      return () => console.log('!! component dependency cleanup');
    },
    [counterState]
  );

  useMemo(
    () => console.log('!! component update memo'),
    [counterState]
  );

  const onClick = useCallback(
    () => setCounterState(prev => {
      console.log('!! component update state');
      return prev + 1;
    },
    [counterState]
  ));

  return ce('div', null,
    ce('h1', null, 'ƒ Render()'),
    ce('h2', null, `Counter: ${counterState}`),
    ce('button', { ...props, onClick }, 'Increment'),
  );

}  //:: Lifecycle


/**
 * @description React component
 * @param {import('react').HTMLProps} props
 */
function App() {

  const [destroyed, setDestroyed] = useState(false);

  const onClick = useCallback(
    () => setDestroyed(prev => !prev),
    []
  );

  return ce(Fragment, null,
    (!destroyed ? ce(Lifecycle) : null),
    ce('hr', null),
    ce('button', { onClick }, (!destroyed ? 'Destroy' : 'Restore')),
  );

}  //:: App


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
  window.ReactDOM
);
