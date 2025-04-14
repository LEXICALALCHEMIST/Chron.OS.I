// morph_Sequence.js
// Located in ZLME/core/

const { sacredNine, getGlyphForDigit } = require('./sacred_Nine');
const { morphParser } = require('../utils/morphParser');
const { glyphParser } = require('../system/glyphParser');

const sequence = ['♧', '●', '○', '□', '¤', '■', '•', '¥', '▪︎', '◇'];

// --- ADDITION (Forward push with Fold Target Switch and Collapse) ---
function morphAdd(glyphA, valueB) {
  const regex = /<(.{1})\|(.*)《(.+)\|(.{1})》/;
  const matchA = glyphA.match(regex);
  if (!matchA) return null;

  // Parse glyphA to get initial value
  let initialValue = glyphParser(glyphA);
  let total = initialValue + valueB;

  let axis = Array(9).fill('*');
  let resultFold = [];
  let ftGlyph = '♧';
  let unitGlyph = '♧';

  // Single-digit result (0–9)
  if (total < 10) {
    unitGlyph = sequence[total];
    return `<${unitGlyph}|${axis.join('')}《-|♧》>`;
  }

  // Axis result (10–99)
  if (total < 100) {
    let tens = Math.floor(total / 10);
    let ones = total % 10;
    axis[8] = getGlyphForDigit(tens);
    axis[7] = getGlyphForDigit(ones);
    return `<♧|${axis.join('')}《-|♧》>`;
  }

  // Fold result (100+)
  let foldValue = Math.floor(total / 100);
  let remainder = total % 100;
  let tens = Math.floor(remainder / 10);
  let ones = remainder % 10;

  // Handle unit (ones)
  unitGlyph = sequence[0]; // Default to ♧ (0)

  // Handle axis (tens/ones)
  if (tens > 0 || ones > 0) {
    axis[8] = getGlyphForDigit(tens);
    axis[7] = getGlyphForDigit(ones);
  }

  // Handle fold digits (thousands/hundreds)
  if (foldValue < 10) {
    resultFold = [getGlyphForDigit(foldValue)];
    ftGlyph = '♧';
  } else {
    resultFold = [];
    let tempFold = foldValue;
    while (tempFold > 0) {
      resultFold.unshift(getGlyphForDigit(tempFold % 10));
      tempFold = Math.floor(tempFold / 10);
    }
    ftGlyph = resultFold.pop(); // FT is rightmost
    if (resultFold.length === 0) resultFold = ['-'];
  }

  // Handle FT collapse (FT is rightmost fold digit)
  if (valueB >= 100 && resultFold.length > 0) {
    let ftIdx = resultFold.length - 1;
    let ftValue = (sacredNine[ftGlyph] || 0) + Math.floor(valueB / 100);
    if (ftValue >= 10) {
      ftGlyph = '♧'; // Reset FT to ♧
      let carry = Math.floor(ftValue / 10);
      if (resultFold[0] === '-') resultFold = [];
      if (ftIdx >= 0) {
        let val = (sacredNine[resultFold[ftIdx]] || 0) + carry;
        resultFold[ftIdx] = getGlyphForDigit(val % 10);
        carry = Math.floor(val / 10);
        ftIdx--;
        while (carry > 0 && ftIdx >= 0) {
          val = (sacredNine[resultFold[ftIdx]] || 0) + carry;
          resultFold[ftIdx] = getGlyphForDigit(val % 10);
          carry = Math.floor(val / 10);
          ftIdx--;
        }
        if (carry > 0) {
          resultFold = [getGlyphForDigit(carry)].concat(resultFold.slice(1));
        }
      } else if (carry > 0) {
        resultFold = [getGlyphForDigit(carry)];
      }
    } else {
      ftGlyph = getGlyphForDigit(ftValue);
    }
  }

  // Add FT for numbers >= 1000
  if (total >= 1000 && !resultFold.includes('♧')) {
    if (ftGlyph !== '♧') {
      resultFold.push(ftGlyph);
      ftGlyph = '♧';
    }
  }

  const foldGlyph = resultFold.length && resultFold[0] !== '-' ? resultFold.join('') : '-';
  return `<${unitGlyph}|${axis.join('')}《${foldGlyph}|${ftGlyph}》>`;
}

// --- EXPORT ALL ---
module.exports = {
  morphAdd
};