/**
 * EventBus implementation following SOLID principles
 *
 * SOLID Principles Applied:
 * - SRP: Each class has a single responsibility
 * - OCP: Open for extension, closed for modification
 * - LSP: Subtypes are substitutable
 * - ISP: Segregated interfaces for different concerns
 * - DIP: Depend on abstractions, not concretions
 */

// ========================================
// Interfaces (Abstract Base Classes)
// ========================================

/**
 * IEvent - Event interface (abstraction)
 * @abstract
 */
export class IEvent {
  /** @type {string} */
  get type() {
    throw new Error('Must implement type getter')
  }

  /** @type {*} */
  get payload() {
    throw new Error('Must implement payload getter')
  }

  /** @type {boolean} */
  get cancelable() {
    throw new Error('Must implement cancelable getter')
  }

  /** @type {boolean} */
  get defaultPrevented() {
    throw new Error('Must implement defaultPrevented getter')
  }

  preventDefault() {
    throw new Error('Must implement preventDefault')
  }
}

/**
 * IEventHandler - Handler interface (abstraction)
 * @abstract
 */
export class IEventHandler {
  /**
   * Handle an event
   * @param {IEvent} event - Event to handle
   */
  handleEvent(event) {
    throw new Error('Must implement handleEvent')
  }
}

/**
 * IListenerRegistry - Listener registry interface
 * @abstract
 */
export class IListenerRegistry {
  /**
   * Add a listener
   * @param {string} type - Event type
   * @param {IEventHandler} handler - Event handler
   * @param {Object} options - Subscription options
   */
  add(type, handler, options) {
    throw new Error('Must implement add')
  }

  /**
   * Remove a listener
   * @param {string} type - Event type
   * @param {IEventHandler} handler - Event handler
   */
  remove(type, handler) {
    throw new Error('Must implement remove')
  }

  /**
   * Get listeners for a type
   * @param {string} type - Event type
   * @returns {IEventHandler[]}
   */
  getListeners(type) {
    throw new Error('Must implement getListeners')
  }
}

// ========================================
// Concrete Implementations
// ========================================

/**
 * BusEvent - Concrete event implementation
 * Follows SRP: Only manages event state
 */
export class BusEvent extends IEvent {
  #type
  #payload
  #cancelable
  #defaultPrevented
  #target
  #timestamp

  /**
   * @param {string} type - Event type
   * @param {Object} [options] - Event options
   * @param {*} [options.payload] - Event payload
   * @param {boolean} [options.cancelable=false] - Whether event can be canceled
   * @param {*} [options.target=null] - Event target
   */
  constructor(type, options = {}) {
    super()
    this.#type = type
    this.#payload = options.payload
    this.#cancelable = options.cancelable ?? false
    this.#defaultPrevented = false
    this.#target = options.target ?? null
    this.#timestamp = Date.now()
  }

  get type() {
    return this.#type
  }

  get payload() {
    return this.#payload
  }

  get cancelable() {
    return this.#cancelable
  }

  get defaultPrevented() {
    return this.#defaultPrevented
  }

  get target() {
    return this.#target
  }

  get timestamp() {
    return this.#timestamp
  }

  preventDefault() {
    if (this.#cancelable) {
      this.#defaultPrevented = true
    }
  }

  /**
   * Clone event with new properties
   * @param {Object} overrides - Properties to override
   * @returns {BusEvent}
   */
  clone(overrides = {}) {
    return new BusEvent(this.#type, {
      payload: overrides.payload ?? this.#payload,
      cancelable: overrides.cancelable ?? this.#cancelable,
      target: overrides.target ?? this.#target
    })
  }
}

/**
 * HandlerAdapter - Adapts functions to IEventHandler interface
 * Follows OCP: Extends functionality without modifying core
 */
export class HandlerAdapter extends IEventHandler {
  #handler

  /**
   * @param {Function|IEventHandler} handler - Handler function or object
   */
  constructor(handler) {
    super()
    this.#handler = handler
  }

  handleEvent(event) {
    if (typeof this.#handler === 'function') {
      this.#handler(event)
    } else if (this.#handler && typeof this.#handler.handleEvent === 'function') {
      this.#handler.handleEvent(event)
    }
  }

  /**
   * Get original handler reference
   * @returns {Function|IEventHandler}
   */
  getOriginal() {
    return this.#handler
  }
}

/**
 * ListenerInfo - Encapsulates listener metadata
 * Follows SRP: Only manages listener configuration
 */
class ListenerInfo {
  #handler
  #once
  #signal
  #abortHandler

  constructor(handler, options = {}) {
    this.#handler = handler
    this.#once = options.once ?? false
    this.#signal = options.signal
    this.#abortHandler = null
  }

  get handler() {
    return this.#handler
  }

  get once() {
    return this.#once
  }

  get signal() {
    return this.#signal
  }

  setupAbortSignal(removeCallback) {
    if (this.#signal) {
      this.#abortHandler = removeCallback
      this.#signal.addEventListener('abort', this.#abortHandler, { once: true })
    }
  }

  cleanup() {
    if (this.#signal && this.#abortHandler) {
      this.#signal.removeEventListener('abort', this.#abortHandler)
    }
  }

  matches(handler) {
    return this.#handler.getOriginal() === handler
  }
}

/**
 * ListenerRegistry - Manages listener registration
 * Follows SRP: Single responsibility of managing listeners
 */
export class ListenerRegistry extends IListenerRegistry {
  #listeners

  constructor() {
    super()
    this.#listeners = new Map()
  }

  add(type, handler, options = {}) {
    if (!this.#listeners.has(type)) {
      this.#listeners.set(type, new Set())
    }

    const adapter = new HandlerAdapter(handler)
    const listenerInfo = new ListenerInfo(adapter, options)

    this.#listeners.get(type).add(listenerInfo)

    // Setup abort signal
    listenerInfo.setupAbortSignal(() => this.remove(type, handler))

    return () => this.remove(type, handler)
  }

  remove(type, handler) {
    if (!this.#listeners.has(type)) return

    const listeners = this.#listeners.get(type)

    for (const listenerInfo of listeners) {
      if (listenerInfo.matches(handler)) {
        listenerInfo.cleanup()
        listeners.delete(listenerInfo)
        break
      }
    }

    if (listeners.size === 0) {
      this.#listeners.delete(type)
    }
  }

  getListeners(type) {
    if (!this.#listeners.has(type)) return []
    return Array.from(this.#listeners.get(type))
  }

  clear(type) {
    if (type) {
      const listeners = this.#listeners.get(type)
      if (listeners) {
        listeners.forEach((info) => info.cleanup())
        this.#listeners.delete(type)
      }
    } else {
      this.#listeners.forEach((listeners) => {
        listeners.forEach((info) => info.cleanup())
      })
      this.#listeners.clear()
    }
  }

  count(type) {
    return this.#listeners.has(type) ? this.#listeners.get(type).size : 0
  }

  types() {
    return Array.from(this.#listeners.keys())
  }
}

/**
 * EventDispatcher - Dispatches events to listeners
 * Follows SRP: Single responsibility of dispatching events
 */
export class EventDispatcher {
  #registry

  /**
   * @param {ListenerRegistry} registry - Listener registry
   */
  constructor(registry) {
    this.#registry = registry
  }

  /**
   * Dispatch event synchronously
   * @param {IEvent} event - Event to dispatch
   * @returns {boolean} false if event was canceled
   */
  dispatch(event) {
    const listeners = this.#registry.getListeners(event.type)

    for (const listenerInfo of listeners) {
      listenerInfo.handler.handleEvent(event)

      if (listenerInfo.once) {
        this.#registry.remove(event.type, listenerInfo.handler.getOriginal())
      }
    }

    return !event.defaultPrevented
  }

  /**
   * Dispatch event asynchronously
   * @param {IEvent} event - Event to dispatch
   * @returns {Promise<boolean>} Promise resolving to false if canceled
   */
  async dispatchAsync(event) {
    const listeners = this.#registry.getListeners(event.type)
    const promises = []

    for (const listenerInfo of listeners) {
      const promise = Promise.resolve(listenerInfo.handler.handleEvent(event))
      promises.push(promise)

      if (listenerInfo.once) {
        this.#registry.remove(event.type, listenerInfo.handler.getOriginal())
      }
    }

    await Promise.all(promises)
    return !event.defaultPrevented
  }
}

/**
 * EventBus - Main event bus orchestrator
 * Follows DIP: Depends on abstractions (IListenerRegistry, EventDispatcher)
 * Follows OCP: Extensible through composition
 */
export class EventBus {
  #registry
  #dispatcher

  /**
   * @param {ListenerRegistry} [registry] - Custom listener registry
   */
  constructor(registry = null) {
    this.#registry = registry ?? new ListenerRegistry()
    this.#dispatcher = new EventDispatcher(this.#registry)
  }

  /**
   * Subscribe to an event
   * @param {string} type - Event type
   * @param {Function|IEventHandler} handler - Event handler
   * @param {Object} [options] - Subscription options
   * @param {boolean} [options.once=false] - Remove after first call
   * @param {AbortSignal} [options.signal] - AbortSignal for cleanup
   * @returns {Function} Unsubscribe function
   */
  on(type, handler, options = {}) {
    if (!handler) return () => {}
    return this.#registry.add(type, handler, options)
  }

  /**
   * Subscribe once to an event
   * @param {string} type - Event type
   * @param {Function|IEventHandler} handler - Event handler
   * @param {Object} [options] - Additional options
   * @returns {Function} Unsubscribe function
   */
  once(type, handler, options = {}) {
    return this.on(type, handler, { ...options, once: true })
  }

  /**
   * Unsubscribe from an event
   * @param {string} type - Event type
   * @param {Function|IEventHandler} handler - Handler to remove
   */
  off(type, handler) {
    this.#registry.remove(type, handler)
  }

  /**
   * Emit an event
   * @param {string} type - Event type
   * @param {*} [payload] - Event payload
   * @param {Object} [options] - Emit options
   * @param {boolean} [options.cancelable=false] - Whether event can be canceled
   * @returns {boolean} false if event was canceled
   */
  emit(type, payload, options = {}) {
    const event = new BusEvent(type, {
      payload,
      cancelable: options.cancelable,
      target: this
    })

    return this.#dispatcher.dispatch(event)
  }

  /**
   * Emit event asynchronously
   * @param {string} type - Event type
   * @param {*} [payload] - Event payload
   * @param {Object} [options] - Emit options
   * @returns {Promise<boolean>} Promise resolving to false if canceled
   */
  async emitAsync(type, payload, options = {}) {
    const event = new BusEvent(type, {
      payload,
      cancelable: options.cancelable,
      target: this
    })

    return this.#dispatcher.dispatchAsync(event)
  }

  /**
   * Clear listeners
   * @param {string} [type] - Event type (omit to clear all)
   */
  clear(type) {
    this.#registry.clear(type)
  }

  /**
   * Get listener count
   * @param {string} type - Event type
   * @returns {number} Number of listeners
   */
  listenerCount(type) {
    return this.#registry.count(type)
  }

  /**
   * Get all event types
   * @returns {string[]} Array of event type names
   */
  eventTypes() {
    return this.#registry.types()
  }
}
