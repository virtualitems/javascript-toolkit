/**
 * Core event bus implementation
 */

/** Event bus for pub/sub pattern */
export class EventBus {
  constructor() {
    this.listeners = new Map()
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {Function} callback - Handler function
   * @param {number} priority - Priority level (default: 0)
   * @returns {Function} Unsubscribe function
   */
  on(event, callback, priority = 0) {
    if (this.listeners.has(event) === false) {
      this.listeners.set(event, [])
    }

    const listener = { callback, priority }
    this.listeners.get(event).push(listener)
    this.listeners.get(event).sort((a, b) => b.priority - a.priority)

    return () => this.off(event, callback)
  }

  /**
   * Subscribe once to an event
   * @param {string} event - Event name
   * @param {Function} callback - Handler function
   * @param {number} priority - Priority level (default: 0)
   * @returns {Function} Unsubscribe function
   */
  once(event, callback, priority = 0) {
    const wrapper = (...args) => {
      this.off(event, wrapper)
      return callback(...args)
    }
    return this.on(event, wrapper, priority)
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name
   * @param {Function} callback - Handler function to remove
   */
  off(event, callback) {
    if (this.listeners.has(event) === false) return

    const callbacks = this.listeners.get(event)
    const index = callbacks.findIndex((l) => l.callback === callback)

    if (index !== -1) {
      callbacks.splice(index, 1)
    }

    if (callbacks.length === 0) {
      this.listeners.delete(event)
    }
  }

  /**
   * Emit an event synchronously
   * @param {string} event - Event name
   * @param {...*} args - Arguments to pass to handlers
   */
  emit(event, ...args) {
    if (this.listeners.has(event) === false) return

    const callbacks = this.listeners.get(event)
    for (const { callback } of callbacks) {
      callback(...args)
    }
  }

  /**
   * Emit an event asynchronously
   * @param {string} event - Event name
   * @param {...*} args - Arguments to pass to handlers
   * @returns {Promise<Array>} Results from all handlers
   */
  async emitAsync(event, ...args) {
    if (this.listeners.has(event) === false) return []

    const callbacks = this.listeners.get(event)
    const promises = callbacks.map(({ callback }) => Promise.resolve(callback(...args)))

    return await Promise.all(promises)
  }

  /**
   * Clear all listeners for an event
   * @param {string} [event] - Event name (omit to clear all)
   */
  clear(event) {
    if (event) {
      this.listeners.delete(event)
    } else {
      this.listeners.clear()
    }
  }

  /**
   * Get listener count for an event
   * @param {string} event - Event name
   * @returns {number} Number of listeners
   */
  listenerCount(event) {
    return this.listeners.has(event) ? this.listeners.get(event).length : 0
  }
}

/** Typed event for strong typing */
export class TypedEvent {
  /**
   * @param {string} name - Event name
   * @param {Object} data - Event data (default: {})
   */
  constructor(name, data = {}) {
    this.name = name
    this.data = data
    this.timestamp = Date.now()
  }
}
