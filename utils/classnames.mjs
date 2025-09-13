/**
 * Function to join class names together.
 * @param  {unknown[]} args - The class names to join.
 *
 * @example
 * classNames('foo', new Set(['bar']), undefined, { baz: true, qux: false }, [null, 'quux']);
 */
export function classNames(...args) {
  const classNames = new Set();

  for (const arg of args) {
    if (arg === null || arg === undefined) {
      continue;
    }

    if (arg.constructor === String) {
      classNames.add(arg);
      continue;
    }

    if (arg.constructor === Object) {
      for (const key in arg) {
        if (arg[key] && 'string' === typeof key) {
          classNames.add(key);
        }
      }
      continue;
    }

    if ('function' === typeof arg[Symbol.iterator]) {
      for (const item of arg) {
        if ('string' === typeof item) {
          classNames.add(item);
        }
      }
      continue;
    }
  }

  return Array.from(classNames).join(' ');
}
