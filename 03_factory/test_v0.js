let autoId = 0;

class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static get factory() {
    return new PersonFactory();
  }
}

class PersonFactory {
  static get nextId() { return autoId; }
  static incrementId() { autoId++; }

  createPerson(name) {
    // todo
    let id = PersonFactory.nextId;
    PersonFactory.incrementId();
    return new Person(id, name);
  }
}

// const peopleNumber = 5;
// let people = [];
// for (let i = 0; i < peopleNumber; i++) {
//   let person = Person.factory.createPerson(
//     'Person ' + i.toString()
//   );
//   people.push(person);
//   console.log(person);
// }
