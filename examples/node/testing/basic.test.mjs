/**
 * @fileoverview Basic test example
 */

import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

describe('sync tests', () => {
  test('sum', () => {
    // Arrange
    const a = 1
    const b = 2

    // Act
    const result = a + b

    // Assert
    assert.strictEqual(result, 3)
  })
})

describe('async tests', () => {
  test('promise', async () => {
    // Arrange
    const promise = Promise.resolve(42)

    // Act
    const value = await promise

    // Assert
    assert.strictEqual(value, 42)
  })
})
