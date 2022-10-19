# study-bitcoin
阅读bitcoin白皮书[bitcoin-paper](https://bitcoin.org/bitcoin.pdf) （[bitcoin-paper(中文版)](https://bitcoin.org/files/bitcoin-paper/bitcoin_zh_cn.pdf)），学习区块链知识，用JavaScript简单实现了区块链的一些概念(Some concepts of blockchain are simply implemented in JavaScript to learn blockchain knowledge)

# 功能(Features)
* 区块链的验证(JavaScript implementation of blockchain to prevent data from being tampered with)
* 工作量证明机制的简单实现(Simple implementation of proof-of-work mechanism)
* 转账(transfer)
* 挖矿的简单实现(Mine)
* 生成密钥对(Generate key pair)

# 开始(Get Started)

## 生成密钥对
```JavaScript
const ecLib = require("elliptic").ec;
const ec = new ecLib("secp256k1"); // curve name
const sha256 = require("crypto-js/sha256");
// 生成密钥对 
const KeyPair = ec.genKeyPair();
// 拿到 hex string 格式的私钥和公钥
console.log("privateKey", KeyPair.getPrivate("hex"));
console.log("publicKey", KeyPair.getPublic("hex"));

```
## 创建区块链(Create Blockchain)

```JavaScript
const myCoin = new chain();
```
## 转账(Transactio)

```JavaScript
const transaction = new Transaction("addrSender1", "addrReceiver1", 10);
myCoin.addTransaction(transaction);
```

## 挖矿(Mine)

```JavaScript
myCoin.mineTransactionPool('addr3');
```

# 待完善(TODO)
* 交易签名(Sign transactions.)