class Percentage {
  constructor(percent) {
    this.percent = percent;
  }

  toString() {
    return `${this.percent}%`
  }

  valueOf() {
    return this.percent / 100;
  }
}

let fivePercent = new Percentage(50);
console.log(fivePercent.toString());
console.log(`50% of 50 is ${50 * fivePercent.valueOf()}`);
