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
    let oldCanVote = this.canVote;
    console.log(`Changing age to ${value}`);
    this._age = value;
    this.propertyChanged.fire(
      this,
      new PropertyChangedArgs('age', value)
    );
    if (oldCanVote !== this.canVote) {
      this.propertyChanged.fire(
        this,
        new PropertyChangedArgs('canVote', this.canVote)
      );
    }
  }

  get canVote() { return this._age >= 16; }
}

class VotingChecker {
  constructor(person) {
    this.person = person;
    this.person.propertyChanged.subscribe(this.votingChanged.bind(this));
  }

  votingChanged(sender, args) {
    if (sender === this.person && args.name === 'canVote') {
      console.log(`Voting changed to ${args.newValue}`);
    }
  }
}

let person = new Person(12);
let checker = new VotingChecker(person);
for (let i = 10; i < 20; i++) {
  person.age = i;
}
