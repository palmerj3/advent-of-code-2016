const fs = require('fs');
const path = require('path');
const inputRaw = fs.readFileSync(path.join(process.cwd(), './input.csv'),'utf8');
const input = inputRaw.split(',').map((x) => x.trim());

// x, y (assume this is in the middle)
let pos = [0,0];
let facing = 0;
let directions = ['North', 'East', 'South', 'West'];

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
    case 'North':
      pos[1]+=distance;
      break;
    case 'East':
      pos[0]+=distance;
      break;
    case 'South':
      pos[1]-=distance;
      break;
    case 'West':
      pos[0]-=distance;
      break;
  }

  console.log(`Turning ${direction}`);
  console.log(`Traveling ${distance}`);
});

console.log('Final position: ', pos, facing);
console.log('Total Distance: ', pos.reduce((a,b) => Math.abs(a)+Math.abs(b)));
