class Engine {
    public start() {
        console.log('Engine is starting...');
    }
}

class Car {
    protected engine: Engine;

    // the Car depends on the Engine to exist
    constructor(engine: Engine) {
        this.engine = engine;
    }

    public start() {
        console.log('Car is starting...');
        this.engine.start();
    }
}

const engine = new Engine();
const car = new Car(engine);
car.start();
