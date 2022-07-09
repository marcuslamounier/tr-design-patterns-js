class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx) {
    this.handlers.delete(idx);
  }

  fire(sender) {
    this.handlers.forEach(v => v(sender));
  }
}

class Game {
  // todo
  constructor() {
    this.ratEnters = new Event();
    this.ratDies = new Event();
    this.notifyRat = new Event();
  }

  fireRatEnters(sender) {
    this.ratEnters.fire(sender);
  }

  fireRatDies(sender) {
    this.ratDies.fire(sender);
  }

  fireNotifyRat(sender) {
    this.notifyRat.fire(sender);
  }
}

class Rat {
  constructor(game) {
    // todo
    this.game = game;
    this.attack = 1;
    this.alive = true;

    game.ratEnters.subscribe(this.handleRatEnters.bind(this));
    game.ratDies.subscribe(this.handleRatDies.bind(this));
    game.notifyRat.subscribe(this.handleNotifyRat.bind(this));
    game.fireRatEnters(this);
  }

  handleRatEnters(sender) {
    if (sender !== this) {
      this.attack++;
      this.game.fireNotifyRat(sender);
    }
  }

  handleRatDies() {
      this.attack--;
  }

  handleNotifyRat(whichRat) {
    if (whichRat === this) this.attack++;
  }

  die() {
    // todo
    if (this.alive) {
      this.alive = false;
      this.game.fireRatDies(this);
    } else console.log('Rat already dead');
  }
}

let game = new Game();
let rat1 = new Rat(game);
let rat2 = new Rat(game);
let rat3 = new Rat(game);
let rat4 = new Rat(game);

console.log(rat1.attack);
console.log(rat2.attack);
console.log(rat3.attack);
console.log(rat4.attack);
console.log('---');
rat1.die();
console.log(rat1.attack);
console.log(rat2.attack);
console.log(rat3.attack);
console.log(rat4.attack);
console.log('---');
rat1.die();
rat2.die();
rat2.die();
console.log(rat1.attack);
console.log(rat2.attack);
console.log(rat3.attack);
console.log(rat4.attack);

console.log('---');
let rat5 = new Rat(game);
console.log(rat1.attack);
console.log(rat2.attack);
console.log(rat3.attack);
console.log(rat4.attack);
console.log(rat5.attack);
