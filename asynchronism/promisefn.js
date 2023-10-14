/**
 * Surrounds a function with a Promise and gives it the references to the resolve and reject functions.
 *
 * @param {Function} fn
 * @returns {Function}
 */
const promisefn = function(fn) {

  if (! (fn instanceof Function) ) {
    throw new TypeError('PromiseFunction argument must be a function');
  }

  const wrapper = function() {

    const context = this;
    const args = arguments;

    return new Promise(
      function(resolve, reject) {
        const promise = {resolve, reject};
        const thisArg = {context, promise};
        fn.apply(thisArg, args);
      }
    );

  }

  return wrapper;
};
