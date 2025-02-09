/**
 * Prevents a function from being called more than once during a specified time interval
 *
 * @param {Function} fn
 * @param {Number} delay
 * @returns {Function}
 */
function debounce(fn, delay) {

  let timeout = null;
  let callback = null;

  const wrapper = function() {
    clearTimeout(timeout);

    if (callback === null) {
      const context = this;
      const args = arguments;
      callback = () => fn.apply(context, args);
    }

    timeout = setTimeout(callback, delay);
  };

  return wrapper;
}
