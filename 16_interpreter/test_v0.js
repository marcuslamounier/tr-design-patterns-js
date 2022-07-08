let variables = Object.freeze({
  x: 1
})

let TokenType = Object.freeze({
  integer: 0,
  plus: 1,
  minus: 2
});

let Operation = Object.freeze({
  addition: 1,
  subtraction: 2
});

class Integer {
  constructor(value) {
    this.value = value;
  }
}

class Expression {
  constructor() {
    this.type = null;
    this.left = null;
    this.right = null;
  }

  get value() {
    switch (this.type) {
      case Operation.addition:
        return this.left.value + this.right.value;
      case Operation.subtraction:
        return this.left.value - this.right.value;
    }
    return 0;
  }
}

class Token {
  constructor(type, text) {
    this.type = type;
    this.text = text;
  }

  toString() {
    return `\`${this.text}\``;
    // return `${this.text}`;
  }
}

class ExpressionProcessor {
  constructor() {
    // todo
    this.type = null;
    this.left = null;
    this.right = null;
    this.err = false;
  }

  calculate(expression) {
    // todo
    switch (this.type) {
      case TokenType.plus:
        return this.left.value + this.right.value;
      case TokenType.minus:
        return this.left.value - this.right.value;
    }
    return 0;
  }
}

function isLetter(ch) {
  return ch.match(/[a-z]/i);
}

function isNumber(ch) {
  return '0123456789'.includes(ch);
}


function lex(input) {
  let result = [];
  for (let i = 0; i < input.length; i++) {
    switch (input[i]) {
      case '+':
        result.push(new Token(TokenType.plus, '+'));
        break;
      case '-':
        result.push(new Token(TokenType.minus, '-'));
        break;
      default:
        if (isLetter(input[i])) {
          if (i + 1 < input.length && isLetter(input[i + 1])) {
            return false;
          } else result.push(
            new Token(TokenType.integer, variables[input[i]])
          );
        } else if (isNumber(input[i])) {
          let buffer = [input[i]];
          for (let j = i + 1; j < input.length; j++) {
            if (isNumber(input[j])) {
              buffer.push(input[j]);
              i++;
            } else {
              console.log('buffer', buffer)
              result.push(
                new Token(TokenType.integer, buffer.join(''))
              );
              break;
            }
          }
        } else return false;
    }
  }

  return result;
}

let input = "10+2+3x";
console.log(input);

let tokens = lex(input);
console.log(tokens.join(' '));