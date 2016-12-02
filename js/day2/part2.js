const fs = require('fs');
const path = require('path');
const inputRaw = fs.readFileSync(path.join(process.cwd(), 'input'), 'utf8');
const inputRows = inputRaw.split("\n");

const keypad = [
  [0,0,1,0,0],
  [0,2,3,4,0],
  [5,6,7,8,9],
  [0,'A','B','C',0],
  [0,0,'D',0,0]
];

// row,column
const pos = [2,0];

let code = [];

inputRows.forEach((r) => {
  let inputTokens = r.split('');

  if (inputTokens.length > 0) {
    inputTokens.forEach((t) => {
      switch(t) {
        case 'U':
          keypad[pos[0]-1] && keypad[pos[0]-1][pos[1]] !== 0 ? pos[0]-- : pos[0];
          break;
        case 'D':
          keypad[pos[0]+1] && keypad[pos[0]+1][pos[1]] !== 0 ? pos[0]++ : pos[0];
          break;
        case 'L':
          keypad[pos[0]][pos[1]-1] && keypad[pos[0]][pos[1]-1] !== 0 ? pos[1]-- : pos[1];
          break;
        case 'R':
          keypad[pos[0]][pos[1]+1] && keypad[pos[0]][pos[1]+1] !== 0 ? pos[1]++ : pos[1];
          break;
      }
    });

    code.push(keypad[pos[0]][pos[1]]);
  }
});

console.log(code.join(''));
