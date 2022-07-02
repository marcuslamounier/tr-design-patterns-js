class Animal {
  constructor(age = 0) {
    this._age = age;
  }

  get age() { return this._age; }
  set age(value) { this._age = value; }
}

class Bird extends Animal {
  constructor(age = 0) {
    super(age);
  }
  fly() {
    return this.age < 10 ? 'flying' : 'too old';
  }
}

class Lizard extends Animal {
  constructor(age = 0) {
    super(age);
  }
  crawl() {
    return this.age > 1 ? 'crawling' : 'too young';
  }
}

class Dragon extends Animal {
  // todo: API members
  constructor(age = 0) {
    super(age);
    this._bird = new Bird(age);
    this._lizard = new Lizard(age);
  }

  get age() { return this._age; }
  set age(value) {
    this._age = this._bird._age = this._lizard._age = value;
  }

  fly() {
    return this._bird.fly();
  }

  crawl() {
    return this._lizard.crawl();
  }
}

let d = new Dragon();
console.log(d.crawl());
console.log(d.fly());
d.age = 15;
console.log(d.crawl());
console.log(d.fly());
