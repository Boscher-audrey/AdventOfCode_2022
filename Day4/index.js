import fs from 'fs';

fs.readFile('./input', 'utf8', function (err, data) {
  const pairs = data.split(`\r\n`);

  const range = (start, stop) => Array.from({ length: stop - start + 1 }, (_, i) => start + i);

  let pairsThatMatches = 0;
  let pairsThatOverlap = 0;

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

    const rangeNumbersElfOne = formatNumbers(0);
    const rangeNumbersElfTwo = formatNumbers(1);

    const rangeNumbersElfOneString = rangeNumbersElfOne.toString();
    const rangeNumbersElfTwoString = rangeNumbersElfTwo.toString();

    if (
      rangeNumbersElfOneString.includes(rangeNumbersElfTwoString) ||
      rangeNumbersElfTwoString.includes(rangeNumbersElfOneString)
    ) {
      pairsThatMatches++;
    }

    let endFor = 0;

    for (let i = 0; i < rangeNumbersElfOne.length; i++) {
      if (endFor !== 0) {
        break;
      }

      for (let j = 0; j < rangeNumbersElfTwo.length; j++) {
        if (rangeNumbersElfOne[i] === rangeNumbersElfTwo[j]) {
          pairsThatOverlap++;
          endFor++;
          break;
        }
      }
    }
  });

  console.log('Step 1 - Number of assignment pairs that matches the range : ', pairsThatMatches);
  console.log('Step 2 - Number of assignment pairs that ranges overlap : ', pairsThatOverlap);
});
