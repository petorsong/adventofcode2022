// solution: 69693
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let linesum, currmax;
rl.on('line', (line) => {
    // per line
    if (line.length === 0) { // if we reach the end of the calorie group for 1 elf
        // take that sum and see if it's the highest - if so replace currmax
        currmax = currmax > linesum ? currmax : linesum;
        linesum = 0;
    } else { // otherwise keep adding up calories for current elf
        linesum += parseInt(line, 10);
    }
});

rl.once('close', () => {
    // at end
     console.log("currmax: " + currmax);
 });
