const fs = require('fs/promises');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function calculateRes(letter) {
  const isUpperCase = letter === letter.toUpperCase();
  return alphabet.indexOf(letter.toLowerCase()) + 1 + (isUpperCase ? 26 : 0);
}

function getAppearsInBothStr(str1, str2) {
  let res = '';
  for (let i = 0; i < str1.length; i++) {
    if (str2.includes(str1[i])) {
      res = str1[i];
      break;
    }
  }
  return res;
}

function separate(str) {
  const middle = Math.floor(str.length / 2);
  const start = str.substring(0, middle);
  const end = str.substring(middle);
  return [start, end];
}

function processRucsack(str) {
  const [start, end] = separate(str);
  const res = getAppearsInBothStr(start, end);
  return calculateRes(res);
}

function getGroups(data, groupCount = 3) {
  const res = [];
  data.forEach((i, idx) => {
    const idxToPush = Math.floor(idx/3)
    res[idxToPush] ? res[idxToPush].push(i) : res[idxToPush] = [i]

  });
  return res;
}

function containsInGroup(group) {
  let res = '';
  for (let i = 0; i < group[0].length; i++) {
    const char = group[0][i]
    if ( group[1].includes(char) && group[2].includes(char)) {
      res = char;
      break;
    }
  }
  return res;
}

async function dayThree_partOne() {
  try {
    const data = await fs.readFile('./data.txt', { encoding: 'utf8' });
    const splitted = data.trim().split('\n');
    const res = splitted.reduce((acc, curr) => {
      return acc += processRucsack(curr);
    }, 0);
    return res;
    console.log({ res })
  } catch (err) {
    console.log(err);
  }
}

async function dayThree_partTwo() {
  try {
    const data = await fs.readFile('./data.txt', { encoding: 'utf8' });
    const splitted = data.trim().split('\n');
    const groups = getGroups(splitted);
    const res = groups.reduce((acc,group) => {
      const char = containsInGroup(group)
      return acc+= calculateRes(char)
    },0)
    console.log({ res })
    return res

  } catch (err) {
    console.log(err);
  }
}

dayThree_partTwo();
