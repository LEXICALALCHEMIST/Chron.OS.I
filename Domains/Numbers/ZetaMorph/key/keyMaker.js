// KeyMaker.js
// Located in ZetaMorph/key/

class KeyMaker {
  static decompose(number) {
    const str = number.toString().padStart(4, '0');
    const ft = parseInt(str[0]); // Thousands place
    const fold = parseInt(str[1]); // Hundreds place
    const lastTwo = parseInt(str.slice(2)); // Last two digits

    let axis = 0;
    let unit = 0;

    if (lastTwo <= 9) {
      axis = 0;
      unit = lastTwo;
    } else {
      axis = lastTwo;
      unit = 0;
    }

    return {
      unit,
      axis,
      fold,
      ft
    };
  }
}

module.exports = KeyMaker;