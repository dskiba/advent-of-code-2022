const fs = require('fs/promises');

let history = [];
let tree = { name: '/', type: 'dir', size: 0, children: [] };
let currentNode = tree;

function proceedCd(line) {
  if (line[line.length - 1] === '/') {
    currentNode = tree;
    history = ['/'];
  } else {
    const dirMatch = line.match(/\b(\w+)$/);
    if (dirMatch) {
      history.push(dirMatch[0]);
      currentNode = currentNode.children.find(c => c.name === dirMatch[0]);
    } else {
      currentNode = tree;
      for (let i = 0; i < history.length - 1; i++) {
        if (currentNode.name === history[i]) continue;
        currentNode = currentNode.children.find(c => c.name === history[i]);
      }
      history.pop();

    }
  }
}

function proceedCommand(command) {
  if (command.startsWith('$ cd')) {
    proceedCd(command);
  } else if (command === '$ ls') {
    // skip
  } else {
    const line = command.trimEnd().split(' ');
    if (line[0] === 'dir') {
      currentNode.children.push({ type: 'dir', name: line[1], size: 0, children: [] });
    } else {
      currentNode.children.push({ type: 'file', name: line[1], size: Number(line[0]), children: [] });
    }
  }

}

function makeTree(lines) {
  lines.forEach(line => {
    proceedCommand(line);
  });
  return tree;
}

function calculateSize(node, parent) {
  if (node.type === 'file') {
    parent.size += node.size;
  } else if (node.type === 'dir') {
    for (const child of node.children) {
      node.size += calculateSize(child, node);
    }
  }
  return node.size;
}

function calculateSizesByMax(node, max = 100000) {
  let size = 0;
  if (node.type === 'dir') {
    if (node.size <= max) size += node.size;
    for (const child of node.children) {
      size += calculateSizesByMax(child, max);
    }
  }
  return size;
}

async function seven_pOne() {
  const data = await fs.readFile('./data.txt', { encoding: 'utf8' });
  const lines = data.trimEnd().split('\n');
  const tree = makeTree(lines);
  calculateSize(tree, tree);
  const res = calculateSizesByMax(tree);
  console.log({ res });
}


// seven_pOne(); //1648397

function getDirsToDelete(node, num, res = []) {
  if (node.type === 'dir') {
    if (node.size >= num) res.push(node);
    for (const child of node.children) {
      getDirsToDelete(child, num, res);
    }
  }
  return res;
}

async function seven_pTwo() {
  const data = await fs.readFile('./data.txt', { encoding: 'utf8' });
  const lines = data.trimEnd().split('\n');
  const tree = makeTree(lines);
  calculateSize(tree, tree);
  const TOTAL = 70000000;
  const REQUIRED = 30000000;
  const CURR = tree.size;
  const SPACE_TO_CLEAR = REQUIRED - (TOTAL - CURR);
  const dirsToDelete = getDirsToDelete(tree, SPACE_TO_CLEAR);
  let smallest = dirsToDelete[0]
  dirsToDelete.forEach(d => {
    if(d.size< smallest.size) smallest = d
  })
  console.log({ smallest })
}


seven_pTwo(); // 1815525
