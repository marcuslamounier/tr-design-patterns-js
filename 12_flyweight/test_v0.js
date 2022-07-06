class WordRange {
  constructor(position) {
    this.position = position;
    this.capitalize = false;
  }

  covers(position) {
    return (position == this.position);
  }
}

class Sentence {
  constructor(plainText) {
    // todo
    this.plainText = plainText.split(' ');
    this.formatting = [];
  }

  at(index) {
    // todo
    let range = new WordRange(index);
    this.formatting.push(range);
    return range;
  }

  toString() {
    // todo
    let buffer = [];
    for (let i in this.plainText) {
      let word = this.plainText[i];
      for (let range of this.formatting) {
        if (range.covers(i) && range.capitalize) {
          word = word.toUpperCase();
        }
      }
      buffer.push(word);
    }
    return buffer.join(' ');
  }
}

let s = new Sentence('alpha beta gamma');
s.at(1).capitalize = true;
console.log(s.toString());
