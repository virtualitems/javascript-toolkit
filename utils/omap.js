/**
 * Map the values of an object to an array
 *
 * @param {object} target - The object to map
 * @param {function} mapfn - The function to call on each value
 * @returns {object} - An iterable object
 */
export function omap(target, mapfn) {

  if ('object' !== typeof target || null === target) {
    throw new TypeError('objectAsArray called on non-object');
  }

  if ('function' !== typeof mapfn) {
    throw new TypeError('mapfn must be a function');
  }

  return {
    [Symbol.iterator]: function* () {
      for (const key in target) {
        yield mapfn.call(target, target[key], key);
      }
    }
  };

}
