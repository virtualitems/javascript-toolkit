/**
 * Function to join class names together.
 * @param  {unknown[]} args - The class names to join.
 *
 * @example
 * cn('foo', new Set(['bar']), undefined, { baz: true, qux: false }, [null, 'quux']);
 */
export function cn(...args) {
  const classNames = new Set();

  const remaining = Array.from(args);

  while(remaining.length) {
    const current = remaining.shift();

    // skip null undefined NaN values
    if (current === undefined || current === null || Object.is(current, NaN)) {
      continue;
    }

    // is string
    if (current.constructor === String) {
      const trimmed = current.trim();

      if (trimmed.length === 0) continue;

      classNames.add(trimmed);

      continue;
    }

    // is object
    if (current.constructor === Object) {
      for (const key in current) {
        const value = current[key];

        if (Boolean(value) === false) continue;

        const trimmed = String(key).trim();

        if (trimmed.length === 0) continue;

        classNames.add(trimmed);
      }
      continue;
    }

    // is map
    if (current.constructor === Map) {
      for (const [key, value] of current) {

        if (Boolean(value) === false) continue;

        const trimmed = String(key).trim();

        if (trimmed.length === 0) continue;

        classNames.add(trimmed);
      }

      continue;
    }

    // is iterable
    if ('function' === typeof current[Symbol.iterator]) {
      for (const item of current) remaining.push(item);
      continue;
    }

    // otherwise, ignore
  }

  return Array.from(classNames).join(' ');
}

/**
 * Function to map class names using a CSS module dictionary.
 *
 * @param {Record<string, string>} classDict
 * @returns {string}
 *
 * @example
 * module({ foo: 'foo_abc123', bar: 'bar_def456' });
 */
export function module(classDict) {
  return Object.values(classDict).join(' ');
}
