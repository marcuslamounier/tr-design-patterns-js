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
    this.changes = [new Memento()];
    this.current = 0;
  }

  addTokenValue(value) {
    return this.addToken(new Token(value));
  }

  addToken(token) {
    // todo
    this.tokens.push(token);
    let memento = new Memento();
    for (token of this.tokens) memento.tokens.push(token);
    this.changes.push(memento);
    this.current++;
    return memento;
  }

  revert(m) {
    // todo
    if (m) {
      console.log(m)
      let current = this.current;
      this.current = this.changes.findIndex(memento => memento === m);
      
      if (current === this.current) console.log('Nothing to revert');
      else {
        this.tokens = m.tokens;
        console.log('Reverting');
        console.log(this.tokens);
      }
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
// machine.revert(m2);
// machine.revert(m3);
// machine.revert(m3);