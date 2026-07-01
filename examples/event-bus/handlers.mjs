/**
 * Event handlers following SOLID principles and OOP patterns
 *
 * Design Patterns Applied:
 * - Template Method: AbstractHandler with template method
 * - Composite Pattern: CompositeHandler for grouping handlers
 * - Decorator Pattern: Handler decorators for enhanced functionality
 * - Chain of Responsibility: ChainHandler for conditional processing
 * - Strategy Pattern: Different processing strategies
 */

import { IEventHandler } from './event-bus.mjs'

// ========================================
// Abstract Base Classes
// ========================================

/**
 * AbstractHandler - Base handler with template method
 * Follows Template Method Pattern and OCP
 * @abstract
 */
export class AbstractHandler extends IEventHandler {
  /**
   * Template method defining the handler algorithm
   * @param {Object} event - Event object
   * @final
   */
  handleEvent(event) {
    if (!this.shouldHandle(event)) return

    try {
      this.beforeHandle(event)
      this.handle(event)
      this.afterHandle(event)
    } catch (error) {
      this.onError(event, error)
    }
  }

  /**
   * Check if handler should process this event
   * @param {Object} event - Event object
   * @returns {boolean}
   * @protected
   */
  shouldHandle(event) {
    return true
  }

  /**
   * Hook: Before handling (can be overridden)
   * @param {Object} event - Event object
   * @protected
   */
  beforeHandle(event) {}

  /**
   * Main handler logic (must be implemented)
   * @param {Object} event - Event object
   * @abstract
   * @protected
   */
  handle(event) {
    throw new Error('Must implement handle method')
  }

  /**
   * Hook: After handling (can be overridden)
   * @param {Object} event - Event object
   * @protected
   */
  afterHandle(event) {}

  /**
   * Hook: Error handling (can be overridden)
   * @param {Object} event - Event object
   * @param {Error} error - Error that occurred
   * @protected
   */
  onError(event, error) {
    console.error(`Handler error for ${event.type}:`, error)
  }
}

// ========================================
// Composite Pattern
// ========================================

/**
 * CompositeHandler - Composite of multiple handlers
 * Follows Composite Pattern for grouping handlers
 */
export class CompositeHandler extends AbstractHandler {
  #handlers

  constructor() {
    super()
    this.#handlers = []
  }

  /**
   * Add a handler to the composite
   * @param {IEventHandler|Function} handler - Handler to add
   * @returns {CompositeHandler} this for chaining
   */
  add(handler) {
    this.#handlers.push(handler)
    return this
  }

  /**
   * Remove a handler from the composite
   * @param {IEventHandler|Function} handler - Handler to remove
   * @returns {CompositeHandler} this for chaining
   */
  remove(handler) {
    const index = this.#handlers.indexOf(handler)
    if (index !== -1) {
      this.#handlers.splice(index, 1)
    }
    return this
  }

  /**
   * Handle event by delegating to all handlers
   * @param {Object} event - Event object
   * @protected
   */
  handle(event) {
    this.#handlers.forEach((handler) => {
      if (typeof handler === 'function') {
        handler(event)
      } else if (handler.handleEvent) {
        handler.handleEvent(event)
      }
    })
  }

  /**
   * Get number of handlers
   * @returns {number}
   */
  size() {
    return this.#handlers.length
  }
}

// ========================================
// Decorator Pattern
// ========================================

/**
 * HandlerDecorator - Base decorator for handlers
 * Follows Decorator Pattern
 * @abstract
 */
export class HandlerDecorator extends AbstractHandler {
  #wrappedHandler

  /**
   * @param {IEventHandler|Function} handler - Handler to wrap
   */
  constructor(handler) {
    super()
    this.#wrappedHandler = handler
  }

  /**
   * Handle by delegating to wrapped handler
   * @param {Object} event - Event object
   * @protected
   */
  handle(event) {
    if (typeof this.#wrappedHandler === 'function') {
      this.#wrappedHandler(event)
    } else if (this.#wrappedHandler.handleEvent) {
      this.#wrappedHandler.handleEvent(event)
    }
  }

  /**
   * Get wrapped handler
   * @returns {IEventHandler|Function}
   * @protected
   */
  getWrapped() {
    return this.#wrappedHandler
  }
}

/**
 * LoggingDecorator - Adds logging to any handler
 */
export class LoggingDecorator extends HandlerDecorator {
  #prefix

  /**
   * @param {IEventHandler|Function} handler - Handler to wrap
   * @param {string} [prefix='HANDLER'] - Log prefix
   */
  constructor(handler, prefix = 'HANDLER') {
    super(handler)
    this.#prefix = prefix
  }

  beforeHandle(event) {
    console.log(`[${this.#prefix}] Before handling: ${event.type}`)
  }

  afterHandle(event) {
    console.log(`[${this.#prefix}] After handling: ${event.type}`)
  }
}

/**
 * TimingDecorator - Measures handler execution time
 */
export class TimingDecorator extends HandlerDecorator {
  #startTime

  beforeHandle(event) {
    this.#startTime = performance.now()
  }

  afterHandle(event) {
    const duration = performance.now() - this.#startTime
    console.log(`[TIMING] ${event.type} handled in ${duration.toFixed(2)}ms`)
  }
}

/**
 * CachingDecorator - Caches handler results
 */
export class CachingDecorator extends HandlerDecorator {
  #cache
  #ttl

  /**
   * @param {IEventHandler|Function} handler - Handler to wrap
   * @param {number} [ttl=60000] - Cache TTL in milliseconds
   */
  constructor(handler, ttl = 60000) {
    super(handler)
    this.#cache = new Map()
    this.#ttl = ttl
  }

  handle(event) {
    const key = this.#getCacheKey(event)
    const cached = this.#cache.get(key)

    if (cached && Date.now() - cached.timestamp < this.#ttl) {
      console.log(`[CACHE] Hit for ${event.type}`)
      return cached.result
    }

    const result = super.handle(event)
    this.#cache.set(key, { result, timestamp: Date.now() })
    return result
  }

  #getCacheKey(event) {
    return `${event.type}:${JSON.stringify(event.payload)}`
  }

  clearCache() {
    this.#cache.clear()
  }
}

// ========================================
// Chain of Responsibility
// ========================================

/**
 * ChainHandler - Chain of responsibility handler
 * Follows Chain of Responsibility Pattern
 */
export class ChainHandler extends AbstractHandler {
  #nextHandler

  /**
   * Set next handler in chain
   * @param {AbstractHandler} handler - Next handler
   * @returns {AbstractHandler} The next handler for chaining
   */
  setNext(handler) {
    this.#nextHandler = handler
    return handler
  }

  /**
   * Pass event to next handler if exists
   * @param {Object} event - Event object
   * @protected
   */
  passToNext(event) {
    if (this.#nextHandler) {
      this.#nextHandler.handleEvent(event)
    }
  }
}

// ========================================
// Concrete Handler Implementations
// ========================================

/**
 * FilterHandler - Filters events based on predicate
 */
export class FilterHandler extends AbstractHandler {
  #predicate
  #targetHandler

  /**
   * @param {Function} predicate - Filter predicate (event) => boolean
   * @param {IEventHandler|Function} targetHandler - Handler to call if predicate passes
   */
  constructor(predicate, targetHandler) {
    super()
    this.#predicate = predicate
    this.#targetHandler = targetHandler
  }

  shouldHandle(event) {
    return this.#predicate(event)
  }

  handle(event) {
    if (typeof this.#targetHandler === 'function') {
      this.#targetHandler(event)
    } else if (this.#targetHandler.handleEvent) {
      this.#targetHandler.handleEvent(event)
    }
  }
}

/**
 * TypedHandler - Handles specific event types
 */
export class TypedHandler extends AbstractHandler {
  #eventType
  #handler

  /**
   * @param {string} eventType - Event type to handle
   * @param {Function} handler - Handler function
   */
  constructor(eventType, handler) {
    super()
    this.#eventType = eventType
    this.#handler = handler
  }

  shouldHandle(event) {
    return event.type === this.#eventType
  }

  handle(event) {
    this.#handler(event)
  }
}

/**
 * RouterHandler - Routes events to different handlers by type
 */
export class RouterHandler extends AbstractHandler {
  #routes

  constructor() {
    super()
    this.#routes = new Map()
  }

  /**
   * Register a route
   * @param {string} type - Event type
   * @param {IEventHandler|Function} handler - Handler
   * @returns {RouterHandler} this for chaining
   */
  register(type, handler) {
    this.#routes.set(type, handler)
    return this
  }

  /**
   * Unregister a route
   * @param {string} type - Event type
   * @returns {RouterHandler} this for chaining
   */
  unregister(type) {
    this.#routes.delete(type)
    return this
  }

  shouldHandle(event) {
    return this.#routes.has(event.type)
  }

  handle(event) {
    const handler = this.#routes.get(event.type)

    if (typeof handler === 'function') {
      handler(event)
    } else if (handler && handler.handleEvent) {
      handler.handleEvent(event)
    }
  }
}

/**
 * BatchHandler - Collects events and processes in batches
 */
export class BatchHandler extends AbstractHandler {
  #batchSize
  #timeout
  #processFn
  #batch
  #timeoutId

  /**
   * @param {Function} processFn - Batch processing function
   * @param {Object} [options] - Options
   * @param {number} [options.size=10] - Batch size
   * @param {number} [options.timeout=1000] - Timeout in ms
   */
  constructor(processFn, options = {}) {
    super()
    this.#processFn = processFn
    this.#batchSize = options.size ?? 10
    this.#timeout = options.timeout ?? 1000
    this.#batch = []
    this.#timeoutId = null
  }

  handle(event) {
    this.#batch.push(event)

    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId)
    }

    if (this.#batch.length >= this.#batchSize) {
      this.flush()
    } else {
      this.#timeoutId = setTimeout(() => this.flush(), this.#timeout)
    }
  }

  /**
   * Flush current batch
   */
  flush() {
    if (this.#batch.length > 0) {
      this.#processFn([...this.#batch])
      this.#batch = []
    }

    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId)
      this.#timeoutId = null
    }
  }
}

/**
 * CollectorHandler - Collects events for inspection
 */
export class CollectorHandler extends AbstractHandler {
  #events
  #maxSize

  /**
   * @param {number} [maxSize=1000] - Maximum number of events to store
   */
  constructor(maxSize = 1000) {
    super()
    this.#events = []
    this.#maxSize = maxSize
  }

  handle(event) {
    this.#events.push({
      type: event.type,
      payload: event.payload,
      timestamp: event.timestamp ?? Date.now()
    })

    // Keep size under control
    if (this.#events.length > this.#maxSize) {
      this.#events.shift()
    }
  }

  /**
   * Get collected events
   * @returns {Array} Collected events
   */
  getEvents() {
    return [...this.#events]
  }

  /**
   * Get events by type
   * @param {string} type - Event type
   * @returns {Array} Filtered events
   */
  getEventsByType(type) {
    return this.#events.filter((e) => e.type === type)
  }

  /**
   * Clear collected events
   */
  clear() {
    this.#events = []
  }

  /**
   * Get event count
   * @returns {number}
   */
  count() {
    return this.#events.length
  }
}

/**
 * ValidationHandler - Validates events
 */
export class ValidationHandler extends AbstractHandler {
  #validator
  #cancelOnFail

  /**
   * @param {Function} validator - Validation function (payload) => boolean
   * @param {Object} [options] - Options
   * @param {boolean} [options.cancelOnFail=true] - Cancel event on validation failure
   */
  constructor(validator, options = {}) {
    super()
    this.#validator = validator
    this.#cancelOnFail = options.cancelOnFail ?? true
  }

  handle(event) {
    const isValid = this.#validator(event.payload)

    if (!isValid && this.#cancelOnFail && event.cancelable) {
      event.preventDefault()
    }
  }
}

// ========================================
// Utility Functions
// ========================================

/**
 * Create a logging handler
 * @param {string} [prefix='LOG'] - Log prefix
 * @returns {AbstractHandler}
 */
export function createLogger(prefix = 'LOG') {
  return new (class extends AbstractHandler {
    handle(event) {
      console.log(`[${prefix}] ${event.type}:`, event.payload)
    }
  })()
}

/**
 * Create a filter handler
 * @param {Function} predicate - Filter predicate
 * @param {IEventHandler|Function} handler - Target handler
 * @returns {FilterHandler}
 */
export function createFilterHandler(predicate, handler) {
  return new FilterHandler(predicate, handler)
}

/**
 * Create a throttled handler
 * @param {IEventHandler|Function} handler - Handler to throttle
 * @param {number} limit - Throttle limit in ms
 * @returns {AbstractHandler}
 */
export function createThrottledHandler(handler, limit) {
  let lastCall = 0

  return new (class extends AbstractHandler {
    shouldHandle() {
      const now = Date.now()
      if (now - lastCall >= limit) {
        lastCall = now
        return true
      }
      return false
    }

    handle(event) {
      if (typeof handler === 'function') {
        handler(event)
      } else if (handler.handleEvent) {
        handler.handleEvent(event)
      }
    }
  })()
}

/**
 * Create a debounced handler
 * @param {IEventHandler|Function} handler - Handler to debounce
 * @param {number} delay - Debounce delay in ms
 * @returns {AbstractHandler}
 */
export function createDebouncedHandler(handler, delay) {
  let timeoutId = null

  return new (class extends AbstractHandler {
    handle(event) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        if (typeof handler === 'function') {
          handler(event)
        } else if (handler.handleEvent) {
          handler.handleEvent(event)
        }
      }, delay)
    }
  })()
}

// ========================================
// Aliases for backward compatibility
// ========================================

export const LoggerHandler = createLogger
export const EventCollector = CollectorHandler
