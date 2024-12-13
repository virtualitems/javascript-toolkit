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
  return word.trim().replace(/[^a-zA-Z0-9\']/g, '');
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

    let offset = w.search(/[a-zA-Z0-9\']/);
    offset = (offset === -1) ? 0 : offset;

    const end = Math.ceil(length / 2);

    return bold(w.substring(0, offset + end)) + w.substring(offset + end);

  });

};
