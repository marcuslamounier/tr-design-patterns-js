class SingleValue {
  constructor(value) {
    // todo
    this.value = value;
  }

  [Symbol.iterator]() {
    let returned = false;
    return {
      next: () => ({
        value: this.value,
        done: returned++
      })
    };
  }
}

class ManyValues extends Array {
  constructor() {
    super();
  }
    // ensure there's a push(value) method
}

let sum = function(containers){
  // todo
  let total = 0;
  for (let c of containers) {
    for (let i of c) total += i;
  }
  return total;
};

let singleValue = new SingleValue(11);
let otherValues = new ManyValues();
otherValues.push(22);
otherValues.push(33);

console.log(sum([singleValue, otherValues]));