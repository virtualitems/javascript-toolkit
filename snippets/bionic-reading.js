/**
 * Bold text
 *
 * @param {string} word
 */
const bold = function (word) {
  return `<b>${word}</b>`;
};


/**
 * Delete non letter characters
 *
 * @param {string} word
 */
const clean = function (word) {
  return word.replace(/[^a-zA-Z0-9]/g, '');
};


/**
 * Transforms an array of words into a Bionic Reading format
 *
 * @param  {string[]} words
 * @returns {string[]}
 */
const transformer = function (words) {

  if (!Array.isArray(words)) {
    throw new Error('words must be an array');
  }

  return words.map(w => {

    const clear = clean(w);
    const length = clear.length;

    if (length === 0) {
      return w;
    }

    else if (length === 1) {
      return bold(w);
    }

    const offset = Math.max(0, w.search(/[a-zA-Z0-9]/));
    const end = Math.ceil(length / 2);
    const extra = Math.ceil(Math.max(0, length - 6) / 6);
    const result = offset + end + extra;

    return bold(w.substring(0, result)) + w.substring(result);

  });

};
