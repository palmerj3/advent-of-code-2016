const md5 = require('js-md5');
const input = 'cxdnnyjw';

let i = 0;
let pass = {};
let found = 0;

while (found < 8) {
  let hash = md5(`${input}${i}`);
  i++;

  // console.log(`checking ${hash.substring(0, 5)}`);
  if (hash.substr(0, 5) === '00000') {
    let pos = parseInt(hash.substr(5,1), 10);
    let val = hash.substr(6,1);

    if (isNaN(pos) || pos > 7 || pos < 0) continue;
    if (pass.hasOwnProperty(pos)) continue;

    pass[pos] = val;
    found++;
  }
}

console.log(`${i} iterations`);
console.log(Object.keys(pass).sort((a,b) => a-b).map((k) => pass[k]).join(''));
