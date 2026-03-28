class CircularDependencyError extends Error {
  constructor(token) {
    super(`Circular dependency detected for ${token.name ?? '<anonymous>'}`)
    this.name = 'CircularDependencyError'
  }
}

class ContainerEntry {
  /**
   * @param {(r: Resolver) => unknown} factory - Factory function to create instance.
   * @param {unknown} instance - Cached instance or null if not created.
   */
  constructor(factory, instance = null) {
    this.factory = factory
    this.instance = instance
  }
}

class Resolver {
  /**
   * @param {Map<Function, ContainerEntry>} table
   */
  constructor(table) {
    this.table = table

    /** @type {Map<Function, ContainerEntry>} */
    this.state = new Map()
  }

  resolve(token) {
    if (typeof token !== 'function') {
      throw new TypeError('Token must be a function')
    }

    if (this.table.has(token) === false) {
      throw new Error(`Token ${token.name ?? '<anonymous>'} is not registered`)
    }

    if (this.state.has(token)) {
      const entry = this.state.get(token)

      if (entry.instance === null) {
        throw new CircularDependencyError(token)
      }

      return entry.instance
    }

    const entry = this.table.get(token)

    if (entry.instance !== null) {
      this.state.set(token, entry)
      return entry.instance
    }

    const stateEntry = new ContainerEntry(entry.factory, null)

    this.state.set(token, stateEntry)

    const instance = entry.factory(this)

    if (instance instanceof token === false) {
      throw new TypeError(`Instance is not of type ${token.name ?? '<anonymous>'}`)
    }

    stateEntry.instance = instance

    return instance
  }
}

/**
 * Dependency injection container with lazy singleton pattern.
 *
 * @example
 * container.register(Database, { factory: (c) => new Database() });
 * const db = container.resolve(Database);
 */
export class Container {
  /**
   * @type {Map<Function, ContainerEntry>}
   * @private
   */
  #entries

  constructor() {
    this.#entries = new Map()
  }

  /**
   * Registers a constructor with its factory function.
   * @param {Function} token - Class constructor.
   * @param {{ factory: (resolver: Resolver) => unknown }} entry - Resolution entry.
   * @returns {Container} This container for chaining.
   * @throws {TypeError} If constructor or factory is not a function.
   * @throws {Error} If constructor already registered.
   * @example
   * container.register(Database, {
   *   factory: (resolver) => new Database()
   * });
   * container.register(UserService, {
   *   factory: (resolver) => new UserService(resolver.resolve(Database))
   * });
   */
  register(token, entry) {
    if (typeof token !== 'function') {
      throw new TypeError('Token must be a function')
    }

    if (this.has(token)) {
      throw new Error(`Token ${token.name ?? '<anonymous>'} is already registered`)
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

    this.#entries.set(token, new ContainerEntry(entry.factory))
    return this
  }

  resolve(token) {
    const resolver = new Resolver(this.#entries)
    const instance = resolver.resolve(token)

    for (const [key, value] of resolver.state) {
      this.#entries.set(key, value)
    }

    return instance
  }

  /**
   * Checks if constructor is registered.
   * @param {Function} token - Class constructor.
   * @returns {boolean} True if registered.
   * @throws {TypeError} If constructor is not a function.
   */
  has(token) {
    if (typeof token !== 'function') {
      throw new TypeError('Token must be a function')
    }

    return this.#entries.has(token)
  }

  /**
   * Removes constructor and its instance.
   * WARNING: This does not invalidate dependent instances that may have
   * already been resolved and cached. Use with caution.
   * @param {Function} token - Class constructor.
   * @returns {boolean} True if deleted.
   * @throws {TypeError} If constructor is not a function.
   */
  unregister(token) {
    if (typeof token !== 'function') {
      throw new TypeError('Token must be a function')
    }

    return this.#entries.delete(token)
  }

  /**
   * Removes all registered references.
   */
  clear() {
    this.#entries.clear()
  }
}
