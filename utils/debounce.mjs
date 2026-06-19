/**
 * Prevents a function from being called more than once during a specified time interval
 *
 * @param {Function} fn
 * @param {Number} delay
 * @returns {Function}
 */
export function debounce(fn, delay) {
  if ('function' !== typeof fn) {
    throw new TypeError('Expected a function')
  }

  if ('number' !== typeof delay || delay < 0) {
    throw new TypeError('Expected delay to be a non-negative number')
  }

  let timeout = null
  let callback = null

  const wrapper = function () {
    clearTimeout(timeout)

    if (callback === null) {
      const context = this
      const args = arguments
      callback = () => fn.apply(context, args)
    }

    timeout = setTimeout(callback, delay)
  }

  return wrapper
}
