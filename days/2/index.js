const fs = require('fs/promises');

function calculateRes(a, b) {
  if (a === 'A') {
    if (b === 'Y') return 6;
    if (b === 'Z') return 0;
  }
  if (a === 'B') {
    if (b === 'X') return 0;
    if (b === 'Z') return 6;
  }
  if (a === 'C') {
    if (b === 'Y') return 0;
    if (b === 'X') return 6;
  }
  return 3;
}

function calculateResult(data) {
  return data.reduce((summ, curr) => {
    const [a, b] = curr.split(' ');
    let calculated = calculateRes(a, b);
    let res = calculated + myShapes[b];
    summ += res;
    return summ;
  }, 0);
}

const myShapes = {
  Y: 2, //paper
  X: 1, // rock
  Z: 3 // scissors
};
// enemy A for Rock, B for Paper, and C for Scissors.
const results = {
  lose: 'X',
  draw: 'Y',
  win: 'Z'
}


function getRequiredShape(requiredRes, opponentsShape) {
  console.log({ requiredRes, opponentsShape })
  if(opponentsShape === 'A') {
    if(requiredRes === results.lose) return 'Z'
    if(requiredRes === results.draw) return 'X'
    if(requiredRes === results.win) return 'Y'
  }
  if(opponentsShape === 'B') {
    if(requiredRes === results.draw) return 'Y'
    if(requiredRes === results.win) return 'Z'
    if(requiredRes === results.lose) return 'X'
  }
  if(opponentsShape === 'C') {
    if(requiredRes === results.draw) return 'Z'
    if(requiredRes === results.win) return 'X'
    if(requiredRes === results.lose) return 'Y'
  }
}

function calculateScoreByResult(data) {
  return data.reduce((summ, curr) => {
    if(!curr) return summ
    const [opponentShape, result] = curr.split(' ');
    const myShape = getRequiredShape(result, opponentShape)
    let calculated = calculateRes(opponentShape, myShape);
    let res = calculated + myShapes[myShape];
    summ += res;
    return summ;
  }, 0);
}

async function second() {
  try {
    const data = await fs.readFile('./data.txt', { encoding: 'utf8' });
    const splitted = data.split('\n')
    const res = calculateScoreByResult(splitted)
    console.log({ splitted,res })
  } catch (err) {
    console.log(err);
  }
}

second();
