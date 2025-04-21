// setSkeleton.js
// Located in ZetaMorph/MorphLogic/

import Unit1 from '../skeleton/unit1.js';
import Unit2 from '../skeleton/unit2.js';
import Unit3 from '../skeleton/unit3.js';
import CarryBus from '../core/carryBus.js';
import { SYMBOL_SEQUENCE, VOID_SYMBOL } from '../core/sacred9.js';

export default class SetSkeleton {
  constructor() {
    this.unit1 = new Unit1();
    this.unit2 = new Unit2();
    this.unit3 = new Unit3();
    this.carryBus = new CarryBus();
  }

  set(number) {
    console.log(`Setting skeleton for ${number}`);
    if (number < 0 || number > 999) {
      throw new Error('Number must be between 0 and 999');
    }
    
    // Extract digits in order (left-to-right)
    const digits = number.toString().split('').map(Number);
    
    // Map digits to units: first digit -> Unit1, second -> Unit2, third -> Unit3
    const units = [
      { unit: this.unit1, digit: digits[0], vpPlusOne: false }, // Unit1: no VP+1
      { unit: this.unit2, digit: digits[1], vpPlusOne: true },  // Unit2: VP+1
      { unit: this.unit3, digit: digits[2], vpPlusOne: true }   // Unit3: VP+1
    ];
    
    // Set each unit
    for (let i = 0; i < units.length; i++) {
      const { unit, digit, vpPlusOne } = units[i];
      // Skip undefined digits (e.g., digits[2] for two-digit numbers)
      if (digit !== undefined) {
        // Push for all defined digits, including 0 for Unit2/Unit3
        const pushes = vpPlusOne ? digit + 1 : digit;
        if (vpPlusOne || digit > 0) { // Push for Unit1 only if digit > 0, always for Unit2/Unit3
          unit.push(pushes, this.carryBus);
          console.log(`Set ${unit.state.label} to ${digit} (pushed ${pushes} times)`);
          if (this.carryBus.carryValue > 0) {
            const { carryValue, carryTarget } = this.carryBus.flushCarry();
            if (carryTarget === 'Unit1' && i > 0) {
              this.unit1.push(carryValue, this.carryBus);
              console.log(`Carry applied to Unit1: ${carryValue}`);
            } else if (carryTarget === 'Unit2' && i > 1) {
              this.unit2.push(carryValue, this.carryBus);
              console.log(`Carry applied to Unit2: ${carryValue}`);
            }
          }
        }
      }
    }
    
    // Reset push counts
    this.unit1.state.pushes = [];
    this.unit2.state.pushes = [];
    this.unit3.state.pushes = [];
    
    const state = this.getState();
    console.log(`Skeleton: <${state.unit1.currentSymbol}${state.unit2.currentSymbol}${state.unit3.currentSymbol}|⊙⊙⊙|⊙⊙⊙>`);
    return state;
  }

  getState() {
    const unit1State = this.unit1.getState();
    const unit2State = this.unit2.getState();
    const unit3State = this.unit3.getState();
    return {
      unit1: {
        currentSymbol: unit1State.currentSymbol,
        carry: unit1State.carry,
        hasCollapsed: unit1State.hasCollapsed,
        pushesLength: unit1State.pushes.length
      },
      unit2: {
        currentSymbol: unit2State.currentSymbol,
        carry: unit2State.carry,
        hasCollapsed: unit2State.hasCollapsed,
        pushesLength: unit2State.pushes.length
      },
      unit3: {
        currentSymbol: unit3State.currentSymbol,
        carry: unit3State.carry,
        hasCollapsed: unit3State.hasCollapsed,
        pushesLength: unit3State.pushes.length
      }
    };
  }
}