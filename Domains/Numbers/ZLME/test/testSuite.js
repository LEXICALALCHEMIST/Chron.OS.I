// testSuite.js
// Located in ZLME/tests/

const { morphSubtract } = require('../core/morph_Sequence');
const { morphParser } = require('../utils/morphParser');
const { glyphParser } = require('../system/glyphParser');

console.log('--- ZLME Subtraction Test Suite ---');

const testCases = [
  [9000, 8000, 1000],
  [900, 800, 100],
  [90, 9, 81]
];

console.log('1. Subtraction Test');
testCases.forEach(([numA, numB, expected], index) => {
  const glyphA = morphParser(numA);
  const result = morphSubtract(glyphA, numB);
  const parsed = glyphParser(result);
  console.log(`Test Case ${index + 1}: ${numA} - ${numB} = ${expected} → ${result} (Parsed: ${parsed})`);
});