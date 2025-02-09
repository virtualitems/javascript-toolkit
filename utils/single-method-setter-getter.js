/**
 * @description Example of a class with a getter and setter pattern with a single method.
 *
 * @example
 * const cnt = new Content('default'); // default value
 * cnt.value('new'); // set value
 * cnt.value(); // get value
 *
 */
class Content {

  constructor(value) {
    this._value = value ?? null;
  }

  value(val) {
    if (val === undefined) {
      return this._value;
    }
    this._value = val;
  }


}
