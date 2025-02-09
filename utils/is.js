/**
 * @description
 * Holds a set of functions to check the type of a value.
 * It only checks the type of the value, not the value itself.
 */
const is = {
  array: Array.isArray,
  bigint: value => 'bigint' === typeof value,
  boolean: value => 'boolean' === typeof value,
  builtBy: (constructor, value) => value !== undefined && value !== null && value.constructor === constructor,
  esModule: value => value !== null && 'object' === typeof value && value.__esModule === true,
  finite: Number.isFinite,
  function: value => 'function' === typeof value,
  instanceOf: (constructor, value) => value instanceof constructor,
  integer: Number.isInteger,
  iterable: value => value !== null && 'object' === typeof value && 'function' === typeof value[Symbol.iterator],
  nan: value => Object.is(value, NaN),
  number: value => 'number' === typeof value,
  object: value => value !== null && 'object' === typeof value,
  ref: Object.is,
  string: value => 'string' === typeof value,
  symbol: value => 'symbol' === typeof value,
  not: {
    array: value => !Array.isArray(value),
    bigint: value => 'bigint' !== typeof value,
    boolean: value => 'boolean' !== typeof value,
    builtBy: (constructor, value) => value === undefined || value === null || value.constructor !== constructor,
    esModule: value => value === null || 'object' !== typeof value || value.__esModule !== true,
    finite: value => !Number.isFinite(value),
    function: value => 'function' !== typeof value,
    instanceOf: (constructor, value) => !(value instanceof constructor),
    integer: value => !Number.isInteger(value),
    iterable: value => value === null || 'object' !== typeof value || 'function' !== typeof value[Symbol.iterator],
    nan: value => !Object.is(value, NaN),
    number: value => 'number' !== typeof value,
    object: value => value === null || 'object' !== typeof value,
    ref: (value, other) => !Object.is(value, other),
    string: value => 'string' !== typeof value,
    symbol: value => 'symbol' !== typeof value
  }
};
