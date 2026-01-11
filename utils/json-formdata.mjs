/**
 * @typedef {null | boolean | number | bigint | string | symbol} Primitive
 */

/**
 * @typedef {File | Blob} JsonBinary
 */

/**
 * @typedef {{[key: string]: Primitive | JsonBinary | JsonObject | JsonArray}} JsonObject
 */

/**
 * @typedef {Array<Primitive | JsonBinary | JsonObject | JsonArray>} JsonArray
 */

/**
 * @typedef {JsonObject | JsonArray} Json
 */

/**
 * Checks if a value is a primitive type.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
function isPrimitive(value) {
  const type = typeof value;
  return (
    value === null ||
    type === 'string' ||
    type === 'number' ||
    type === 'boolean' ||
    type === 'bigint' ||
    type === 'symbol'
  );
}

/**
 * @param {Json} json
 * @returns {FormData}
 */
export function encode(json) {

  const isArray = Array.isArray(json);
  const isObject = json !== undefined && json !== null && json.constructor === Object;

  if (isArray === false && isObject === false) {
    throw new Error('Input must be a JSON object or array');
  }

  const formData = new FormData();

  /** @type {Array<{current: Json | Primitive | JsonBinary, path: string}>} */
  const remaining = [{
    current: json, // the current element value being processed
    path: '', // the key of the current element in its parent
  }];

  while (remaining.length > 0) {
    const { current, path } = remaining.pop();

    // Si es un array
    if (Array.isArray(current)) {
      for (let i = 0; i < current.length; i++) {
        remaining.push({
          current: current[i],
          path: `${path}[${i}]`
        });
      }
      continue;
    }

    // Si es un objeto
    if (current !== undefined && current !== null && current.constructor === Object) {
      for (const key in current) {
        remaining.push({
          current: current[key],
          path: `${path}[${key}]`
        });
      }
      continue;
    }

    // Si es File
    if (current instanceof File) {
      formData.append(path, current, current.name);
      continue;
    }

    // Si es Blob
    if (current instanceof Blob) {
      formData.append(path, current);
      continue;
    }

    // Si es un valor primitivo
    if (isPrimitive(current)) {
      formData.append(path, current);
      continue;
    }

  } //:: while

  return formData;
}

/**
 * Decodes a flat object with bracket notation keys into a nested structure.
 *
 * @param {Record<string, unknown>} data
 * @returns {Record<string, unknown>}
 */
export function decode(data) {
  const result = {};

  for (const key in data) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) continue;

    const value = data[key];
    const keyParts = key.split(/[\[\]]+/).filter(Boolean);

    if (keyParts.length === 0) continue;

    let current = result;

    for (let i = 0; i < keyParts.length - 1; i++) {
      const part = keyParts[i];

      if (current[part] === undefined) {
        current[part] = {};
      }

      current = current[part];
    }

    const lastPart = keyParts[keyParts.length - 1];
    current[lastPart] = value;
  }

  return result;
}
