// Unit.js
// Located in ZetaMorph/skeleton/

const { SYMBOL_SEQUENCE } = require('../core/sacred9');

function morphSymbol(current, direction = 1) {
  const index = SYMBOL_SEQUENCE.indexOf(current);
  return SYMBOL_SEQUENCE[(index + direction + SYMBOL_SEQUENCE.length) % SYMBOL_SEQUENCE.length];
}

class Unit {
  constructor() {
    this.state = {
      label: 'unit',
      currentSymbol: SYMBOL_SEQUENCE[0],
      pushes: [],
      carry: 0,
      collapsed: false,
      hasCollapsed: false // Track collapse history
    };
  }

  push(times = 1, carryBus) {
    if (times >= 10) return; // Bypass unit for direct tens pushes
    const direction = times >= 0 ? 1 : -1;
    const absTimes = Math.abs(times);
    for (let i = 0; i < absTimes; i++) {
      this.state.pushes.push(direction);
      this.state.currentSymbol = morphSymbol(this.state.currentSymbol, direction);
      console.log(`Unit Push: SYMBOL: ${this.state.currentSymbol} CARRY: ${this.state.carry} DIRECTION: ${direction}`);
      if (this.state.currentSymbol === SYMBOL_SEQUENCE[10] && direction > 0) {
        this.state.collapsed = true;
        this.state.carry = 1;
        this.state.hasCollapsed = true;
        console.log(`Unit Carry: CARRY: ${this.state.carry} COLLAPSED: ${this.state.collapsed}`);
        carryBus.registerCarry(1, 'Axis10');
        this.reset();
      }
    }
  }

  reset() {
    console.log(`Unit Reset: SYMBOL: ${SYMBOL_SEQUENCE[0]} CARRY: ${this.state.carry} COLLAPSED: ${this.state.collapsed}`);
    this.state.pushes = [];
    this.state.currentSymbol = SYMBOL_SEQUENCE[0]; // Internal reset to clover
  }

  getState() {
    return {
      ...this.state,
      currentSymbol: (this.state.carry > 0 || this.state.collapsed || this.state.hasCollapsed) ? '*' : this.state.currentSymbol // Map to * post-collapse
    };
  }
}

module.exports = Unit;