/**
 * @param {Function} fn - The function to be memoized.
 * @returns {Function} - A memoized version of the function.
 *
 * @example
 * import React, { useState } from "react";
 * import { functionFactory } from "./function-factory.mjs";
 *
 * const createIncrement = functionFactory(setCount => num => {
 *   setCount(prev => prev + num);
 * });
 *
 * export default function Counter() {
 *   const [count, setCount] = useState(0);
 *   const increment = createIncrement(setCount);
 *
 *   return (
 *     <div>
 *       <p>Count: {count}</p>
 *       <button type="button" onClick={() => increment(1)}>+1</button>
 *       <button type="button" onClick={() => increment(5)}>+5</button>
 *     </div>
 *   );
 * }
 */
export function functionFactory(fn) {
  let fnCache = null
  let depsCache = []

  return (...args) => {
    if (
      fnCache === null ||
      depsCache.length !== args.length ||
      !args.every((dep, i) => Object.is(dep, depsCache[i]))
    ) {
      fnCache = fn.apply(undefined, args)
      depsCache = args
    }

    return fnCache
  }
}
