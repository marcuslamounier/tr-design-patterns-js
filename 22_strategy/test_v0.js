class Creature {
  constructor(attack, health) {
    this.attack = attack;
    this.health = health;
    this.alive = this.health > 0;
    this.id = ++Creature.count;
    // todo
  }
}
Creature.count = 0;

class Game {
  constructor(damageStrategy) {
    this.damageStrategy = damageStrategy;
  }

  springTrapOn(creature) {
    this.damageStrategy.damage(creature);
  }
}

class DamageStrategy {
  damage(creature) {
    if (creature.health <= 0) {
      creature.alive = false;
    }
    console.log('Health:', creature.health);
    console.log('Alive:', creature.alive);
  }
}

class ConstantDamageStrategy extends DamageStrategy {
  damage(creature) {
    // todo
    creature.health--;
    super.damage(creature);
  }
}

class GrowingDamageStrategy extends DamageStrategy {
  damage(creature) {
    // todo
    if (GrowingDamageStrategy.impact[creature.id]) {
      let dmg = ++GrowingDamageStrategy.impact[creature.id];
      creature.health -= dmg;
    } else {
      creature.health--;
      GrowingDamageStrategy.impact[creature.id] = 1;
    }
    super.damage(creature);
  }
}
GrowingDamageStrategy.impact = {};

// let game = new Game(new ConstantDamageStrategy());
let game = new Game(new GrowingDamageStrategy());
let creature = new Creature(1, 10);
game.springTrapOn(creature);
game.springTrapOn(creature);
game.springTrapOn(creature);
game.springTrapOn(creature);
