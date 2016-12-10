const md5 = require('js-md5');
const input = 'cxdnnyjw';

let i = 0;
let pass = [];

while (pass.length < 8) {
  let hash = md5(`${input}${i}`);

  // console.log(`checking ${hash.substring(0, 5)}`);
  if (hash.substr(0, 5) === '00000') {
    console.log(hash);
    pass.push(hash.substr(5,1));
  }

  i++;
}

console.log(`${i} iterations`);
console.log(pass.join(''));
