/**
 * Creates a union of two sets, containing all elements from both sets.
 * @param {Set} setA - The first set
 * @param {Set} setB - The second set
 * @returns {Set} A new set containing all unique elements from both setA and setB
 * @example
 * const a = new Set([1, 2, 3]);
 * const b = new Set([3, 4, 5]);
 * union(a, b); // Set([1, 2, 3, 4, 5])
 */
export function union(setA, setB) {
  const result = new Set(setA);

  for (const item of setB) {
    result.add(item);
  }

  return result;
}

/**
 * Creates an intersection of two sets, containing only elements present in both sets.
 * @param {Set} setA - The first set
 * @param {Set} setB - The second set
 * @returns {Set} A new set containing only elements that exist in both setA and setB
 * @example
 * const a = new Set([1, 2, 3]);
 * const b = new Set([2, 3, 4]);
 * intersection(a, b); // Set([2, 3])
 */
export function intersection(setA, setB) {
  const result = new Set();

  for (const item of setA) {
    if (setB.has(item)) {
      result.add(item);
    }
  }

  return result;
}

/**
 * Creates a difference of two sets, containing elements from setA that are not in setB.
 * @param {Set} setA - The set to subtract from
 * @param {Set} setB - The set whose elements will be removed from setA
 * @returns {Set} A new set containing elements from setA that are not in setB
 * @example
 * const a = new Set([1, 2, 3, 4]);
 * const b = new Set([3, 4, 5]);
 * difference(a, b); // Set([1, 2])
 */
export function difference(setA, setB) {
  const result = new Set();

  for (const item of setA) {
    if (setB.has(item)) {
      continue;
    }
    result.add(item);
  }

  return result;
}

/**
 * Creates a symmetric difference of two sets, containing elements that are in either set but not in both.
 * @param {Set} setA - The first set
 * @param {Set} setB - The second set
 * @returns {Set} A new set containing elements that exist in exactly one of the two sets
 * @example
 * const a = new Set([1, 2, 3]);
 * const b = new Set([3, 4, 5]);
 * symmetricDifference(a, b); // Set([1, 2, 4, 5])
 */
export function symmetricDiff(setA, setB) {
  const result = new Set();

  for (const item of setA) {
    if (setB.has(item)) {
      continue;
    }
    result.add(item);
  }

  for (const item of setB) {
    if (setA.has(item)) {
      continue;
    }
    result.add(item);
  }

  return result;
}

/**
 * Creates a complement of a set relative to a universe set, containing elements in the universe but not in the given set.
 * @param {Set} set - The set to find the complement of
 * @param {Set} universe - The universal set containing all possible elements
 * @returns {Set} A new set containing elements from the universe that are not in the given set
 * @example
 * const mySet = new Set([1, 2, 3]);
 * const universe = new Set([1, 2, 3, 4, 5, 6]);
 * complement(mySet, universe); // Set([4, 5, 6])
 */
export function complement(set, universe) {
  const result = new Set();

  for (const item of universe) {
    if (set.has(item)) {
      continue;
    }
    result.add(item);
  }

  return result;
}
