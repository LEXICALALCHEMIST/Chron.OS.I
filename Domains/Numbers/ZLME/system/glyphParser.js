// glyphParser.js
// Located in ZLME/system/

const { glyphToValue } = require('../core/sacred_Nine');

function glyphParser(glyph) {
  const regex = /<(.{1})\|(.*)《(.+)\|(.{1})》/;
  const match = glyph.match(regex);
  if (!match) return null;

  const unitChar = match[1];
  const morphAxis = match[2].split('');
  const foldChar = match[3];
  const ftChar = match[4];

  let foldValue = 0;
  if (foldChar !== '♧' && foldChar !== '-') {
    const foldDigits = foldChar.split('');
    for (let i = 0; i < foldDigits.length; i++) {
      foldValue += (glyphToValue[foldDigits[i]] || 0) * Math.pow(10, foldDigits.length - i);
    }
  }

  let ftValue = (glyphToValue[ftChar] || 0) * 100;

  let morphValue = 0;
  for (let i = 0; i < morphAxis.length; i++) {
    if (morphAxis[i] !== '*') {
      morphValue = (i + 1) * 10 + (glyphToValue[morphAxis[i]] || 0);
      break;
    }
  }

  const unitValue = glyphToValue[unitChar] || 0;

  const total = foldValue * 100 + ftValue + morphValue + unitValue;
  return total;
}

module.exports = { glyphParser };