class Creature {
  constructor(attack, health) {
    this._attack = attack;
    this._health = health;
    this.id = ++Creature.count;
  }

  get attack() {
    return this._attack;
  }

  get health() {
    return this._health;
  }

  set health(value) {
    this._health = value;
  }
}
Creature.count = 0;

class CardGame {
  constructor(creatures) {
    this.creatures = creatures;
  }

  // returns index of winner if there's a winner
  // returns -1 if there's no winner (both alive or both dead)
  combat(creature1index, creature2index) {
    let first = this.creatures[creature1index];
    let second = this.creatures[creature2index];
    this.hit(first, second);
    this.hit(second, first);
    let firstAlive = first.health > 0;
    let secondAlive = second.health > 0;
    if (firstAlive === secondAlive) return -1;
    return firstAlive ? creature1index : creature2index;
  }

  hit(attacker, defender) {
    // throw new Error('Please implement this in inheritors');
    console.log(
      `Creature ${attacker.id} attacks creature ${defender.id}`
    );
  }

  run() {
    this.start();
  }

  start() {
    console.log('Starting game');
  }
}

class TemporaryCardDamageGame extends CardGame {
  constructor(creatures) {
    super(creatures);
  }

  hit(attacker, defender) {
    // todo
    super.hit(attacker, defender);
    let cacheHealth = defender.health;
    defender.health -= attacker.attack;
    if (defender.health > 0) defender.health = cacheHealth;
  }

  start() {
    super.start();
    let winner = super.combat(0, 1);
    if (winner === -1) console.log('It is a draw');
    else console.log(`Creature ${this.creatures[winner].id} wins.`);
  }
}

class PermanentCardDamageGame extends CardGame {
  constructor(creatures) {
    super(creatures);
  }

  hit(attacker, defender) {
    // todo
    super.hit(attacker, defender);
    defender.health -= attacker.attack;
  }

  start() {
    super.start();
    let finished = false;
    let winner = null;
    while (!finished){
      winner = super.combat(0, 1);
      if (winner !== -1) {
        finished = true;
        console.log(`Creature ${this.creatures[winner].id} wins.`);
      } else if (this.creatures[0].health <= 0) {
        finished = true;
        console.log(`It's a draw.`);
      }
    }
  }
}

let creature1 = new Creature(1, 2);
let creature2 = new Creature(1, 3);
// let game = new TemporaryCardDamageGame([creature1, creature2]);
let game = new PermanentCardDamageGame([creature1, creature2]);
game.run();
