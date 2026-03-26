class AbstractClass {
  constructor() {
    if (new.target === AbstractClass) throw new Error('Cannot instantiate AbstractClass')
  }
}
