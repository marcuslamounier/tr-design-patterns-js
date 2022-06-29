let Color = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue'
});

let Size = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large'
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter {
  filterByColor(products, color) {
    return products.filter(product => product.color === color);
  }

  filterBySize(products, size) {
    return products.filter(product => product.size === size);
  }
}

class Specification {
  constructor() {
    if (this.constructor.name === 'Specification') {
      throw new Error('Specification is abstract!');
    }
  }

  isSatisfied(item) {}
}

class ColorSpecification extends Specification {
  constructor(color) {
    super();
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification extends Specification {
  constructor(size) {
    super();
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every(x => x.isSatisfied(item));
  }
}

let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);

let products = [apple, tree, house];

let pf = new ProductFilter();
console.log('Green products (old):');
for (let product of pf.filterByColor(products, Color.green)) {
  console.log(` * ${product.name} is green`);
}

class BetterFilter {
  filter(items, spec) {
    return items.filter(x => spec.isSatisfied(x));
  }
}

let bf = new BetterFilter();
console.log('Green products (new):');
for (let product of bf.filter(
  products,
  new ColorSpecification(Color.green)
)) {
  console.log(` * ${product.name} is green`);
}

console.log('Large and green products:');
let spec = new AndSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.large)
);
for (let product of bf.filter(products, spec)) {
  console.log(` * ${product.name} is green and large`);
}
