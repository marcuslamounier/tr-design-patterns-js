class Memento {
  constructor(balance) {
    this.balance = balance;
  }
}

class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
    this.changes = [new Memento(balance)];
    this.current = 0;
  }

  deposit(amount) {
    this.balance += amount;
    let memento = new Memento(this.balance);
    this.changes.push(memento);
    this.current++;
    console.log(`Depositing ${amount}`);
    return memento;
  }

  restore(memento) {
    if (memento) {
      let current = this.current;
      this.balance = memento.balance;
      this.current = this.changes.findIndex(mem => mem === memento);
      if (current !== this.current) {
        console.log(`Restoring to position ${this.current}`);
      }
    }
  }

  undo() {
    if (this.current > 0) {
      let memento = this.changes[--this.current];
      this.balance = memento.balance;
      console.log('Undoing');
      return memento;
    } else console.log('Nothing to undo');
    return null;
  }

  redo() {
    if (this.current + 1 < this.changes.length) {
      let memento = this.changes[++this.current];
      this.balance = memento.balance;
      console.log('Redoing');
      return memento;
    } else console.log('Nothing to redo');
    return null;
  }

  toString() {
    return `Balance: ${this.balance}`;
  }
}

let account = new BankAccount(100);
console.log(account.toString());

let m1 = account.deposit(25);
console.log(account.toString());
let m2 = account.deposit(50);
console.log(account.toString());

account.restore(m1);
console.log(account.toString());

account.restore(m2);
console.log(account.toString());

account.restore(m1);
console.log(account.toString());

account.undo();
console.log(account.toString());

account.undo();
console.log(account.toString());

account.undo();
console.log(account.toString());

account.undo();
console.log(account.toString());

account.redo();
console.log(account.toString());

account.redo();
console.log(account.toString());

account.redo();
console.log(account.toString());
