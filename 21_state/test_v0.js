let State = Object.freeze({
  locked: 'LOCKED',
  open: 'OPEN',
  error: 'ERROR'
});

class CombinationLock {
  constructor(combination) {
    this.combination = combination;
    this.reset();
    // todo
  }

  reset() {
    // reset lock state here
    this.status = State.locked;
    console.log('Status:', this.status);
  }

  enterDigit(digit) {
    // set this.status depending on state of the lock
    if (this.status !== State.open) {
      if (this.status === State.locked || this.status === State.error) {
        this.status = '';
      }
      let d = digit.toString();
      if (d === this.combination[this.status.length].toString()) {
        this.status += d;
        if (this.status === this.combination.join('')) {
          this.status = State.open;
        }
      } else this.status = State.error;
    }
    console.log('Status:', this.status);
  }
}

let cl = new CombinationLock([1, 2, 3, 4, 5]);
cl.enterDigit(1);
cl.enterDigit(2);
cl.enterDigit(1);
cl.enterDigit(1);
cl.enterDigit(2);
cl.enterDigit(3);
cl.enterDigit(4);
cl.enterDigit(5);
