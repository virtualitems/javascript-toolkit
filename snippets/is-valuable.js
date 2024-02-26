/**
 * Check if a value is valuable
 *
 * @param {any} value
 * @returns {Boolean}
 */
const isValuable = function(value) {

  if (value === undefined) {
    return false;
  }

  if (value === null) {
    return false;
  }

  if(Object.is(value, NaN)) {
    return false;
  }

  return true;

};
