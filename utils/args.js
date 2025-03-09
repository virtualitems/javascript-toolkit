
/**
 * Returns the value if it is defined and of the specified type, otherwise returns the default value.
 *
 * @param {any} value - The value to check.
 * @param {any} defaultv - The default value to return if the value is undefined.
 * @param {Function|Function[]} [type] - The expected type(s) of the value. Can be a constructor function or an array of constructor functions.
 * @returns {any} - The value if it is defined and of the specified type, otherwise the default value.
 *
 * @throws {TypeError} - If the value is not of the specified type.
 */
function arg(value, defaultv, type) {

  if (value === undefined) {
    return defaultv;
  }

  if (type) {
    const types = Array.isArray(type) ? type : [type];
    const isValidType = types.some(type => {

      if (type === null) {
        return value === null;
      }

      if (type === undefined) {
        return value === undefined;
      }

      if (value === null || value === undefined) {
        return false;
      }

      return value.constructor === type;
    });

    if (!isValidType) {
      throw new TypeError('The data type is not correct');
    }
  }

  return value;

}
