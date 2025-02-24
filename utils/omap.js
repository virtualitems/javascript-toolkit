/**
 * Map the values of an object to an array
 *
 * @param {object} obj - The object to map
 * @param {function} mapfn - The function to call on each value
 * @param {object} thisArg - The value to use as this when executing mapfn
 * @returns {array} - An array of the results of calling mapfn on each value
 */
function omap(obj, mapfn, thisArg) {

  if ('object' !== typeof obj || null === obj) {
    throw new TypeError('objectAsArray called on non-object');
  }

  if ('function' !== typeof mapfn) {
    throw new TypeError('mapfn must be a function');
  }

  if (thisArg === undefined) {
    thisArg = null;
  }

  const result = [];

  for (key in obj) {
    const value = obj[key];
    result.push(mapfn.call(thisArg, value, key));
  }

  return result;
}
