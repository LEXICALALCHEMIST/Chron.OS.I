// keyMaker.js
// Located in ZetaMorph/key/

class KeyMaker {
  static compose(number, operation = 'add') {
    const key = {
      operation,
      unit: 0,
      axis1: 0,
      axis2: 0,
      fold: 0,
      ft: 0
    };
    if (number < 10) {
      key.unit = number; // Unit-level push (0–9)
    } else if (number >= 10 && number < 20) {
      key.axis1 = number - 10; // Axis1 push (0–9 for 10–19)
      key.axis2 = 1; // Axis2 indicates 10s range
    } else if (number >= 20 && number < 30) {
      key.axis1 = number - 20; // Axis1 push (0–9 for 20–29)
      key.axis2 = 2; // Axis2 indicates 20s range
    } else if (number >= 30) {
      key.axis1 = 0; // Beyond current range
      key.axis2 = Math.floor(number / 10); // Axis2 for higher ranges
    }
    return key;
  }
}

export default KeyMaker;