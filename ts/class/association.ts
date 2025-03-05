class Employee {
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

}

class Department {
    protected employees: Employee[];
    constructor() {
        this.employees = [];
    }

    addEmployee(employee: Employee) {
        this.employees.push(employee);
    }

    showEmployees() {
        for (let i=0; i<this.employees.length; i++) {
            console.log('employee', i+1, '->', this.employees[i].name);
        }
    }
}


const emp1 = new Employee('John');
const emp2 = new Employee('Jane');
const emp3 = new Employee('Mark');
const emp4 = new Employee('Sara');

const department = new Department();
department.addEmployee(emp1);
department.addEmployee(emp2);
department.addEmployee(emp3);
department.addEmployee(emp4);

department.showEmployees();