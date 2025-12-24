export class Triangle {
  constructor(angle1, angle2, angle3) {

    const angle1IsNumber = 'number' === typeof angle1;
    const angle2IsNumber = 'number' === typeof angle2;
    const angle3IsNumber = 'number' === typeof angle3;

    if ((angle1 !== null) && (!angle1IsNumber || angle1 < 0)) {
      throw new TypeError('angle1 must be a positive number or null');
    }

    if ((angle2 !== null) && (!angle2IsNumber || angle2 < 0)) {
      throw new TypeError('angle2 must be a positive number or null');
    }

    if ((angle3 !== null) && (!angle3IsNumber || angle3 < 0)) {
      throw new TypeError('angle3 must be a positive number or null');
    }

    const angleSum = (angle1 ?? 0) + (angle2 ?? 0) + (angle3 ?? 0);

    if (angle1IsNumber && angle2IsNumber && angle3IsNumber && angleSum !== 180) {
      throw new Error('The sum of the angles in a triangle must be 180 degrees');
    }

    if (angleSum >= 180) {
      throw new Error('The sum of the angles in a triangle must be less than 180 degrees');
    }

    this.angle1 = angle1;
    this.angle2 = angle2;
    this.angle3 = angle3;
  }
}