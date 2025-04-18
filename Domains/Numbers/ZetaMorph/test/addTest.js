// addTest.js
// Located in ZetaMorph/test/

import MorphSkeleton, { fromCommand } from '../skeleton/MorphSkeleton.js';
import { SYMBOL_SEQUENCE } from '../core/sacred9.js';

console.log('--- ZLME Addition Test Suite ---');
console.log('MorphSkeleton imported:', MorphSkeleton);
console.log('MorphSkeleton.fromCommand:', fromCommand);

const tests = [
  {
    command: 'add 4 to 0',
    number: 4,
    base: 0,
    expected: `<${SYMBOL_SEQUENCE[4]}|*《*|*》>`
  },
  {
    command: 'add 2 to 2',
    number: 2,
    base: 2,
    expected: `<${SYMBOL_SEQUENCE[4]}|*《*|*》>`
  },
  {
    command: 'add 1 to 10',
    number: 1,
    base: 10,
    expected: `<*|${SYMBOL_SEQUENCE[1]}《*|*》>`
  }
];

tests.forEach((test, index) => {
  console.log(`Test Case ${index + 1}: ${test.command}`);
  
  try {
    console.log('Test values:', { command: test.command, number: test.number, base: test.base });
    const result = MorphSkeleton.fromCommand(test.command, test.number, test.base);
    const glyph = result.toGlyph();
    
    console.log(`Result: ${glyph}`);
    console.log(`Expected: ${test.expected}`);
    const passed = glyph === test.expected;
    console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
    if (!passed) {
      console.log(`Mismatch: Got ${glyph}, Expected ${test.expected}`);
    }
  } catch (error) {
    console.error(`Test Case ${index + 1} failed:`, error.message);
  }
  console.log('---');
});