// morphSkeleton.js
// Located in ZetaMorph/skeleton/

import Unit from './Unit.js';
import Axis10 from './Axis_10.js';
import MorphLogicAdd from '../core/MorphLogic/add.js';
import MorphLogicSubtract from '../core/MorphLogic/subtract.js';
import CarryBus from '../core/CarryBus.js';

console.log('Loading morphSkeleton.js'); // Debug log

const componentMap = {
  Unit: Unit,
  Axis10: Axis10
};

export default class MorphSkeleton {
  constructor(unit, axis, fold, ft) {
    this.unit = unit;
    this.axis = axis || ['♧'];
    this.fold = fold || '*';
    this.ft = ft || '*';
  }

  toGlyph() {
    return `<${this.unit}|${this.axis.join('')}《${this.fold}|${this.ft}》>`;
  }

  static processKey(morphKey) {
    console.log('MorphSkeleton.processKey called with:', morphKey); // Debug log
    const carryBus = new CarryBus();
    const components = {
      Unit: new Unit(),
      Axis10: new Axis10()
    };

    const logic = morphKey.operation === 'add' ? MorphLogicAdd : MorphLogicSubtract;
    logic.execute(morphKey, components, carryBus);

    return new MorphSkeleton(
      components.Unit.getState().currentSymbol,
      [components.Axis10.getState().currentSymbol || '*'], // Default to * for inactive
      '*',
      '*'
    );
  }

  static fromCommand(command, number, base) {
    console.log('MorphSkeleton.fromCommand called with:', command, number, base); // Debug log
    const logic = command.toLowerCase().startsWith('add') ? MorphLogicAdd : MorphLogicSubtract;
    const key = logic.processCommand(command, number, base);
    return MorphSkeleton.processKey(key);
  }
}

export const fromCommand = MorphSkeleton.fromCommand;