// p1: 
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const heights = new Map();
const terrain = new Map();
rl.on('line', (line) => { // read rock coordinates and set heights
  const coords = line.split(' -> ').map(coord => coord.split(',').map(n => parseInt(n, 10)));
  for (let i = 1; i < coords.length; ++i) {
    Array( // find range between the 2 coordinates
      coords[i-1][0] == coords[i][0] // ugly ternary for x vs y
        ? Math.max(coords[i-1][1], coords[i][1]) - Math.min(coords[i-1][1], coords[i][1]) + 1
        : Math.max(coords[i-1][0], coords[i][0]) - Math.min(coords[i-1][0], coords[i][0]) + 1
      ).fill(1).forEach((m,n) => {
        terrain.set(
          coords[i-1][0] == coords[i][0] // build correct key for rocks map
            ? coords[i][0] + ',' + (n + Math.min(coords[i-1][1], coords[i][1]))
            : (n + Math.min(coords[i-1][0], coords[i][0])) + ',' + coords[i][1]
        , '#');
        // set height - need to take min of the coord pair AND the existing height
        const heightKey = coords[i-1][0] == coords[i][0] ? coords[i][0] : (n + Math.min(coords[i-1][0], coords[i][0]));
        const heightY = coords[i-1][0] == coords[i][0] ? Math.min(coords[i-1][1], coords[i][1]) : coords[i][1];
        heights.set(heightKey, heights.has(heightKey) ? Math.min(heights.get(heightKey), heightY) : heightY);
      });
  }
});

const moveSand = (x, y) => {
  const currHeight = heights.get(x);
  if (!currHeight) { // if no height, base case: into abyss
    return null;
  } else if (!terrain.has(x + ',' + (y+1))) { // move downwards
    // console.log('down: ' + x + ', ' + (y+1));
    return moveSand(x, y+1);
  } else if (!terrain.has((x-1) + ',' + (y+1))) { // move leftwards
    // console.log('left: ' + (x-1) + ', ' + (y+1));
    return moveSand(x-1, y+1);
  } else if (!terrain.has((x+1) + ',' + (y+1))) { // move rightwards
    // console.log('right: ' + (x+1) + ', ' + (y+1));
    return moveSand(x+1, y+1);
  } else { // all 3 blocked, base case: resting
    // console.log(x + ', ' + y);
    heights.set(x, y);
    terrain.set(x + ',' + y, '#');
    // console.log(heights);
    return x + ', ' + y;
  }
}

const getNextSandPos = () => {
  return moveSand(500, 0);
};

rl.once('close', () => { // start pouring sand
  const sandStart = [500, 0];

  let restCount = 0;
  while (getNextSandPos() != null) {
    ++restCount;
  }

  // console.log(rocks);
  // console.log(heights);
  console.log(restCount);
 });
