class SuperClass {
    constructor() {}

    public log(data: string) {
        console.log(data);
    }
}

class SubClass extends SuperClass {
    constructor() {
        super();
    }
}

const instance = new SubClass();
instance.log('Greetings!');
