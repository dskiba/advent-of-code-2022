const fs = require('fs/promises');


function calculate(str, window) {
  let start = 0
  let end = window
  let res = null
  while (!res && end < str.length) {
    const sliced = str.substring(start,end)
    if(new Set([...sliced]).size===window) {
      res = end
    }
    start++
    end++
  }
  return res
}


async function Five_pOne() {
  const data = await fs.readFile('./data.txt', { encoding: 'utf8' });
  console.log(calculate(data.trimEnd(), 4))
}


// Five_pOne(); // 1134

async function Five_pTwo() {
  const data = await fs.readFile('./data.txt', { encoding: 'utf8' });
  console.log(calculate(data.trimEnd(), 14))
}


Five_pTwo(); // 2263
