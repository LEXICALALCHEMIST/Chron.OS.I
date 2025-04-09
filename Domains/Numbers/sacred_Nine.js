// sacred_nine.js
// Core symbolic glyphs for CHRONOS.SI morph engine with morph + fold integration

export const sacredNine = {
  // Core glyph symbols
  symbols: {
    0: '♧',       // Null Root — zero, recursion origin (not for century fold)
    1: '●',       // Unit / Seed
    2: '○',       // Duality
    3: '□',       // Tri-fold structure
    4: '¤',       // Four-point compression
    5: '■',       // Core density
    6: '•',       // Anchor node
    7: '¥',       // Domain vector
    8: '▪︎',      // Mirror form
    9: '◇'        // Collapse threshold
  },

  // Full visual glyphs (single glyphs)
  fullGlyphs: {
    0: '<♧********>',
    1: '<●********>',
    2: '<○********>',
    3: '<□********>',
    4: '<¤********>',
    5: '<■********>',
    6: '<•********>',
    7: '<¥********>',
    8: '<▪︎********>',
    9: '<◇********>'
  },

  /**
   * Get symbol for number 0–9
   */
  getSymbol(value) {
    return this.symbols[value] ?? null;
  },

  /**
   * Get full glyph string for number 0–9
   */
  getGlyph(value) {
    return this.fullGlyphs[value] ?? null;
  },

  /**
   * Get the next morph glyph from the sacred path (excludes ♧)
   */
  nextSymbol(current, steps = 1) {
    const keys = Object.values(this.symbols).slice(1); // skip ♧
    const index = keys.indexOf(current);
    return keys[(index + steps) % keys.length];
  },

  /**
   * Wrap a symbol in fold brackets 《》 for visual collapse
   */
  getFold(symbol) {
    return `《${symbol || '♧'}》`;
  },

  /**
   * Collapse logic path
   * Used when pressure exceeds threshold (after 9)
   */
  collapsePath: {
    '◇': '♧',
    '□': '♧',
    '¥': '■'
  },

  getCollapseTarget(symbol) {
    return this.collapsePath[symbol] ?? null;
  },

  /**
   * Defines fold anchors used at century morph points
   * 100 = 《●》, 200 = 《○》, 500 = 《■》 etc.
   */
  foldAnchors: {
    100: '●',
    200: '○',
    300: '□',
    400: '¤',
    500: '■',
    600: '•',
    700: '¥',
    800: '▪︎',
    900: '◇'
  },

  /**
   * Get fold anchor for a century boundary (multiples of 100)
   */
  getCenturyFold(value) {
    const anchor = this.foldAnchors[value];
    return anchor ? this.getFold(anchor) : null;
  }
};