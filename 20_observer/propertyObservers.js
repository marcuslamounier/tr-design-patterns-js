class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx) {
    this.handlers.delete(idx);
  }

  fire(sender, args) {
    this.handlers.forEach(v => v(sender, args));
  }
}

class PropertyChangedArgs {
  constructor(name, newValue) {
    this.name = name;
    this.newValue = newValue;
  }
}

class Person {
  constructor(age) {
    this._age = age;
    this.propertyChanged = new Event();
  }

  get age() { return this._age; }
  set age(value) {
    if (!value) return;
    else if (value <= this.age) {
      console.log('Age is higher than this');
      return;
    }
    console.log(`Changing age to ${value}`);
    this._age = value;
    this.propertyChanged.fire(
      this,
      new PropertyChangedArgs('age', value)
    );
  }
}

class RegistrationChecker {
  constructor(person) {
    this.person = person;
    this.token = person.propertyChanged.subscribe(
      this.ageChanged.bind(this)
    );
  }

  ageChanged(sender, args) {
    if (sender === this.person && args.name === 'age') {
      if (args.newValue < 13) console.log('Too young for registering');
      else {
        console.log('Okay, you can register.');
        sender.propertyChanged.unsubscribe(this.token);
      }
    }
  }
}

let person = new Person(5);
let checker = new RegistrationChecker(person);
// for (let i = person.age; i < 20; i++) {
for (let i = 0; i < 20; i++) {
  person.age = i;
}
