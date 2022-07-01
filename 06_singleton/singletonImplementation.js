class Singleton {
  constructor(name) {
    const instance = this.constructor.instance;
    if (instance) {
      console.log('New instantiation is not allowed.');
      return instance;
    }
    this.name = name;
    this.constructor.instance = this;
    console.log('Instantiating . . .');
  }

  static get name() { return this.name; }

  foo() {
    console.log(this.name);
  }
}

let s1 = new Singleton('s1');
let s2 = new Singleton('s2');
let s3 = new Singleton('s3');

s1.foo();
s2.foo();
s3.foo();