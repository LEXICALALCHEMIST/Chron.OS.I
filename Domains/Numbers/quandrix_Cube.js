// quandrixCube.js
// Core symbolic memory cube — handles glyph stacking, morph pressure, and collapse tracking

import { sacredNine } from './sacred_Nine.js';
import { morphEngine } from './morph_Sequence.js';

export class QuandrixCube {
  constructor() {
    this.sequence = []; // Memory of morph progression
    this.threshold = 9; // Collapse threshold (◇ max vector size)
  }

  /**
   * Initialize a base glyph
   * @param {string} symbol - Initial sacred glyph symbol
   * @param {number} position - Pressure depth (* count)
   * @param {string|null} fold - Optional fold label
   */
  initializeGlyph(symbol, position = 0, fold = null) {
    const vector = '*'.repeat(position);
    const padded = '*'.repeat(Math.max(0, 8 - position));

    return {
      symbol,
      vector,
      fold,
      raw: `<${vector}${symbol}${padded}${fold ? sacredNine.getFold(fold) : ''}>`
    };
  }

  /**
   * Push symbolic pressure into glyph
   * Triggers collapse if vector > 9 and symbol = '◇'
   * Logs state to cube memory
   */
  push(glyph, steps = 1) {
    const totalPressure = (glyph.vector?.length || 0) + steps;

    // If collapse condition is met, invoke morphEngine collapse
    if (glyph.symbol === '◇' && totalPressure > this.threshold) {
      const collapsed = morphEngine.collapse(glyph);
      this.sequence.push(collapsed);
      return collapsed;
    }

    // Else, evolve glyph forward
    const morphed = morphEngine.pushForward(glyph, steps);
    this.sequence.push(morphed);
    return morphed;
  }

  /**
   * Manually collapse a glyph at any time
   */
  collapse(glyph) {
    const collapsed = morphEngine.collapse(glyph);
    this.sequence.push(collapsed);
    return collapsed;
  }

  /**
   * Reset cube memory
   */
  reset() {
    this.sequence = [];
  }

  /**
   * Get the current state of the cube memory
   */
  getHistory() {
    return this.sequence;
  }
}