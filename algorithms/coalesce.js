/**
 * Returns the first valuable argument
 * @param {Array} args
 * @returns {*}
 */
const coalesce = function() {
  const args = Array.from(arguments);
  const is = Object.is;

  for(let i=0, end=args.length; i<end; i++) {

    const arg = args[i];

    if (
      !is(arg, undefined) &&
      !is(arg, null) &&
      !is(arg, NaN)
    ) {
      return arg;
    }

  }

  return null;

};
