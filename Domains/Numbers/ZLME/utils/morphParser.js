// morphParser.js
// Located in ZLME/utils/

const { getGlyphForDigit } = require('../core/sacred_Nine');

function morphParser(number) {
  if (typeof number !== 'number' || number < 0 || !Number.isInteger(number)) return null;

  let axis = Array(9).fill('*');
  let resultFold = [];
  let ftGlyph = '♧';
  let unitGlyph = '♧';

  // Single-digit result (0–9)
  if (number < 10) {
    unitGlyph = getGlyphForDigit(number);
    return `<${unitGlyph}|${axis.join('')}《-|♧》>`;
  }

  // Axis result (10–99)
  if (number < 100) {
    let tens = Math.floor(number / 10);
    let ones = number % 10;
    if (tens > 0) {
      // Place one glyph in slot (tens - 1)
      axis[tens - 1] = getGlyphForDigit(ones);
    } else {
      unitGlyph = getGlyphForDigit(ones);
    }
    return `<${unitGlyph}|${axis.join('')}《-|♧》>`;
  }

  // Fold result (100+)
  let foldValue = Math.floor(number / 100);
  let remainder = number % 100;
  let tens = Math.floor(remainder / 10);
  let ones = number % 10;

  // Handle axis (tens/ones) - one glyph only
  if (tens > 0) {
    axis[tens - 1] = getGlyphForDigit(ones);
  } else if (ones > 0) {
    unitGlyph = getGlyphForDigit(ones);
  }

  // Handle fold and FT (thousands/hundreds) - unchanged per your note
  if (foldValue === 0) {
    resultFold = ['-'];
    ftGlyph = getGlyphForDigit(0);
  } else if (foldValue < 10) {
    resultFold = ['♧'];
    ftGlyph = getGlyphForDigit(foldValue);
  } else {
    resultFold = [];
    let tempFold = foldValue;
    while (tempFold > 0) {
      resultFold.unshift(getGlyphForDigit(tempFold % 10));
      tempFold = Math.floor(tempFold / 10);
    }
    ftGlyph = resultFold.pop(); // FT is rightmost (hundreds)
    if (resultFold.length === 0 || resultFold.every(g => g === '♧')) resultFold = ['♧'];
  }

  const foldGlyph = resultFold[0] === '♧' ? '♧' : resultFold.join('');
  return `<${unitGlyph}|${axis.join('')}《${foldGlyph}|${ftGlyph}》>`;
}

module.exports = { morphParser }; 