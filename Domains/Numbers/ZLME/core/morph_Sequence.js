// morph_Sequence.js
// Located in ZLME/core/
// ZLME Parser v1.0 - Perfect 950-995, Addition locked, Subtraction added
// Bad ass comment: This is the heart of ZLME's morphic math, slicing through numbers like a cosmic blade. Addition’s untouchable, subtraction’s here to carve precision. Billion-dollar vibes only.

const { getGlyphForDigit, glyphToValue } = require('./sacred_Nine');
const { morphParser } = require('../utils/morphParser');
const { glyphParser } = require('../system/glyphParser');

function morphAdd(glyphA, valueB) {
  if (!glyphA || valueB < 0 || !Number.isInteger(valueB)) return null;
  let initialValue = glyphParser(glyphA);
  let total = initialValue + valueB;
  return morphParser(total);
}

function morphSubtract(glyphA, valueB) {
  if (!glyphA || valueB < 0 || !Number.isInteger(valueB)) return null;
  let initialValue = glyphParser(glyphA);
  let total = initialValue - valueB;
  if (total < 0) return null;
  return morphParser(total);
}

module.exports = { morphAdd, morphSubtract };