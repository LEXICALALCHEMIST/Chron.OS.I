// testSuite.js
// Located in ZLME/tests/

const { morphParser } = require('../utils/morphParser');
const { glyphParser } = require('../system/glyphParser');

console.log('--- ZLME Parser Test Suite ---');

const testNumbers = [];
for (let num = 950; num <= 1020; num += 5) {
  testNumbers.push(num);
}

console.log('1. Parser Test');
testNumbers.forEach((number, index) => {
  const glyph = morphParser(number);
  const parsed = glyphParser(glyph);
  console.log(`Test Case ${index + 1}: ${number} → ${glyph} (Parsed: ${parsed})`);
});