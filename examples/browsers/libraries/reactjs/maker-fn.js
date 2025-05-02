import React from 'https://esm.sh/react@19/?dev';
import ReactDOMClient from 'https://esm.sh/react-dom@19/client?dev';

const { createElement: ce, useState } = React;

ReactDOMClient.createRoot(document.getElementById('root')).render(ce(App));

function createFactory(fn) {
  let fnCache = null;
  let depsCache = [];

  return (...args) => {
    if (
      fnCache === null ||
      depsCache.length !== args.length ||
      args.some((dep, i) => dep !== depsCache[i])
    ) {
      fnCache = fn.apply(undefined, args);
      depsCache = args;
    }

    return fnCache;
  };
}

const OnClickFactory = createFactory(setCount => _event => setCount(prev => prev + 1));

const stack = [];

function App() {
  const [count, setCount] = useState(0);

  const onClick = OnClickFactory(setCount);

  stack.push(onClick);

  console.log(
    'stack',
    stack.length,
    stack.every(fn => fn === onClick),
  );

  return ce('div', null, ce('button', { onClick }, 'Increment'), ce('p', null, count));
}
