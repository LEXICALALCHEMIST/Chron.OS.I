// QuandrixEngine.js
// Located in ZetaMorph/core/

const { Unit, Axis10 } = require('../skeleton/skeleton');
const KeyMaker = require('../key/KeyMaker');
const { SYMBOL_SEQUENCE } = require('./sacred9');
const { MorphSkeleton } = require('../skeleton/morph_Skeleton');

class QuandrixEngine {
  constructor() {
    this.unit = new Unit();
    this.axis10 = new Axis10();
  }

  morphAdd(glyphA, valueB) {
    if (!Number.isInteger(valueB) || valueB < 0) return null;
    const key = KeyMaker.decompose(valueB);
    this.unit.reset();
    this.axis10.reset();

    const propagateCallback = (section, carry) => {
      if (section === 'axis_10') {
        this.axis10.push(carry);
      }
    };

    if (key.unit > 0 && key.axis === 0) {
      this.unit.push(key.unit, propagateCallback);
    } else if (key.axis >= 10 && key.axis <= 19) {
      this.axis10.push(1);
    }

    return this.toGlyph();
  }

  toGlyph() {
    const unitState = this.unit.getState();
    const axisState = this.axis10.getState();
    const axis = Array(9).fill('*');
    if (axisState.currentSymbol) {
      axis[0] = axisState.currentSymbol;
    }
    return new MorphSkeleton(unitState.currentSymbol, axis, SYMBOL_SEQUENCE[0], SYMBOL_SEQUENCE[0]).toGlyph();
  }
}

module.exports = QuandrixEngine;