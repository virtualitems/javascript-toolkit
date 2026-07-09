/**
 * Creates an ETag from content metadata and the first bytes of the payload.
 * @param {string} content Content used to derive the ETag.
 * @param {number} timestamp Timestamp associated with the content.
 * @param {number} [bytes=4] Number of leading bytes to include in the hash fragment.
 * @returns {string}
 */
export function etag(content, timestamp, bytes = 4) {
  if (typeof content !== 'string') {
    throw new TypeError('Content must be a string')
  }

  if (Number.isInteger(timestamp) === false || timestamp < 0) {
    throw new TypeError('Timestamp must be a Date or a non-negative integer')
  }

  if (Number.isInteger(bytes) === false || bytes < 0) {
    throw new TypeError('Bytes must be a non-negative integer')
  }

  const bytesCount = Math.min(bytes, content.length)
  let bytesHex = ''

  for (let i = 0; i < bytesCount; i += 1) {
    bytesHex += content.charCodeAt(i).toString(16).padStart(2, '0')
  }

  const timeHex = timestamp.toString(16)
  const sizeHex = content.length.toString(16)

  return `"${timeHex}-${sizeHex}-${bytesHex}"`
}
