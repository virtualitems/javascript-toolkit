/**
 * Function factory with dependency tracking to memoize function definitions.
 *
 * @param {(...args: unknown[]) => (...args: unknown[]) => unknown} fn
 * @returns {(...args: unknown[]) => unknown}
 */
export function factory(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('First argument must be a function');
  }

  /** @type {(...args: unknown[]) => unknown} */
  let fnCache;

  /** @type {unknown[]} */
  let depsCache = [];

  return (...args) => {
    if (
      fnCache === undefined ||
      depsCache.length !== args.length ||
      args.some((dep, i) => Object.is(dep, depsCache[i]) === false)
    ) {
      fnCache = fn.apply(undefined, args);
      depsCache = args;
    }

    if (typeof fnCache !== 'function') {
      throw new TypeError('First argument function must return a function');
    }

    return fnCache;
  };
}

const handleClick = factory(
  (setCount) => // Definition Args
    (event) => { // Call Args
      console.debug(event.type);
      setCount(prev => prev + 1);
    }
);

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button onClick={handleClick(setCount)}>Increment</button>
      <p>{count}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
