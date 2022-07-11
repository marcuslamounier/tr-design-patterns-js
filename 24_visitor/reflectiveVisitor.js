class NumberExpression {
  constructor(value) {
    this.value = value;
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
}

class ExpressionPrinter {
  print(expression, buffer) {
    if (expression instanceof NumberExpression) {
      buffer.push(expression.value)
    } else if (expression instanceof AdditionExpression) {
      buffer.push('(');
      this.print(expression.left, buffer);
      buffer.push('+');
      this.print(expression.right, buffer);
      buffer.push(')');
    }
  }
}

let expression = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(
    new AdditionExpression(
      new NumberExpression(2),
      new NumberExpression(3)
    ),
    new NumberExpression(2)
  )
);

let printer = new ExpressionPrinter();
let buffer = [];
printer.print(expression, buffer);

console.log(buffer.join(' '));
