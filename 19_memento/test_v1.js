class Token {
  constructor(value = 0) {
    this.value = value;
  }
}

class Memento {
  constructor() {
    this.tokens = [];
  }
}

class TokenMachine {
  constructor() {
    // todo
    this.tokens = [];
  }

  addTokenValue(value) {
    return this.addToken(new Token(value));
  }

  addToken(token) {
    // todo
    this.tokens.push(token);
    let memento = new Memento();
    for (token of this.tokens) {
      memento.tokens.push(new Token(token.value));
    }
    return memento;
  }

  revert(m) {
    // todo
    if (m) {
      let newTokens = [];
      for (let token of m.tokens) newTokens.push(new Token(token.value));
      this.tokens = newTokens;
    }
  }
}

let machine = new TokenMachine();
let m1 = machine.addTokenValue(1);
let m2 = machine.addTokenValue(2);
let m3 = machine.addTokenValue(3);
let m4 = machine.addTokenValue(4);
console.log(m1.tokens);
console.log(m2.tokens);

machine.revert(m1);
console.log(machine);
// machine.revert(m2);
// machine.revert(m3);
// machine.revert(m3);