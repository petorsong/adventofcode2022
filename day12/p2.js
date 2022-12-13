// p2: 418 - kinda flubbed it lol
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const grid = [];
const allStartPos = [];
let rowNum = 0;
rl.on('line', (line) => {
  // per line
  [...line.matchAll(new RegExp('a', 'gi'))].map(a => allStartPos.push([a.index, rowNum]));
  grid.push([...line]);
  ++rowNum;
});

// i.e. get neighbours
const getNextSteps = (grid, currPos, visited) => {
  const neighbours = [];
  const compareValue = String.fromCharCode(grid[currPos[1]][currPos[0]].charCodeAt(0) + 1); // ++ the current value for comparison purposes

  const aboveY = currPos[1] - 1;
  const belowY = currPos[1] + 1;
  const leftX = currPos[0] - 1;
  const rightX = currPos[0] + 1;

  // console.log('visited');
  // console.log(visited);
  // console.log('current: ' + currPos + ', compare value: ' + compareValue);

  // can't be out of bounds, invalid elevation, or previously visited
  if (aboveY >= 0 && compareValue >= grid[aboveY][currPos[0]] && !visited.has(currPos[0] + ',' + aboveY)) {
    // console.log('above: ' + [currPos[0], aboveY] + '(' + grid[aboveY][currPos[0]] + ')');
    neighbours.push(currPos[0] + ',' + aboveY);
  }
  if (belowY < grid.length && compareValue >= grid[belowY][currPos[0]] && !visited.has(currPos[0] + ',' + belowY)) {
    // console.log('below: ' + [currPos[0], belowY] + '(' + grid[belowY][currPos[0]] + ')');
    neighbours.push(currPos[0] + ',' + belowY);
  }
  if (leftX >= 0 && compareValue >= grid[currPos[1]][leftX] && !visited.has(leftX + ',' + currPos[1])) {
    // console.log('left: ' + [leftX, currPos[1]] + '(' + grid[currPos[1]][leftX] + ')');
    neighbours.push(leftX + ',' + currPos[1]);
  }
  if (rightX < grid[0].length && compareValue >= grid[currPos[1]][rightX] && !visited.has(rightX + ',' + currPos[1])) {
    // console.log('right: ' + [rightX, currPos[1]] + '(' + grid[currPos[1]][rightX] + ')');
    neighbours.push(rightX + ',' + currPos[1]);
  }

  // console.log(neighbours);
  return neighbours;
};

// i.e. breadth first search (BFS)
const traverseGrid = (grid, startPos, endPos) => {
  const visited = new Map();
  visited.set(startPos[0] + ',' + startPos[1], 1);
  const queue = [startPos[0] + ',' + startPos[1]];
  let pathLength = 0;
  let lastInLevel = startPos;
  while (queue.length > 0) {
    // console.log('queue:');
    // console.log(queue);
    const currPos = queue.shift().split(',').map(s => parseInt(s, 10));
    if (endPos[0] == currPos[0] && endPos[1] == currPos[1]) {
      return pathLength;
    }
    getNextSteps(grid, currPos, visited).map(s => {
      visited.set(s, 1);
      queue.push(s);
    });
    if (lastInLevel[0] == currPos[0] && lastInLevel[1] == currPos[1] && queue.length > 0) {
      // console.log(queue);
      lastInLevel = queue[queue.length-1].split(',').map(s => parseInt(s, 10));
      // console.log('last in level: ' + lastInLevel);
      ++pathLength;
      // console.log('level: ' + pathLength + '\n');
    }
  }
  return null; // short circuited out of errors lol - still somehow got a valid answer
};

rl.once('close', () => {
  // at end
  // console.log(grid);

  // test
  // const startPos = [0, 0];
  // const endPos = [5, 2];

  // input - easier to hard code here sadge
  const startPos = [0, 20];
  const endPos = [91, 20];

  // generalize the grid so we don't need to account for start/end elevations later
  grid[startPos[1]][startPos[0]] = 'a';
  grid[endPos[1]][endPos[0]] = 'z';

  allStartPos.push(startPos);

  console.log(allStartPos.length);

  // const shortestPaths = allStartPos.map(sp => traverseGrid(grid, sp, endPos));
  const shortestPaths = [];
  for (let i = 0; i < allStartPos.length; ++i) {
    shortestPaths.push(traverseGrid(grid, allStartPos[i], endPos));
    console.log(shortestPaths);
  }

  console.log(shortestPaths.filter(sp => sp != null).sort((a, b) => a - b)[0]);

  // console.log(traverseGrid(grid, startPos, endPos));
  // console.log(grid);
 });
