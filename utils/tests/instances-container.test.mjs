/**
 * @fileoverview Tests for Container dependency injection system
 */

import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { Container } from '../instances-container.mjs'

// Test classes
class Database {
  constructor() {
    this.connected = true
  }
}

class Logger {
  constructor() {
    this.logs = []
  }

  log(message) {
    this.logs.push(message)
  }
}

class UserService {
  constructor(db, logger) {
    this.db = db
    this.logger = logger
  }
}

class AuthService {
  constructor(userService) {
    this.userService = userService
  }
}

describe('Container', () => {
  describe('constructor', () => {
    test('creates a new container instance', () => {
      const container = new Container()
      assert.ok(container instanceof Container)
    })
  })

  describe('register', () => {
    test('registers a simple class', () => {
      const container = new Container()
      container.register(Database, {
        factory: () => new Database(),
      })

      assert.ok(container.has(Database))
    })

    test('returns container for chaining', () => {
      const container = new Container()
      const result = container.register(Database, {
        factory: () => new Database(),
      })

      assert.strictEqual(result, container)
    })

    test('allows chaining multiple registrations', () => {
      const container = new Container()
      container
        .register(Database, { factory: () => new Database() })
        .register(Logger, { factory: () => new Logger() })

      assert.ok(container.has(Database))
      assert.ok(container.has(Logger))
    })

    test('throws TypeError if constructor is not a function', () => {
      const container = new Container()

      assert.throws(
        () => container.register('not-a-function', { factory: () => {} }),
        {
          name: 'TypeError',
          message: 'Token must be a function',
        }
      )
    })

    test('throws TypeError if constructor is null', () => {
      const container = new Container()

      assert.throws(() => container.register(null, { factory: () => {} }), {
        name: 'TypeError',
        message: 'Token must be a function',
      })
    })

    test('throws Error if constructor already registered', () => {
      const container = new Container()
      container.register(Database, { factory: () => new Database() })

      assert.throws(
        () => container.register(Database, { factory: () => new Database() }),
        {
          name: 'Error',
          message: 'Token Database is already registered',
        }
      )
    })

    test('throws TypeError if entry is undefined', () => {
      const container = new Container()

      assert.throws(() => container.register(Database, undefined), {
        name: 'TypeError',
        message: 'entry must be a plain object',
      })
    })

    test('throws TypeError if entry is null', () => {
      const container = new Container()

      assert.throws(() => container.register(Database, null), {
        name: 'TypeError',
        message: 'entry must be a plain object',
      })
    })

    test('throws TypeError if entry is not a plain object', () => {
      const container = new Container()

      assert.throws(() => container.register(Database, []), {
        name: 'TypeError',
        message: 'entry must be a plain object',
      })
    })

    test('throws TypeError if factory is not a function', () => {
      const container = new Container()

      assert.throws(
        () => container.register(Database, { factory: 'not-a-function' }),
        {
          name: 'TypeError',
          message: 'Factory must be a function',
        }
      )
    })

    test('throws TypeError if factory is missing', () => {
      const container = new Container()

      assert.throws(() => container.register(Database, {}), {
        name: 'TypeError',
        message: 'Factory must be a function',
      })
    })
  })

  describe('resolve', () => {
    test('resolves a simple instance', () => {
      const container = new Container()
      container.register(Database, { factory: () => new Database() })

      const db = container.resolve(Database)

      assert.ok(db instanceof Database)
      assert.strictEqual(db.connected, true)
    })

    test('returns the same instance on multiple resolves (singleton)', () => {
      const container = new Container()
      container.register(Database, { factory: () => new Database() })

      const db1 = container.resolve(Database)
      const db2 = container.resolve(Database)

      assert.strictEqual(db1, db2)
    })

    test('resolves dependencies from container', () => {
      const container = new Container()
      container
        .register(Database, { factory: () => new Database() })
        .register(Logger, { factory: () => new Logger() })
        .register(UserService, {
          factory: (c) =>
            new UserService(c.resolve(Database), c.resolve(Logger)),
        })

      const userService = container.resolve(UserService)

      assert.ok(userService instanceof UserService)
      assert.ok(userService.db instanceof Database)
      assert.ok(userService.logger instanceof Logger)
    })

    test('resolves nested dependencies', () => {
      const container = new Container()
      container
        .register(Database, { factory: () => new Database() })
        .register(Logger, { factory: () => new Logger() })
        .register(UserService, {
          factory: (c) =>
            new UserService(c.resolve(Database), c.resolve(Logger)),
        })
        .register(AuthService, {
          factory: (c) => new AuthService(c.resolve(UserService)),
        })

      const authService = container.resolve(AuthService)

      assert.ok(authService instanceof AuthService)
      assert.ok(authService.userService instanceof UserService)
      assert.ok(authService.userService.db instanceof Database)
      assert.ok(authService.userService.logger instanceof Logger)
    })

    test('shares singleton instances across dependency tree', () => {
      const container = new Container()
      container
        .register(Database, { factory: () => new Database() })
        .register(Logger, { factory: () => new Logger() })
        .register(UserService, {
          factory: (c) =>
            new UserService(c.resolve(Database), c.resolve(Logger)),
        })

      const db1 = container.resolve(Database)
      const userService = container.resolve(UserService)

      assert.strictEqual(db1, userService.db)
    })

    test('throws Error if constructor not registered', () => {
      const container = new Container()

      assert.throws(() => container.resolve(Database), {
        name: 'Error',
        message: 'Token Database is not registered',
      })
    })

    test('throws TypeError if constructor is not a function', () => {
      const container = new Container()

      assert.throws(() => container.resolve('not-a-function'), {
        name: 'TypeError',
        message: 'Token must be a function',
      })
    })

    test('throws TypeError if factory returns wrong instance type', () => {
      const container = new Container()
      container.register(Database, { factory: () => new Logger() })

      assert.throws(() => container.resolve(Database), {
        name: 'TypeError',
        message: 'Instance is not of type Database',
      })
    })

    test('throws Error on circular dependency', () => {
      class ServiceA {
        constructor(serviceB) {
          this.serviceB = serviceB
        }
      }

      class ServiceB {
        constructor(serviceA) {
          this.serviceA = serviceA
        }
      }

      const container = new Container()
      container
        .register(ServiceA, {
          factory: (c) => new ServiceA(c.resolve(ServiceB)),
        })
        .register(ServiceB, {
          factory: (c) => new ServiceB(c.resolve(ServiceA)),
        })

      assert.throws(() => container.resolve(ServiceA), {
        name: 'Error',
        message: 'Circular dependency detected for ServiceA',
      })
    })

    test('throws Error on self-circular dependency', () => {
      class SelfDependent {
        constructor(self) {
          this.self = self
        }
      }

      const container = new Container()
      container.register(SelfDependent, {
        factory: (c) => new SelfDependent(c.resolve(SelfDependent)),
      })

      assert.throws(() => container.resolve(SelfDependent), {
        name: 'Error',
        message: 'Circular dependency detected for SelfDependent',
      })
    })
  })

  describe('has', () => {
    test('returns true for registered constructor', () => {
      const container = new Container()
      container.register(Database, { factory: () => new Database() })

      assert.strictEqual(container.has(Database), true)
    })

    test('returns false for unregistered constructor', () => {
      const container = new Container()

      assert.strictEqual(container.has(Database), false)
    })

    test('throws TypeError if constructor is not a function', () => {
      const container = new Container()

      assert.throws(() => container.has('not-a-function'), {
        name: 'TypeError',
        message: 'Token must be a function',
      })
    })

    test('throws TypeError if constructor is null', () => {
      const container = new Container()

      assert.throws(() => container.has(null), {
        name: 'TypeError',
        message: 'Token must be a function',
      })
    })
  })

  describe('unregister', () => {
    test('deletes registered constructor', () => {
      const container = new Container()
      container.register(Database, { factory: () => new Database() })

      const result = container.unregister(Database)

      assert.strictEqual(result, true)
      assert.strictEqual(container.has(Database), false)
    })

    test('returns false for unregistered constructor', () => {
      const container = new Container()

      const result = container.unregister(Database)

      assert.strictEqual(result, false)
    })

    test('allows re-registration after deletion', () => {
      const container = new Container()
      container.register(Database, { factory: () => new Database() })

      container.unregister(Database)
      container.register(Database, { factory: () => new Database() })

      assert.ok(container.has(Database))
    })

    test('deletes instance along with registration', () => {
      const container = new Container()
      container.register(Database, { factory: () => new Database() })

      const db1 = container.resolve(Database)
      container.unregister(Database)
      container.register(Database, { factory: () => new Database() })
      const db2 = container.resolve(Database)

      assert.notStrictEqual(db1, db2)
    })

    test('throws TypeError if constructor is not a function', () => {
      const container = new Container()

      assert.throws(() => container.unregister('not-a-function'), {
        name: 'TypeError',
        message: 'Token must be a function',
      })
    })
  })

  describe('clear', () => {
    test('removes all registrations', () => {
      const container = new Container()
      container
        .register(Database, { factory: () => new Database() })
        .register(Logger, { factory: () => new Logger() })

      container.clear()

      assert.strictEqual(container.has(Database), false)
      assert.strictEqual(container.has(Logger), false)
    })

    test('removes all instances', () => {
      const container = new Container()
      container.register(Database, { factory: () => new Database() })

      const db1 = container.resolve(Database)
      container.clear()
      container.register(Database, { factory: () => new Database() })
      const db2 = container.resolve(Database)

      assert.notStrictEqual(db1, db2)
    })

    test('allows new registrations after clear', () => {
      const container = new Container()
      container.register(Database, { factory: () => new Database() })

      container.clear()
      container.register(Logger, { factory: () => new Logger() })

      assert.strictEqual(container.has(Database), false)
      assert.strictEqual(container.has(Logger), true)
    })
  })

  describe('integration scenarios', () => {
    test('complex dependency tree', () => {
      class Config {
        constructor() {
          this.apiUrl = 'https://api.example.com'
        }
      }

      class HttpClient {
        constructor(config) {
          this.config = config
        }
      }

      class ApiService {
        constructor(httpClient, logger) {
          this.httpClient = httpClient
          this.logger = logger
        }
      }

      const container = new Container()
      container
        .register(Config, { factory: () => new Config() })
        .register(Logger, { factory: () => new Logger() })
        .register(HttpClient, {
          factory: (c) => new HttpClient(c.resolve(Config)),
        })
        .register(ApiService, {
          factory: (c) =>
            new ApiService(c.resolve(HttpClient), c.resolve(Logger)),
        })

      const apiService = container.resolve(ApiService)

      assert.ok(apiService instanceof ApiService)
      assert.ok(apiService.httpClient instanceof HttpClient)
      assert.ok(apiService.logger instanceof Logger)
      assert.strictEqual(apiService.httpClient.config.apiUrl, 'https://api.example.com')
    })

    test('factory with custom initialization', () => {
      const container = new Container()
      container.register(Database, {
        factory: () => {
          const db = new Database()
          db.connected = false // Custom initialization
          return db
        },
      })

      const db = container.resolve(Database)

      assert.strictEqual(db.connected, false)
    })

    test('multiple independent dependency trees', () => {
      class ServiceA {
        constructor(db) {
          this.db = db
        }
      }

      class ServiceB {
        constructor(logger) {
          this.logger = logger
        }
      }

      const container = new Container()
      container
        .register(Database, { factory: () => new Database() })
        .register(Logger, { factory: () => new Logger() })
        .register(ServiceA, {
          factory: (c) => new ServiceA(c.resolve(Database)),
        })
        .register(ServiceB, {
          factory: (c) => new ServiceB(c.resolve(Logger)),
        })

      const serviceA = container.resolve(ServiceA)
      const serviceB = container.resolve(ServiceB)

      assert.ok(serviceA instanceof ServiceA)
      assert.ok(serviceB instanceof ServiceB)
      assert.ok(serviceA.db instanceof Database)
      assert.ok(serviceB.logger instanceof Logger)
    })
  })
})
