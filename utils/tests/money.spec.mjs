import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { Money } from '../money.mjs'

describe('Money Class', () => {
  describe('Constructor', () => {
    test('should create a Money instance with valid parameters', () => {
      const money = new Money(10050n, 2, 'USD')
      assert.equal(money.amount, 10050n)
      assert.equal(money.decimalPlaces, 2)
      assert.equal(money.currencyCode, 'USD')
      assert.equal(money.toString(), '100.50')
    })

    test('should throw error if amount is not a bigint', () => {
      assert.throws(
        () => new Money(100, 2, 'USD'),
        { message: 'Amount must be a bigint.' }
      )
    })

    test('should allow negative amounts', () => {
      const money = new Money(-10050n, 2, 'USD')
      assert.equal(money.amount, -10050n)
      assert.equal(money.toString(), '-100.50')
    })

    test('should throw error if decimal places is not a non-negative integer', () => {
      assert.throws(
        () => new Money(100n, -1, 'USD'),
        { message: 'Decimal places must be a non-negative integer.' }
      )
    })

    test('should throw error if currency code is not a string', () => {
      assert.throws(
        () => new Money(100n, 2, 123),
        { message: 'Currency code must be a non-empty string.' }
      )
    })

    test('should throw error if currency code is empty', () => {
      assert.throws(
        () => new Money(100n, 2, ''),
        { message: 'Currency code must be a non-empty string.' }
      )
    })
  })

  describe('fromDecimalString', () => {
    test('should create Money from valid decimal string', () => {
      const money = Money.fromDecimalString('123.45', 2, 'USD')
      assert.equal(money.toString(), '123.45')
      assert.equal(money.amount, 12345n)
      assert.equal(money.currencyCode, 'USD')
    })

    test('should handle decimal string without fractional part', () => {
      const money = Money.fromDecimalString('100', 2, 'EUR')
      assert.equal(money.toString(), '100.00')
    })

    test('should handle decimal string with partial fractional part', () => {
      const money = Money.fromDecimalString('100.5', 2, 'GBP')
      assert.equal(money.toString(), '100.50')
    })

    test('should handle decimal string with full fractional part', () => {
      const money = Money.fromDecimalString('0.99', 2, 'JPY')
      assert.equal(money.toString(), '0.99')
    })

    test('should throw error if fractional part has too many digits', () => {
      assert.throws(
        () => Money.fromDecimalString('100.999', 2, 'USD'),
        { message: /Fractional part has more digits/ }
      )
    })

    test('should create Money from negative decimal string', () => {
      const money = Money.fromDecimalString('-123.45', 2, 'USD')
      assert.equal(money.toString(), '-123.45')
      assert.equal(money.amount, -12345n)
    })

    test('should throw error if value has invalid format', () => {
      assert.throws(
        () => Money.fromDecimalString('abc', 2, 'USD'),
        { message: 'Invalid decimal string format.' }
      )
    })

    test('should throw error if value is not a string', () => {
      assert.throws(
        () => Money.fromDecimalString(123.45, 2, 'USD'),
        { message: 'Value must be a string.' }
      )
    })

    test('should throw error if currency code is missing', () => {
      assert.throws(
        () => Money.fromDecimalString('100.00', 2, ''),
        { message: 'Currency code must be a non-empty string.' }
      )
    })
  })

  describe('splitEvenly', () => {
    test('should split evenly when divisible exactly', () => {
      const money = Money.fromDecimalString('100.00', 2, 'USD')
      const installments = money.splitEvenly(4)

      assert.equal(installments.length, 4)
      installments.forEach(inst => {
        assert.equal(inst.toString(), '25.00')
        assert.equal(inst.currencyCode, 'USD')
      })

      const total = installments.reduce((sum, inst) => sum + inst.amount, 0n)
      assert.equal(total, money.amount)
    })

    test('should distribute remainder to first installments (100 / 3)', () => {
      const money = Money.fromDecimalString('100.00', 2, 'EUR')
      const installments = money.splitEvenly(3)

      assert.equal(installments.length, 3)
      assert.equal(installments[0].toString(), '33.34')
      assert.equal(installments[1].toString(), '33.33')
      assert.equal(installments[2].toString(), '33.33')

      const total = installments.reduce((sum, inst) => sum + inst.amount, 0n)
      assert.equal(total, money.amount)
    })

    test('should distribute remainder to first installments (10.00 / 3)', () => {
      const money = Money.fromDecimalString('10.00', 2, 'USD')
      const installments = money.splitEvenly(3)

      assert.equal(installments.length, 3)
      assert.equal(installments[0].toString(), '3.34')
      assert.equal(installments[1].toString(), '3.33')
      assert.equal(installments[2].toString(), '3.33')

      const total = installments.reduce((sum, inst) => sum + inst.amount, 0n)
      assert.equal(total, money.amount)
    })

    test('should distribute remainder to first installments (1.00 / 3)', () => {
      const money = Money.fromDecimalString('1.00', 2, 'USD')
      const installments = money.splitEvenly(3)

      assert.equal(installments.length, 3)
      assert.equal(installments[0].toString(), '0.34')
      assert.equal(installments[1].toString(), '0.33')
      assert.equal(installments[2].toString(), '0.33')

      const total = installments.reduce((sum, inst) => sum + inst.amount, 0n)
      assert.equal(total, money.amount)
    })

    test('should throw error if numberOfInstallments is not a positive integer', () => {
      const money = Money.fromDecimalString('100.00', 2, 'USD')
      assert.throws(
        () => money.splitEvenly(0),
        { message: 'Number of installments must be a positive integer.' }
      )
    })

    test('should split negative amount evenly', () => {
      const money = Money.fromDecimalString('-100.00', 2, 'USD')
      const installments = money.splitEvenly(3)

      assert.equal(installments.length, 3)
      assert.equal(installments[0].toString(), '-33.34')
      assert.equal(installments[1].toString(), '-33.33')
      assert.equal(installments[2].toString(), '-33.33')

      const total = installments.reduce((sum, inst) => sum + inst.amount, 0n)
      assert.equal(total, money.amount)
    })
  })

  describe('toString', () => {
    test('should format with decimal places', () => {
      const money = new Money(10050n, 2, 'USD')
      assert.equal(money.toString(), '100.50')
    })

    test('should handle zero decimal places', () => {
      const money = new Money(100n, 0, 'JPY')
      assert.equal(money.toString(), '100')
    })

    test('should pad fractional part with zeros', () => {
      const money = new Money(10000n, 2, 'EUR')
      assert.equal(money.toString(), '100.00')
    })
  })

  describe('Edge cases', () => {
    test('should handle very small amounts', () => {
      const money = Money.fromDecimalString('0.01', 2, 'USD')
      const installments = money.splitEvenly(3)

      assert.equal(installments[0].toString(), '0.01')
      assert.equal(installments[1].toString(), '0.00')
      assert.equal(installments[2].toString(), '0.00')
    })

    test('should handle large amounts', () => {
      const money = Money.fromDecimalString('999999.99', 2, 'USD')
      assert.equal(money.toString(), '999999.99')
      assert.equal(money.amount, 99999999n)
    })

    test('should handle zero amount', () => {
      const money = new Money(0n, 2, 'USD')
      assert.equal(money.toString(), '0.00')
    })

    test('should handle negative zero', () => {
      const money = new Money(-0n, 2, 'USD')
      assert.equal(money.toString(), '0.00')
    })
  })

  describe('add', () => {
    test('should add two Money instances with same decimal places', () => {
      const money1 = Money.fromDecimalString('10.50', 2, 'USD')
      const money2 = Money.fromDecimalString('5.25', 2, 'USD')
      const result = money1.add(money2)

      assert.equal(result.toString(), '15.75')
      assert.equal(result.currencyCode, 'USD')
    })

    test('should throw error if decimal places differ', () => {
      const money1 = new Money(1000n, 2, 'USD')
      const money2 = new Money(1000n, 3, 'USD')

      assert.throws(
        () => money1.add(money2),
        { message: 'Money values must have the same decimal places.' }
      )
    })

    test('should throw error if currencies differ', () => {
      const money1 = new Money(1000n, 2, 'USD')
      const money2 = new Money(1000n, 2, 'EUR')

      assert.throws(
        () => money1.add(money2),
        { message: /Cannot operate with different currencies/ }
      )
    })

    test('should throw error if argument is not Money instance', () => {
      const money = new Money(1000n, 2, 'USD')

      assert.throws(
        () => money.add(100),
        { message: 'Expected Money instance.' }
      )
    })
  })

  describe('sub', () => {
    test('should subtract two Money instances with same decimal places', () => {
      const money1 = Money.fromDecimalString('10.50', 2, 'USD')
      const money2 = Money.fromDecimalString('5.25', 2, 'USD')
      const result = money1.sub(money2)

      assert.equal(result.toString(), '5.25')
      assert.equal(result.currencyCode, 'USD')
    })

    test('should return negative result when subtracting larger from smaller', () => {
      const money1 = Money.fromDecimalString('5.25', 2, 'USD')
      const money2 = Money.fromDecimalString('10.50', 2, 'USD')
      const result = money1.sub(money2)

      assert.equal(result.toString(), '-5.25')
    })

    test('should throw error if decimal places differ', () => {
      const money1 = new Money(1000n, 2, 'USD')
      const money2 = new Money(1000n, 3, 'USD')

      assert.throws(
        () => money1.sub(money2),
        { message: 'Money values must have the same decimal places.' }
      )
    })

    test('should throw error if currencies differ', () => {
      const money1 = new Money(1000n, 2, 'USD')
      const money2 = new Money(1000n, 2, 'COP')

      assert.throws(
        () => money1.sub(money2),
        { message: /Cannot operate with different currencies/ }
      )
    })

    test('should throw error if argument is not Money instance', () => {
      const money = new Money(1000n, 2, 'USD')

      assert.throws(
        () => money.sub(100),
        { message: 'Expected Money instance.' }
      )
    })
  })

  describe('mul', () => {
    test('should multiply Money by a positive bigint', () => {
      const money = Money.fromDecimalString('10.50', 2, 'USD')
      const result = money.mul(3n)

      assert.equal(result.toString(), '31.50')
      assert.equal(result.currencyCode, 'USD')
    })

    test('should multiply Money by a negative bigint', () => {
      const money = Money.fromDecimalString('10.50', 2, 'USD')
      const result = money.mul(-2n)

      assert.equal(result.toString(), '-21.00')
    })

    test('should multiply Money by zero', () => {
      const money = Money.fromDecimalString('10.50', 2, 'USD')
      const result = money.mul(0n)

      assert.equal(result.toString(), '0.00')
    })

    test('should multiply negative Money by positive bigint', () => {
      const money = Money.fromDecimalString('-10.50', 2, 'USD')
      const result = money.mul(3n)

      assert.equal(result.toString(), '-31.50')
    })

    test('should throw error if multiplier is not a bigint', () => {
      const money = new Money(1000n, 2, 'USD')

      assert.throws(
        () => money.mul(3),
        { message: 'Multiplier must be a bigint.' }
      )
    })
  })

  describe('equals', () => {
    test('should return true for equal Money instances', () => {
      const a = new Money(1000n, 2, 'USD')
      const b = new Money(1000n, 2, 'USD')

      assert.equal(a.equals(b), true)
    })

    test('should return false if amounts differ', () => {
      const a = new Money(1000n, 2, 'USD')
      const b = new Money(2000n, 2, 'USD')

      assert.equal(a.equals(b), false)
    })

    test('should return false if decimal places differ', () => {
      const a = new Money(1000n, 2, 'USD')
      const b = new Money(1000n, 3, 'USD')

      assert.equal(a.equals(b), false)
    })

    test('should return false if currencies differ', () => {
      const a = new Money(1000n, 2, 'USD')
      const b = new Money(1000n, 2, 'EUR')

      assert.equal(a.equals(b), false)
    })

    test('should return false if argument is not a Money instance', () => {
      const a = new Money(1000n, 2, 'USD')

      assert.equal(a.equals(1000), false)
      assert.equal(a.equals(null), false)
      assert.equal(a.equals(undefined), false)
    })
  })

  describe('toJSON', () => {
    test('should return a JSON-serializable object', () => {
      const money = new Money(10050n, 2, 'USD')
      const json = money.toJSON()

      assert.deepEqual(json, {
        amount: '10050',
        decimalPlaces: 2,
        currencyCode: 'USD',
      })
    })

    test('should serialize correctly with JSON.stringify', () => {
      const money = new Money(10050n, 2, 'EUR')
      const str = JSON.stringify(money)
      const parsed = JSON.parse(str)

      assert.equal(parsed.amount, '10050')
      assert.equal(parsed.decimalPlaces, 2)
      assert.equal(parsed.currencyCode, 'EUR')
    })

    test('should handle negative amounts', () => {
      const money = new Money(-500n, 2, 'GBP')
      const json = money.toJSON()

      assert.deepEqual(json, {
        amount: '-500',
        decimalPlaces: 2,
        currencyCode: 'GBP',
      })
    })
  })
})