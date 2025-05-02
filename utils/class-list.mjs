export class ClassList extends Set {
  toggle(className) {
    if (this.has(className)) {
      this.delete(className);
    } else {
      this.add(className);
    }
  }

  replace(oldClassName, newClassName) {
    if (this.has(oldClassName)) {
      this.delete(oldClassName);
      this.add(newClassName);
    }
  }

  toString() {
    return Array.from(this).join(' ');
  }
}
