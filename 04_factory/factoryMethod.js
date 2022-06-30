// CoordinateSystem = {
//   CARTESIAN: 0,
//   POLAR: 1
// };

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // constructor(a, b, cs = CoordinateSystem.cartesian) {
  //   switch (cs) {
  //     case CoordinateSystem.cartesian:
  //       this.x = a;
  //       this.y = b;
  //       break;
  //     case CoordinateSystem.polar:
  //       this.x = a * Math.cos(b);
  //       this.y = a * Math.sin(b);
  //       break;
  //   }
  // }

  // static newCartesianPont(x, y) {
  //   return new Point(x, y);
  // }
  
  // static newPolarPoint(rho, theta) {
  //   return new Point(
  //     rho * Math.cos(theta),
  //     rho * Math.sin(theta)
  //   );
  // }

  static get factory() {
    return new PointFactory();
  }
}

class PointFactory {
  // If it is called by the factory getter from the API
  // it cannot be static.
  newCartesianPont(x, y) {
    return new Point(x, y);
  }
  
  // If it is called directory from PointFactory, should be
  // a static method.
  static newPolarPoint(rho, theta) {
    return new Point(
      rho * Math.cos(theta),
      rho * Math.sin(theta)
    );
  }
}

// let p1 = new Point(2, 3, CoordinateSystem.CARTESIAN);
// console.log(p1); 

let p2 = PointFactory.newPolarPoint(5, Math.PI/2);
console.log(p2);

let p3 = Point.factory.newCartesianPont(2, 3);
console.log(p3);
