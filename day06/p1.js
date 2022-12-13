// p1: 1848, p2: 2308
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// p1: hardcode pairwise character comparisons - doable with length 4
// const fourUniq = (str) => {
//   return (
//     str[0] != str[1] &&
//     str[0] != str[2] &&
//     str[0] != str[3] &&
//     str[1] != str[2] &&
//     str[1] != str[3] &&
//     str[2] != str[3]
//   );
// }

// p2: more generic char pairwise comparisons
const uniqueSeq = (str) => {
  const charMap = new Map();
  for (let i = 0; i < str.length; i++) {
    if (charMap.has(str.charAt(i))) {
      return false;
    }
    charMap.set(str.charAt(i), 0);
  }
  return true;
}

rl.on('line', (line) => {
  // per line
  let i = 14;
  while (i <= line.length) { // instead of < to go by 1-index array basically
    // console.log(line.slice(i-4, i));
    if (uniqueSeq(line.slice(i-14, i))) {
      break; // find first N char sequence with all unique letters
    }
    i++;
  }
  console.log(i);
});

rl.once('close', () => {
  // at end
  // console.log();
 });
