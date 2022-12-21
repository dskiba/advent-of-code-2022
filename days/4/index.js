const fs = require('fs/promises');

function checkPairFullyContains(pair) {
  const [a, b] = pair.split(',');
  const [aStart, aEnd] = a.split('-').map(x => Number(x));
  const [bStart, bEnd] = b.split('-').map(x => Number(x));
  if (aStart >= bStart && aEnd <= bEnd) return true;
  if (bStart >= aStart && bEnd <= aEnd) return true;
  return false;
}

function isBetween(num, min, max) {
  return min <= num && num <= max;
}


function checkPairFullyContainsOverlaps(pair) {
  const [a, b] = pair.split(',');
  const [aStart, aEnd] = a.split('-').map(x => Number(x));
  const [bStart, bEnd] = b.split('-').map(x => Number(x));
  if (isBetween(aStart, bStart, bEnd)) return true;
  if (isBetween(aEnd, bStart, bEnd)) return true;
  if (isBetween(bStart, aStart, aEnd)) return true;
  if (isBetween(bEnd, aStart, aEnd)) return true;
  return false;
}

async function dayFour_partOne() {
  const data = await fs.readFile('./data.txt', { encoding: 'utf8' });
  const splitted = data.trim().split('\n');
  let res = 0;
  splitted.forEach(pair => {
    res += Number(checkPairFullyContains(pair));
  });
  console.log({ res, splitted });
}

async function dayFour_partOne() {
  const data = await fs.readFile('./data.txt', { encoding: 'utf8' });
  const splitted = data.trim().split('\n');
  let res = 0;
  splitted.forEach(pair => {
    res += Number(checkPairFullyContainsOverlaps(pair));
  });
  console.log({ res });
}


// dayFour_partOne() // 431
dayFour_partOne(); // 823
