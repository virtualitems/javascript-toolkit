/**
 * Function that get, initializes and returns an object
 *
 * Usage:
 *
 *  New object:
 *    created = factory();
 *
 *  Existing object:
 *    base = { name: 'base' };
 *    extended = factory(base);
 *
 * @param {Object} initial The existing object
 * @returns {Object} The resulting object
 */
const factory = function(initial) {

  // Create or get the object
  const object = (initial === undefined || initial === null) ? {} : initial;

  // Initialize the object
  object.by = 'factory';

  // Return the new object
  return object;
};
