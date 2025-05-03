ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

/**
 * @param {Function} fn - The function to be memoized.
 * @returns {Function} - A memoized version of the function.
 */
function functionFactory(fn) {
  let fnCache = null;
  let depsCache = [];

  return (...args) => {
    if (
      fnCache === null ||
      depsCache.length !== args.length ||
      !args.every((dep, i) => Object.is(dep, depsCache[i]))
    ) {
      fnCache = fn.apply(undefined, args);
      depsCache = args;
    }

    return fnCache;
  };
}

const onClickFactory = functionFactory(setCount => _event => setCount(prev => prev + 1));

function App() {
  const [count, setCount] = React.useState(0);
  const onClick = onClickFactory(setCount);

  return (
    <div>
      <button onClick={onClick}>Increment</button>
      <p>{count}</p>
    </div>
  );
}
