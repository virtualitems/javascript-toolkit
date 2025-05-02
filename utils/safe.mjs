/**
 * Safely execute a Promise with error handling.
 *
 * @param {Promise} promise - The Promise to be executed.
 * @returns {Promise<Array>} A Promise resolving with a tuple [error, value].
 * @throws {Error} Throws an error if the input is not a Promise.
 */
export function safe(promise) {
  if (!(promise instanceof Promise)) {
    throw new Error('Input must be a Promise');
  }

  return promise.then(val => [null, val]).catch(err => [err, undefined]);
}

/**
 * Safely executes a function and captures any errors that occur during its execution.
 *
 * @param {Function} fn - The function to be executed. Must be a valid function.
 * @param {Array} [args] - An array of arguments to pass to the function.
 * @param {*} [thisArg] - The value to use as `this` when calling the function.
 * @returns {[Error|null, any|undefined]} - A tuple where the first element is an error (if any occurred, otherwise `null`),
 * and the second element is the return value of the function (or `undefined` if an error occurred).
 * @throws {Error} If `fn` is not a function or `args` is not an array.
 */
export function safeExec(fn, args = [], thisArg = undefined) {
  if (!(fn instanceof Function)) {
    throw new Error('Input must be a Function');
  }

  if (!Array.isArray(args)) {
    throw new Error('Arguments must be an array');
  }

  try {
    const val = fn.apply(thisArg, args);
    return [null, val];
  } catch (err) {
    return [err, undefined];
  }
}
