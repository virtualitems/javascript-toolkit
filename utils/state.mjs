const vals = new WeakMap();
const subs = new WeakMap();

export function state(initialValue) {
  const key = {};
  vals.set(key, initialValue);
  subs.set(key, new Set());

  return {
    get: () => vals.get(key),
    set: (arg) => {
      const prev = vals.get(key);
      const next = typeof arg === 'function' ? arg(prev) : arg;

      if (Object.is(prev, next)) {
        return;
      }

      vals.set(key, next);
      subs.get(key).forEach(fn => fn(next, prev));
    },
    subscribe: (fn) => {
      const group = subs.get(key);
      group.add(fn);

      return () => group.delete(fn);
    }
  }
}
