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
    const arg = remaining.shift();

    // skip null/undefined values
    if (arg === null || arg === undefined) {
      continue;
    }

    // is string
    if (arg.constructor === String) {
      const txt = arg.trim();
      if (txt.length) {
        classNames.add(txt);
      }
      continue;
    }

    // is object
    if (arg.constructor === Object) {
      for (const key in arg) {
        if (arg[key] && 'string' === typeof key) {
          const txt = key.trim();
          if (txt.length) {
            classNames.add(txt);
          }
        }
      }
      continue;
    }

    // is iterable
    if ('function' === typeof arg[Symbol.iterator]) {
      remaining.push(...arg);
      continue;
    }

    // otherwise, ignore
  }

  return Array.from(classNames).join(' ');
}
