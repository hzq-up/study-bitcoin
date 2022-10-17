const { SHA256 } = require('crypto-js')
// console.log(sha256('andyhu1').toString())


// console.log(sha256('andyhu2').toString())
function proofOfwork() {
  let data = 'andyhu';
  let count = 1;
  while (true) {
    const hashStr = SHA256(data + count).toString();
    if (hashStr.substring(0, 4) !== '0000') {
      count++;
    } else {
      console.log(`${count}次`)
      console.log(hashStr)
      break;
    }
  }
}
proofOfwork()