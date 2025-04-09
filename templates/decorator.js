/**
 * Wraps a function with a decorator
 *
 * @param {Function} fn
 * @returns {Function}
 */
const decorator = function(fn) {
  const context = this;

  const wrapper = function() {
    // do something before
    const result = fn.apply(this, arguments);
    // do something after
    return result;
  }

  return wrapper;
};
