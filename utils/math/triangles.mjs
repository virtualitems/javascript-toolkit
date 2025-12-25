export class Triangle {

  static area(base, height) {
    if (base <= 0 || height <= 0) {
      throw new Error('Base and height must be positive numbers');
    }
    return 0.5 * base * height;
  }

  static perimeter(sideA, sideB, sideC) {
    if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
      throw new Error('All sides must be positive numbers');
    }
    if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
      // Triangle inequality theorem: sum of any two sides must be greater than the third
      throw new Error('Invalid triangle: sum of any two sides must be greater than the third side');
    }
    return sideA + sideB + sideC;
  }

  static sin(opposite, hypotenuse) {
    if (hypotenuse === 0) {
      throw new Error('Hypotenuse cannot be zero');
    }
    if (hypotenuse <= 0 || opposite < 0) {
      throw new Error('Hypotenuse must be positive and opposite must be non-negative');
    }
    if (opposite > hypotenuse) {
      throw new Error('Opposite side cannot be greater than hypotenuse');
    }
    return opposite / hypotenuse;
  }

  static cos(adjacent, hypotenuse) {
    if (hypotenuse === 0) {
      throw new Error('Hypotenuse cannot be zero');
    }
    if (hypotenuse <= 0 || adjacent < 0) {
      throw new Error('Hypotenuse must be positive and adjacent must be non-negative');
    }
    if (adjacent > hypotenuse) {
      throw new Error('Adjacent side cannot be greater than hypotenuse');
    }
    return adjacent / hypotenuse;
  }

  static tan(opposite, adjacent) {
    if (adjacent === 0) {
      throw new Error('Adjacent side cannot be zero (undefined at 90°)');
    }
    if (opposite < 0 || adjacent < 0) {
      throw new Error('Sides must be non-negative');
    }
    return opposite / adjacent;
  }

  static cot(adjacent, opposite) {
    if (opposite === 0) {
      throw new Error('Opposite side cannot be zero (undefined at 0°)');
    }
    if (adjacent < 0 || opposite < 0) {
      throw new Error('Sides must be non-negative');
    }
    return adjacent / opposite;
  }

  static sec(hypotenuse, adjacent) {
    if (adjacent === 0) {
      throw new Error('Adjacent side cannot be zero (undefined at 90°)');
    }
    if (hypotenuse <= 0 || adjacent < 0) {
      throw new Error('Hypotenuse must be positive and adjacent must be non-negative');
    }
    if (adjacent > hypotenuse) {
      throw new Error('Adjacent side cannot be greater than hypotenuse');
    }
    return hypotenuse / adjacent;
  }

  static csc(hypotenuse, opposite) {
    if (opposite === 0) {
      throw new Error('Opposite side cannot be zero (undefined at 0°)');
    }
    if (hypotenuse <= 0 || opposite < 0) {
      throw new Error('Hypotenuse must be positive and opposite must be non-negative');
    }
    if (opposite > hypotenuse) {
      throw new Error('Opposite side cannot be greater than hypotenuse');
    }
    return hypotenuse / opposite;
  }
}