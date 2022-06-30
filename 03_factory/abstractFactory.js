const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// In Javascript, there is no abstract distinction in
// classes and their methods. So we leave the method
// blank for representing the abstract methods.

class HotDrink {
  consume() { /* abstract */ }
}

class Tea extends HotDrink {
  consume() {
    console.log('This tea is nice with lemon');
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log('This coffee is delicious');
  }
}

class HotDrinkFactory {
  prepare(amount) { /* abstract */ }
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Tea();
  }
}

class CoffeeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Grind some beans, boil water, pour ${amount}ml`);
    return new Coffee();
  }
}

let AvailableDrink = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory
});

class HotDrinkMachine {
  constructor() {
    this.factories = {};
    for (let drink in AvailableDrink) {
      this.factories[drink] = new AvailableDrink[drink]();
    }
  }

  interact(consumer) {
    rl.question(
      'Please specify drink and amount ' +
      '(e.g., tea 50): ', answer => {
        let parts = answer.split(' ');
        let name = parts[0];
        let amount = parseInt(parts[1]);
        let d = this.factories[name].prepare(amount);

        rl.close();
        consumer(d);
      }
    )
  }
}

let machine = new HotDrinkMachine();
machine.interact(
  function(drink) {
    drink.consume();
  }
)
