export class Iterable {
  /**
   * @param {Object} initials - initial values
   * @param {Function} mapfn - mapping function
   */
  constructor(initials, mapfn) {

    if ('object' !== typeof initials) {
      throw new TypeError('initial values must be an object');
    }

    if ('function' !== typeof mapfn) {
      throw new TypeError('mapfn must be a function');
    }

    if (initials !== null) {
      Object.assign(this, initials);
    }

    this[Symbol.iterator] = function* () {
      for (const key in this) {
        yield mapfn.call(this, this[key], key);
      }
    };
  }
}
