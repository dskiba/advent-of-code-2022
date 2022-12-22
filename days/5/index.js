const fs = require('fs/promises');

async function prepareData() {
  const data = await fs.readFile('./data.txt', { encoding: 'utf8' });
  const lines = data.replace(/\r/g, '').trimEnd();
  const [stacks, moves] = lines.split('\n\n');
  const splittedStacks = stacks.split('\n');
  const parsedStacks = splittedStacks.slice(0, splittedStacks.length - 1).map(l => {
    return [...l].filter((i, idx) => idx % 4 === 1);
  });
  const splittedMoves = moves.split('\n');
  const commands = splittedMoves.map(i => {
    const [_, move, from, to] = i.match(/move (\d+) from (\d+) to (\d+)/);
    return { move: parseInt(move, 10), from: parseInt(from, 10), to: parseInt(to, 10) };
  });

  const tower = {};
  parsedStacks.forEach((s) => {
    s.forEach((item, itemIdx) => {
      if (item !== ' ') {
        const idx = itemIdx + 1;
        if (tower[idx]) {
          tower[idx].unshift(item);
        } else {
          tower[idx] = [item];
        }
      }
    });
  });
  return { tower, commands };
}

function calculateRes(tower) {
  const values = Object.values(tower);
  let res = '';
  values.forEach(t => {
    res += t[t.length - 1];
  });
  return res;
}

async function Five_pOne() {
  const { tower, commands } = await prepareData();
  commands.forEach(c => {
    let { from, move, to } = c;
    while (move > 0) {
      const item = tower[from].pop();
      tower[to].push(item);
      move--;
    }
  });

  console.log(calculateRes(tower));
}


Five_pOne(); // NTWZZWHFV

async function Five_pTwo() {
  const { commands, tower } = await prepareData();
  commands.forEach(c => {
    let { from, move, to } = c;
    const movedItems = tower[from].splice(tower[from].length - move);
    tower[to].push(...movedItems);
  });
  console.log(calculateRes(tower));
}


Five_pTwo(); // BRZGFVBTJ
