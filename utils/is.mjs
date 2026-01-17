/**
 * @description
 * Holds a set of functions to check the type of a value.
 * It only checks the type of the value, not the value itself.
 */

export const is = { not: {} };

// ====================
// primitive types
// ====================

is.undefined = value => value === undefined;
is.not.undefined = value => value !== undefined;

is.null = value => value === null;
is.not.null = value => value !== null;

is.nan = value => Object.is(value, NaN);
is.not.nan = value => Object.is(value, NaN) === false;

is.function = value => 'function' === typeof value;
is.not.function = value => 'function' !== typeof value;

is.finite = Number.isFinite;
is.infinite = value => Number.isFinite(value) === false;

is.integer = Number.isInteger;
is.not.integer = value => Number.isInteger(value) === false;

is.boolean = value => 'boolean' === typeof value;
is.not.boolean = value => 'boolean' !== typeof value;

is.number = value => 'number' === typeof value;
is.not.number = value => 'number' !== typeof value;

is.bigint = value => 'bigint' === typeof value;
is.not.bigint = value => 'bigint' !== typeof value;

is.string = value => 'string' === typeof value;
is.not.string = value => 'string' !== typeof value;

is.primitive = (value) => {
  const type = typeof value;
  const isPrimitive = (
    'boolean' === type
    || 'number' === type
    || 'bigint' === type
    || 'string' === type
    || 'symbol' === type
  );
  return isPrimitive;
};

is.not.primitive = (value) => {
  const type = typeof value;
  const isPrimitive = (
    'boolean' === type
    || 'number' === type
    || 'bigint' === type
    || 'string' === type
    || 'symbol' === type
  );
  return isPrimitive === false;
};

// ====================
// Array
// ====================

is.array = Array.isArray;
is.not.array = value => Array.isArray(value) === false;

// ====================
// Object
// ====================

is.object = value => (value !== null) && ('object' === typeof value);
is.not.object = value => (value === null) || ('object' !== typeof value);

is.plain = value => (value !== undefined) && (value !== null) && (value.constructor === Object);
is.not.plain = value => (value === undefined) || (value === null) || (value.constructor !== Object);

is.instanceOf = (constructor, value) => value instanceof constructor;
is.not.instanceOf = (constructor, value) => (value instanceof constructor) === false;

is.builtBy = (constructor, value) => (value !== undefined) && (value !== null) && (value.constructor === constructor);
is.not.builtBy = (constructor, value) => (value === undefined) || (value === null) || (value.constructor !== constructor);

is.ref = (value, other) => Object.is(value, other);
is.not.ref = (value, other) => Object.is(value, other) === false;

// ====================
// Iterable
// ====================

is.iterable = value => (value !== null) && ('object' === typeof value) && ('function' === typeof value[Symbol.iterator]);
is.not.iterable = value => (value === null) || ('object' !== typeof value) || ('function' !== typeof value[Symbol.iterator]);

is.asyncIterable = value => (value !== null) && ('object' === typeof value) && ('function' === typeof value[Symbol.asyncIterator]);
is.not.asyncIterable = value => (value === null) || ('object' !== typeof value) || ('function' !== typeof value[Symbol.asyncIterator]);

// ====================
// ES Module
// ====================

is.esModule = value => (value instanceof Object) && (value.__esModule === true);
is.not.esModule = value => ((value instanceof Object) === false) || (value.__esModule !== true);
