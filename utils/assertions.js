/**
 * Asserts that a condition is true, and throws an error with a provided message if it is not.
 *
 * @param {boolean} condition - The condition to check.
 * @param {string} message - The error message to throw if the condition is false.
 *
 * @throws {Error} Throws an error with the provided message if the condition is false.
 */
function chk(condition, message) {
  condition = Boolean(condition);
  message = String(message);
  if (condition === false) throw new Error(message);
}
