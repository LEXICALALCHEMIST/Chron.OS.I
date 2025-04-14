// quandrix_Cube.js
// Located in ZLME/core/

const { morphParser } = require('../utils/morphParser');

class QuandrixCube {
  constructor() {
    this.state = [];
  }

  push(number) {
    const glyph = morphParser(number);
    this.state.push(glyph);
    return glyph;
  }

  pop() {
    return this.state.pop();
  }

  trace() {
    console.log('Quandrix Memory Stack:');
    this.state.forEach((g, i) => {
      console.log(` [${i}] → ${g}`);
    });
  }

  reset() {
    this.state = [];
  }
}

module.exports = QuandrixCube;