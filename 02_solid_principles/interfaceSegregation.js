class Document {

}

class Machine {
  constructor() {
    let constructorName = this.constructor.name;
    if (constructorName === 'Machine') {
      throw new AbstractCannotBeInstantiatedError(constructorName);
    }
  }

  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class Printer {
  constructor() {
    let constructorName = this.constructor.name;
    if (constructorName === 'Printer') {
      throw new AbstractCannotBeInstantiatedError(constructorName);
    }
  }

  print(doc) {}
}

class Scanner {
  constructor() {
    let constructorName = this.constructor.name;
    if (constructorName === 'Scanner') {
      throw new AbstractCannotBeInstantiatedError(constructorName);
    }
  }

  scan(doc) {}
}

class Photocopier {
  constructor() {
    let constructorName = this.constructor.name;
    if (constructorName === 'Photocopier') {
      throw new AbstractCannotBeInstantiatedError(constructorName);
    }
  }

  print(doc) {}
  scan(doc) {}
}

class MultiFunctionPrinter extends Machine {
  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class NotImplementedError extends Error {
  constructor(name) {
    let msg = `${name} is not implemented!`;
    super(msg);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotImplementedError);
    }
  }
}

class AbstractCannotBeInstantiatedError extends Error {
  constructor(name) {
    let msg = `${name} is abstract and cannot be instantiated!`;
    super(msg);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AbstractCannotBeInstantiatedError);
    }
  }
}

class OldFashionedPrinter extends Machine {
  print(doc) {
    super.print(doc);
  }

  fax(doc) {
    // do nothing
    // principle of least surprised.
    throw new NotImplementedError('OldFashionedPrinter.fax')
  }

  scan(doc) {
    throw new NotImplementedError('OldFashionedPrinter.scan')
    // do nothing
  }
}

let printer = new OldFashionedPrinter();
printer.scan();
