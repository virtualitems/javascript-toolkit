/**
 * @description Represents a monetary value with fixed decimal precision
 */
export class Money {
  // public ATTRIBUTES

  // private ATTRIBUTES

  #amount
  #decimalPlaces
  #currencyCode

  // public static ATTRIBUTES

  // private static ATTRIBUTES

  // Constructor, Getters, Setters

  /**
   * Creates a Money instance
   * @param {bigint} amount - The monetary amount in smallest currency unit
   * @param {number} decimalPlaces - Number of decimal places for the currency
   * @param {string} currencyCode - ISO currency code (e.g., 'USD', 'EUR')
   */
  constructor(amount, decimalPlaces, currencyCode) {
    if ('bigint' !== typeof amount) {
      throw new TypeError('Amount must be a bigint.')
    }

    if (Number.isSafeInteger(decimalPlaces) === false || decimalPlaces < 0) {
      throw new RangeError('Decimal places must be a non-negative integer.')
    }

    if ('string' !== typeof currencyCode || currencyCode.trim() === '') {
      throw new TypeError('Currency code must be a non-empty string.')
    }

    const normalizedCurrencyCode = currencyCode.trim().toUpperCase()

    if (/^[A-Z]{3}$/.test(normalizedCurrencyCode) === false) {
      throw new Error('Currency code must be a valid ISO 4217 code.')
    }

    this.#amount = amount
    this.#decimalPlaces = decimalPlaces
    this.#currencyCode = normalizedCurrencyCode
  }

  /**
   * Gets the amount in smallest currency unit
   * @returns {bigint}
   */
  get amount() {
    return this.#amount
  }

  /**
   * Gets the number of decimal places
   * @returns {number}
   */
  get decimalPlaces() {
    return this.#decimalPlaces
  }

  /**
   * Gets the currency code
   * @returns {string}
   */
  get currencyCode() {
    return this.#currencyCode
  }

  // public METHODS

  /**
   * Splits amount into equal installments
   * @param {number} numberOfInstallments - Number of parts to split into
   * @returns {Money[]} Array of Money instances
   */
  splitEvenly(numberOfInstallments) {
    if (
      Number.isSafeInteger(numberOfInstallments) === false ||
      numberOfInstallments <= 0
    ) {
      throw new Error('Number of installments must be a positive integer.')
    }

    const isNegative = this.#amount < 0n
    const absolute = isNegative ? -this.#amount : this.#amount

    const count = BigInt(numberOfInstallments)
    const baseAmount = absolute / count
    const remainder = absolute % count

    const installments = []

    for (let i = 0; i < numberOfInstallments; i += 1) {
      const partial = BigInt(i) < remainder ? baseAmount + 1n : baseAmount
      const amount = isNegative ? -partial : partial
      installments.push(new Money(amount, this.#decimalPlaces, this.#currencyCode))
    }

    return installments
  }

  /**
   * Converts to decimal string representation
   * @returns {string} Formatted amount (e.g., '123.45', '-10.00')
   */
  toString() {
    const isNegative = this.#amount < 0n
    const absolute = isNegative ? -this.#amount : this.#amount
    const prefix = isNegative ? '-' : ''

    const divisor = 10n ** BigInt(this.#decimalPlaces)
    const integerPart = absolute / divisor
    const fractionalPart = absolute % divisor

    if (this.#decimalPlaces === 0) {
      return prefix + integerPart.toString()
    }

    return (
      prefix +
      integerPart.toString() +
      '.' +
      fractionalPart.toString().padStart(this.#decimalPlaces, '0')
    )
  }

  /**
   * Adds two Money instances
   * @param {Money} other - Money instance to add
   * @returns {Money} New Money instance with sum
   */
  add(other) {
    this.#assertCompatible(other)
    return new Money(this.#amount + other.amount, this.#decimalPlaces, this.#currencyCode)
  }

  /**
   * Subtracts another Money instance
   * @param {Money} other - Money instance to subtract
   * @returns {Money} New Money instance with difference
   */
  sub(other) {
    this.#assertCompatible(other)
    return new Money(this.#amount - other.amount, this.#decimalPlaces, this.#currencyCode)
  }

  /**
   * Multiplies amount by a scalar
   * @param {bigint} multiplier - Multiplication factor
   * @returns {Money} New Money instance with product
   */
  mul(multiplier) {
    if ('bigint' !== typeof multiplier) {
      throw new Error('Multiplier must be a bigint.')
    }

    return new Money(this.#amount * multiplier, this.#decimalPlaces, this.#currencyCode)
  }

  /**
   * Checks equality of amount, decimal places and currency
   * @param {Money} other - Money instance to compare
   * @returns {boolean}
   */
  equals(other) {
    if (other instanceof Money === false) {
      return false
    }

    return (
      this.#amount === other.amount &&
      this.#decimalPlaces === other.decimalPlaces &&
      this.#currencyCode === other.currencyCode
    )
  }

  /**
   * Returns a JSON-serializable representation
   * @returns {{ amount: string, decimalPlaces: number, currencyCode: string }}
   */
  toJSON() {
    return {
      amount: this.#amount.toString(),
      decimalPlaces: this.#decimalPlaces,
      currencyCode: this.#currencyCode
    }
  }

  isZero() {
    return this.#amount === 0n
  }

  compare(other) {
    this.#assertCompatible(other)

    if (this.#amount < other.amount) return -1
    if (this.#amount > other.amount) return 1
    return 0
  }

  // private METHODS

  /**
   * Validates that two Money instances have same decimal places and currency
   * @param {Money} other - Money instance to compare
   */
  #assertCompatible(other) {
    if (other instanceof Money === false) {
      throw new TypeError('Expected Money instance.')
    }

    if (this.#decimalPlaces !== other.decimalPlaces) {
      throw new Error('Money values must have the same decimal places.')
    }

    if (this.#currencyCode !== other.currencyCode) {
      throw new Error(
        `Cannot operate with different currencies: ${this.#currencyCode} and ${other.currencyCode}.`
      )
    }
  }

  // public static METHODS

  /**
   * Creates Money instance from decimal string
   * @param {string} value - Decimal string (e.g., '123.45', '-10.5')
   * @param {number} decimalPlaces - Number of decimal places for currency
   * @param {string} currencyCode - ISO currency code (e.g., 'USD', 'EUR')
   * @returns {Money} New Money instance
   */
  static fromDecimalString(value, decimalPlaces, currencyCode) {
    if ('string' !== typeof value) {
      throw new Error('Value must be a string.')
    }

    if (Number.isSafeInteger(decimalPlaces) === false || decimalPlaces < 0) {
      throw new Error('Decimal places must be a non-negative integer.')
    }

    if ('string' !== typeof currencyCode || currencyCode.trim() === '') {
      throw new Error('Currency code must be a non-empty string.')
    }

    const trimmed = value.trim()

    if (/^-?\d+(\.\d+)?$/.test(trimmed) === false) {
      throw new Error('Invalid decimal string format.')
    }

    const isNegative = trimmed.startsWith('-')
    const absolute = isNegative ? trimmed.slice(1) : trimmed

    const parts = absolute.split('.')
    const integerPart = parts[0]
    const fractionalPart = parts[1] || ''

    if (fractionalPart.length > decimalPlaces) {
      throw new Error(
        `Fractional part has more digits (${fractionalPart.length}) than specified decimal places (${decimalPlaces}).`
      )
    }

    const paddedFractional = fractionalPart.padEnd(decimalPlaces, '0')

    const combinedString = integerPart + paddedFractional

    const amount = isNegative
      ? -BigInt(combinedString || '0')
      : BigInt(combinedString || '0')

    return new Money(amount, decimalPlaces, currencyCode)
  }

  // private static METHODS
} //:: class
