export class Triangle {

  static area(base, height) {
    return 0.5 * base * height;
  }

  static perimeter(sideA, sideB, sideC) {
    return sideA + sideB + sideC;
  }

  static sin(opposite, hypotenuse) {
    return opposite / hypotenuse;
  }

  static cos(adjacent, hypotenuse) {
    return adjacent / hypotenuse;
  }

  static tan(opposite, adjacent) {
    return opposite / adjacent;
  }

  static cot(adjacent, opposite) {
    return adjacent / opposite;
  }

  static sec(hypotenuse, adjacent) {
    return hypotenuse / adjacent;
  }

  static csc(hypotenuse, opposite) {
    return hypotenuse / opposite;
  }
}