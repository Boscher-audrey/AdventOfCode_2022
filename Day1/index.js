import fs from 'fs'

fs.readFile('./input', 'utf8', function(err, data) {
  const content = data.split(`\r\n`)

  let totalCalories = []
  let calories = 0
  const lastCalories = parseInt(content[content.length - 1])

  content.forEach((cal) => {
    const itemCalories = parseInt(cal)
    if (itemCalories === lastCalories) {
      calories += itemCalories
      totalCalories.push(calories)
    } else if (itemCalories) {
      calories += itemCalories
    } else if (!itemCalories) {
      totalCalories.push(calories)
      calories = 0
    }
  })

  const maxCalories = Math.max(...totalCalories)

  console.log('Step 1 - Biggest total calories : ', maxCalories)

  const maxThreeCalories = totalCalories.sort(function(a, b) {return a-b}).slice(-3)

  let someTopThreeCalories = 0
  
  maxThreeCalories.forEach((cal) => {
    const itemCalories = parseInt(cal)
    someTopThreeCalories += itemCalories
  })
  
  console.log('Step 2 - Somme of top 3 total calories : ', someTopThreeCalories)


});