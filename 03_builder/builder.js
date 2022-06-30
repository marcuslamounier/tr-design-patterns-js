class Tag {
  static get indentSize() { return 2; }

  constructor(name = '', text = '') {
    this.name = name;
    this.text = text;
    this.children = [];
  }

  toStringImpl(indentLevel) {
    let html = [];
    let indent = ' '.repeat(indentLevel * Tag.indentSize);
    html.push(`${indent}<${this.name}>`);
    if (this.text.length > 0) html.push(this.text);
    else html.push('\n');
    for (let child of this.children) {
      html.push(child.toStringImpl(indentLevel + 1));
    }
    html.push(`</${this.name}>\n`);
    return html.join('');
  }

  toString() {
    return this.toStringImpl(0);
  }

  static create(name) {
    return new HtmlBuilder(name);
  }
}

class HtmlBuilder {
  constructor(rootName) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  addChild(childName, childText) {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  addChildFluent(childName, childText) {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
  }

  clear () {
    this.root = new Tag(this.rootName);
  }

  toString() {
    return this.root.toString();
  }

  build() {
    return this.root;
  }
}

let html = [];

const words = ['hello', 'world', 'okay'];

html.push('<p>');
for (let word of words) html.push(word + ' ');
html.push('</p>');
console.log(html.join(''));

html = [];
html.push('<ul>\n');
for (let word of words) html.push(`  <li>${word}</li>\n`);
html.push('</ul>\n');
console.log(html.join(''));

// let builder = new HtmlBuilder('ul');
let builder = Tag.create('ul');
for (let word of words) builder.addChild('li', word);
console.log(builder.toString());

builder.clear();
builder
  .addChildFluent('li', `foo`)
  .addChildFluent('li', `bar`)
  .addChildFluent('li', `baz`);
console.log(builder.toString());
