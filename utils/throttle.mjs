/**
 * Limits how many times a function can execute within a time window.
 *
 * @param {Function} fn
 * @param {number} delay Window duration in milliseconds.
 * @param {number} maxCalls Maximum executions per window.
 * @returns {Function}
 */
export function throttle(fn, delay, maxCalls = 1) {
  let windowStart = 0
  let calls = 0

  return function (...args) {
    const now = Date.now()

    // Start or reset the time window
    if (windowStart === 0 || now - windowStart >= delay) {
      windowStart = now
      calls = 0
    }

    // Block only after reaching the execution limit
    if (calls >= maxCalls) {
      return
    }

    calls += 1

    return fn.apply(this, args)
  }
}
