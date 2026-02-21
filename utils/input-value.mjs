export const types = {
  button: 'button',
  checkbox: 'checkbox',
  color: 'color',
  date: 'date',
  datetime: 'datetime-local',
  email: 'email',
  file: 'file',
  hidden: 'hidden',
  image: 'image',
  month: 'month',
  number: 'number',
  password: 'password',
  radio: 'radio',
  range: 'range',
  reset: 'reset',
  search: 'search',
  submit: 'submit',
  tel: 'tel',
  text: 'text',
  time: 'time',
  url: 'url',
  week: 'week'
}

const tagNames = {
  input: 'INPUT',
  select: 'SELECT',
  textarea: 'TEXTAREA'
}

/**
 * Validates that the given element is an `<input>` of the expected type.
 * @param {HTMLInputElement} element - The DOM element to validate.
 * @param {string} expectedType - The expected value of `element.type`.
 * @throws {Error} If the element is not an input or its type does not match.
 */
function validate(element, expectedType) {
  if (element.tagName !== tagNames.input || element.type !== expectedType) {
    throw new Error(`Element must be an input of type ${expectedType}`)
  }
}

/**
 * Converts an ArrayBuffer to a lowercase hexadecimal string.
 * @param {ArrayBuffer} buffer - The binary data to encode.
 * @returns {string} Hexadecimal string representation of the buffer.
 */
function toHex(buffer) {
  const bytes = new Uint8Array(buffer)
  let out = ''
  for (let i = 0; i < bytes.length; i++) out += bytes[i].toString(16).padStart(2, '0')
  return out
}

/**
 * Converts an ArrayBuffer to a Base64-encoded string.
 * @param {ArrayBuffer} buffer - The binary data to encode.
 * @returns {string} Base64 string representation of the buffer.
 */
function toBase64(buffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}

/**
 * Reads the checked state of a checkbox input.
 * Returns `null` if the checkbox is in an indeterminate state.
 * @param {HTMLInputElement} element - A checkbox input element.
 * @returns {boolean | null} `true` if checked, `false` if unchecked, `null` if indeterminate.
 */
export function checkbox(element) {
  validate(element, types.checkbox)

  if (element.indeterminate) return null

  return element.checked
}

/**
 * Reads the value of a color input and returns it in RGB, HSL, and hex formats.
 * Returns `null` if the value is not a valid hex color.
 * @param {HTMLInputElement} element - A color input element.
 * @returns {{ rgb: { r: number, g: number, b: number }, hsl: { h: number, s: number, l: number }, hex: string } | null}
 */
export function color(element) {
  validate(element, types.color)

  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(element.value)

  if (match === null) return null

  // RGB (0..255)
  const red = parseInt(match[1], 16)
  const green = parseInt(match[2], 16)
  const blue = parseInt(match[3], 16)

  // Normalizado (0..1)
  const red01 = red / 255
  const green01 = green / 255
  const blue01 = blue / 255

  const channelMax = Math.max(red01, green01, blue01)
  const channelMin = Math.min(red01, green01, blue01)
  const range = channelMax - channelMin

  // Lightness (0..1)
  const lightness01 = (channelMax + channelMin) / 2

  // Saturation (0..1)
  let saturation01 = 0

  // Hue (grados 0..360)
  let hueDeg = 0

  if (range !== 0) {
    saturation01 = range / (1 - Math.abs(2 * lightness01 - 1))

    if (channelMax === red01) {
      hueDeg = ((green01 - blue01) / range) % 6
    } else if (channelMax === green01) {
      hueDeg = (blue01 - red01) / range + 2
    } else {
      hueDeg = (red01 - green01) / range + 4
    }

    hueDeg *= 60
    if (hueDeg < 0) hueDeg += 360
  }

  const hue = Math.round(hueDeg)
  const saturation = Math.round(saturation01 * 100)
  const lightness = Math.round(lightness01 * 100)

  return {
    rgb: { r: red, g: green, b: blue },
    hsl: { h: hue, s: saturation, l: lightness },
    hex: element.value
  }
}

/**
 * Reads the value of a date input as a `Date` object (UTC midnight).
 * Returns `null` if the input is empty.
 * @param {HTMLInputElement} element - A date input element.
 * @returns {Date | null} The selected date, or `null` if empty.
 */
export function date(element) {
  validate(element, types.date)

  return element.valueAsDate
}

/**
 * Reads the value of a datetime-local input as a `Date` object.
 * Returns `null` if the input is empty.
 * @param {HTMLInputElement} element - A datetime-local input element.
 * @returns {Date | null} The selected date and time, or `null` if empty.
 */
export function datetime(element) {
  validate(element, types.datetime)

  return element.value === '' ? null : new Date(element.value)
}

/**
 * Reads the value of an email input and splits it into local and domain parts.
 * Returns `null` if the value is not a valid email address.
 * @param {HTMLInputElement} element - An email input element.
 * @returns {{ local: string, domain: string } | null} The parsed email parts, or `null` if invalid.
 */
export function email(element) {
  validate(element, types.email)

  const parts = element.value.trim().split('@')

  if (parts.length !== 2) return null

  const [local, domain] = parts

  if (local === '' || domain === '') return null

  return { local, domain }
}

/**
 * Reads the selected files from a file input as an array of `File` objects.
 * @param {HTMLInputElement} element - A file input element.
 * @returns {File[]} Array of selected files (may be empty if no files are selected).
 */
export function file(element) {
  validate(element, types.file)

  return Array.from(element.files)
}

/**
 * Reads the value of a month input and returns it as year and month numbers.
 * Returns `null` if the input is empty.
 * @param {HTMLInputElement} element - A month input element.
 * @returns {{ year: number, month: number } | null} The selected year and month (1–12), or `null` if empty.
 */
export function month(element) {
  validate(element, types.month)

  if (element.value === '') return null

  const [year, month] = element.value.split('-').map(Number)

  return { year, month }
}

/**
 * Reads the value of a number input as a numeric value.
 * Returns `null` if the input is empty.
 * @param {HTMLInputElement} element - A number input element.
 * @returns {number | null} The numeric value, or `null` if empty.
 */
export function number(element) {
  validate(element, types.number)

  return element.value === '' ? null : element.valueAsNumber
}

/**
 * Reads the value of a password input and optionally returns a hashed version of it.
 * If no algorithm or encoding is provided, returns the plain-text value with a `null` hash.
 * @param {HTMLInputElement} element - A password input element.
 * @param {Object} [options={}] - Hashing options.
 * @param {"SHA-256" | "SHA-384" | "SHA-512"} [options.algorithm] - The hashing algorithm to use.
 * @param {"hex" | "base64"} [options.encoding] - The output encoding for the hash.
 * @returns {Promise<{ value: string, hash: string | null }>} The original value and its hash (or `null` if no algorithm was specified).
 */
export async function password(element, { algorithm, encoding } = {}) {
  validate(element, types.password)

  const { value } = element

  if (value.trim() === '') return null

  const hasAlgorithm = typeof algorithm === 'string'
  const hasEncoding = typeof encoding === 'string'

  if (hasAlgorithm === false && hasEncoding === false) {
    return { value: element.value, hash: null }
  }

  if (['SHA-256', 'SHA-384', 'SHA-512'].includes(algorithm) === false) {
    throw new Error('Unsupported algorithm. Use "SHA-256", "SHA-384", or "SHA-512".')
  }

  if (['hex', 'base64'].includes(encoding) === false) {
    throw new Error('Unsupported encoding. Use "hex" or "base64".')
  }

  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest(algorithm, data)

  if (encoding === 'hex') {
    return { value, hash: toHex(digest) }
  }

  if (encoding === 'base64') {
    return { value, hash: toBase64(digest) }
  }
}

/**
 * Reads the value of a radio input if it is selected.
 * Returns `null` if the radio button is not checked.
 * @param {HTMLInputElement} element - A radio input element.
 * @returns {string | null} The value of the radio button if checked, or `null` otherwise.
 */
export function radio(element) {
  validate(element, types.radio)

  return element.checked ? element.value : null
}

/**
 * Reads the value of a range input as a numeric value.
 * @param {HTMLInputElement} element - A range input element.
 * @returns {number} The current numeric value of the slider.
 */
export function range(element) {
  validate(element, types.range)

  return element.valueAsNumber
}

/**
 * Reads the value of a text input, with optional trimming and regex-based processing.
 * @param {HTMLInputElement} element - A text input element.
 * @param {Object} [options={}] - Processing options.
 * @param {boolean} [options.trim] - Whether to trim leading and trailing whitespace.
 * @param {Object} [options.regex] - Regex options for cleaning and splitting the value.
 * @param {RegExp} [options.regex.cleaner] - A regex used to remove characters from the value.
 * @param {RegExp} [options.regex.splitter] - A regex used to split the value into parts.
 * @returns {{ value: string, parts: RegExpMatchArray | null }} The processed value and any matched parts.
 */
export function text(element, options = {}) {
  validate(element, types.text)

  const { value } = element

  const { trim, regex } = options

  let parts = null

  if (trim) value = value.trim()

  if ('object' === typeof regex && regex !== null) {
    const { cleaner, splitter } = regex

    if (cleaner) value = value.replace(cleaner, '')

    if (splitter) parts = value.match(splitter)
  }

  return { value, parts }
}

/**
 * Reads the value of a time input and returns it as hours and minutes.
 * Returns `null` if the input is empty.
 * @param {HTMLInputElement} element - A time input element.
 * @returns {{ hours: number, minutes: number } | null} The selected time, or `null` if empty.
 */
export function time(element) {
  validate(element, types.time)

  if (element.value === '') return null

  console.log(element.value)

  const [hours, minutes] = element.value.split(':').map(Number)

  return { hours, minutes }
}

/**
 * Reads the value of a URL input and returns it as a `URL` object.
 * Returns `null` if the value is not a valid URL.
 * @param {HTMLInputElement} element - A URL input element.
 * @returns {URL | null} The parsed URL, or `null` if the value is invalid.
 */
export function url(element) {
  validate(element, types.url)

  try {
    return new URL(element.value)
  } catch {
    return null
  }
}

/**
 * Reads the value of a week input and returns the ISO 8601 week number along with the
 * start and end dates (Monday–Sunday) of that week.
 * Returns `null` if the input is empty.
 * @param {HTMLInputElement} element - A week input element.
 * @returns {{
 *   week: number,
 *   startDay: number, startMonth: number, startYear: number,
 *   endDay: number, endMonth: number, endYear: number
 * } | null} The week details, or `null` if empty.
 */
export function week(element) {
  validate(element, types.week)

  if (element.value === '') return null

  const [year, week] = element.value.split('-W').map(Number)

  // ISO 8601: The first week of the year is the one that contains the first Thursday of the year (January 4th).
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const jan4Dow = (jan4.getUTCDay() + 6) % 7 // 0=Lun ... 6=Dom
  const week1Mon = new Date(jan4)
  week1Mon.setUTCDate(jan4.getUTCDate() - jan4Dow)

  const start = new Date(week1Mon)
  start.setUTCDate(week1Mon.getUTCDate() + (week - 1) * 7)

  const end = new Date(start)
  end.setUTCDate(start.getUTCDate() + 6)

  return {
    week,
    startDay: start.getUTCDate(),
    startMonth: start.getUTCMonth() + 1,
    startYear: start.getUTCFullYear(),
    endDay: end.getUTCDate(),
    endMonth: end.getUTCMonth() + 1,
    endYear: end.getUTCFullYear()
  }
}
