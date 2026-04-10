/**
 * Event bus example implementation
 */

import { EventBus } from './event-bus.mjs'
import { UserEvent, SystemEvent, DataEvent } from './events.mjs'
import {
  LogHandler,
  UserActionHandler,
  ValidationHandler,
  AnalyticsHandler
} from './handlers.mjs'

// Create event bus instance
const bus = new EventBus()

console.log('=== Event Bus Demo ===\n')

// Example 1: Basic event subscription
console.log('1. Basic Subscription:')
bus.on('user:login', (event) => {
  console.log(`User ${event.userId} logged in`)
})

const loginEvent = new UserEvent('login', { id: 123, name: 'Alice' })
bus.emit('user:login', loginEvent)

console.log('\n')

// Example 2: Priority handling
console.log('2. Priority Handling (high to low):')
bus.on('request', () => console.log('  - Normal priority'), 0)
bus.on('request', () => console.log('  - Low priority'), -10)
bus.on('request', () => console.log('  - High priority'), 10)
bus.emit('request')

console.log('\n')

// Example 3: Once subscription
console.log('3. Once Subscription:')
bus.once('init', () => console.log('  - Initializing (only once)'))
bus.emit('init')
bus.emit('init') // This won't trigger
console.log('  - Second emit ignored')

console.log('\n')

// Example 4: Unsubscription
console.log('4. Unsubscription:')
const unsubscribe = bus.on('temp', () => console.log('  - Temporary listener'))
bus.emit('temp')
unsubscribe()
console.log('  - Listener removed')
bus.emit('temp') // Won't print

console.log('\n')

// Example 5: Multiple handlers
console.log('5. Multiple Handlers:')
bus.on('system:error', LogHandler.error)
bus.on('system:error', AnalyticsHandler.track)

const errorEvent = new SystemEvent('error', 'Connection timeout')
bus.emit('system:error', errorEvent)

console.log('\n')

// Example 6: Async emission
console.log('6. Async Event Handling:')
bus.on('user:create', UserActionHandler.onCreate)
bus.on('user:create', AnalyticsHandler.track)

const createEvent = new UserEvent('create', { id: 456, name: 'Bob' })

await bus.emitAsync('user:create', createEvent)
console.log('All async handlers completed')

console.log('\n')

// Example 7: Data validation pipeline
console.log('7. Data Validation Pipeline:')
bus.on('data:save', ValidationHandler.validate, 10) // High priority
bus.on('data:save', ValidationHandler.sanitize, 5) // Medium priority
bus.on('data:save', LogHandler.info, 0) // Normal priority

const dataEvent = new DataEvent('save', { name: 'test', value: 42 })
bus.emit('data:save', dataEvent)

console.log('\n')

// Example 8: Event bus statistics
console.log('8. Event Bus Statistics:')
console.log(`  - Listeners on 'data:save': ${bus.listenerCount('data:save')}`)
console.log(`  - Listeners on 'user:create': ${bus.listenerCount('user:create')}`)
console.log(`  - Listeners on 'nonexistent': ${bus.listenerCount('nonexistent')}`)

console.log('\n')

// Example 9: Clearing listeners
console.log('9. Clearing Listeners:')
console.log(`  - Before clear: ${bus.listenerCount('data:save')} listeners`)
bus.clear('data:save')
console.log(`  - After clear: ${bus.listenerCount('data:save')} listeners`)

console.log('\n=== Demo Complete ===')
