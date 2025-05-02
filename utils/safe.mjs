const defaults = {
  args: [],
  thisArg: undefined,
};

/**
 * Safely execute a Promise or invoke a function with error handling.
 *
 * @param {Promise|Function} target - The Promise or function to be executed.
 * @param {Array} args - An array of arguments to pass when invoking the function. Defaults to an empty array.
 * @param {*} thisArg - The value to be used as "this" when invoking the function. Defaults to null.
 *
 * @returns {Promise<Array>|Array} A Promise resolving with a tuple [error, value] if target is a Promise, or
 *                                  a tuple [error, value] if target is a function.
 * @throws {Error} Throws an error if the target is neither a Promise nor a Function, or if args is not an array.
 */
export function safe(target, args = defaults.args, thisArg = defaults.thisArg) {
  const isPromise = target instanceof Promise;
  const isFunction = target instanceof Function;

  if (!isPromise && !isFunction) {
    throw new Error('Target must be a Promise or a Function');
  }

  if (!Array.isArray(args)) {
    throw new Error('Arguments must be an array');
  }

  if (isPromise) {
    return target
      .then((value) => [null, value])
      .catch((error) => [error, undefined]);
  }

  if (isFunction) {
    try {
      const result = target.apply(thisArg, args);

      if (result instanceof Promise) {
        return result
          .then((value) => [null, value])
          .catch((error) => [error, undefined]);
      }

      return [null, result];
    } catch (error) {
      return [error, undefined];
    }
  }
}
