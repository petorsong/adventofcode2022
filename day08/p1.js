// p1: 1854, 527340
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const grid = [];
rl.on('line', (line) => {
  // ingest grid
  grid.push(line.split('').map(Number));
});

const getViz = (x, y) => { // p1
  const height = grid[x][y];
  let m = 0;
  while (m < x) { // scan above
    if (height <= grid[m][y]) {
      break;
    }
    m++;
    if (m == x) {
      // console.log('above: ' + height + ' (' + x + ', ' + y + ')');
      return 1;
    }
  }
  m = x + 1;
  while (m < grid.length) { // scan below
    if (height <= grid[m][y]) {
      break;
    }
    m++;
    if (m == grid.length) {
      // console.log('below: ' + height + ' (' + x + ', ' + y + ')');
      return 1;
    }
  }

  let n = 0;
  while (n < y) { // scan left
    if (height <= grid[x][n]) {
      break;
    }
    n++;
    if (n == y) {
      // console.log('left: ' + height + ' (' + x + ', ' + y + ')');
      return 1;
    }
  }
  n = y + 1;
  // console.log('right: ' + height + ' (' + x + ', ' + y + ')');
  while (n < grid[x].length) { // scan right
    // console.log(grid[x][n] + ' (' + x + ', ' + n + ')');
    if (height <= grid[x][n]) {
      break;
    }
    n++;
    if (n == grid[x].length) {
      // console.log('right: ' + height + ' (' + x + ', ' + y + ')');
      return 1;
    }
  }

  return 0;
};

const getScore = (x, y) => { // p2
  const height = grid[x][y];

  let aScore = 0;
  let m = x - 1;
  while (m >= 0) { // scan above
    aScore++;
    if (height <= grid[m][y]) {
      break;
    }
    m--;
  }

  let bScore = 0;
  m = x + 1;
  while (m < grid.length) { // scan below
    bScore++;
    if (height <= grid[m][y]) {
      break;
    }
    m++;
  }

  let lScore = 0;
  let n = y - 1;
  while (n >= 0) { // scan left
    lScore++;
    if (height <= grid[x][n]) {
      break;
    }
    n--;
  }

  let rScore = 0;
  n = y + 1;
  while (n < grid[x].length) { // scan right
    rScore++;
    if (height <= grid[x][n]) {
      break;
    }
    n++;
  }

  return aScore * bScore * lScore * rScore;
};

rl.once('close', () => {
  // determine visibility
  // console.log(grid);

  // let vizCount = 0; // p1
  let maxScore = 0;
  let currScore;
  let i = 1;
  let j;
  const iBound = grid[0].length - 1; // skip edges
  const jBound = grid.length - 1;
  while (i < iBound) {
    j = 1;
    while (j < jBound) {
      // vizCount += getViz(i, j); // p1
      currScore = getScore(i, j);
      maxScore = currScore > maxScore ? currScore : maxScore;
      j++;
    }
    ++i;
  }
  // console.log(vizCount + 2 * grid.length + 2 * grid[0].length - 4); // p1
  console.log(maxScore);
 });
