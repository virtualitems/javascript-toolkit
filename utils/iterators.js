/**
 * Generates a sequence of numbers within a specified range.
 *
 * @generator
 *
 * @param {number} start - The starting number of the range.
 * @param {number} end - The ending number of the range (exclusive).
 * @param {number} [step=1] - The step value to increment or decrement by.
 *
 * @throws {Error} Throws an error if any of the arguments are not numbers.
 * @throws {Error} Throws an error if the step is zero.
 * @throws {Error} Throws an error if the step is positive and start is greater than end.
 * @throws {Error} Throws an error if the step is negative and start is less than end.
 *
 * @returns {IterableIterator<number>} An iterator that yields numbers in the specified range.
 */
function* range(start, end, step = 1) {
  if ('number' !== typeof start || 'number' !== typeof end || 'number' !== typeof step) {
    throw new Error('Arguments must be numbers');
  }

  if (step === 0) {
    throw new Error('Step must not be zero');
  }

  if (start > end && step > 0) {
    throw new Error('Step must be negative when start is greater than end');
  }

  if (start < end && step < 0) {
    throw new Error('Step must be positive when start is less than end');
  }

  if (start === end) {
    return start;
  }

  if (start < end) {
    for (let i = start; i < end; i += step) {
      yield i;
    }
  } else {
    for (let i = start; i > end; i += step) {
      yield i;
    }
  }
}

/**
 * @param {object} iterable
 * @param {number} start
 * @returns {Generator}
 */
function* count(iterable, start = 1) {
  if (!iterable[Symbol.iterator]) {
    throw new Error('Argument must be an iterable object');
  }

  if ('number' !== typeof start || start < 0) {
    throw new Error('Start must be zero or a positive number');
  }

  for (const val of iterable) {
    yield count;
    count += 1;
  }
}

/**
 * @param {object} iterable
 * @returns {Generator}
 */
function* cycle(iterable) {
  if (!iterable[Symbol.iterator]) {
    throw new Error('Argument must be an iterable object');
  }

  while (true) {
    for (const val of iterable) {
      yield val;
    }
  }
}

/**
 * @param {object} iterable
 * @param {number} start
 * @returns {Generator}
 */
function* enumerate(iterable, start = 1) {
  if (!iterable[Symbol.iterator]) {
    throw new Error('Argument must be an iterable object');
  }

  if ('number' !== typeof start || start < 0) {
    throw new Error('Start must be zero or a positive number');
  }

  let idx = start;

  for (const val of iterable) {
    yield [val, idx];
    idx += 1;
  }
}

/**
 * @param {Array<object>} iterables
 * @returns {Generator}
 */
function* zip(...iterables) {
  const iterators = [];

  for (let i = 0; i < iterables.length; i++) {
    if (!iterables[i][Symbol.iterator]) {
      throw new Error('All arguments must be iterable objects');
    }

    iterators.push(iterables[i][Symbol.iterator]());
  }

  while (true) {
    const results = iterators.map(i => i.next());

    if (results.some(r => r.done)) {
      break;
    }

    yield results.map(r => r.value);
  }
}

/**
 * @param {object} iterable
 * @param {number} size
 * @returns {Generator}
 */
function* pack(iterable, size = 2) {
  if (!iterable[Symbol.iterator]) {
    throw new Error('Argument must be an iterable object');
  }

  if ('number' !== typeof size || size < 0) {
    throw new Error('Size must be zero or a positive number');
  }

  let pack = [];

  for (const val of iterable) {
    pack.push(val);

    if (pack.length === size) {
      yield pack;
      pack = [];
    }
  }

  if (pack.length > 0) {
    yield pack;
  }
}
