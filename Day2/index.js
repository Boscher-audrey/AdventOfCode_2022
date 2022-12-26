import fs from 'fs'

fs.readFile('./input', 'utf8', function(err, data) {
  // A-X: Rock, B-Y: Paper, C-Z: Scissors
  const rulePoint = {X:1, Y:2, Z:3}
  const scorePoint = {isLost: 0, isDraw: 3, isWon: 6}

  const allRounds = data.split(`\r\n`)

  const roundResult = (movePlayer1, movePlayer2) => {
    if ((movePlayer1 === 'A' && movePlayer2 === 'X') || 
      (movePlayer1 === 'B' && movePlayer2 === 'Y') || 
      (movePlayer1 === 'C' && movePlayer2 === 'Z')) {
        return scorePoint.isDraw
    } else if (
      (movePlayer1 === 'A' && movePlayer2 === 'Y') || 
      (movePlayer1 === 'B' && movePlayer2 === 'Z') || 
      (movePlayer1 === 'C' && movePlayer2 === 'X')
      ) {
        return scorePoint.isWon
    } else {
        return scorePoint.isLost
    }
  }

  const roundPoints = (movePlayer1, movePlayer2) => {
    switch (movePlayer2) {
      case 'X':
        return roundResult(movePlayer1, movePlayer2) + rulePoint.X
      case 'Y':
        return roundResult(movePlayer1, movePlayer2) + rulePoint.Y
      case 'Z':
        return roundResult(movePlayer1, movePlayer2) + rulePoint.Z
    }
  }

  let totalRoundScore = 0

  allRounds.forEach((round) => {
    const movesPlayers = round.split(' ')
    const movePlayer1 = movesPlayers[0]
    const movePlayer2 = movesPlayers[1]

    const result = roundPoints(movePlayer1, movePlayer2)
    totalRoundScore += result
  })

  console.log('Step 1 - Total round score : ', totalRoundScore)

  const topSecretRoundMove = (movePlayer1, movePlayer2) => {
    // Player needs to loose
    if (movePlayer2 === 'X') {
      switch(movePlayer1) {
        case 'A':
          return 'Z'
        case 'B':
          return 'X'
        case 'C':
          return 'Y'
      }
      // Player needs to win
    } else if (movePlayer2 === 'Z') {
      switch(movePlayer1) {
        case 'A':
          return 'Y'
        case 'B':
          return 'Z'
        case 'C':
          return 'X'
      }
      // Player needs to end the round in a draw
    } else if (movePlayer2 === 'Y') {
      switch(movePlayer1) {
        case 'A':
          return 'X'
        case 'B':
          return 'Y'
        case 'C':
          return 'Z'
      }
    }
  }

  let totalTopSecretRoundScore = 0

  allRounds.forEach((round) => {
    const movesPlayers = round.split(' ')
    const movePlayer1 = movesPlayers[0]
    const movePlayer2 = movesPlayers[1]

    const newMovePlayer2 = topSecretRoundMove(movePlayer1, movePlayer2)
    const result = roundPoints(movePlayer1, newMovePlayer2)
    totalTopSecretRoundScore += result
  })

  console.log('Step 2 - Total top secret round score : ', totalTopSecretRoundScore)
});

