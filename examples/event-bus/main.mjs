/**
 * EventBus application demonstrating SOLID principles and OOP
 *
 * Architecture layers:
 * 📦 event-bus.mjs    - Core abstractions and implementations (SOLID)
 * 📦 events.mjs       - Factory and Registry patterns
 * 📦 handlers.mjs     - Handler abstractions with design patterns
 * 🎯 main.mjs         - Domain-specific implementations
 */

import { EventBus } from './event-bus.mjs'
import { EventTypeRegistry, DomainEventFactory, PayloadBuilder } from './events.mjs'
import {
  AbstractHandler,
  CompositeHandler,
  LoggingDecorator,
  TimingDecorator,
  RouterHandler,
  BatchHandler,
  CollectorHandler,
  ValidationHandler,
  createLogger,
  createFilterHandler
} from './handlers.mjs'

// ========================================
// Application-Level Event Registry
// ========================================

const eventRegistry = new EventTypeRegistry()

// Register domain namespaces
const UserEvents = eventRegistry.registerNamespace('user', [
  'created',
  'updated',
  'deleted',
  'login',
  'logout'
])

const SystemEvents = eventRegistry.registerNamespace('system', [
  'error',
  'warning',
  'info'
])

const DataEvents = eventRegistry.registerNamespace('data', [
  'loaded',
  'saved',
  'validated'
])

const CacheEvents = eventRegistry.registerNamespace('cache', ['cleared', 'invalidated'])

// ========================================
// Application-Level Factories
// ========================================

const userFactory = new DomainEventFactory('user')
const systemFactory = new DomainEventFactory('system')
const dataFactory = new DomainEventFactory('data')

// ========================================
// Domain-Specific Handlers (Implement AbstractHandler)
// ========================================

/**
 * UserManagementHandler - Handles user lifecycle events
 * Follows SRP: Only manages user state
 */
class UserManagementHandler extends AbstractHandler {
  #users

  constructor() {
    super()
    this.#users = new Map()
  }

  shouldHandle(event) {
    return event.type.startsWith('user:')
  }

  handle(event) {
    const { type, payload } = event

    switch (type) {
      case UserEvents.CREATED:
        this.#users.set(payload.id, payload)
        console.log(`[USER-MGR] Created user ${payload.id}`)
        break

      case UserEvents.UPDATED:
        const user = this.#users.get(payload.id)
        if (user) {
          Object.assign(user, payload.changes)
          console.log(`[USER-MGR] Updated user ${payload.id}`)
        }
        break

      case UserEvents.DELETED:
        this.#users.delete(payload.id)
        console.log(`[USER-MGR] Deleted user ${payload.id}`)
        break

      case UserEvents.LOGIN:
        console.log(`[USER-MGR] User ${payload.email} logged in`)
        break
    }
  }

  getUser(id) {
    return this.#users.get(id)
  }

  getAllUsers() {
    return Array.from(this.#users.values())
  }

  count() {
    return this.#users.size
  }
}

/**
 * CacheManagementHandler - Handles caching logic
 * Follows SRP: Only manages cache state
 */
class CacheManagementHandler extends AbstractHandler {
  #cache
  #stats

  constructor() {
    super()
    this.#cache = new Map()
    this.#stats = { hits: 0, misses: 0, sets: 0 }
  }

  shouldHandle(event) {
    return event.type.startsWith('cache:') || event.type === DataEvents.SAVED
  }

  handle(event) {
    switch (event.type) {
      case CacheEvents.CLEARED:
        this.#cache.clear()
        console.log('[CACHE-MGR] Cache cleared')
        break

      case CacheEvents.INVALIDATED:
        const { key } = event.payload
        this.#cache.delete(key)
        console.log(`[CACHE-MGR] Invalidated key: ${key}`)
        break

      case DataEvents.SAVED:
        const { data, meta } = event.payload
        if (meta?.custom?.cacheKey) {
          this.#cache.set(meta.custom.cacheKey, data)
          this.#stats.sets++
          console.log(`[CACHE-MGR] Cached data with key: ${meta.custom.cacheKey}`)
        }
        break
    }
  }

  get(key) {
    const has = this.#cache.has(key)
    if (has) this.#stats.hits++
    else this.#stats.misses++
    return this.#cache.get(key)
  }

  getStats() {
    return { ...this.#stats, size: this.#cache.size }
  }
}

/**
 * NotificationHandler - Sends notifications for critical events
 * Follows SRP: Only handles notifications
 */
class NotificationHandler extends AbstractHandler {
  #notifications

  constructor() {
    super()
    this.#notifications = []
  }

  shouldHandle(event) {
    // Only handle errors and user deletions
    return event.type === SystemEvents.ERROR || event.type === UserEvents.DELETED
  }

  handle(event) {
    const notification = {
      type: event.type,
      message: this.#formatMessage(event),
      timestamp: Date.now()
    }

    this.#notifications.push(notification)
    console.log(`[NOTIFICATION] ${notification.message}`)
  }

  #formatMessage(event) {
    if (event.type === SystemEvents.ERROR) {
      return `Error: ${event.payload.message}`
    }
    if (event.type === UserEvents.DELETED) {
      return `User ${event.payload.id} was deleted`
    }
    return `Event: ${event.type}`
  }

  getNotifications() {
    return [...this.#notifications]
  }
}

/**
 * AuditHandler - Audits important events
 * Follows SRP: Only handles audit logging
 */
class AuditHandler extends AbstractHandler {
  #auditLog

  constructor() {
    super()
    this.#auditLog = []
  }

  handle(event) {
    const auditEntry = {
      eventType: event.type,
      payload: event.payload,
      timestamp: event.timestamp,
      target: event.target?.constructor?.name
    }

    this.#auditLog.push(auditEntry)
  }

  getAuditLog() {
    return [...this.#auditLog]
  }

  getEntriesByType(type) {
    return this.#auditLog.filter((entry) => entry.eventType === type)
  }
}

// ========================================
// Demo Application
// ========================================

console.log('=== EventBus with SOLID Principles & OOP ===\n')

const bus = new EventBus()

// ========================================
// Example 1: Domain Handlers with SRP
// ========================================
console.log('1. Domain Handlers (Single Responsibility):')

const userMgr = new UserManagementHandler()
const cacheMgr = new CacheManagementHandler()

bus.on(UserEvents.CREATED, userMgr)
bus.on(UserEvents.DELETED, userMgr)
bus.on(CacheEvents.CLEARED, cacheMgr)
bus.on(DataEvents.SAVED, cacheMgr)

bus.emit(UserEvents.CREATED, { id: 'u_1', email: 'user1@example.com', name: 'Alice' })
bus.emit(DataEvents.SAVED, {
  data: { value: 'test data' },
  meta: { timestamp: Date.now(), custom: { cacheKey: 'test_key' } }
})

console.log(`Users: ${userMgr.count()}, Cache: ${JSON.stringify(cacheMgr.getStats())}`)
console.log()

// ========================================
// Example 2: Composite Pattern (Multiple Handlers)
// ========================================
console.log('2. Composite Pattern (Group Multiple Handlers):')

const composite = new CompositeHandler()
composite.add(createLogger('INFO'))
composite.add((event) => console.log(`  - Composite handler 2: ${event.type}`))
composite.add((event) => console.log(`  - Composite handler 3: ${event.type}`))

bus.on(SystemEvents.INFO, composite)
bus.emit(SystemEvents.INFO, { message: 'System initialized' })
console.log()

// ========================================
// Example 3: Decorator Pattern (Logging + Timing)
// ========================================
console.log('3. Decorator Pattern (Enhanced Handlers):')

const baseHandler = (event) => {
  console.log(`  - Processing ${event.type}`)
}

const decoratedHandler = new LoggingDecorator(
  new TimingDecorator(baseHandler),
  'DECORATED'
)

bus.on(DataEvents.LOADED, decoratedHandler)
bus.emit(DataEvents.LOADED, { count: 100 })
console.log()

// ========================================
// Example 4: Router Pattern (Type-based Routing)
// ========================================
console.log('4. Router Pattern (Type-based Routing):')

const router = new RouterHandler()
router
  .register(UserEvents.CREATED, (e) =>
    console.log(`  - Route: User created - ${e.payload.email}`)
  )
  .register(UserEvents.DELETED, (e) =>
    console.log(`  - Route: User deleted - ${e.payload.id}`)
  )

bus.on(UserEvents.CREATED, router)
bus.on(UserEvents.DELETED, router)

bus.emit(UserEvents.CREATED, { id: 'u_99', email: 'routed@example.com' })
bus.emit(UserEvents.DELETED, { id: 'u_99' })
console.log()

// ========================================
// Example 5: Factory Pattern (Domain Events)
// ========================================
console.log('5. Factory Pattern (Domain Event Creation):')

// Using factory to create events
const createEvent = userFactory.createDomainEvent('created', {
  id: 'u_factory',
  email: 'factory@example.com'
})

bus.emit(createEvent.type, createEvent.payload, createEvent.options)

// Success/Failure events
const successEvent = userFactory.createSuccess('registration', { userId: 'u_123' })
bus.on('user:registration:success', (e) =>
  console.log(`  - Registration successful: ${e.payload.result.userId}`)
)
bus.emit(successEvent.type, successEvent.payload)
console.log()

// ========================================
// Example 6: Builder Pattern (Complex Payloads)
// ========================================
console.log('6. Builder Pattern (Complex Payload):')

const complexPayload = new PayloadBuilder()
  .setData('userId', 'u_456')
  .setData('action', 'purchase')
  .setData('amount', 99.99)
  .withTimestamp()
  .withCorrelationId('corr_123')
  .setMetadata('source', 'mobile_app')
  .build()

bus.on(DataEvents.VALIDATED, (e) => {
  console.log(`  - Validated data:`, e.payload.data)
  console.log(`  - Metadata:`, e.payload.meta)
})

bus.emit(DataEvents.VALIDATED, complexPayload)
console.log()

// ========================================
// Example 7: Validation with Cancellation
// ========================================
console.log('7. Validation Handler (preventDefault):')

const validator = new ValidationHandler((payload) => {
  return payload?.data && payload.data.userId
})

bus.on(DataEvents.VALIDATED, validator)
bus.on(DataEvents.VALIDATED, (event) => {
  if (!event.defaultPrevented) {
    console.log('  - ✓ Validation passed')
  } else {
    console.log('  - ✗ Validation failed, event canceled')
  }
})

// Valid
bus.emit(
  DataEvents.VALIDATED,
  { data: { userId: '123' }, meta: {} },
  { cancelable: true }
)

// Invalid
bus.emit(DataEvents.VALIDATED, { data: {}, meta: {} }, { cancelable: true })
console.log()

// ========================================
// Example 8: Batch Processing
// ========================================
console.log('8. Batch Handler (Collect & Process):')

const batchHandler = new BatchHandler(
  (events) => {
    console.log(`  - Processing batch of ${events.length} events`)
  },
  { size: 3 }
)

bus.on('batch:event', batchHandler)

bus.emit('batch:event', { id: 1 })
bus.emit('batch:event', { id: 2 })
bus.emit('batch:event', { id: 3 }) // Triggers batch
console.log()

// ========================================
// Example 9: Collector for Analytics
// ========================================
console.log('9. Event Collector (Analytics):')

const collector = new CollectorHandler()

bus.on(UserEvents.CREATED, collector)
bus.on(UserEvents.LOGIN, collector)

bus.emit(UserEvents.CREATED, { id: 'u_analytics', email: 'test@example.com' })
bus.emit(UserEvents.LOGIN, { email: 'test@example.com' })

console.log(`  - Collected ${collector.count()} events`)
console.log(`  - User events:`, collector.getEventsByType(UserEvents.CREATED).length)
console.log()

// ========================================
// Example 10: Notification System
// ========================================
console.log('10. Notification Handler (Critical Events):')

const notifier = new NotificationHandler()

bus.on(SystemEvents.ERROR, notifier)
bus.on(UserEvents.DELETED, notifier)

bus.emit(SystemEvents.ERROR, { message: 'Database connection lost' })
bus.emit(UserEvents.DELETED, { id: 'u_critical' })

console.log(`  - Total notifications: ${notifier.getNotifications().length}`)
console.log()

// ========================================
// Example 11: Audit Trail
// ========================================
console.log('11. Audit Handler (Complete Event Log):')

const auditor = new AuditHandler()

// Audit all user events
bus.on(UserEvents.CREATED, auditor)
bus.on(UserEvents.UPDATED, auditor)
bus.on(UserEvents.DELETED, auditor)

bus.emit(UserEvents.CREATED, { id: 'u_audit', email: 'audit@example.com' })
bus.emit(UserEvents.UPDATED, { id: 'u_audit', changes: { email: 'new@example.com' } })

console.log(`  - Audit entries: ${auditor.getAuditLog().length}`)
console.log(`  - Created events: ${auditor.getEntriesByType(UserEvents.CREATED).length}`)
console.log()

// ========================================
// Example 12: Filter Handler
// ========================================
console.log('12. Filter Handler (Conditional Processing):')

const criticalFilter = createFilterHandler(
  (event) => event.payload?.message?.includes('critical'),
  (event) => console.log(`  - ⚠️  CRITICAL: ${event.payload.message}`)
)

bus.on(SystemEvents.ERROR, criticalFilter)

bus.emit(SystemEvents.ERROR, { message: 'Minor error occurred' })
bus.emit(SystemEvents.ERROR, { message: 'CRITICAL: System failure' })
console.log()

// ========================================
// Summary
// ========================================
console.log('=== Demo Complete ===\n')
console.log('SOLID Principles Applied:')
console.log('  ✓ SRP: Each handler has single responsibility')
console.log('  ✓ OCP: Extensible via inheritance without modification')
console.log('  ✓ LSP: All handlers extend AbstractHandler and are substitutable')
console.log('  ✓ ISP: Segregated interfaces (IEvent, IEventHandler, IListenerRegistry)')
console.log('  ✓ DIP: EventBus depends on abstractions, not concretions')
console.log()
console.log('Design Patterns Used:')
console.log('  ✓ Factory Pattern: EventFactory, DomainEventFactory')
console.log('  ✓ Builder Pattern: PayloadBuilder')
console.log('  ✓ Registry Pattern: EventTypeRegistry')
console.log('  ✓ Template Method: AbstractHandler')
console.log('  ✓ Composite Pattern: CompositeHandler')
console.log('  ✓ Decorator Pattern: LoggingDecorator, TimingDecorator')
console.log('  ✓ Chain of Responsibility: ChainHandler')
console.log('  ✓ Router Pattern: RouterHandler')
console.log('  ✓ Adapter Pattern: HandlerAdapter')
console.log()
console.log('Architecture:')
console.log('  📦 event-bus.mjs   - Core abstractions (IEvent, IEventHandler, EventBus)')
console.log('  📦 events.mjs      - Factories & Registry patterns')
console.log('  📦 handlers.mjs    - Abstract handlers & decorators')
console.log('  🎯 main.mjs        - Domain implementations (UserMgr, CacheMgr, etc.)')
