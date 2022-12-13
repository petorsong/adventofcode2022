// p1: 7701
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let letter, i, rawAscii, priority;
let sum = 0;
rl.on('line', (line) => {
    // per line
    i = 0;
    const map = new Map();
    while(i < line.length / 2) { // scan first half of line
      letter = line.charAt(i);
      if (!map.has(letter)) { // add to hashmap (probably could remove this check)
        map.set(letter, 0);
      }
      i++;
    }
    while(i < line.length) { // scan second half of line
      letter = line.charAt(i);
      if (map.has(letter)) { // if we hit a letter from the first half, that's the one
        break;
      }
      i++;
    }
    rawAscii = line.charCodeAt(i);
    priority = rawAscii > 96 ? rawAscii - 96 : rawAscii - 38; // ascii math
    sum += priority;

    // console.log(letter);
    // console.log(line.charCodeAt(i));
    // console.log(priority);
    // console.log('map: ', map);
});

rl.once('close', () => {
    // at end
     console.log(sum);
 });
