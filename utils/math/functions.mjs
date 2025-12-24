/**
 * @abstract
 */
export class AbstractFunction {

  constructor() {
    if (new.target === AbstractFunction) {
      throw new Error('Cannot construct AbstractFunction instances directly');
    }
  }

  evaluate(...args) {
    throw new Error('Method "evaluate" must be implemented');
  }

  derivative(...args) {
    throw new Error('Method "derivative" must be implemented');
  }

  integral(...args) {
    throw new Error('Method "integral" must be implemented');
  }
}