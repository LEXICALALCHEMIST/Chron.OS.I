// testKey.js
// Located in ZetaMorph/test/

const KeyMaker = require('../key/keyMaker');

console.log('--- ZLME Key Maker Test Suite ---');

const testCases = [
  { input: 9, expected: { unit: 9, axis: 0, fold: 0, ft: 0 } },
  { input: 90, expected: { unit: 0, axis: 90, fold: 0, ft: 0 } },
  { input: 99, expected: { unit: 0, axis: 99, fold: 0, ft: 0 } },
  { input: 9, expected: { unit: 9, axis: 0, fold: 0, ft: 0 } },
  { input: 7890, expected: { unit: 0, axis: 90, fold: 8, ft: 7 } },
  { input: 7818, expected: { unit: 0, axis: 18, fold: 8, ft: 7 } },
  { input: 1234, expected: { unit: 0, axis: 34, fold: 2, ft: 1 } },
  { input: 0, expected: { unit: 0, axis: 0, fold: 0, ft: 0 } }
];

testCases.forEach((test, index) => {
  console.log(`Test Case ${index + 1}: Input Number = ${test.input}`);
  const key = KeyMaker.decompose(test.input);
  console.log(`KEY: UNIT: ${key.unit} AXIS: ${key.axis} FOLD: ${key.fold} FT: ${key.ft}`);
  
  const passed = 
    key.unit === test.expected.unit &&
    key.axis === test.expected.axis &&
    key.fold === test.expected.fold &&
    key.ft === test.expected.ft;
  
  console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
  if (!passed) {
    console.log(`Expected: UNIT: ${test.expected.unit} AXIS: ${test.expected.axis} FOLD: ${test.expected.fold} FT: ${test.expected.ft}`);
  }
  console.log('---');
});