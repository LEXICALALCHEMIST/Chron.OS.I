// testQuandrixEngine.js
// Located in ZetaMorph/test/

const QuandrixEngine = require('../core/QuandrixEngine');
const { morphParser } = require('../utils/morphParser');
const { glyphParser } = require('../system/glyphParser');

console.log('--- ZLME Quandrix Engine Test Suite ---');

const testCases = [
  { inputA: 0, inputB: 1, expectedGlyph: '<●|*********《♧|♧》>', expectedValue: 1 },
  { inputA: 1, inputB: 1, expectedGlyph: '<○|*********《♧|♧》>', expectedValue: 2 },
  { inputA: 2, inputB: 1, expectedGlyph: '<□|*********《♧|♧》>', expectedValue: 3 },
  { inputA: 3, inputB: 1, expectedGlyph: '<¤|*********《♧|♧》>', expectedValue: 4 },
  { inputA: 4, inputB: 1, expectedGlyph: '<■|*********《♧|♧》>', expectedValue: 5 },
  { inputA: 5, inputB: 1, expectedGlyph: '<•|*********《♧|♧》>', expectedValue: 6 },
  { inputA: 6, inputB: 1, expectedGlyph: '<¥|*********《♧|♧》>', expectedValue: 7 },
  { inputA: 7, inputB: 1, expectedGlyph: '<◇|*********《♧|♧》>', expectedValue: 8 },
  { inputA: 8, inputB: 1, expectedGlyph: '<▲|*********《♧|♧》>', expectedValue: 9 },
  { inputA: 9, inputB: 1, expectedGlyph: '<♧|♧********《♧|♧》>', expectedValue: 10 }
];

testCases.forEach((test, index) => {
  console.log(`Test Case ${index + 1}: ${test.inputA} + ${test.inputB} = ${test.expectedValue}`);
  const engine = new QuandrixEngine();
  const glyphA = morphParser(test.inputA);
  const result = engine.morphAdd(glyphA, test.inputB);
  const parsed = glyphParser(result);
  const passed = result === test.expectedGlyph && parsed === test.expectedValue;
  
  console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
  console.log(`Got: ${result} (Parsed: ${parsed})`);
  if (!passed) {
    console.log(`Expected: ${test.expectedGlyph} (Parsed: ${test.expectedValue})`);
  }
  console.log('---');
});