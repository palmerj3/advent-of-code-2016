const fs = require('fs');
const path = require('path');
const inputRaw = fs.readFileSync(path.join(process.cwd(), 'input'), 'utf8');
const inputRows = inputRaw.split("\n");

const possibles = inputRows.filter((r) => {
  if (r) {
    let c = r.split(' ').map((c) => parseInt(c, 10)).sort((a,b) => a-b);

    return c[0] + c[1] > c[2];
  }
});

console.log(possibles.length);
