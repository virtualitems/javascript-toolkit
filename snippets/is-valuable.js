/**
 * Check if a value is valuable
 *
 * @param {any} value
 * @returns {Boolean}
 */
function valuable(value) {

  if (value === undefined) {
    return false;
  }

  if (value === null) {
    return false;
  }

  if (Object.is(value, NaN)) {
    return false;
  }

  return true;

};


/**
 * @description Holds a set of functions to check the type of a value using the "typeof" operator
 */
const is = {
  valuable: (value) => (value !== undefined) && (value !== null) && !Object.is(value, NaN),
  object: (value) => (value !== null) && ('object' === typeof value),
  boolean: (value) => ('boolean' === typeof value),
  number: (value) => (!Object.is(value, NaN) && ('number' === typeof value)),
  bigint: (value) => ('bigint' === typeof value),
  string: (value) => ('string' === typeof value),
  symbol: (value) => ('symbol' === typeof value),
  function: (value) => ('function' === typeof value),
};
