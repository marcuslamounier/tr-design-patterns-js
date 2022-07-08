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

  * preorder() {
    // todo
    function* traverse(current) {
      yield current;
      if (current.left) {
        for (let left of traverse(current.left)) yield left;
      }
      if (current.right) {
        for (let right of traverse(current.right)) yield right;
      }
    }
    for (let node of traverse(this)) yield node;
  }
}

let node3 = new Node(3);
let node4 = new Node(4);
let node2 = new Node(2, node4);
let root = new Node(1, node2, node3);
for (let x of root.preorder()) console.log(x.value);