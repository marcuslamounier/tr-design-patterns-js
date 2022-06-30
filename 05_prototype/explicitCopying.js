class Address {
  constructor(suite, streetAddress, city) {
    this.suite = suite;
    this.streetAddress = streetAddress;
    this.city = city;
  }

  toString() {
    return (
      `Suite ${this.suite}, ` +
      `${this.streetAddress}, ${this.city}`
    );
  }
}

class Employee {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} lives at ${this.address.toString()}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}, ` +
      `I live at ${this.address.toString()}`
    );
  }
}

class Serializer {
  constructor(types) {
    this.types = types;
  }

  markRecursive(object) {
    let idx = this.types.findIndex(type => {
      return type.name === object.constructor.name;
    });
    if (idx !== -1) {
      object['typeIndex'] = idx;
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key]) {
          this.markRecursive(object[key]);
        }
      }
    }
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty('typeIndex')) {
      let type = this.types[object.typeIndex];
      let obj = new type();
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key]) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

class EmployeeFactory {
  static _newEmployee(proto, name, suite) {
    let copy = EmployeeFactory.serializer.clone(proto);
    copy.name = name;
    copy.address.suite = suite;
    return copy;
  }

  static newMainOfficeEmployee(name, suite) {
    return this._newEmployee(
      EmployeeFactory.main, name, suite
    );
  }

  static newAuxOfficeEmployee(name, suite) {
    return this._newEmployee(
      EmployeeFactory.aux, name, suite
    );
  }
}

EmployeeFactory.serializer = new Serializer([Employee, Address]);

// head company office,
let mainAddress = new Address(null, '123 East Dr', 'London')
EmployeeFactory.main = new Employee(null, mainAddress);

// aux company office
let auxAddress = new Address(null, '200 London Rd', 'Oxford')
EmployeeFactory.aux = new Employee(null, auxAddress);

let john = EmployeeFactory.newMainOfficeEmployee('John', 55);
let jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 66);

console.log(john.toString());
console.log(jane.toString());

john.greet();
jane.greet();