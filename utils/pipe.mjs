/**
 * @param {Function[]} fns
 * @param {unknown} thisArg
 * @param {unknown[]} args
 */
export function pipe(fns, thisArg = null, args = undefined) {
  let result = null

  if (Array.isArray(fns) === false || fns.some((fn) => 'function' !== typeof fn)) {
    throw new TypeError('Expected functions array')
  }

  if (args !== undefined && Array.isArray(args) === false) {
    throw new TypeError('Expected args to be an array')
  }

  for (const fn of fns) {
    result = fn.apply(thisArg, args)
    args = [result]
  }

  return result
}
