import fs from 'fs';

fs.readFile('./input', 'utf8', function (err, data) {
  const pairs = data.split(`\r\n`);

  const range = (start, stop) => Array.from({ length: stop - start + 1 }, (_, i) => start + i);

  let pairsThatMatches = 0;

  pairs.map((pair) => {
    const elvesRange = pair.split(',');

    let arrayRange = [];

    elvesRange.forEach((elfRange) => {
      const rangeNumbers = elfRange.split('-');
      arrayRange.push(range(parseInt(rangeNumbers[0]), parseInt(rangeNumbers[1])));
    });

    // Add 0 before numbers with single digit to avoid mismatching like 9 includes in 89
    const formatNumbers = (rangePart) => {
      return arrayRange[rangePart].map((number) => {
        if (number.toString().length === 1) {
          return '0' + number;
        } else {
          return number;
        }
      });
    };

    const rangeNumbersElfOne = formatNumbers(0).toString();
    const rangeNumbersElfTwo = formatNumbers(1).toString();

    if (rangeNumbersElfOne.includes(rangeNumbersElfTwo) || rangeNumbersElfTwo.includes(rangeNumbersElfOne)) {
      pairsThatMatches++;
    }
  });

  console.log('Step 1 - Number of assignment pairs that matches the range : ', pairsThatMatches);
});
