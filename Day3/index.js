import fs from 'fs'

fs.readFile('./input', 'utf8', function(err, data) {
  const rucksacks = data.split(`\r\n`)

  function generateAlphabet(charA, charZ) {
    let alphabet = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; i++) {
      alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
  } 

  // Generate an array of minucule & majuscule alphabet
  const alphabet = generateAlphabet('a', 'z').concat(generateAlphabet('A', 'Z'))

  let sumPriorities = 0

  rucksacks.forEach((ruckstack) => {
    const halfSize = ruckstack.length / 2
    const compartments = [ruckstack.slice(0, halfSize), ruckstack.slice(halfSize)]

    let endFor = 0

    for (let i = 0; i < halfSize; i++) {
      if (endFor !== 0) {
        break
      }

    for (let j = 0; j < halfSize; j++) {
       if (compartments[0][i] === compartments[1][j]) {
          // Assign number according to index of occurence item
          const priority = alphabet.indexOf(compartments[0][i]) +1 // add +1 because index starts at 0 and here we need it to start at 1
          sumPriorities += priority
          endFor++
          break
        }
      }
    }
  })

  console.log('Step 1 - Sum of the priorities : ', sumPriorities)



  let sumElvesPriorities = 0

  // Split rucksacks every 3 elements
  for (let h = 0; h < rucksacks.length; h += 3) {
    const elvesGroups = rucksacks.slice(h, h + 3)

    let endFor = 0

    for (let i = 0; i < elvesGroups[0].length; i++) {
      if (endFor !== 0) {
        break
      }

      for (let j = 0; j < elvesGroups[1].length; j++) {
        if (endFor !== 0) {
          break
        }

        for (let k = 0; k < elvesGroups[2].length; k++) {
          if (elvesGroups[0][i] === elvesGroups[1][j]) {
            if (elvesGroups[0][i] === elvesGroups[2][k]) {
              const priority = alphabet.indexOf(elvesGroups[0][i]) +1
              sumElvesPriorities += priority
              endFor++
              break            
            }
          }
        }
      }
    }
  }

  console.log('Step 2 - Sum of the elves priorities : ', sumElvesPriorities)
})