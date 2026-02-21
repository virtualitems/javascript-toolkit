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

const urlPattern = String.raw`
  ^(https?):\/\/
  (?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+
  [a-z]{2,63}
  (?::\d{2,5})?
  (?:[\/?#][^\s]*)?
`

const urlRegExp = new RegExp(urlPattern, 'i')

function validate(element, expectedType) {
  if (element.tagName !== tagNames.input || element.type !== expectedType) {
    throw new Error(`Element must be an input of type ${expectedType}`)
  }
}

function toHex(buffer) {
  const bytes = new Uint8Array(buffer)
  let out = ''
  for (let i = 0; i < bytes.length; i++) out += bytes[i].toString(16).padStart(2, '0')
  return out
}

function toBase64(buffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}

export function checkbox(element) {
  validate(element, types.checkbox)

  if (element.indeterminate) return null

  return element.checked
}

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

export function date(element) {
  validate(element, types.date)

  return element.valueAsDate
}

export function datetime(element) {
  validate(element, types.datetime)

  return element.value === '' ? null : new Date(element.value)
}

export function email(element) {
  validate(element, types.email)

  const parts = element.value.trim().split('@')

  if (parts.length !== 2) return null

  const [local, domain] = parts

  if (local === '' || domain === '') return null

  return { local, domain }
}

export function file(element) {
  validate(element, types.file)

  return Array.from(element.files)
}

export function month(element) {
  validate(element, types.month)

  if (element.value === '') return null

  const [year, month] = element.value.split('-').map(Number)

  return { year, month }
}

export function number(element) {
  validate(element, types.number)

  return element.value === '' ? null : element.valueAsNumber
}

/**
 *
 * @param {HTMLInputElement} element
 * @param {"SHA-256" | "SHA-384" | "SHA-512"} algorithm
 * @param {"hex" | "base64"} encoding
 * @returns {Promise<{ original: string, hash: string }>}
 */
export async function password(element, { algorithm, encoding } = {}) {
  validate(element, types.password)

  const hasAlgorithm = typeof algorithm === 'string'
  const hasEncoding = typeof encoding === 'string'

  if (hasAlgorithm === false && hasEncoding === false) {
    return { original: element.value, hash: null }
  }

  if (['SHA-256', 'SHA-384', 'SHA-512'].includes(algorithm) === false) {
    throw new Error('Unsupported algorithm. Use "SHA-256", "SHA-384", or "SHA-512".')
  }

  if (['hex', 'base64'].includes(encoding) === false) {
    throw new Error('Unsupported encoding. Use "hex" or "base64".')
  }

  const data = new TextEncoder().encode(original)
  const digest = await crypto.subtle.digest(algorithm, data)

  if (encoding === 'hex') {
    return { original, hash: toHex(digest) }
  }

  if (encoding === 'base64') {
    return { original, hash: toBase64(digest) }
  }
}

export function radio(element) {
  validate(element, types.radio)

  return element.checked ? element.value : null
}

export function range(element) {
  validate(element, types.range)

  return element.valueAsNumber
}

/**
 * @param {HTMLInputElement} element
 * @param {Object} options
 * @param {boolean} options.trim
 * @param {Object} options.regex
 * @param {RegExp} options.regex.cleaner
 * @param {RegExp} options.regex.splitter
 * @returns
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

export function time(element) {
  validate(element, types.time)

  if (element.value === '') return null

  console.log(element.value)

  const [hours, minutes] = element.value.split(':').map(Number)

  return { hours, minutes }
}

export function url(element) {
  validate(element, types.url)

  if (urlRegExp.test(element.value) === false) return null

  return new URL(element.value)
}

export function week(element) {
  validate(element, types.week)

  if (element.value === '') return null

  const [year, week] = element.value.split('-W').map(Number)

  return { year, week }
}
