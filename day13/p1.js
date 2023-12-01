// p1: 
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const pairInOrder = (leftPair, rightPair, indent) => {
  let index = 0;
  let left, right;
  const spaces = ' '.repeat(indent);
  while (index < rightPair.length) {
    left = leftPair[index];
    right = rightPair[index];
    console.log(spaces + 'comparing:');
    console.log(left);
    console.log(right);
    if (index >= leftPair.length) {
      console.log(spaces + 'T - left list ran out of items');
      return true; // if left list ran out of items: in order
    } else if ([left, right].every(Number.isInteger) && left != right) {
      console.log(left < right ? left + ' < ' + right : left + ' > ' + right);
      return left < right; // two different integers (skip if same)
    } else if ([left, right].every(Array.isArray) && !pairInOrder(left, right, indent + 1)) {
      console.log(spaces + 'obj mismatch');
      return false // two lists
    } else if (typeof left == 'number' && typeof right == 'object' && !pairInOrder([left], right, indent + 1)) {
      console.log(spaces + 'num obj mismatch: left = ' + left);
      return false; // convert left num into array
    } else if (typeof left == 'object' && typeof right == 'number' && !pairInOrder(left, [right], indent + 1)) {
      console.log(spaces + 'num obj mismatch: right = ' + right);
      return false; // convert right num into array
    }
    ++index;
  }
  console.log(spaces + 'right ran out');
  return index >= leftPair.length; // if left list still has items: not in order (same as index < leftPair.length ? false : true)
}

let currPair = 1;
let leftPair, rightPair;
let pairSum = 0;
let result;
rl.on('line', (line) => {
  // per line
  if (line.length == 0) { // if we've read both lines then process
    console.log(currPair);
    console.log(leftPair);
    console.log(rightPair);
    

    result = pairInOrder(leftPair, rightPair, 0);
    console.log(result);
    console.log();

    pairSum += result ? currPair : 0;

    leftPair = null;
    rightPair = null;
    ++currPair;
  } else {
    if (leftPair == null) {
      leftPair = eval(line);
    } else {
      rightPair = eval(line);
    }
  }
});

rl.once('close', () => {
  // at end
  console.log(pairSum);
 });
