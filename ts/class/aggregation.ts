class LicensePlate {
    public readonly code: string;

    constructor(code: string) {
        this.code = code;
    }
}

class Car {
    public plate: LicensePlate | null;

    constructor() {
        this.plate = null;
    }

    public identify() {
        if (this.plate === null) {
            console.log('No plate');
        }

        console.log(`Plate: ${this.plate?.code}`);
    }
}

// the car does not depend on the license plate to exist
// it can be created without it and set it later
const car = new Car();

car.plate = new LicensePlate('ABC-123');

car.identify();