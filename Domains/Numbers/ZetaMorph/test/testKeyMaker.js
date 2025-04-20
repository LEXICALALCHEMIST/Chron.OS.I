// testKeyMaker.js
// Located in ZetaMorph/test/

import KeyMaker from '../key/KeyMaker.js';

console.log('--- ZLME KeyMaker Test Suite ---');

const tests = [
  {
    number: 0,
    operation: 'add',
    expected: { operation: 'add', unit: 0, axis1: 0, axis2: 0, fold: 0, ft: 0 }
  },
  {
    number: 4,
    operation: 'add',
    expected: { operation: 'add', unit: 4, axis1: 0, axis2: 0, fold: 0, ft: 0 }
  },
  {
    number: 10,
    operation: 'add',
    expected: { operation: 'add', unit: 0, axis1: 0, axis2: 1, fold: 0, ft: 0 }
  },
  {
    number: 11,
    operation: 'subtract',
    expected: { operation: 'subtract', unit: 0, axis1: 1, axis2: 1, fold: 0, ft: 0 }
  },
  {
    number: 20,
    operation: 'add',
    expected: { operation: 'add', unit: 0, axis1: 0, axis2: 2, fold: 0, ft: 0 }
  },
  {
    number: 21,
    operation: 'add',
    expected: { operation: 'add', unit: 0, axis1: 1, axis2: 2, fold: 0, ft: 0 }
  },
  {
    number: 30,
    operation: 'add',
    expected: { operation: 'add', unit: 0, axis1: 0, axis2: 3, fold: 0, ft: 0 }
  }
];

tests.forEach((test, index) => {
  console.log(`Test Case ${index + 1}: Compose number ${test.number} with operation ${test.operation}`);
  
  try {
    const result = KeyMaker.compose(test.number, test.operation);
    console.log('Result:', result);
    console.log('Expected:', test.expected);
    
    const passed = 
      result.operation === test.expected.operation &&
      result.unit === test.expected.unit &&
      result.axis1 === test.expected.axis1 &&
      result.axis2 === test.expected.axis2 &&
      result.fold === test.expected.fold &&
      result.ft === test.expected.ft;
    
    console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
    if (!passed) {
      console.log(`Mismatch: Got ${JSON.stringify(result)}, Expected ${JSON.stringify(test.expected)}`);
    }
  } catch (error) {
    console.error(`Test Case ${index + 1} failed:`, error.message);
  }
  console.log('---');
});