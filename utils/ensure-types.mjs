/**
 *  Ensures that all provided operators are of the same type.
 *
 * @param  {...unknown} operators
 * @returns {boolean}
 *
 * @example
 * e(1, 2, 3); // true
 * e('a', 'b', 'c'); // true
 * e([], {}, []); // false
 *
 * @example
 * const a = 1;
 * const b = '2';
 * const c = 3;
 * const result = e(a, b, c) ? a + b + c : 0;
 * console.log(result); // 0
 *
 * @example
 * const a = 1;
 * const b = 2;
 * const c = 3;
 * const result = e(a, b, c) ? a + b + c : 0;
 * console.log(result); // 6
 *
 * @example
 * const a = 1;
 * const b = '2';
 * const c = 3;
 * if (e(a, b, c) === false) throw new TypeError();
 */
export function e(...operators) {

  if (operators.length < 2) {
    throw new Error('At least two operators are required');
  }

  const length = operators.length;
  const firstElement = operators[0];

  if (firstElement === undefined) {
    for (let i = 1; i < length; i++)
      if (operators[i] !== undefined)
        return false;
    return true;
  }

  if (firstElement === null) {
    for (let i = 1; i < length; i++)
      if (operators[i] !== null)
        return false;
    return true;
  }

  if (Object.is(firstElement, NaN)) {
    for (let i = 1; i < length; i++)
      if (Object.is(operators[i], NaN) === false)
        return false;
    return true;
  }

  for (let i = 1; i < length; i++)
    if (operators[i]?.constructor !== firstElement.constructor)
      return false;

  return true;
}
