/**
 * @param {Function} fn - The function to be memoized.
 * @returns {Function} - A memoized version of the function.
 *
 * @example
 * functionFactory(setCount => num => setCount(prev => prev + num));
 */
export function functionFactory(fn) {
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
