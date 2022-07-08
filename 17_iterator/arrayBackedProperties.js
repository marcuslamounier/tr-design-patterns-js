class Creature {
  constructor() {
    this.stats = new Array(3).fill(10);
  }

  get strength() { return this.stats[0]; }
  set strength(value) { this.stats[0] = value; }

  get agility() { return this.stats[1]; }
  set agility(value) { this.stats[1] = value; }

  get intelligence() { return this.stats[2]; }
  set intelligence(value) { this.stats[2] = value; }

  get sumOfStats() {
    return this.stats.reduce((acc, cur) => acc + cur);
  }

  get averageStat() {
    return this.sumOfStats / this.stats.length;
  }

  get maxStat() {
    return Math.max(...this.stats);
  }
}

let creature = new Creature();

console.log(creature.sumOfStats)
console.log(creature.averageStat)
console.log(creature.maxStat)