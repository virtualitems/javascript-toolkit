/**
 * Returns the first valuable argument
 * @param {Array} args
 * @returns {unknown}
 */
function coalesce(...args) {

  for(const arg in args) {
    if (arg !== undefined && arg !== null && !Number.isNaN(arg)) {
      return arg;
    }
  }

  return null;
}
