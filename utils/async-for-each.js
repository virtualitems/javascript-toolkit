/**
 * Asynchronously executes a callback function for each element in an array-like object
 *
 * @param {Iterable} array - An iterable object (Array, Set, Generator, etc.)
 * @param {Function} callback - Async function to execute for each element, receives (item, index)
 * @returns {Set} Set of promises
 */
function asyncForEach(iterable, callback) {

    if (('object' !== typeof iterable ) || ('function' !== typeof iterable[Symbol.iterator])) {
        throw new Error('iterable param must be an object with a [Symbol.iterator] method');
    }

    if ('function' !== typeof callback) {
        throw new Error('callback param must be a function');
    }

    const promises = new Set();
    let i = 0;

    for (const item of iterable) {
        promises.add(callback(item, i));
        i += 1;
    }

    return promises;
}
