const fs = require('fs');
const path = require('path');
const inputRaw = fs.readFileSync(path.join(process.cwd(), 'input'), 'utf8');
const inputRows = inputRaw.split("\n");

const pattern = /([a-z\-]*)([0-9]*)\[([a-z]*)\]/;
let sum = 0;

inputRows.map((r) => {
  if (r) {
    let p = r.match(pattern);

    let ename = p[1].replace(/-/g,'');
    let sector = parseInt(p[2], 10);
    let checksum = p[3];

    let hash = {};

    ename.split('').map((n) => hash[n] ? hash[n]++ : hash[n] = 1);

    let ranking = Object.keys(hash).map((k) => {
      return {
        key: k,
        val: hash[k]
      }
    }).sort((a,b) => {
      if (a.val < b.val) return 1;
      if (a.val > b.val) return -1;

      if (a.key < b.key) return -1;
      if (a.key > b.key) return 1;

      return 0;
    }).map((k) => {
      return k.key
    });

    let validhash = ranking.splice(0,5).join('');

    if (checksum === validhash) {
      sum += sector;
    }
  }
});

console.log(sum);
