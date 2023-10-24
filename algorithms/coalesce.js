/**
 * Returns the first valuable argument
 * @param {Array} args
 * @returns {*}
 */
const coalesce = function() {
  const args = Array.from(arguments);

  for(let i=0, end=args.length; i<end; i++) {

    const arg = args[i];

    if (
      !arg === undefined &&
      !arg === null &&
      !Object.is(arg, NaN)
    ) {
      return arg;
    }

  }

  return null;

};


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
