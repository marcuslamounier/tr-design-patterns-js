let TokenType = Object.freeze({
  integer: 0,
  plus: 1,
  minus: 2,
  leftParen: 3,
  rightParen: 4
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

class BinaryOperation {
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
      case '(':
        result.push(new Token(TokenType.leftParen, '('));
        break;
      case ')':
        result.push(new Token(TokenType.rightParen, ')'));
        break;
      default:
        let buffer = [input[i]];
        for (let j = i + 1; j < input.length; j++) {
          if ('0123456789'.includes(input[j])) {
            buffer.push(input[j]);
            i++;
          } else {
            result.push(new Token(TokenType.integer, buffer.join('')));
            break;
          }
        }
        break;
    }
  }

  return result;
}

function parse(tokens) {
  let result = new BinaryOperation();
  let haveLHS = false;

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    switch (token.type) {
      case TokenType.integer:
        let integer = new Integer(parseInt(token.text));
        if (!haveLHS) {
          result.left = integer;
          haveLHS = true;
        } else result.right = integer;
        break;
      case TokenType.plus:
        result.type = Operation.addition;
        break;
      case TokenType.minus:
        result.type = Operation.subtraction;
        break;
      case TokenType.leftParen:
        let j = i;
        for (; j < tokens.length; j++) {
          if (tokens[j].type === TokenType.rightParen) break;
        }
        let subExpression = tokens.slice(i + 1, j);
        let element = parse(subExpression);
        if (!haveLHS) {
          result.left = element;
          haveLHS = true;
        } else result.right = element;
        i = j;
        break;
    }
  }
  return result;
}

let input = "(13+4)-(12+2)";
console.log(input);

let tokens = lex(input);
console.log(tokens.join(' '));

let parsed = parse(tokens);
console.log(`${input} = ${parsed.value}`);
