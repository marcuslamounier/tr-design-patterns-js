class Person {
  constructor(age = 0) {
    this.age = age;
  }

  drink() { return 'drinking'; }
  drive() { return 'driving'; }
  drinkAndDrive() { return 'driving while drunk'; }
}

class ResponsiblePerson {
  constructor(person) {
    this.person = person;
  }
  // todo

  get age() { return this.person.age; }
  set age(value) { this.person.age = value; }
  static get tooYoung() { return 'too young'; }

  drink() {
    return (this.age >= 18)
      ? this.person.drink()
      : ResponsiblePerson.tooYoung;
  }

  drive() {
    return (this.age >= 16)
      ? this.person.drive()
      : ResponsiblePerson.tooYoung;
  }

  drinkAndDrive() {
    return 'dead';
  }
}

let p = new Person(17);
let rp = new ResponsiblePerson(p);

console.log('Person:')
console.log(p.drink());
console.log(p.drive());
console.log(p.drinkAndDrive());

console.log('\nResponsible Person:')
console.log(rp.drink());
console.log(rp.drive());
console.log(rp.drinkAndDrive());