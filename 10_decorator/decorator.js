class Shape {
  constructor(color) {
    this.color = color;
  }
}

class Circle extends Shape {
  constructor(radius = 0) {
    super();
    this.radius = radius;
  }

  resize(factor) {
    this.radius *= factor;
  }

  toString() {
    return `A circle of radius ${this.radius}`;
  }
}

class ColoredShape extends Shape {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this._color = color;
  }

  toString() {
    return (
      `${this.shape.toString()} has the color ${this.color}`
      )
  }

  get color() { return this._color; }
  set color(value) { this._color = value; }
}

class TransparentShape extends Shape {
  constructor(shape, transparency) {
    super();
    this.shape = shape;
    this.transparency = transparency;
  }

  toString() {
    return (
      `${this.shape.toString()} has ` +
      `${this.transparency * 100.0}% transparency`
      )
  }
}

let circle = new Circle(2);
console.log(circle.toString());

let redCircle = new ColoredShape(circle, 'red');
redCircle.shape.resize(2);
console.log(redCircle.toString());

let redHalfCircle = new TransparentShape(redCircle, 0.5);
redHalfCircle.shape.color = 'blue';
console.log(redHalfCircle.toString());
