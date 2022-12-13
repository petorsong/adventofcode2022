// solutions: 14264 (p1), 12382 (p2)
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let score = 0;
let round;
let linecount = 0;
// basically take each pair of values and figure out what the value should be lol
rl.on('line', (line) => {
    // per line
    round = line.split(" ");
    console.log(linecount++);
    if (round[0] === 'A') {
      score += round[1] === 'X' ? 4 : round[1] === 'Y' ? 8 : 3;
      // score += round[1] === 'X' ? 3 : round[1] === 'Y' ? 4 : 8; p2
    } else if (round[0] === 'B') {
      score += round[1] === 'X' ? 1 : round[1] === 'Y' ? 5 : 9;
      // score += round[1] === 'X' ? 1 : round[1] === 'Y' ? 5 : 9; p2
    } else {
      score += round[1] === 'X' ? 7 : round[1] === 'Y' ? 2 : 6;
      // score += round[1] === 'X' ? 2 : round[1] === 'Y' ? 6 : 7; p2
    }
});

rl.once('close', () => {
    // at end
     console.log("totalscore: " + score);
 });
