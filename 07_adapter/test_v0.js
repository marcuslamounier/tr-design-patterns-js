class Square {
  constructor(side) {
    this.side = side;
  }
}

function area(rectangle) {
  return rectangle._width * rectangle._height;
}

// build an adapter called SquareToRectangleAdapter
// s.t. we could call

class SquareToRectangleAdapter {
  constructor(square) {
    this._height = this._width = square.side;
  }

  get width() { return this._width; }
  get height() { return this._height; }
}

let sq = new Square(123);
area(new SquareToRectangleAdapter(sq));
