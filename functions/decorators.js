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

  const wrapper = function() {
    const thisArg = this;
    const argArray = arguments;

    clearTimeout(timeout);

    timeout = setTimeout(() => fn.apply(thisArg, argArray), delay);
  };

  return wrapper;
};
