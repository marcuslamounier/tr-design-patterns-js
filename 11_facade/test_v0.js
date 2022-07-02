class Generator {
  generate(count) {
    let result = [];
    for (let i = 0; i < count; ++i)
      result.push(Math.floor((Math.random() * 6) + 1));
    return result;
  }
}

class Splitter {
  split(array) {
    let result = [];

    let rowCount = array.length;
    let colCount = array[0].length;

    // get the rows
    for (let r = 0; r < rowCount; ++r) {
      let theRow = [];
      for (let c = 0; c < colCount; ++c)
        theRow.push(array[r][c]);
      result.push(theRow);
    }

    // get the columns
    for (let c = 0; c < colCount; ++c) {
      let theCol = [];
      for (let r = 0; r < rowCount; ++r)
        theCol.push(array[r][c]);
      result.push(theCol);
    }

    // now the diagonals
    let diag1 = [];
    let diag2 = [];
    for (let c = 0; c < colCount; ++c) {
      for (let r = 0; r < rowCount; ++r) {
        if (c === r)
          diag1.push(array[r][c]);
        let r2 = rowCount - r - 1;
        if (c === r2)
          diag2.push(array[r][c]);
      }
    }

    result.push(diag1);
    result.push(diag2);

    return result;
  }
}

class Verifier {
  verify(array) {
    if (array.length < 1) return false;
    let adder = function (p, c) {
      return p + c;
    };
    let expected = array[0].reduce(adder);
    let ok = true;
    array.forEach(function (subarray) {
      if (subarray.reduce(adder) !== expected) ok = false;
    });
    return ok;
  }
}

class MagicSquareGenerator {
  generate(size) {
    // todo
    let g = new Generator();
    let s = new Splitter();
    let v = new Verifier();

    let square;

    do {
      square = [];
      for (let i = 0; i < size; i++) {
        square.push(g.generate(size));
      }
    } while (!v.verify(s.split(square)));

    return square;
  }
}

class Square {
  constructor(square) {
    this.square = square;
  }
  toString() {
    if (
      this.square.length === 0 ||
      this.square.length !== this.square[0].length
    ) return 'Not valid square';

    else if (this.square.length === 1) return this.square[0][0];

    let arr = [];
    for (let i = 0; i < this.square.length; i++) {
      for (let j = 0; j < this.square[0].length; j++) {
        arr.push(this.square[i][j] + ' ');
      }
      arr.push('\n');
    }
    return arr.join('');
  }
}

let generator = new MagicSquareGenerator();
let square = new Square(generator.generate(1));
console.log(square.toString()); 