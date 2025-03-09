class Employee {
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

}

class Company {
    protected employees: Employee[];
    constructor() {
        this.employees = [];
    }

    addEmployee(employee: Employee) {
        this.employees.push(employee);
    }

    showEmployees() {
        for (let i = 0; i < this.employees.length; i++) {
            console.log('employee', i + 1, '->', this.employees[i].name);
        }
    }
}

function startCompany(employees: Employee[]) {
    const company = new Company();
    employees.forEach(employee => company.addEmployee(employee));
    return company;
}

const emp1 = new Employee('John');
const emp2 = new Employee('Jane');
const emp3 = new Employee('Mark');
const emp4 = new Employee('Sara');

let company: Company | null;

company = startCompany([emp1, emp2, emp3, emp4]);
company.showEmployees();
company = null;

// the Employee instances can exist without the Company instance
company = startCompany([emp1, emp2, emp3, emp4]);
company.showEmployees();
company = null;