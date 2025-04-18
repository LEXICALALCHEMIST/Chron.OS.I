// morphLogic.js
// Located in ZetaMorph/core/

const { Unit, Axis10 } = require('../skeleton/skeleton');
const { SYMBOL_SEQUENCE } = require('./sacred9');

class MorphLogic {
  static processCommand(command, number, base) {
    const operation = command.toLowerCase().startsWith('add') ? 'add' : 'subtract';
    const key = {
      operation,
      unit: number < 10 ? number : 0,
      axis: number >= 10 && number < 20 ? number : 0,
      fold: 0,
      ft: 0,
      base: base < 10 ? base : 0
    };
    return key;
  }

  static execute(morphKey, components, carryBus) {
    const { operation, unit, axis, base } = morphKey;
    const direction = operation === 'add' ? 1 : -1;
    
    // Set initial state from base for subtraction
    if (base > 0 && operation === 'subtract') {
      components.Unit.push(base, carryBus); // Set unit to base state (e.g., ¤ for 4)
    }

    if (unit > 0) {
      components.Unit.push(unit * direction, carryBus);
    }
    if (axis > 0) {
      components.Axis10.push((axis - 10) * direction, carryBus);
    }

    if (carryBus.carryValue > 0) {
      const { carryValue, carryTarget } = carryBus.flushCarry();
      if (carryTarget && components[carryTarget]) {
        components[carryTarget].push(carryValue * direction, carryBus);
      }
    }

    console.log('MorphLogic.execute result:', {
      unit: components.Unit.getState().currentSymbol,
      axis: components.Axis10.getState().currentSymbol
    }); // Debug log
  }
}

module.exports = MorphLogic;