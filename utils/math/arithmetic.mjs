/**
 * Greatest Common Divisor
 *
 * @param  {a} number
 * @param  {b} number
 * @returns {number}
 */
export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

/**
 * Least Common Denominator
 *
 * @param  {...number[]} numbers
 * @returns {number}
 */
export function lcd(...numbers) {
  const nums = numbers.flat();
  if (nums.length === 0) return 1;
  if (nums.length === 1) return nums[0];

  // LCD is the same as LCM for denominators
  return nums.reduce((a, b) => Math.abs(a * b) / gcd(a, b));
}

/**
 * Least Common Multiple
 *
 * @param  {...number[]} numbers
 * @returns {number}
 */
export function lcm(...numbers) {
  const nums = numbers.flat();
  if (nums.length === 0) return 0;
  if (nums.length === 1) return Math.abs(nums[0]);

  return nums.reduce((a, b) => Math.abs(a * b) / gcd(a, b));
}
