class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  deepCopy() {
    return new Point(this.x, this.y);
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  deepCopy() {
    // todo
    return new Line(this.start.deepCopy(), this.end.deepCopy());
  }
}

// let p1 = new Point(5, 10);
// let p2 = p1.deepCopy();
// p2.x = 7;
// p2.y = 13;
// let l1 = new Line(p1, p2);

// let l2 = l1.deepCopy();
// l2.start = l1.end.deepCopy();
// l2.end.y = 25;

// console.log(l1);
// console.log(l2);
