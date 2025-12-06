/**
 * Function to join class names together.
 * @param  {unknown[]} args - The class names to join.
 *
 * @example
 * classNames('foo', new Set(['bar']), undefined, { baz: true, qux: false }, [null, 'quux']);
 */
export function classNames(...args) {
  const classNames = new Set();

  const remaining = Array.from(args);

  while(remaining.length) {
    const current = remaining.shift();

    // skip null/undefined values
    if (current === null || current === undefined) {
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

        if ('string' !== typeof key) continue;

        if (!value) continue;

        const trimmed = key.trim();

        if (trimmed.length === 0) continue;

        classNames.add(trimmed);
      }
      continue;
    }

    // is map
    if (current.constructor === Map) {
      for (const [key, value] of current) {
        if ('string' !== typeof key) continue;

        if (!value) continue;

        const trimmed = key.trim();

        if (trimmed.length === 0) continue;

        classNames.add(trimmed);
      }

      continue;
    }

    // is iterable
    if ('function' === typeof current[Symbol.iterator]) {
      remaining.push(...current);
      continue;
    }

    // otherwise, ignore
  }

  return Array.from(classNames).join(' ');
}
