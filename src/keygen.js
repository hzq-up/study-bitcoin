const ecLib = require('elliptic').ec;
const ec = new ecLib('secp256k1');  // curve name
const sha256 = require('crypto-js/sha256');

//生成密钥对
const KeyPairSender = ec.genKeyPair();
// 拿到 hex string 格式的私钥和公钥
console.log('privateKey', KeyPairSender.getPrivate('hex'))
console.log('publickKey', KeyPairSender.getPublic('hex'))

const doc = 'zhuanzhang10rmb';
const hashedDoc = sha256(doc).toString();
const hexSignature = KeyPairSender.sign(hashedDoc, 'base64').toDER('hex');

console.log('hashedDoc', hashedDoc);
console.log('signature', hexSignature);
// 收到签名的
const KeyPairReceiver = ec.keyFromPublic(KeyPairSender.getPublic('hex'), 'hex');
console.log(KeyPairReceiver.verify(hashedDoc, hexSignature))

// // 测试篡改数据
// const tamperedDoc = 'zhuanzhang100rmb';
// const hashedTamperDoc = sha256(tamperedDoc).toString();
// console.log(KeyPairReceiver.verify(hashedTamperDoc,hexSignature))