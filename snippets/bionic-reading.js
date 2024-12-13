/**
 * Bold text wrapper
 * @param {string} word
 */
const bold = function (word) {
  return `<b>${word}</b>`;
};


/**
 * Delete all escaped characters (eg: \n, \t, \r)
 * @param {string} word
 */
const clean = function (word) {
  return word.trim().replace(/[^a-zA-Z0-9\']/g, '');
};


/**
 * Wraps a function with a decorator
 *
 * @param  {string[]} words
 * @returns {string[]}
 */
const transformer = function (words) {

  if (!Array.isArray(words)) {
    throw new Error('words must be an array');
  }

  return words.map(w => {

    if (w.length === 0) {
      return w;
    }

    else if (w.length === 1) {
      return bold(w);
    }

    const idx = Math.ceil(clean(w).length / 2);

    return bold(w.substring(0, idx)) + w.substring(idx);

  });

};
