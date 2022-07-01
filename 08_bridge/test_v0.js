class Shape {
  constructor(name, renderer) {
    this.name = name;
    this.renderer = renderer;
  }
  toString() {
    return (
      `Drawing ${this.name} as ${this.renderer.whatToRenderAs}`
    );
  }
}

class Triangle extends Shape {
  constructor(renderer) {
    super('triangle', renderer);
  }
}

class Square extends Shape {
  constructor(renderer) {
    super('square', renderer);
  }
}

class Renderer {
  get whatToRenderAs() { }
}

class VectorRenderer extends Renderer {
  get whatToRenderAs() { return 'lines'; }
}

class RasterRenderer extends Renderer {
  get whatToRenderAs() { return 'pixels'; }
}

// imagine VectorTriangle and RasterTriangle are here too

// let a = new Triangle(new VectorRenderer());
// a.toString();
