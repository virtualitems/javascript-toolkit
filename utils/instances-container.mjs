/**
 * Dependency injection container for managing class instances.
 */
export class Container {
  #map

  constructor() {
    this.#map = new Map()
  }

  /**
   * Registers an instance with its constructor.
   * @param {Function} constructor - The class constructor.
   * @param {Object} instance - The instance to register.
   * @returns {Container} This container for chaining.
   */
  set(constructor, instance) {
    if (typeof constructor !== 'function')
      throw new TypeError('Constructor must be a function')

    if (this.has(constructor))
      throw new Error(`Constructor ${constructor.name} is already registered`)

    if (instance instanceof constructor === false)
      throw new TypeError('Instance must be an instance of the constructor')

    this.#map.set(constructor, instance)
    return this
  }

  /**
   * Retrieves an instance by its constructor.
   * @param {Function} constructor - The class constructor.
   * @returns {Object|undefined} The registered instance.
   */
  get(constructor) {
    if (typeof constructor !== 'function')
      throw new TypeError('Constructor must be a function')

    if (this.#map.has(constructor) === false)
      throw new Error(`Constructor ${constructor.name} is not registered`)

    return this.#map.get(constructor)
  }

  /**
   * Checks if a constructor is registered.
   * @param {Function} constructor - The class constructor.
   * @returns {boolean} True if registered.
   */
  has(constructor) {
    if (typeof constructor !== 'function')
      throw new TypeError('Constructor must be a function')

    return this.#map.has(constructor)
  }

  /**
   * Removes a constructor and its instance.
   * @param {Function} constructor - The class constructor.
   * @returns {boolean} True if deleted.
   */
  delete(constructor) {
    if (typeof constructor !== 'function')
      throw new TypeError('Constructor must be a function')

    return this.#map.delete(constructor)
  }

  /**
   * Removes all registered instances.
   */
  clear() {
    this.#map.clear()
  }
}
