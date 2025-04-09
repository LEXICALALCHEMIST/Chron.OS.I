// morph_Sequence.js
// Handles symbolic pressure, morphing, and collapse-to-fold behavior

import { sacredNine } from './sacred_Nine.js';

export const morphEngine = {
  /**
   * Collapse triggered when vector > 9 AND symbol = '◇'
   * Fold to appropriate century glyph (e.g. 100 = 《●》)
   * Recursion (♧) only used when no fold anchor is found
   */
  collapse(glyph) {
    const { symbol, vector } = glyph;
    const pressure = vector.length;

    // Special case: ♧ does not collapse
    if (symbol === '♧') {
      return {
        raw: '<♧********>',
        symbol: '♧',
        collapsedFrom: '♧',
        fold: null,
        pressure: 0
      };
    }

    // If ◇ exceeded, move into a fold state (century marker)
    if (symbol === '◇' && pressure > 9) {
      // Determine fold level based on next morph cycle
      const foldAnchor = sacredNine.getCenturyFold(100) || '♧';

      return {
        raw: `<*********《${foldAnchor}》>`,
        symbol: foldAnchor,
        collapsedFrom: '◇',
        fold: foldAnchor,
        pressure
      };
    }

    // Default fold path if not handled above
    const foldTarget = sacredNine.getCollapseTarget(symbol) ?? '♧';

    return {
      raw: `<*${foldTarget}*******${sacredNine.getFold(foldTarget)}>`,
      symbol: foldTarget,
      collapsedFrom: symbol,
      fold: foldTarget,
      pressure
    };
  },

  /**
   * Push symbolic pressure into a glyph
   * If glyph symbol reaches pressure threshold, collapse
   */
  pushForward(glyph, steps = 1) {
    const vectorLength = glyph.vector?.length || 0;
    const symbol = glyph.symbol;
    const pressure = vectorLength + steps;

    // Collapse only if symbol is ◇ and pressure exceeds 9
    if (symbol === '◇' && pressure > 9) {
      return this.collapse(glyph);
    }

    const newSymbol = sacredNine.nextSymbol(symbol, steps);
    const newVector = '*'.repeat(pressure);
    const padded = '*'.repeat(Math.max(0, 8 - pressure));

    return {
      symbol: newSymbol,
      vector: newVector,
      raw: `<${newVector}${newSymbol}${padded}>`
    };
  }
};