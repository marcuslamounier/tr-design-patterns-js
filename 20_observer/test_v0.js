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
    this._rats = 0;
    this.ratsChanged = new Event();
  }

  get rats() { return this._rats; }
  set rats(value) {
    this._rats = value;
    this.ratsChanged.fire(this);
  }
}

class Rat {
  constructor(game) {
    // todo
    this.game = game;
    this.attack = 1;
    this.alive = true;
    this.game.ratsChanged.subscribe(this.attackChanged.bind(this));
    this.game.rats++;
  }

  attackChanged(sender) {
    if (sender === this.game) this.attack = this.game.rats;
  }

  die() {
    // todo
    if (this.alive) {
      this.game.rats--;
      this.alive = false;
    } else console.log('this rat is already dead');
  }
}

let game = new Game();
let rat1 = new Rat(game);
let rat2 = new Rat(game);
// let rat3 = new Rat(game);
rat1.die();
// rat1.die();
// rat2.die();