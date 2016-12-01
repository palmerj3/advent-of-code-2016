const fs = require('fs');
const path = require('path');
const inputRaw = fs.readFileSync(path.join(process.cwd(), './input.csv'),'utf8');
const input = inputRaw.split(',').map((x) => x.trim());

// x, y (assume this is in the middle)
let pos = [0,0];
let facing = 0;
let directions = ['N', 'E', 'S', 'W'];

input.forEach((m) => {
  let direction = m.substr(0,1);
  let distance = parseInt(m.substr(1,m.length-1), 10);

  // Turn
  switch(direction) {
    case 'R':
      directions[facing+1] ? facing+=1 : facing = 0;
      break;
    case 'L':
      directions[facing-1] ? facing-=1 : facing = directions.length-1;
      break;
  }

  // Walk
  switch(directions[facing]) {
    case 'N':
      pos[1]+=distance;
      break;
    case 'E':
      pos[0]+=distance;
      break;
    case 'S':
      pos[1]-=distance;
      break;
    case 'W':
      pos[0]-=distance;
      break;
  }

  console.log(`Turning ${direction}`);
  console.log(`Traveling ${distance}`);
});

console.log('Final position: ', pos, facing);
console.log('Total Distance: ', Math.abs(pos[0])+Math.abs(pos[1]));
