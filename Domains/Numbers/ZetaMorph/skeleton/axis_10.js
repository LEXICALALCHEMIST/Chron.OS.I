// Axis_10.js
// Located in ZetaMorph/skeleton/

const { SYMBOL_SEQUENCE } = require('../core/sacred9');

function morphSymbol(current, direction = 1) {
  if (current === null) return SYMBOL_SEQUENCE[0];
  const index = SYMBOL_SEQUENCE.indexOf(current);
  return SYMBOL_SEQUENCE[(index + direction + SYMBOL_SEQUENCE.length) % SYMBOL_SEQUENCE.length];
}

class Axis10 {
  constructor() {
    this.state = {
      label: 'axis_10', // Represents 10–19
      currentSymbol: null,
      pushes: [],
      carry: 0,
      collapsed: false
    };
    this.carryTarget = 'Axis20';
  }

  push(times = 1, carryBus) {
    const direction = times >= 0 ? 1 : -1;
    const absTimes = Math.abs(times);
    for (let i = 0; i < absTimes; i++) {
      this.state.pushes.push(direction);
      this.state.currentSymbol = morphSymbol(this.state.currentSymbol, direction);
      console.log(`AXIS_10 Push: SYMBOL: ${this.state.currentSymbol} CARRY: ${this.state.carry} DIRECTION: ${direction}`);
      if (this.state.currentSymbol === SYMBOL_SEQUENCE[10] && direction > 0) {
        this.state.collapsed = true;
        this.state.carry = 1;
        console.log(`Axis10 Carry: CARRY: ${this.state.carry} COLLAPSED: ${this.state.collapsed}`);
        carryBus.registerCarry(1, this.carryTarget);
        this.reset();
      }
    }
  }

  reset() {
    console.log(`Axis_10 Reset: SYMBOL: * CARRY: 0 COLLAPSED: false`);
    this.state.pushes = [];
    this.state.carry = 0;
    this.state.collapsed = false;
    this.state.currentSymbol = null;
  }

  getState() {
    return {
      ...this.state,
      currentSymbol: this.state.currentSymbol || '*'
    };
  }
}

module.exports = Axis10;