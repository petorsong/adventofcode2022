// p1: 12840, p2: ZKJFBJFZ
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let cmd;
let xVal = 1;
let cycles = 0;
let sumSignalStrength = 0;
let drawnPixels = '*';

const checkCycle = () => {
  if ([20, 60, 100, 140, 180, 220].includes(cycles)) {
    console.log('cycles: ' + cycles + ', X: ' + xVal);
    sumSignalStrength += cycles * xVal;
  }
};

const drawPixel = () => { // off by one issue so need to decrement cycles before % 40
  // console.log((cycles-1) % 40 + ' is maybe in ' + [xVal-1, xVal, xVal+1]);
  drawnPixels += [xVal-1, xVal, xVal+1].includes((cycles-1) % 40) ? '#' : '.';
};

const printPixels = () => {
  console.log(drawnPixels.substring(1, 41));
  console.log(drawnPixels.substring(41, 81));
  console.log(drawnPixels.substring(81, 121));
  console.log(drawnPixels.substring(121, 161));
  console.log(drawnPixels.substring(161, 201));
  console.log(drawnPixels.substring(201, 241));
};

rl.on('line', (line) => {
  // per line
  // console.log(line);
  cmd = line.split(' ');
  if (cmd[0] == 'addx') {
    ++cycles;
    drawPixel(); // checkCycle(); p1
    // console.log(drawnPixels);
    ++cycles; // addx takes 2 cycles - should update/draw after every cycle
    drawPixel(); // checkCycle(); p1
    // console.log(drawnPixels);
    xVal += parseInt(cmd[1], 10); // X only updated at end of cycle
  } else {
    ++cycles; // should still update/draw after noop
    drawPixel(); // checkCycle(); p1
    // console.log(drawnPixels);
  }
});

rl.once('close', () => {
  // at end
  // console.log(drawnPixels.length);
  // console.log(drawnPixels);
  // console.log();
  printPixels(); // console.log(sumSignalStrength); p1
 });
