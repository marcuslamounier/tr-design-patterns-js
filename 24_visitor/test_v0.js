class Integer {
  constructor(value) {
    this.value = value;
  }

  accept(visitor) {
    visitor.visitValue(this);
  }
}

class BinaryExpression {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  accept(visitor) { }
}

class AdditionExpression extends BinaryExpression {
  constructor(lhs, rhs) {
    super(lhs, rhs);
  }

  accept(visitor) {
    visitor.visitAddition(this);
  }
}

class MultiplicationExpression extends BinaryExpression {
  constructor(lhs, rhs) {
    super(lhs, rhs);
  }

  accept(visitor) {
    visitor.visitMultiplication(this);
  }
}

class Visitor {
  constructor() {
    this.buffer = [];
  }

  visitValue(expression) { }
  visitAddition(expression) { }
  visitMultiplication(expression) { }
}

class ExpressionPrinter extends Visitor {
  constructor() {
    // todo
    super();
  }

  visitValue(value) {
    // todo
    this.buffer.push(value.value);
  }

  visitAddition(ae) {
    // todo
    this.buffer.push('(');
    ae.lhs.accept(this);
    this.buffer.push('+');
    ae.rhs.accept(this);
    this.buffer.push(')');
  }

  visitMultiplication(me) {
    // todo
    me.lhs.accept(this);
    this.buffer.push('*');
    me.rhs.accept(this);
  }

  toString() {
    // todo
    return this.buffer.join('');
  }
}

let ep = new ExpressionPrinter();

let simpleMultiplication = new MultiplicationExpression(
  new Integer(2),
  new MultiplicationExpression(
    new Integer(3),
    new Integer(4)
  )
);
let simpleAddition = new AdditionExpression(new Integer(2), new Integer(3));

ep.visitAddition(simpleAddition);
// ep.visitMultiplication(simpleMultiplication);

console.log(ep.toString());
