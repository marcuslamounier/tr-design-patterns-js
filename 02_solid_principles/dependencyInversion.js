let Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2
});

class Person {
  constructor(name) {
    this.name = name;
  }
}

// LOW-LEVEL (storage)

class RelationshipBrowser {
  constructor() {
    let constructorName = this.constructor.name
    if (constructorName === 'RelationshipBrowser') {
      throw new Error('abstract class');
    }
  }

  findAllChildrenOf(name) { }
}

class Relationships extends RelationshipBrowser {
  constructor() {
    super();
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child
    });
  }

  findAllChildrenOf(name) {
    return this.data.filter(relation =>
      relation.from.name === name &&
      relation.type === Relationship.parent
    ).map(relation => relation.to);
  }
}

// HIGH-LEVEL (research)
class Research {
  // constructor(relationships) {
  //   let relations = relationships.data;
  //   for (let rel of relations.filter(relation =>
  //     relation.from.name === 'John' &&
  //     relation.type === Relationship.parent
  //   )) {
  //     console.log(
  //       `John has a child named ${rel.to.name}`
  //     );
  //   }
  // }
  constructor(browser) {
    for (let p of browser.findAllChildrenOf('John')) {
      console.log(`John has a child named ${p.name}`);
    }
  }
}

let parent = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

let rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

new Research(rels);
