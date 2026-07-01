/**
 * Event factories and registries following SOLID principles
 *
 * Design Patterns Applied:
 * - Factory Pattern: For event creation
 * - Registry Pattern: For event type management
 * - Builder Pattern: For complex payload construction
 * - Strategy Pattern: For different event creation strategies
 */

// ========================================
// Abstract Base Classes
// ========================================

/**
 * IEventFactory - Event factory interface
 * @abstract
 */
export class IEventFactory {
  /**
   * Create an event
   * @param {string} type - Event type
   * @param {*} payload - Event payload
   * @param {Object} options - Event options
   * @returns {Object} Event object
   */
  create(type, payload, options) {
    throw new Error('Must implement create')
  }
}

/**
 * IPayloadBuilder - Payload builder interface
 * @abstract
 */
export class IPayloadBuilder {
  /**
   * Build payload
   * @returns {*} Built payload
   */
  build() {
    throw new Error('Must implement build')
  }

  /**
   * Reset builder state
   * @returns {IPayloadBuilder} this for chaining
   */
  reset() {
    throw new Error('Must implement reset')
  }
}

// ========================================
// Event Type Registry
// ========================================

/**
 * EventTypeRegistry - Manages event type constants
 * Follows SRP: Single responsibility of managing event types
 */
export class EventTypeRegistry {
  #types
  #namespaces

  constructor() {
    this.#types = new Map()
    this.#namespaces = new Map()
  }

  /**
   * Register an event type
   * @param {string} name - Type name
   * @param {string} value - Type value
   * @returns {EventTypeRegistry} this for chaining
   */
  register(name, value) {
    this.#types.set(name, value)
    return this
  }

  /**
   * Register multiple event types
   * @param {Object|string[]} types - Types object or array
   * @returns {EventTypeRegistry} this for chaining
   */
  registerMany(types) {
    if (Array.isArray(types)) {
      types.forEach((type) => {
        const name = type.toUpperCase().replace(/[:-]/g, '_')
        this.register(name, type)
      })
    } else {
      Object.entries(types).forEach(([name, value]) => {
        this.register(name, value)
      })
    }
    return this
  }

  /**
   * Register a namespace with event types
   * @param {string} namespace - Namespace name
   * @param {string[]} events - Event names
   * @returns {Object} Namespace object
   */
  registerNamespace(namespace, events) {
    const nsObject = {}

    events.forEach((event) => {
      const key = event.toUpperCase().replace(/[:-]/g, '_')
      const value = `${namespace}:${event}`
      nsObject[key] = value
      this.register(`${namespace.toUpperCase()}_${key}`, value)
    })

    this.#namespaces.set(namespace, nsObject)
    return nsObject
  }

  /**
   * Get event type
   * @param {string} name - Type name
   * @returns {string|undefined} Type value
   */
  get(name) {
    return this.#types.get(name)
  }

  /**
   * Get namespace
   * @param {string} namespace - Namespace name
   * @returns {Object|undefined} Namespace object
   */
  getNamespace(namespace) {
    return this.#namespaces.get(namespace)
  }

  /**
   * Check if type exists
   * @param {string} name - Type name
   * @returns {boolean}
   */
  has(name) {
    return this.#types.has(name)
  }

  /**
   * Get all types
   * @returns {Object} All registered types
   */
  all() {
    return Object.fromEntries(this.#types)
  }

  /**
   * Get all namespaces
   * @returns {Object} All registered namespaces
   */
  allNamespaces() {
    return Object.fromEntries(this.#namespaces)
  }
}

// ========================================
// Payload Builders
// ========================================

/**
 * PayloadBuilder - Generic payload builder
 * Follows Builder Pattern for complex object construction
 */
export class PayloadBuilder extends IPayloadBuilder {
  #data
  #metadata

  constructor() {
    super()
    this.#data = {}
    this.#metadata = {}
  }

  /**
   * Set payload data
   * @param {string} key - Data key
   * @param {*} value - Data value
   * @returns {PayloadBuilder} this for chaining
   */
  setData(key, value) {
    this.#data[key] = value
    return this
  }

  /**
   * Set multiple data fields
   * @param {Object} data - Data object
   * @returns {PayloadBuilder} this for chaining
   */
  setDataBulk(data) {
    Object.assign(this.#data, data)
    return this
  }

  /**
   * Set metadata
   * @param {string} key - Metadata key
   * @param {*} value - Metadata value
   * @returns {PayloadBuilder} this for chaining
   */
  setMetadata(key, value) {
    this.#metadata[key] = value
    return this
  }

  /**
   * Set timestamp metadata
   * @returns {PayloadBuilder} this for chaining
   */
  withTimestamp() {
    this.#metadata.timestamp = Date.now()
    return this
  }

  /**
   * Set correlation ID
   * @param {string} id - Correlation ID
   * @returns {PayloadBuilder} this for chaining
   */
  withCorrelationId(id) {
    this.#metadata.correlationId = id
    return this
  }

  /**
   * Build the payload
   * @returns {Object} Built payload
   */
  build() {
    return {
      data: { ...this.#data },
      meta: { ...this.#metadata }
    }
  }

  /**
   * Reset builder state
   * @returns {PayloadBuilder} this for chaining
   */
  reset() {
    this.#data = {}
    this.#metadata = {}
    return this
  }
}

// ========================================
// Event Factories
// ========================================

/**
 * EventFactory - Creates events with metadata
 * Follows Factory Pattern and OCP
 */
export class EventFactory extends IEventFactory {
  #defaultOptions

  /**
   * @param {Object} [defaultOptions] - Default event options
   */
  constructor(defaultOptions = {}) {
    super()
    this.#defaultOptions = defaultOptions
  }

  /**
   * Create an event
   * @param {string} type - Event type
   * @param {*} payload - Event payload
   * @param {Object} [options] - Event options
   * @returns {Object} Event configuration object
   */
  create(type, payload, options = {}) {
    return {
      type,
      payload,
      options: { ...this.#defaultOptions, ...options }
    }
  }

  /**
   * Create a cancelable event
   * @param {string} type - Event type
   * @param {*} payload - Event payload
   * @param {Object} [options] - Additional options
   * @returns {Object} Event configuration object
   */
  createCancelable(type, payload, options = {}) {
    return this.create(type, payload, { ...options, cancelable: true })
  }

  /**
   * Create an event with builder
   * @param {string} type - Event type
   * @param {Function} builderFn - Builder function
   * @param {Object} [options] - Event options
   * @returns {Object} Event configuration object
   */
  createWithBuilder(type, builderFn, options = {}) {
    const builder = new PayloadBuilder()
    builderFn(builder)
    return this.create(type, builder.build(), options)
  }
}

// ========================================
// Specialized Factories
// ========================================

/**
 * DomainEventFactory - Creates domain-specific events
 * Follows SRP and OCP
 */
export class DomainEventFactory extends EventFactory {
  #domain

  /**
   * @param {string} domain - Domain name
   * @param {Object} [defaultOptions] - Default options
   */
  constructor(domain, defaultOptions = {}) {
    super(defaultOptions)
    this.#domain = domain
  }

  /**
   * Create domain event
   * @param {string} action - Action name
   * @param {*} payload - Event payload
   * @param {Object} [options] - Event options
   * @returns {Object} Event configuration object
   */
  createDomainEvent(action, payload, options = {}) {
    const type = `${this.#domain}:${action}`
    return this.create(type, payload, options)
  }

  /**
   * Create success event
   * @param {string} action - Action name
   * @param {*} result - Result data
   * @returns {Object} Event configuration object
   */
  createSuccess(action, result) {
    return this.createDomainEvent(`${action}:success`, { result, success: true })
  }

  /**
   * Create failure event
   * @param {string} action - Action name
   * @param {Error} error - Error object
   * @returns {Object} Event configuration object
   */
  createFailure(action, error) {
    return this.createDomainEvent(`${action}:failure`, {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      success: false
    })
  }
}

// ========================================
// Utility Functions
// ========================================

/**
 * Create a simple event type registry from array
 * @param {string[]} eventNames - Event names
 * @returns {EventTypeRegistry} Registry instance
 */
export function createEventTypes(eventNames) {
  const registry = new EventTypeRegistry()
  registry.registerMany(eventNames)
  return registry
}

/**
 * Create namespaced event types
 * @param {string} namespace - Namespace name
 * @param {string[]} events - Event names
 * @returns {Object} Namespace object
 */
export function createNamespace(namespace, events) {
  const registry = new EventTypeRegistry()
  return registry.registerNamespace(namespace, events)
}

/**
 * Create a simple payload with metadata
 * @param {*} data - Payload data
 * @param {Object} [meta] - Additional metadata
 * @returns {Object} Payload object
 */
export function createPayload(data, meta = {}) {
  return new PayloadBuilder()
    .setDataBulk(typeof data === 'object' && data !== null ? data : { value: data })
    .withTimestamp()
    .setMetadata('custom', meta)
    .build()
}
