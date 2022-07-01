class Singleton {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      console.log('Already exists');
      return instance;
    }
    console.log('Creating singleton');
    this.constructor.instance = this;
  }
}

class NormalClass {
  constructor() {
    console.log('this is a normal class');
  }
}

class SingletonTester {
  static isSingleton(generator) {
    // todo
    const obj1 = new generator();
    const obj2 = new generator();
    return (obj1 === obj2);
  }
}

console.log(SingletonTester.isSingleton(Singleton));
