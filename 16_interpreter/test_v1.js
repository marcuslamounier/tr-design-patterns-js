class ExpressionProcessor {
  constructor() {
    // todo
    this.variables = {};
    this.nextOp = Object.freeze({
      nothing: 0,
      plus: 1,
      minus: 2
    });
  }

  split(input) {
    let result = [];
    let buffer = [];

    for (let ch of input) {
      if (ch === '+' || ch === '-') {
        result.push(`${buffer.join('')}${ch}`);
        buffer = [];
      } else buffer.push(ch);
    }

    if (buffer.length > 0) result.push(buffer.join(''));

    return result;
  }

  calculate(expression) {
    // todo
    let current = 0;
    let nextOp = this.nextOp.nothing;

    let tokens = this.split(expression);

    for (let token of tokens) {
      let noOp = token.split('+-');
      let first = noOp[0];
      let value = 0;
      let parsedValue = parseInt(first);

      if (!isNaN(parsedValue)) value = parsedValue;
      else if (
        first.length === 1 && this.variables[first[0]] !== undefined
      ) value = this.variables[first[0]];
      else return 0;

      switch (nextOp) {
        case this.nextOp.nothing:
          current = value;
          break;
        case this.nextOp.plus:
          current += value;
          break;
        case this.nextOp.minus:
          current -= value;
          break;
      }

      if (token.endsWith('+')) nextOp = this.nextOp.plus;
      else if (token.endsWith('-')) nextOp = this.nextOp.minus;
    }
    return current;
  }
}

let p = new ExpressionProcessor();
p.variables['x'] = 10;
// p.variables['y'] = 10;

let input = "5+10+x";
console.log(input, "=", p.calculate(input));