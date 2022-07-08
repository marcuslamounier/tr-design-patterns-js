class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = null;

    if (this.left) left.parent = this;
    if (this.right) right.parent = this;
  }
}

class BinaryTree {
  constructor(rootNode) {
    this.rootNode = rootNode;
  }

  [Symbol.iterator]() {
    return makeInOrderIterator(this.rootNode);
  }

  * betterInOrder() {
    function* traverse(current) {
      if (current.left) {
        for (let left of traverse(current.left)) yield left;
      }
      yield current;
      if (current.right) {
        for (let right of traverse(current.right)) yield right;
      }
    }
    for (let node of traverse(this.rootNode)) yield node;
  }
}

function makeInOrderIterator(root) {
  let current = root;
  while (current.left) {
    current = current.left;
  }
  let yieldedStart = false;

  return {
    next: function () {
      if (!yieldedStart) {
        yieldedStart = true;
        return { value: current, done: false };
      }
      if (current.right) {
        current = current.right;
        while (current.left) current = current.left;
        return { value: current, done: false };
      } else {
        let p = current.parent;
        while (p && current === p.right) {
          current = p;
          p = p.parent;
        }
        current = p;
        return { value: current, done: current === null };
      }
    },
    [Symbol.iterator]: function () { return this; }
  };
}

//   1
//  / \
// 2   3

// in-order: 213
// pre-order: 123
// post-order: 231

let root = new Node(1, new Node(2), new Node(3));

// NOT USING SYMBOL ITERATOR
// let it = makeInOrderIterator(root);
// let result = it.next();
// while (!result.done) {
//   console.log(result.value.value);
//   result = it.next();
// }

// USING SYMBOL ITERATOR
// for (let x of new BinaryTree(root)) console.log(x.value);

// USING RECURSIVE WITH YIELD
for (let x of new BinaryTree(root).betterInOrder()) console.log(x.value);
