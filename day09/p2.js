// p2: 
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let knots = [
  [0, 0], [0, 0], [0, 0],
  [0, 0], [0, 0], [0, 0],
  [0, 0], [0, 0], [0, 0], [0, 0]
];

let [headX, headY, tailX, tailY] = [0, 0, 0, 0];
const historyMap = new Map();
historyMap.set('0,0', 1);
let move = [];

// const updateMap = (index) => {
const updateMap = () => {
  // console.log(index);
  const key = knots[9][0] + ',' + knots[9][1];
  // console.log(key);
  historyMap.set(key, 1);
}

const followMove = (direction, steps, index) => {
  // i: [1,1], i+1: [0,0]
  const xDiff = knots[index][0] - knots[index+1][0]; // 1
  const yDiff = knots[index][1] - knots[index+1][1]; // 1

  // only move if gap is 2, then both axes move as long as there is a gap
  if (Math.abs(xDiff) == 2 || Math.abs(yDiff) == 2) {
    knots[index+1][0] += xDiff != 0 ? Math.sign(xDiff) : 0; // 1
    knots[index+1][1] += yDiff != 0 ? Math.sign(yDiff) : 0; // 1
  }

  /*if (xDiff == 2) { // move right
    ++knots[index+1][0];
    knots[index+1][1] = knots[index][1];
  } else if (xDiff == -2) { // move left
    --knots[index+1][0];
    knots[index+1][1] = knots[index][1];
  } else if (yDiff == 2) { // move up
    ++knots[index+1][1];
    knots[index+1][0] = knots[index][0];
  } else if (yDiff == -2) { // move down
    --knots[index+1][1];
    knots[index+1][0] = knots[index][0];
  }*/

  if (index == 8) {
    // update the map once we get to the tail
    // updateMap(index);
    updateMap();
    if (steps > 1) {
      // console.log('index: ' + index + ', steps: ' + steps)
      // console.log(knots);
      moveHead(direction, --steps); // move to next step if not final step
    }
  } else if (steps >= 1) {
    followMove(direction, steps, ++index); // move to next pair
  } // if final step, no more recursion
};

const moveHead = (direction, steps) => {
  switch (direction) {
    case 'U':
      knots[0][1] += 1;
      break;
    case 'D':
      knots[0][1] -= 1;
      break;
    case 'L':
      knots[0][0] -= 1;
      break;
    case 'R':
      knots[0][0] += 1;
      break;
  }

  followMove(direction, steps, 0);
};

const getGridBounds = () => {
  let [xMin, xMax, yMin, yMax] = [0, 0, 0, 0];
  let i = 0;
  while (i < knots.length) {
    xMin = xMin > knots[i][0] ? knots[i][0] : xMin;
    xMax = xMax < knots[i][0] ? knots[i][0] : xMax;
    yMin = yMin > knots[i][1] ? knots[i][1] : yMin;
    yMax = yMax < knots[i][1] ? knots[i][1] : yMax;
    ++i;
  }
  // console.log('knot x: ' + xMin + ' to ' + xMax);
  // console.log('knot y: ' + yMin + ' to ' + yMax);
  Array.from(historyMap.keys()).forEach(key => { // TODO: still kinda borked
    const chunks = key.split(',');
    const mapX = parseInt(chunks[0], 10);
    const mapY = parseInt(chunks[1], 10);
    // console.log(mapX + ', ' + mapY);
    xMin = xMin > mapX ? mapX : xMin;
    xMax = xMax < mapX ? mapX : xMax;
    yMin = yMin > mapY ? mapY : yMin;
    yMax = yMax < mapY ? mapY : yMax;
  });
  // console.log('map x: ' + xMin + ' to ' + xMax);
  // console.log('map y: ' + yMin + ' to ' + yMax);
  return [xMin, xMax, yMin, yMax];
};

const drawGrid = () => {
  // get bounds
  const [xMin, xMax, yMin, yMax] = getGridBounds();

  // loop to draw
  let str, before;
  for (let y = yMax; y >= yMin; --y) {
    str = '';
    for (let x = xMin; x <= xMax; ++x) {
      before = str;
      for (let i = 0; i < knots.length; ++i) { // active knots (H1-9)
        if (knots[i][0] == x && knots[i][1] == y) {
          str += i > 0 ? i : 'H';
          break;
        }
      }
      if (before != str) {
        continue;
      }
      for (let i = 0; i < historyMap.size; ++i) { // history (S#)
        if (historyMap.has(x + ',' + y)) {
          str += '0,0' == x + ',' + y ? 'S' : '#';
          break;
        }
      }
      if (before != str) {
        continue;
      }
      // dot (.)
      str += '.';
    }
    console.log(str);
  }
  console.log();
};

const drawHistory = () => {
  // get bounds
  const [xMin, xMax, yMin, yMax] = getGridBounds();

  // loop to draw
  let str, before;
  for (let y = yMax; y >= yMin; --y) {
    str = '';
    for (let x = xMin; x <= xMax; ++x) {
      before = str;
      for (let i = 0; i < historyMap.size; ++i) { // history (S#)
        if (historyMap.has(x + ',' + y)) {
          str += '0,0' == x + ',' + y ? 'S' : '#';
          break;
        }
      }
      if (before != str) {
        continue;
      }
      // dot (.)
      str += '.';
    }
    console.log(str);
  }
  console.log();
};

rl.on('line', (line) => {
  // per line
  move = line.split(' ');
  moveHead(move[0], move[1]);
  // console.log('done ' + line);
  // console.log(historyMap);
  // console.log(knots);
  // drawGrid();
  // console.log(historyMap)
  // console.log();
});

rl.once('close', () => {
  // at end
  // console.log(historyMap);
  console.log(historyMap.size);
  drawHistory();
});
