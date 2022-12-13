// p1: CFFHVVHNC, p2: FSZWBPTBG
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let from, to, count, chunks;

// build input data as array of arrays
let stack1 = ['B', 'G', 'S', 'C'];
let stack2 = ['T', 'M', 'W', 'H', 'J', 'N', 'V', 'G'];
let stack3 = ['M', 'Q', 'S'];
let stack4 = ['B', 'S', 'L', 'T', 'W', 'N', 'M'];
let stack5 = ['J', 'Z', 'F', 'T', 'V', 'G', 'W', 'P'];
let stack6 = ['C', 'T', 'B', 'G', 'Q', 'H', 'S'];
let stack7 = ['T', 'J', 'P', 'B', 'W'];
let stack8 = ['G', 'D', 'C', 'Z', 'F', 'T', 'Q', 'M'];
let stack9 = ['N', 'S', 'H', 'B', 'P', 'F'];
// added empty array at [0] so don't need to deal with index shifting
let stacks = [[], stack1, stack2, stack3, stack4, stack5, stack6, stack7, stack8, stack9];

rl.on('line', (line) => {
    if(line.charAt(0) === 'm') {
      chunks = line.split(' from ');
      count = parseInt(chunks[0].split(' ')[1], 10);
      from = parseInt(chunks[1][0], 10);
      to = parseInt(chunks[1][5], 10);
      // console.log('mv ' + count + ' fm ' + from + ' t ' + to);
      // console.log(stacks);

      // p1: LIFO stack
      // for(let i = 0; i < count; i++) {
      //   stacks[to].push(stacks[from].pop());
      // }

      // p2: take subarrays in order, splice to make it shorter but more complicated lol
      stacks[to] = stacks[to].concat(
        stacks[from].splice(stacks[from].length-count, count)
      );
    }
});

rl.once('close', () => {
    // at end
     console.log(stacks[1].pop()); // p1: stack1.pop()
     console.log(stacks[2].pop());
     console.log(stacks[3].pop());
     console.log(stacks[4].pop());
     console.log(stacks[5].pop());
     console.log(stacks[6].pop());
     console.log(stacks[7].pop());
     console.log(stacks[8].pop());
     console.log(stacks[9].pop());
 });
