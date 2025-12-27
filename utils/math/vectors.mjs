/**
 * @description A class representing a parallelogram defined by two free vectors.
 */
export class Parallelogram {

  /**
   * Creates a new Parallelogram instance.
   *
   * @param {Vector} vectorA
   * @param {Vector} vectorB
   */
  constructor(vectorA, vectorB) {
    if (!(vectorA instanceof Vector)) throw new TypeError('vectorA must be a Vector');
    if (!(vectorB instanceof Vector)) throw new TypeError('vectorB must be a Vector');

    if (vectorA.dimension !== vectorB.dimension) {
      throw new Error('Vectors must have the same dimension to define a parallelogram');
    }

    this.vectorA = vectorA;
    this.vectorB = vectorB;
  }

  area() {
    return this.vectorA.cross(this.vectorB).magnitude();
  }

  perimeter() {
    const sideA = this.vectorA.magnitude();
    const sideB = this.vectorB.magnitude();
    return 2 * (sideA + sideB);
  }
}

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

  // ─────────────────────────────────────────────────────────────────────────────
  // Primitives
  // ─────────────────────────────────────────────────────────────────────────────

  isEqual(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) {
      throw new Error('Vectors must have the same dimension');
    }

    const length = this.dimension;

    for (let current = 0; current < length; current += 1) {
      if (this[current] !== other[current]) return false;
    }

    return true;
  }

  isParallel(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    // En álgebra lineal: 0 es dependiente lineal de cualquier vector (misma dimensión)
    if (this.magnitude() === 0 || other.magnitude() === 0) return true;

    const length = this.dimension;
    let ratio = null;

    for (let current = 0; current < length; current += 1) {
      const a = this[current];
      const b = other[current];

      if (a === 0 && b === 0) continue;

      if (ratio === null) {
        if (b === 0 || a === 0) return false;
        ratio = a / b;
        continue;
      }

      if (a !== (ratio * b)) return false;
    }

    return true;
  }

  isOrthogonal(other) {
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

  // ─────────────────────────────────────────────────────────────────────────────
  // Scalars
  // ─────────────────────────────────────────────────────────────────────────────

  scalarComponent(index) {
    if (typeof index !== 'number') throw new TypeError('Index must be a number');

    if (index < 0 || index >= this.dimension) throw new RangeError('Index out of bounds');

    return this[index];
  }

  magnitude() {
    return Math.sqrt(this.dot(this));
  }

  dot(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const length = this.dimension;
    let result = 0;

    for (let current = 0; current < length; current += 1) {
      result += this[current] * other[current];
    }

    return result;
  }

  angleBetween(other, inDegrees = false) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const magnitudeA = this.magnitude();
    const magnitudeB = other.magnitude();

    if (magnitudeA === 0 || magnitudeB === 0) {
      throw new Error('Angle is undefined for the zero vector');
    }

    const cosTheta = this.dot(other) / (magnitudeA * magnitudeB);

    // Evita NaN por redondeo fuera de [-1, 1]
    const clamped = Math.min(1, Math.max(-1, cosTheta));

    const angle = Math.acos(clamped);

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

  // ─────────────────────────────────────────────────────────────────────────────
  // Vectors
  // ─────────────────────────────────────────────────────────────────────────────

  clone() {
    return new Vector(...this);
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

  add(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const length = this.dimension;
    const components = Array(length);

    for (let current = 0; current < length; current += 1) {
      components[current] = this[current] + other[current];
    }

    return new Vector(...components);
  }

  sub(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const length = this.dimension;
    const components = Array(length);

    for (let current = 0; current < length; current += 1) {
      components[current] = this[current] - other[current];
    }

    return new Vector(...components);
  }

  scale(scalar) {
    if ('number' !== typeof scalar) throw new TypeError('Argument must be a number');

    const length = this.dimension;
    const components = Array(length);

    for (let current = 0; current < length; current += 1) {
      components[current] = this[current] * scalar;
    }

    return new Vector(...components);
  }

  /**
   * Computes the cross product of this vector with another vector.
   *
   * @param {Vector} other
   * @returns {Vector}
   *
   * @throws {Error} If either vector is not 3-dimensional
   */
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

  /**
   * Returns the unit vector (normalized vector) in the same direction.
   * The unit vector is calculated as v / ||v||
   *
   * @returns {Vector} A new Vector with magnitude 1
   * @throws {Error} If the vector has zero magnitude
   */
  normalize() {
    const magnitude = this.magnitude();

    if (magnitude === 0) throw new Error('Cannot normalize a zero vector');

    const length = this.dimension;
    const components = Array(length);

    for (let current = 0; current < length; current += 1) {
      components[current] = this[current] / magnitude;
    }

    return new Vector(...components);
  }

  hadamard(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');

    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const length = this.dimension;
    const components = Array(length);

    for (let current = 0; current < length; current += 1) {
      components[current] = this[current] * other[current];
    }

    return new Vector(...components);
  }

  /**
   * Rotates the vector in the plane defined by two axes.
   * Uses Givens rotation matrix for n-dimensional rotation.
   *
   * @param {number} axisI - First axis index (0-based)
   * @param {number} axisJ - Second axis index (0-based)
   * @param {number} angleInRadians - The angle to rotate
   * @returns {Vector} A new rotated Vector
   */
  rotate(axisI, axisJ, angleInRadians) {
    if (typeof axisI !== 'number') throw new TypeError('axisI must be a number');
    if (typeof axisJ !== 'number') throw new TypeError('axisJ must be a number');
    if (typeof angleInRadians !== 'number') throw new TypeError('angleInRadians must be a number');

    if (!Number.isInteger(axisI) || !Number.isInteger(axisJ)) {
      throw new TypeError('Axis indices must be integers');
    }

    if (axisI < 0 || axisI >= this.dimension) throw new RangeError('axisI out of bounds');
    if (axisJ < 0 || axisJ >= this.dimension) throw new RangeError('axisJ out of bounds');
    if (axisI === axisJ) throw new Error('Rotation axes must be different');

    const cos = Math.cos(angleInRadians);
    const sin = Math.sin(angleInRadians);

    const components = Array.from(this);

    const vi = this[axisI];
    const vj = this[axisJ];

    // Givens rotation: only affects components at axisI and axisJ
    components[axisI] = vi * cos - vj * sin;
    components[axisJ] = vi * sin + vj * cos;

    return new Vector(...components);
  }

  /**
   * Projects this vector onto another vector.
   * project(u) => ((u·v)/(v·v)) * v
   *
   * @param {Vector} other
   * @returns {Vector} The projection of this vector onto the other vector
   */
  projectOnto(other) {
    if (!(other instanceof Vector)) throw new TypeError('Argument must be a Vector');
    if (this.dimension !== other.dimension) throw new Error('Vectors must have the same dimension');

    const denom = other.dot(other);
    if (denom === 0) throw new Error('Projection is undefined onto the zero vector');

    return other.scale(this.dot(other) / denom);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Shapes
  // ─────────────────────────────────────────────────────────────────────────────

  parallelogram(other) {
    return new Parallelogram(this, other);
  }
}
