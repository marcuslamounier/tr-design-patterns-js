let WhatToQuery = Object.freeze({
  'attack': 1,
  'defense': 2
});

class Query {
  constructor(whatToQuery, value) {
    this.whatToQuery = whatToQuery;
    this.value = value;
  }
}

class Game {
  // todo
  constructor() {
    this.creatures = [];
  }

  toString() {
    let buffer = [];
    for (let creature of this.creatures) {
      buffer.push(creature.toString() + '\n');
    }
    return buffer.join('');
  }
}

class Goblin {
  constructor(game, baseAttack = 1, baseDefense = 1) {
    // todo
    this.game = game;
    game.creatures.push(this);
    this.baseAttack = baseAttack;
    this.baseDefense = baseDefense;
  }

  handleQuery(sender, query) {
    if (sender === this) {
      switch (query.whatToQuery) {
        case WhatToQuery.attack:
          query.value += this.baseAttack;
          break;
        case WhatToQuery.defense:
          query.value += this.baseDefense;
          break;
      }
    } else if (query.whatToQuery === WhatToQuery.defense) {
      query.value++;
    }
  }

  get attack() {
    let query = new Query(WhatToQuery.attack, 0);
    for (let creature of this.game.creatures) {
      creature.handleQuery(this, query);
    }
    return query.value;
  }

  get defense() {
    let query = new Query(WhatToQuery.defense, 0);
    for (let creature of this.game.creatures) {
      creature.handleQuery(this, query);
    }
    return query.value;
  }

  toString() {
    return `Goblin (${this.attack}/${this.defense})`;
  }
}

class GoblinKing extends Goblin {
  constructor(game) {
    // todo
    super(game, 3, 3);
  }

  handleQuery(sender, query) {
    if (sender !== this && query.whatToQuery === WhatToQuery.attack) {
      query.value++;
    }
    super.handleQuery(sender, query);
  }

  toString() {
    return 'King ' + super.toString();
  }
}

let game = new Game();
let goblin1 = new Goblin(game);
let goblin2 = new Goblin(game);
let goblin3 = new Goblin(game);
let goblin4 = new Goblin(game);
let goblinKing1 = new GoblinKing(game);

console.log(game.toString());