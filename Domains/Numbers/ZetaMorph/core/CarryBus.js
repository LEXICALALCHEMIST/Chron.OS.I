// CarryBus.js
// Located in ZetaMorph/core/

class CarryBus {
  constructor() {
    this.carryValue = 0;
    this.carryTarget = null;
    this.carryHistory = [];
  }

  registerCarry(value, target) {
    this.carryValue += value;
    this.carryTarget = target;
    this.carryHistory.push({ from: 'Unit', to: target, value });
    console.log(`CarryBus: Registered CARRY: ${value} to ${target}`);
  }

  flushCarry() {
    const { carryValue, carryTarget } = this;
    this.carryValue = 0;
    this.carryTarget = null;
    console.log(`CarryBus: Flushed CARRY: ${carryValue} to ${carryTarget}`);
    return { carryValue, carryTarget };
  }
}

module.exports = CarryBus;