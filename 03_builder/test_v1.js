class Class {
  static get indentSize() { return 2; }
  static get indent() { return ' '.repeat(Class.indentSize); }

  constructor(name = '') {
    this.name = name;
    this.fields = [];
  }

  toString() {
    let indentLevel = 0;
    let code = [];

    function formatCode(str) {
      return Class.indent.repeat(indentLevel) + str
    }

    code.push(formatCode(`class ${this.name} {\n`));
    if (this.fields.length > 0) {
      indentLevel++; // indentLevel = 1
      code.push(formatCode(
        'constructor(' +
        this.fields.join(', ') +
        ') {\n'
      ));
      indentLevel++; // indentLevel = 2
      this.fields.map(field => {
        code.push(formatCode(`this.${field} = ${field};\n`));
      })
      indentLevel--; // indentLevel = 1
      code.push(formatCode(`}\n`));
      indentLevel--; // indentLevel = 0
    }
    code.push(formatCode(`}`));
    return code.join('');
  }

  static create(className) {
    return new CodeBuilder(className);
  }
}

class CodeBuilder {
  constructor(className) {
    this.myClass = new Class(className);
    this.className = className;
  }

  addField(name) {
    this.myClass.fields.push(name);
    return this;
  }

  toString() {
    return this.myClass.toString();
  }
}

// let builder = Class.create('Foo');
let builder = Class.create('Person')
builder
  .addField('name')
  .addField('age');
console.log(builder.toString());