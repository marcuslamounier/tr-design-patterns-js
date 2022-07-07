let Action = Object.freeze({
  deposit: 0,
  withdraw: 1
});

class Command {
  constructor(action, amount) {
    this.action = action;
    this.amount = amount;
    this.success = false;
  }
}

class Account {
  constructor() {
    this.balance = 0;
    // console.log(`Created account. Balance: ${this.balance}`);
  }

  process(cmd) {
    // todo
    switch (cmd.action) {
      case Action.deposit:
        this.balance += cmd.amount;
        console.log(
          `Deposited ${cmd.amount}, updated balance is ${this.balance}`
        );
        cmd.success = true;
        break;
      case Action.withdraw:
        if (this.balance < cmd.amount) {
          console.log(
            `Tried to withdraw ${cmd.amount}. Not enough limit`
          );
          cmd.success = false;
        } else {
          this.balance -= cmd.amount;
          console.log(
            `Withdrew ${cmd.amount}, updated balance is ${this.balance}`
          );
          cmd.success = true;
        }
        break;
    }
    return this;
  }

  toString() {
    return `Balance: ${this.balance}`;
  }
}

let cmd1 = new Command(Action.withdraw, 50);
let cmd2 = new Command(Action.deposit, 100);
let cmd3 = new Command(Action.withdraw, 50);
let account = new Account();
account.process(cmd1).process(cmd2).process(cmd3);
console.log(account.toString());
