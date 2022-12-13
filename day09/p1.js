// p1: 5735 
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let [headX, headY, tailX, tailY] = [0, 0, 0, 0];
const historyMap = new Map();
historyMap.set('0,0', 1);
let move = [];

const updateMap = (x, y) => {
  const key = x + ',' + y;
  historyMap.set(key, 1);
}

const makeMove = (direction, steps) => {
  switch (direction) {
    case 'U':
      headY += 1; // move head first
      if (Math.abs(tailY - headY) == 2) { // tail has to move if there's a gap of 2
        ++tailY; // follow upwards
        tailX = tailX != headX ? headX : tailX; // but also diagonally follow by updating X
      }
      break;
    case 'D':
      headY -= 1;
      if (Math.abs(tailY - headY) == 2) {
        --tailY;
        tailX = tailX != headX ? headX : tailX;
      }
      break;
    case 'L':
      headX -= 1;
      if (Math.abs(tailX - headX) == 2) {
        --tailX;
        tailY = tailY != headY ? headY : tailY;
      }
      break;
    case 'R':
      headX += 1;
      if (Math.abs(tailX - headX) == 2) {
        ++tailX;
        tailY = tailY != headY ? headY : tailY;
      }
      break;
  }
  // console.log('head: ' + headX + ', ' + headY);
  // console.log('tail: ' + tailX + ', ' + tailY);

  updateMap(tailX, tailY);
  if (steps > 1) {
    makeMove(direction, --steps);
  }
};

rl.on('line', (line) => {
  // per line
  move = line.split(' ');
  makeMove(move[0], move[1]);
});

rl.once('close', () => {
  // at end
  console.log(historyMap.size);
 });
 