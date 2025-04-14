// sacred_Nine.js
// Located in ZLME/core/

const sacredNine = {
  '♧': 0,
  '●': 1,
  '○': 2,
  '□': 3,
  '¤': 4,
  '■': 5,
  '•': 6,
  '¥': 7,
  '▪︎': 8,
  '◇': 9
};

const getGlyphForDigit = (digit) => {
  return Object.keys(sacredNine).find(key => sacredNine[key] === digit) || '♧';
};

const glyphToValue = sacredNine;

module.exports = {
  sacredNine,
  getGlyphForDigit,
  glyphToValue
};