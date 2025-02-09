class AbstractClass {
  constructor() {
    if (new.target === AbstractClass) {
      throw new Error('Cannot instantiate AbstractClass');
    }
  }

  abstractMethod() {
    throw new Error('method not implemented');
  }
}


class ConcreteClass extends AbstractClass {
  abstractMethod() {
    console.log('ConcreteClass.abstractMethod() called');
  }
}


// const instance = new AbstractClass(); // Error
const instance = new ConcreteClass(); // Works
instance.abstractMethod(); // subclass implementation
