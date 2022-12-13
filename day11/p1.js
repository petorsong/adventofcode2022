// p1: 54752, p2: 13606755504
// const monkeys = [ // test
//   {
//     startingItems: [79, 98],
//     operation: ['*', 19],
//     divisibleTest: 23,
//     testResult: [2, 3],
//     inspectCount: 0,
//   },
//   {
//     startingItems: [54, 65, 75, 74],
//     operation: ['+', 6],
//     divisibleTest: 19,
//     testResult: [2, 0],
//     inspectCount: 0,
//   },
//   {
//     startingItems: [79, 60, 97],
//     operation: ['*', 'o'],
//     divisibleTest: 13,
//     testResult: [1, 3],
//     inspectCount: 0,
//   },
//   {
//     startingItems: [74],
//     operation: ['+', 3],
//     divisibleTest: 17,
//     testResult: [0, 1],
//     inspectCount: 0,
//   },
// ];

const monkeys = [ // input
  {
    startingItems: [85, 77, 77],
    operation: ['*', 7],
    divisibleTest: 19,
    testResult: [6, 7],
    inspectCount: 0,
  },
  {
    startingItems: [80, 99],
    operation: ['*', 11],
    divisibleTest: 3,
    testResult: [3, 5],
    inspectCount: 0,
  },
  {
    startingItems: [74, 60, 74, 63, 86, 92, 80],
    operation: ['+', 8],
    divisibleTest: 13,
    testResult: [0, 6],
    inspectCount: 0,
  },
  {
    startingItems: [71, 58, 93, 65, 80, 68, 54, 71],
    operation: ['+', 7],
    divisibleTest: 7,
    testResult: [2, 4],
    inspectCount: 0,
  },
  {
    startingItems: [97, 56, 79, 65, 58],
    operation: ['+', 5],
    divisibleTest: 5,
    testResult: [2, 0],
    inspectCount: 0,
  },
  {
    startingItems: [77],
    operation: ['+', 4],
    divisibleTest: 11,
    testResult: [4, 3],
    inspectCount: 0,
  },
  {
    startingItems: [99, 90, 84, 50],
    operation: ['*', 'o'],
    divisibleTest: 17,
    testResult: [7, 1],
    inspectCount: 0,
  },
  {
    startingItems: [50, 66, 61, 92, 64, 78],
    operation: ['+', 3],
    divisibleTest: 2,
    testResult: [5, 1],
    inspectCount: 0,
  },
];

// mod by product of all divisors (all primes) makes the numbers "manageable"
//  had to check reddit sadge - but also the question was so silly worded
const divisor = 19*3*13*7*5*11*17*2; // 23*19*17*13; // test

const execOperation = (worryLevel, op) => {
  if (op[0] == '+') {
    // return Math.floor((worryLevel + op[1]) / 3); // p1
    return Math.floor((worryLevel + op[1]) % divisor);
  } else {
    return op[1] == 'o'
      // ? Math.floor(worryLevel * worryLevel / divisor) // p1
      ? Math.floor((worryLevel * worryLevel) % divisor)
      // : Math.floor(worryLevel * op[1] / divisor); // p1
      : Math.floor((worryLevel * op[1]) % divisor);
  }
};

const printMonkeyBusiness = () => {
  const inspectCounts = monkeys.map(m => m.inspectCount);
  console.log(inspectCounts);
  inspectCounts.sort((a, b) => b - a);
  // console.log(inspectCounts);
  console.log(inspectCounts[0] * inspectCounts[1]);
};

let round = 1;
while (round <= 10000 /* 20 // p1 */) {
  let i = 0;
  while (i < monkeys.length) {
    monkeys[i].startingItems.map(item => {
      const afterOp = execOperation(item, monkeys[i].operation);
      if (afterOp % monkeys[i].divisibleTest == 0) {
        monkeys[monkeys[i].testResult[0]].startingItems.push(afterOp);
      } else {
        monkeys[monkeys[i].testResult[1]].startingItems.push(afterOp);
      }
      ++monkeys[i].inspectCount;
    });
    monkeys[i].startingItems = [];
    ++i;
  }
  if (round == 1 || round == 20 || round % 1000 == 0) {
    console.log('round: ' + round)
    printMonkeyBusiness();
  }
  ++round;
};

printMonkeyBusiness();
