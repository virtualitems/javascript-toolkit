/**
 * @description A class representing a mathematical vector with n dimensions.
 */
export class Vector extends Float64Array {

  /**
   * Creates a new Vector instance.
   *
   * @param  {...number} components
   */
  constructor(...components) {
    super(components);
  }

  get dimension() {
    return this.length;
  }

  toString() {
    return `Vector(${Array.from(this).join(', ')})`;
  }

  isEqual(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    const vec1Length = this.dimension;
    const vec2Length = other.dimension;

    if (vec1Length !== vec2Length) return false;

    for (let current = 0; current < vec1Length; current += 1) {
      const vec1Value = this[current];
      const vec2Value = other[current];

      if (vec1Value !== vec2Value) return false;
    }

    return true;
  }

  isParallel(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const length = this.dimension;
    let ratio = null;

    for (let current = 0; current < length; current += 1) {
      const a = this[current];
      const b = other[current];

      if (a === 0 && b === 0) {
        // ambos mantienen la proporción al ser cero
        continue;
      }

      if (ratio === null) {

        if (b === 0 || a === 0) {
          // alguno es cero y el otro no, no son proporcionales
          return false;
        }

        ratio = a / b; // descubrir la proporción

        continue;
      }

      if (a !== (ratio * b)) {
        // a representa el valor del primer vector en la dimensión actual
        // b representa el valor del segundo vector en la dimensión actual
        // ratio representa la proporción descubierta entre los puntos del primer y segundo vector
        // (ratio * b) redimensiona b al tamaño esperado de a
        return false;
      }
    }

    return true;
  }

  isPerpendicular(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    return this.dot(other) === 0;
  }

  isOpposite(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const length = this.dimension;

    for (let current = 0; current < length; current += 1) {
      const vec1Value = this[current];
      const vec2Value = other[current];

      if (vec1Value !== (vec2Value * -1)) {
        return false;
      }
    }

    return true;
  }

  resize(newDimension) {
    if ('number' !== typeof newDimension) throw new TypeError('Dimension must be a number');

    if (!Number.isInteger(newDimension)) throw new TypeError('Dimension must be an integer');

    if (newDimension < 0) throw new RangeError('Dimension must be non-negative');

    const components = Array(newDimension);

    for (let current = 0; current < newDimension; current += 1) {
      const value = this[current] ?? 0;
      components[current] = value;
    }

    return new Vector(...components);
  }

  vectorComponent(index) {
    if (typeof index !== 'number') throw new TypeError('Index must be a number');

    if (index < 0 || index >= this.dimension) throw new RangeError('Index out of bounds');

    const components = Array(this.dimension).fill(0);

    components[index] = this[index];

    return new Vector(...components);
  }

  scalarComponent(index) {
    if (typeof index !== 'number') throw new TypeError('Index must be a number');

    if (index < 0 || index >= this.dimension) throw new RangeError('Index out of bounds');

    return this[index];
  }

  add(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const length = this.dimension;
    const components = Array(length);

    for (let current = 0; current < length; current += 1) {
      const vec1Value = this[current];
      const vec2Value = other[current];
      components[current] = vec1Value + vec2Value;
    }

    return new Vector(...components);
  }

  sub(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const length = this.dimension;
    const components = Array(length);

    for (let current = 0; current < length; current += 1) {
      const vec1Value = this[current];
      const vec2Value = other[current];
      components[current] = vec1Value - vec2Value;
    }

    return new Vector(...components);
  }

  scale(scalar) {
    if ('number' !== typeof scalar) throw new TypeError('Argument must be a number');

    const length = this.dimension;

    let result = 0;

    for (let current = 0; current < length; current += 1) {
      const value = this[current];
      result += value * scalar;
    }

    return result;
  }

  dot(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const length = this.dimension;
    let result = 0;

    for (let current = 0; current < length; current += 1) {
      const vec1Value = this[current];
      const vec2Value = other[current];
      result += vec1Value * vec2Value;
    }

    return result;
  }

  cross(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== 3 || other.dimension !== 3) throw new Error('Cross product is only defined for 3-dimensional vectors');

    const x1 = this[0];
    const x2 = this[1];
    const x3 = this[2];

    const y1 = other[0];
    const y2 = other[1];
    const y3 = other[2];

    const i = x2 * y3 - x3 * y2;
    const j = x3 * y1 - x1 * y3;
    const k = x1 * y2 - x2 * y1;

    return new Vector(i, j, k);
  }

  magnitude() {
    return Math.sqrt(this.dot(this));
  }

  parallelogramArea(other) {
    const crossProduct = this.cross(other);
    return crossProduct.magnitude();
  }

  angle(other, inDegrees = false) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const dotProduct = this.dot(other);
    const magnitudeA = this.magnitude();
    const magnitudeB = other.magnitude();

    const cosTheta = dotProduct / (magnitudeA * magnitudeB);

    const angle = Math.acos(cosTheta);

    if (inDegrees) {
      return angle * (180 / Math.PI);
    }

    return angle;
  }

  distanceTo(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const difference = this.sub(other);

    return difference.magnitude();
  }

  hadamard(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.length !== other.length) throw new Error('Vectors must have the same dimension');

    const length = this.length;
    const components = Array(length);

    for (let current = 0; current < length; current += 1) {
      components[current] = this[current] * other[current];
    }

    return new Vector(...components);
  }
}
