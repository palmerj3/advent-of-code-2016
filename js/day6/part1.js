const fs = require('fs');
const path = require('path');
const inputRaw = fs.readFileSync(path.join(process.cwd(), 'input'), 'utf8');
const inputRows = inputRaw.split("\n");
let columns = [];

inputRows
.filter((r) => r)
.map((r) => {
  let tokens = r.split('');

  tokens.map((t, i) => {
    if (!columns[i]) columns[i] = {};
    if (!columns[i].hasOwnProperty(t)) columns[i][t] = 0;

    columns[i][t]++;
  });
});

const answer = columns.map((c) => {
  return Object.keys(c)
    .sort((a,b) => c[b] - c[a])
    .shift();
}).join('')

console.log(answer);
