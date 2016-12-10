const fs = require('fs');
const path = require('path');
const inputRaw = fs.readFileSync(path.join(process.cwd(), 'input'), 'utf8');
const inputRows = inputRaw.split("\n");

const pattern = /([a-z\-]*)([0-9]*)\[([a-z]*)\]/;
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

let validrooms = inputRows
.filter((r) => r) // Remove empty rows
.map((r) => { // Separate parts
  let p = r.match(pattern);

  let sector = parseInt(p[2], 10);
  let checksum = p[3];

  return {
    name: p[1],
    sector: sector,
    checksum: checksum
  };
})
.map((r) => { // Calculate valid hash
  let ename = r.name.replace(/-/g,'');

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

  return Object.assign(r, {
    valid: r.checksum === validhash
  });
})
.filter((r) => r.valid) // Remove invalid
.map((r) => { // Cipher name
  let chars = r.name.split('')
  .map((c) => {
    let cIndex = alphabet.indexOf(c);
    let mod = r.sector % alphabet.length;

    if (cIndex === -1) {
      return ' ';
    }

    if (cIndex + mod > alphabet.length) {
      return alphabet[alphabet.length - (cIndex + mod)];
    } else {
      return alphabet[cIndex + mod];
    }
  }).join('');

  return Object.assign(r, {name: chars});
})

validrooms.map((r) => console.log(r));
