const fs = require('fs');
const path = require('path');
const inputRaw = fs.readFileSync(path.join(process.cwd(), 'input'), 'utf8');
const inputRows = inputRaw.split("\n");

let col1 = [];
let col2 = [];
let col3 = [];

inputRows.map((r, i) => {
  if (r) {
    let c = r.split(' ').map((c) => parseInt(c, 10));

    col1.push(c[0]);
    col2.push(c[1]);
    col3.push(c[2]);
  }
});

const all = col1.concat(col2,col3);
let possibles = 0 ;

for(let i = 0; i < all.length; i+=3) {
  let a = [all[i], all[i+1], all[i+2]].sort((a,b) => a-b);

  if ((a[0] + a[1]) > a[2]) {
    possibles++;
  }
}

console.log(possibles);
