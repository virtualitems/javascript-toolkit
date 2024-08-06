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
  array: Array.isArray,
  bigint: value => ('bigint' === typeof value),
  boolean: value => ('boolean' === typeof value),
  function: value => ('function' === typeof value),
  instanceOf: (value, constructor) => value instanceof constructor,
  integer: Number.isInteger,
  number: value => (!Object.is(value, NaN) && !Object.is(value, Infinity) && !Object.is(value, -Infinity) && ('number' === typeof value)),
  object: value => (value !== null) && ('object' === typeof value),
  string: value => ('string' === typeof value),
  symbol: value => ('symbol' === typeof value),
  valuable: value => (value !== undefined) && (value !== null) && !Object.is(value, NaN),
  not: {
    array: value => !Array.isArray(value),
    bigint: value => ('bigint' !== typeof value),
    boolean: value => ('boolean' !== typeof value),
    function: value => ('function' !== typeof value),
    instanceOf: (value, constructor) => !(value instanceof constructor),
    integer: value => !Number.isInteger(value),
    number: value => Object.is(value, NaN) || Object.is(value, Infinity) || Object.is(value, -Infinity) || ('number' !== typeof value),
    object: value => (value === null) || ('object' !== typeof value),
    string: value => ('string' !== typeof value),
    symbol: value => ('symbol' !== typeof value),
    valuable: value => (value === undefined) || (value === null) || Object.is(value, NaN),
  },
};
