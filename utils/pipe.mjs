/**
 * @param {unknown} arg
 * @param {Function[]} fns
 *
 * @example
 * const add = (a, b) => a + b
 * const double = (x) => x * 2
 *
 * pipe(1, (x) => add(x, 2), double) // => 6
 */
export function pipe(arg, ...fns) {
  let result = arg

  if (fns.length === 0) throw new TypeError('Expected at least one function')

  if (fns.some((fn) => 'function' !== typeof fn))
    throw new TypeError('Expected all arguments after the first to be functions')

  for (const fn of fns) {
    result = fn.call(null, result)
  }

  return result
}
