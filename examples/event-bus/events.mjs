/**
 * Custom event definitions
 */

import { TypedEvent } from './event-bus.mjs'

/** User-related events */
export class UserEvent extends TypedEvent {
  /**
   * @param {string} action - User action type
   * @param {Object} userData - User data object
   */
  constructor(action, userData) {
    super(`user:${action}`, userData)
    this.userId = userData.id
  }
}

/** System-related events */
export class SystemEvent extends TypedEvent {
  /**
   * @param {string} level - Log level
   * @param {string} message - Log message
   */
  constructor(level, message) {
    super(`system:${level}`, { message })
    this.level = level
    this.message = message
  }
}

/** Data-related events */
export class DataEvent extends TypedEvent {
  /**
   * @param {string} operation - Data operation type
   * @param {*} payload - Operation payload
   */
  constructor(operation, payload) {
    super(`data:${operation}`, payload)
    this.operation = operation
    this.payload = payload
  }
}
