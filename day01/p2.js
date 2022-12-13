// solution: 200945
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let linesum, t1, t2, t3;
t1 = -1;
t2 = -2;
t3 = -3;
rl.on('line', (line) => {
    // per line
    if (line.length === 0) { // if we reach the end of the calorie group for 1 elf
        if (t1 < linesum) { // if bigger than top 1, then cascade 2 and 3
            t3 = t2;
            t2 = t1;
            t1 = linesum;
        } else if (t2 < linesum) { // if bigger than top 2, then cascade 3
            t3 = t2;
            t2 = linesum;
        } else if (t3 < linesum) { // if only bigger than top 3, just update
            t3 = linesum;
        }
        linesum = 0;
    } else { // otherwise keep adding up calories for current elf
        linesum += parseInt(line, 10);
    }
});

rl.once('close', () => {
    // at end
    console.log("top3max: " + (t1+t2+t3));
 });
