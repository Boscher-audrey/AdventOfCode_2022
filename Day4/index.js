import fs from 'fs';

fs.readFile('./input', 'utf8', function (err, data) {
  const pairs = data.split(`\r\n`);

  const range = (start, stop) => Array.from({ length: stop - start + 1 }, (_, i) => start + i);

  let pairsThatMatches = 0;

  pairs.map((pair) => {
    const elvesRange = pair.split(',');

    let arrayNumbers = [];

    elvesRange.forEach((elfRange) => {
      const rangeNumbers = elfRange.split('-');
      arrayNumbers.push(range(parseInt(rangeNumbers[0]), parseInt(rangeNumbers[1])));
    });

    const joinNumbersElfOne = arrayNumbers[0].join(',');
    const joinNumbersElfTwo = arrayNumbers[1].join(',');

    if (joinNumbersElfOne.includes(joinNumbersElfTwo) || joinNumbersElfTwo.includes(joinNumbersElfOne)) {
      pairsThatMatches++;
    }
  });

  console.log('Step 1 - Number of assignment pairs that matches the range : ', pairsThatMatches);
});
