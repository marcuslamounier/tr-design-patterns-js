class Node {
  constructor(value, left = null, right = null) {
    // todo
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = null;

    if (this.left) left.parent = this;
    if (this.right) right.parent = this;
  }

  * _traverse(current) {
    yield current;
    if (current.left) {
      for (let left of this._traverse(current.left)) yield left;
    }
    if (current.right) {
      for (let right of this._traverse(current.right)) yield right;
    }

  }

  * preorder() {
    // todo
    for (let node of this._traverse(this)) yield node.value;
  }
}

let node3 = new Node(3);
let node4 = new Node(4);
let node2 = new Node(2, node4);
let root = new Node(1, node2, node3);
for (let x of root.preorder()) console.log(x);