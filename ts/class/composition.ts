class Contact {
    constructor(
        protected name: string,
        protected email: string,
    ) { }
}

class ContactBook {
    protected contacts: Contact[];

    public register(name: string, email: string) {
        this.contacts.push(new Contact(name, email));
    }
}

let contactBook: ContactBook | null = new ContactBook();

contactBook.register('John', 'john@example.com');
contactBook.register('Jane', 'jane@example.com');

contactBook = null; // the Contact instances are destroyed as well
