// p1: 1306611, p2: 13210366
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

class TreeNode {
  constructor(dirName, parent) {
    this.dirName = dirName;
    this.parent = parent;

    this.totalSize = 0;
    this.children = [];
  }
}

const startNode = new TreeNode('/', null);
let currNode = startNode;
let cmdTokens = [];
let newNode;

// build a tree from inputs
rl.on('line', (line) => {
  // per line
  cmdTokens = line.split(' ');
  if (cmdTokens[0] == '$') {
    if (cmdTokens[1] == 'ls') {
    } else if (cmdTokens[1] == 'cd') {
      if (cmdTokens[2] == '..') { // if we go up a directory, move back up to parent node
        currNode = currNode.parent;
      } else if (cmdTokens[2] != '/') { // create new node then point to it
        newNode = new TreeNode(cmdTokens[2], currNode);
        currNode.children.push(newNode);
        currNode = newNode;
      }
    }
  } else { // we're in an ls
    if (cmdTokens[0] != 'dir') { // skip dir since cd takes care of directories
      currNode.totalSize += parseInt(cmdTokens[0], 10);
    }
  }
});

// could be more optimal but otherwise get nested sizes for dirs
const getSize = (node) => {
  if (node.children.length == 0) {
    return node.totalSize;
  } else {
    let childSum = 0;
    let i = 0;
    while (i < node.children.length) {
      childSum += getSize(node.children[i]);
      i++;
    }
    return node.totalSize + childSum;
  }
};

// could maybe do this with a reduce - determines if currNode is in visited list
const haveVisited = (node, visited) => {
  let i = 0;
  while (i < visited.size) {
    if (visited[i].dirName == node.dirName) {
      return true;
    }
    i++;
  }
  return false;
};

// then traverse to get storage sums
rl.once('close', () => {
  // at end
  // not sure why we can't just use startNode so just traverse up parents to get to the root lol
  while (currNode.parent != null) {
    // console.log(currNode.dirName + ' => ' + currNode.parent.dirName);
    currNode = currNode.parent;
  }

  // p2
  // const targetSize = 30000000 - (70000000 - getSize(currNode)); simplifies to below
  const targetSize = getSize(currNode) - 40000000;
  let delSize = 30000000;
  // console.log(targetSize);

  const visited = [currNode];
  const visitList = currNode.children;
  while (visitList.length > 0) {
    currNode = visitList.pop();
    // console.log('node: ' + currNode.dirName);
    if (currNode && !haveVisited(currNode, visited)) {
      currSum = getSize(currNode);
      // console.log(currSum);
      delSize = (currSum < delSize && currSum > targetSize) ? currSum : delSize;
      // console.log(delSize);
      visited.push(currNode);
      currNode.children.map(node => visitList.push(node));
    }
  }
  console.log(delSize);

  /* p1
  let finalSum = 0;
  let currSum = 0;
  const visited = [];
  const visitList = [];

  // DFS to fetch all directory sums
  visitList.push(currNode);
  while (visitList.length > 0) {
    currNode = visitList.pop();
    console.log('node: ' + currNode.dirName);
    if (currNode && !haveVisited(currNode, visited)) {
      currSum = getSize(currNode);
      console.log(currSum);
      finalSum += currSum <= 100000 ? currSum : 0;
      // console.log(finalSum);
      visited.push(currNode);
      currNode.children.map(node => visitList.push(node));
    }
  }

  console.log(finalSum);*/
 });
