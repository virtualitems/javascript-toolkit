/**
 * Dependency injection container with lazy singleton pattern.
 *
 * @example
 * container.register(Database, { factory: (c) => new Database() });
 * const db = container.resolve(Database);
 */
export class Container {
  /**
   * @type {Map<Function, { factory: Function, instance: unknown }>}
   * @private
   */
  #map

  constructor() {
    this.#map = new Map()
  }

  /**
   * Registers a constructor with its factory function.
   * @param {Function} constructor - Class constructor.
   * @param {{ factory: (container: Container) => any }} entry - Resolution entry.
   * @returns {Container} This container for chaining.
   * @throws {TypeError} If constructor or factory is not a function.
   * @throws {Error} If constructor already registered.
   */
  register(constructor, entry) {
    if (typeof constructor !== 'function') {
      throw new TypeError('Constructor must be a function')
    }

    if (this.has(constructor)) {
      throw new Error(`Constructor ${constructor.name} is already registered`)
    }

    if (
      entry === undefined ||
      entry === null ||
      Object.getPrototypeOf(entry) !== Object.prototype
    ) {
      throw new TypeError('entry must be a plain object')
    }

    if (typeof entry.factory !== 'function') {
      throw new TypeError('Factory must be a function')
    }

    this.#map.set(constructor, { factory: entry.factory, instance: null })
    return this
  }

  /**
   * Resolves instance by constructor (singleton).
   * @template T
   * @param {new (...args: any[]) => T} constructor - Class constructor.
   * @returns {T} The instance.
   * @throws {TypeError} If constructor is not a function.
   * @throws {Error} If not registered or invalid instance.
   */
  resolve(constructor) {
    if (typeof constructor !== 'function') {
      throw new TypeError('Constructor must be a function')
    }

    if (this.#map.has(constructor) === false) {
      throw new Error(`Constructor ${constructor.name} is not registered`)
    }

    const entry = this.#map.get(constructor)
    let instance = entry.instance

    if (instance === null) {
      instance = entry.factory(this)
      entry.instance = instance
    }

    if (instance instanceof constructor === false) {
      throw new TypeError(`Instance is not of type ${constructor.name}`)
    }

    return instance
  }

  /**
   * Checks if constructor is registered.
   * @param {Function} constructor - Class constructor.
   * @returns {boolean} True if registered.
   * @throws {TypeError} If constructor is not a function.
   */
  has(constructor) {
    if (typeof constructor !== 'function') {
      throw new TypeError('Constructor must be a function')
    }

    return this.#map.has(constructor)
  }

  /**
   * Removes constructor and its instance.
   * @param {Function} constructor - Class constructor.
   * @returns {boolean} True if deleted.
   * @throws {TypeError} If constructor is not a function.
   */
  delete(constructor) {
    if (typeof constructor !== 'function') {
      throw new TypeError('Constructor must be a function')
    }

    return this.#map.delete(constructor)
  }

  /**
   * Removes all registered references.
   */
  clear() {
    this.#map.clear()
  }
}
