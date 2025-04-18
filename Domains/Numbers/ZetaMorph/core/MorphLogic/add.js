// add.js
// Located in ZetaMorph/core/MorphLogic/

import { SYMBOL_SEQUENCE } from '../sacred9.js';

class MorphLogicAdd {
  static processCommand(command, number, base) {
    const operation = 'add';
    const key = {
      operation,
      unit: number < 10 ? number : 0,
      axis: number >= 10 && number < 20 ? number : 0,
      fold: 0,
      ft: 0,
      base: base < 20 ? base : 0
    };
    return key;
  }

  static execute(morphKey, components, carryBus) {
    const { operation, unit, axis, base } = morphKey;
    const direction = 1; // Addition only

    // Set initial state from base
    if (base > 0) {
      if (base < 10) {
        components.Unit.push(base, carryBus); // Set unit to base (e.g., ○ for 2)
      } else if (base >= 10 && base < 20) {
        components.Unit.push(0, carryBus); // Unit: *
        components.Axis10.push(base - 10, carryBus); // Axis: ♧ for 10, ● for 11
      }
    }

    // Apply unit or axis pushes
    if (unit > 0) {
      components.Unit.push(unit * direction, carryBus);
    }
    if (axis > 0) {
      components.Axis10.push((axis - 10) * direction, carryBus);
    }

    // Handle carry
    if (carryBus.carryValue > 0) {
      const { carryValue, carryTarget } = carryBus.flushCarry();
      if (carryTarget && components[carryTarget]) {
        components[carryTarget].push(carryValue * direction, carryBus);
      }
    }

    console.log('MorphLogicAdd.execute result:', {
      unit: components.Unit.getState().currentSymbol,
      axis: components.Axis10.getState().currentSymbol
    }); // Debug log
  }
}

export default MorphLogicAdd;