/**
 * Wraps a function with a decorator
 *
 * @param {Function} fn
 * @param  {Array} args
 * @returns {Function}
 */
const decorator = function(fn, ...args) {
  const context = this;

  const wrapper = function() {
    // do something before
    const result = fn.apply(this, arguments);
    // do something after
    return result;
  }

  return wrapper;
};


/**
 * Prevents a function from being called more than once during a specified time interval
 *
 * @param {Function} fn
 * @param {Number} delay
 * @returns {Function}
 */
const debounce = function(fn, delay) {

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
};
