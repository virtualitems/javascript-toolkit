/**
 * Returns the first valuable argument
 * @param {Array} args
 * @returns {unknown}
 */
const coalesce = function(...args) {

  for(let i=0, end=args.length; i<end; i++) {

    const arg = args[i];

    if (
      arg !== undefined &&
      arg !== null &&
      !Object.is(arg, NaN)
    ) {
      return arg;
    }

  }

  return null;

};
