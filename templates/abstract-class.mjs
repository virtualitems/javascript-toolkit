/**
 * Clase base abstracta
 *
 * @abstract
 */
export class AbstractClass {
  /**
   * @throws {Error} Si se intenta instanciar {@link AbstractClass} directamente.
   */
  constructor() {
    if (new.target === AbstractClass) {
      throw new Error('Cannot instantiate AbstractClass')
    }
  }
}
