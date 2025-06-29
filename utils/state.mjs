const vals = new WeakMap();
const subs = new WeakMap();

export class State {
  constructor(init) {
    vals.set(this, init);
    subs.set(this, new Set());
  }

  get() {
    return vals.get(this);
  }

  set(arg) {
    const prev = vals.get(this);
    const next = typeof arg === 'function' ? arg(prev) : arg;

    if (Object.is(prev, next)) {
      return;
    }

    vals.set(this, next);
    subs.get(this).forEach(fn => fn(next, prev));
  }

  subscribe(fn) {
    const group = subs.get(this);
    group.add(fn);

    return () => group.delete(fn);
  }
}
