// testUnit.js
// Located in ZetaMorph/test/

const { Unit, Axis10 } = require('../skeleton/skeleton');
const { SYMBOL_SEQUENCE } = require('../core/sacred9');
const CarryBus = require('../core/CarryBus');

console.log('--- ZLME Unit Component Test Suite ---');

const singlePushTests = [
  { input: 1, expected: { unit: SYMBOL_SEQUENCE[1], carry: 0, collapsed: false, axis: SYMBOL_SEQUENCE[0] } },
  { input: 2, expected: { unit: SYMBOL_SEQUENCE[2], carry: 0, collapsed: false, axis: SYMBOL_SEQUENCE[0] } },
  { input: 3, expected: { unit: SYMBOL_SEQUENCE[3], carry: 0, collapsed: false, axis: SYMBOL_SEQUENCE[0] } },
  { input: 4, expected: { unit: SYMBOL_SEQUENCE[4], carry: 0, collapsed: false, axis: SYMBOL_SEQUENCE[0] } },
  { input: 5, expected: { unit: SYMBOL_SEQUENCE[5], carry: 0, collapsed: false, axis: SYMBOL_SEQUENCE[0] } },
  { input: 6, expected: { unit: SYMBOL_SEQUENCE[6], carry: 0, collapsed: false, axis: SYMBOL_SEQUENCE[0] } },
  { input: 7, expected: { unit: SYMBOL_SEQUENCE[7], carry: 0, collapsed: false, axis: SYMBOL_SEQUENCE[0] } },
  { input: 8, expected: { unit: SYMBOL_SEQUENCE[8], carry: 0, collapsed: false, axis: SYMBOL_SEQUENCE[0] } },
  { input: 9, expected: { unit: SYMBOL_SEQUENCE[9], carry: 0, collapsed: false, axis: SYMBOL_SEQUENCE[0] } },
  { input: 10, expected: { unit: '*', carry: 1, collapsed: true, axis: SYMBOL_SEQUENCE[0] } }
];

const incrementalPushTests = [
  { input: 10, expected: { unit: '*', carry: 1, collapsed: true, axis: SYMBOL_SEQUENCE[0] } },
  { input: 11, expected: { unit: '*', carry: 0, collapsed: false, axis: SYMBOL_SEQUENCE[1] } }
];

console.log('Single Push Tests:');
singlePushTests.forEach((test, index) => {
  console.log(`Test Case ${index + 1}: Push ${test.input} times`);
  
  const unit = new Unit();
  const axis10 = new Axis10();
  const carryBus = new CarryBus();
  
  let hasCollapsed = false;
  for (let i = 0; i < test.input; i++) {
    if (!hasCollapsed) {
      unit.push(1, carryBus);
      if (unit.getState().currentSymbol === '*') {
        hasCollapsed = true;
      }
    }
    if (carryBus.carryValue > 0) {
      const { carryValue, carryTarget } = carryBus.flushCarry();
      if (carryTarget === 'Axis10') {
        axis10.push(carryValue, carryBus);
      }
      unit.state.carry = i < test.input - 1 ? 0 : unit.state.carry; // Clear carry after flush, except for final push
      unit.state.collapsed = i < test.input - 1 ? false : unit.state.collapsed; // Clear collapsed after flush, except for final push
    }
  }
  
  const unitState = unit.getState();
  const axisState = axis10.getState();
  console.log(`Unit: ${unitState.currentSymbol} Axis: ${axisState.currentSymbol} Fold: * FT: *`);
  console.log(`CARRY: ${unitState.carry} COLLAPSED: ${unitState.collapsed}`);
  
  const passed = 
    unitState.currentSymbol === test.expected.unit &&
    unitState.carry === test.expected.carry &&
    unitState.collapsed === test.expected.collapsed &&
    axisState.currentSymbol === test.expected.axis;
  
  console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
  if (!passed) {
    console.log(`Expected: Unit: ${test.expected.unit} CARRY: ${test.expected.carry} COLLAPSED: ${test.expected.collapsed} Axis: ${test.expected.axis}`);
  }
  console.log(`Carry History: ${JSON.stringify(carryBus.carryHistory)}`);
  console.log('---');
});

console.log('Incremental Push Tests (9 to 11):');
incrementalPushTests.forEach((test, index) => {
  console.log(`Test Case ${index + 10}: Push to ${test.input}`);
  
  const unit = new Unit();
  const axis10 = new Axis10();
  const carryBus = new CarryBus();
  
  let hasCollapsed = false;
  for (let i = 0; i < test.input; i++) {
    if (!hasCollapsed) {
      unit.push(1, carryBus);
      if (unit.getState().currentSymbol === '*') {
        hasCollapsed = true;
      }
    } else {
      axis10.push(1, carryBus); // Push axis post-collapse
    }
    if (carryBus.carryValue > 0) {
      const { carryValue, carryTarget } = carryBus.flushCarry();
      if (carryTarget === 'Axis10') {
        axis10.push(carryValue, carryBus);
      }
      unit.state.carry = i < test.input - 1 ? 0 : unit.state.carry; // Clear carry after flush, except for final push
      unit.state.collapsed = i < test.input - 1 ? false : unit.state.collapsed; // Clear collapsed after flush, except for final push
    }
  }
  
  const unitState = unit.getState();
  const axisState = axis10.getState();
  console.log(`Unit: ${unitState.currentSymbol} Axis: ${axisState.currentSymbol} Fold: * FT: *`);
  console.log(`CARRY: ${unitState.carry} COLLAPSED: ${unitState.collapsed}`);
  
  const passed = 
    unitState.currentSymbol === test.expected.unit &&
    unitState.carry === test.expected.carry &&
    unitState.collapsed === test.expected.collapsed &&
    axisState.currentSymbol === test.expected.axis;
  
  console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
  if (!passed) {
    console.log(`Expected: Unit: ${test.expected.unit} CARRY: ${test.expected.carry} COLLAPSED: ${test.expected.collapsed} Axis: ${test.expected.axis}`);
  }
  console.log(`Carry History: ${JSON.stringify(carryBus.carryHistory)}`);
  console.log('---');
});