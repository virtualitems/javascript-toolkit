class Computer {
    public readonly name: string;

    constructor(name: string){
        this.name = name;
    }
}

class Engineer {
    public workOn(computer: Computer) {
        console.log('Engineer is working on the computer:', computer.name);
    }
}

const computer = new Computer('Debian');
const engineer = new Engineer();

// the engineer depends on the computer to work
engineer.workOn(computer);