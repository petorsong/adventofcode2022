// p2: 2644
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let letter, i, rawAscii, priority, map;
let linenum = 0;
let sum = 0;
rl.on('line', (line) => {
    // basically build on 1 map to find common letter in all 3 bags
    i = 0;
    if (linenum % 3 == 0) { // first bag
        map = new Map();
        while (i < line.length) {
            letter = line.charAt(i);
            if (!map.has(letter)) { // this check might be useless
                map.set(letter, 1); // populate letters from first bag
            }
            i++;
        }
    } else if (linenum % 3 == 1) { // second bag
        while (i < line.length) {
            letter = line.charAt(i);
            if (map.has(letter)) { // increment letter if we see it both in 2 and 1
                map.set(letter, 2);
            }
            i++;
        }
    } else { // every 3 lines we've seen 1 group
        while (i < line.length) {
            letter = line.charAt(i);
            if (map.has(letter) && map.get(letter) == 2) { // if this is the third time we've seen it, IT IS HIM/HER/THEM
                break;
            }
            i++;
        }
        rawAscii = line.charCodeAt(i);
        priority = rawAscii > 96 ? rawAscii - 96 : rawAscii - 38;
        sum += priority;
    
        // console.log(letter);
        // console.log(line.charCodeAt(i));
        // console.log(priority);
        // console.log('map: ', map);
    }

    linenum++;
});

rl.once('close', () => {
    // at end
     console.log(sum);
 });
