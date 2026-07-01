/**
 * Wraps a function with a decorator
 *
 * @param {Function} fn
 * @returns {Function}
 */

export function decorator(fn) {
  return function () {
    // do something before
    const result = fn.apply(this, arguments)
    // do something after
    return result
  }
}
