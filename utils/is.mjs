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

is.int8Array = value => value instanceof Int8Array;
is.not.int8Array = value => (value instanceof Int8Array) === false;

is.uint8Array = value => value instanceof Uint8Array;
is.not.uint8Array = value => (value instanceof Uint8Array) === false;

is.uint8ClampedArray = value => value instanceof Uint8ClampedArray;
is.not.uint8ClampedArray = value => (value instanceof Uint8ClampedArray) === false;

is.int16Array = value => value instanceof Int16Array;
is.not.int16Array = value => (value instanceof Int16Array) === false;

is.uint16Array = value => value instanceof Uint16Array;
is.not.uint16Array = value => (value instanceof Uint16Array) === false;

is.int32Array = value => value instanceof Int32Array;
is.not.int32Array = value => (value instanceof Int32Array) === false;

is.uint32Array = value => value instanceof Uint32Array;
is.not.uint32Array = value => (value instanceof Uint32Array) === false;

is.bigInt64Array = value => value instanceof BigInt64Array;
is.not.bigInt64Array = value => (value instanceof BigInt64Array) === false;

is.bigUint64Array = value => value instanceof BigUint64Array;
is.not.bigUint64Array = value => (value instanceof BigUint64Array) === false;

is.float32Array = value => value instanceof Float32Array;
is.not.float32Array = value => (value instanceof Float32Array) === false;

is.float64Array = value => value instanceof Float64Array;
is.not.float64Array = value => (value instanceof Float64Array) === false;

// ====================
// Object
// ====================

is.instanceOf = (constructor, value) => value instanceof constructor;
is.not.instanceOf = (constructor, value) => (value instanceof constructor) === false;

is.builtBy = (constructor, value) => (value !== undefined) && (value !== null) && (value.constructor === constructor);
is.not.builtBy = (constructor, value) => (value === undefined) || (value === null) || (value.constructor !== constructor);

is.object = value => (value !== null) && ('object' === typeof value);
is.not.object = value => (value === null) || ('object' !== typeof value);

is.plain = value => (value !== undefined) && (value !== null) && (value.constructor === Object);
is.not.plain = value => (value === undefined) || (value === null) || (value.constructor !== Object);

is.date = value => value instanceof Date;
is.not.date = value => (value instanceof Date) === false;

is.regExp = value => value instanceof RegExp;
is.not.regExp = value => (value instanceof RegExp) === false;

is.weakMap = value => value instanceof WeakMap;
is.not.weakMap = value => (value instanceof WeakMap) === false;

is.weakSet = value => value instanceof WeakSet;
is.not.weakSet = value => (value instanceof WeakSet) === false;

is.promise = value => value instanceof Promise;
is.not.promise = value => (value instanceof Promise) === false;

// ====================
// Iterable
// ====================

is.iterable = value => (value !== null) && ('object' === typeof value) && ('function' === typeof value[Symbol.iterator]);
is.not.iterable = value => (value === null) || ('object' !== typeof value) || ('function' !== typeof value[Symbol.iterator]);

is.asyncIterable = value => (value !== null) && ('object' === typeof value) && ('function' === typeof value[Symbol.asyncIterator]);
is.not.asyncIterable = value => (value === null) || ('object' !== typeof value) || ('function' !== typeof value[Symbol.asyncIterator]);

is.map = value => value instanceof Map;
is.not.map = value => (value instanceof Map) === false;

is.set = value => value instanceof Set;
is.not.set = value => (value instanceof Set) === false;

// ====================
// Buffer
// ====================

is.arrayBuffer = value => value instanceof ArrayBuffer;
is.not.arrayBuffer = value => (value instanceof ArrayBuffer) === false;

is.sharedArrayBuffer = value => value instanceof SharedArrayBuffer;
is.not.sharedArrayBuffer = value => (value instanceof SharedArrayBuffer) === false;

is.dataView = value => value instanceof DataView;
is.not.dataView = value => (value instanceof DataView) === false;

// ====================
// ES Module
// ====================

is.esModule = value => (value instanceof Object) && (value.__esModule === true);
is.not.esModule = value => ((value instanceof Object) === false) || (value.__esModule !== true);

// ====================
// Reference
// ====================

is.ref = (value, other) => Object.is(value, other);
is.not.ref = (value, other) => Object.is(value, other) === false;

is.weakRef = (value) => value instanceof WeakRef;
is.not.weakRef = (value) => (value instanceof WeakRef) === false;

is.global = (value) => globalThis[value] !== undefined;
is.not.global = (value) => globalThis[value] === undefined;

// ====================
// Error
// ====================

is.error = value => value instanceof Error;
is.not.error = value => (value instanceof Error) === false;

is.aggregateError = (value) => value?.constructor === AggregateError;
is.evalError = (value) => value?.constructor === EvalError;
is.rangeError = (value) => value?.constructor === RangeError;
is.referenceError = (value) => value?.constructor === ReferenceError;
is.syntaxError = (value) => value?.constructor === SyntaxError;
is.typeError = (value) => value?.constructor === TypeError;
is.uriError = (value) => value?.constructor === URIError;
