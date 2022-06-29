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
    
    function formatCode (str) {
      return Class.indent.repeat(indentLevel) + str
    }
    
    code.push(formatCode(`class ${this.name} {\n`));
    indentLevel++; // indentLevel = 1
    code.push(formatCode(`constructor(`));
    if (this.fields.length > 0) {
      code.push(this.fields.join(', '));
    }
    code.push(`) {`)
    if (this.fields.length > 0) {
      code.push('\n');
      indentLevel++; // indentLevel = 2
      this.fields.map(field => {
        code.push(formatCode(`this.${field} = ${field};\n`));
      })
      indentLevel--; // indentLevel = 1
      code.push(formatCode(`}`));
    } else code.push('}')
    indentLevel--; // indentLevel = 0
    code.push('\n');
    code.push(formatCode(`}`));
    return code.join('');
  }

  static create(className) {
    return new CodeBuilder(className);
  }
}

class CodeBuilder {
  constructor(className) {
    // todo
    this.myClass = new Class(className);
    this.className = className;
  }

  addField(name) {
    // todo
    // reminder: we want a fluent interface
    this.myClass.fields.push(name);
    return this;
  }

  toString() {
    // todo
    return this.myClass.toString();
  }
}

let builder = Class.create('Person')
builder
  .addField('name')
  .addField('age');
console.log(builder.toString());