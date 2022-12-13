// p1: 550, p2: 931
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let pairs, first, second;
let count = 0;
rl.on('line', (line) => {
    // per line
    pairs = line.split(",");
    first = pairs[0].split('-').map(num => parseInt(num, 10));
    second = pairs[1].split('-').map(num => parseInt(num, 10));

    // p2: any overlaps - draw it out lol (supersets are a superset of this i'm pretty sure)
    if ((first[1] >= second[0] && first[0] <= second[1]) ||
        (second[1] >= first[0] && second[0] <= first[1])) {
      console.log(line);
      count++;
    }

    // p1: which one is superset of the other - draw it out lol (number line + sets)
    // if ((first[0] >= second[0] && first[1] <= second[1]) ||
    //   (second[0] >= first[0] && second[1] <= first[1])) {
    //     count++;
    //   }
});

rl.once('close', () => {
    // at end
     console.log(count);
 });
