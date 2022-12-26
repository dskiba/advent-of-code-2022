const fs = require('fs/promises');

async function partOne() {
  const data = await fs.readFile('./data.txt', { encoding: 'utf8' });
  const lines = data.trimEnd().split('\n');
  let res = 0;
  let coordinates = [];
  lines.forEach((line, lIdx) => {
    if (lIdx === 0 || lIdx === lines.length - 1) {
      res += line.length;
    } else {
      res = res + 2;
      // not first or last line
      // check left
      for (let i = 1; i < line.length - 1; i++) {
        const item = line[i]; // 5
        let isVisible = true;
        for (let j = 0; j < i; j++) {
          if (line[j] >= item) {
            isVisible = false;
            break;
          }
        }
        if (!isVisible) {
          // check right
          for (let j = line.length - 1; j > i; j--) {
            if (line[j] >= item) {
              isVisible = false;
              break;
            }
            isVisible = true;
          }
        }
        if (!isVisible) {
          // top
          for (let j = 0; j < lIdx; j++) {
            if (lines[j][i] >= item) {
              isVisible = false;
              break;
            }
            isVisible = true;
          }
        }
        if (!isVisible) {
          // bottom
          for (let j = lines.length - 1; j > lIdx; j--) {
            if (lines[j][i] >= item) {
              isVisible = false;
              break;
            }
            isVisible = true;
          }
        }
        if (isVisible) coordinates.push(`${lIdx}-${i}-${item}`);
        res = isVisible ? res + 1 : res;
      }
    }
  });
  return {coordinates , lines};
}

partOne(); //1648397

async function pTwo() {
  const { coordinates, lines } = await partOne();
  const scores = [];
  coordinates.forEach((c, cIdx) => {
    const [x, y, item] = c.split('-').map(Number);
    scores[cIdx] = [];
    const logItem = x === 3 && y === 2;

    // left
    for (let i = y - 1; i >= 0; i--) {
      if (lines[x][i] >= item) {
        scores[cIdx].push({ t: 'left', r: Math.abs(y - i) });
        break;
      } else if (i === 0) {
        scores[cIdx].push({ t: 'left', r: Math.abs(y), c: 'all' });
      }
    }
    // right
    for (let i = y + 1; i < lines[x].length; i++) {
      if (item <= lines[x][i]) {
        scores[cIdx].push({ t: 'right', r: Math.abs(y - i) });
        break;
      } else if (lines[x].length - 1 === i) {
        scores[cIdx].push({ t: 'right', r: Math.abs(y - i), c: 'all' });
      }
    }
    // top
    for (let i = x - 1; i >= 0; i--) {
      if (item <= lines[i][y]) {
        scores[cIdx].push({ t: 'top', r: Math.abs(x - i) });
        break;
      } else if (i === 0) {
        scores[cIdx].push({ t: 'top', r: Math.abs(x), c: 'all' });
      }
    }
    // bottom
    for (let i = x + 1; i < lines.length; i++) {
      if (item <= lines[i][y]) {
        scores[cIdx].push({ t: 'bottom', r: Math.abs(x - i) });
        break;
      } else if (i === lines.length - 1) {
        scores[cIdx].push({ t: 'bottom', r: Math.abs(x - i), c: 'all' });
      }
    }
  });
  const max = Math.max(...scores.map(s => s.map(i => i.r).reduce((a, b) => a * b, 1)));
  console.log({ max })
}

pTwo(); // 496650
