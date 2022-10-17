const sha256 = require("crypto-js/sha256");
// 交易类
class Transaction {
  constructor(from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}

// 区块 block
class Block {
  constructor(transactions, prevHash) {
    this.prevHash = prevHash;
    this.hash = this.computeHash();
    this.timestamp = Date.now();
    this.nonce = 1;
    this.transactions = transactions;
  }
  computeHash() {
    return sha256(
      JSON.stringify(this.transactions) +
        this.prevHash +
        this.nonce +
        this.timestamp
    ).toString();
  }
  getAnswer(difficulty) {
    let answer = "";
    for (let i = 0; i < difficulty; i++) {
      answer += "0";
    }
    return answer;
  }
  // 挖矿
  mine(difficulty) {
    while (true) {
      this.hash = this.computeHash();
      if (this.hash.substring(0, difficulty) !== this.getAnswer(difficulty)) {
        this.nonce++;
        this.hash = this.computeHash();
      } else {
        break;
      }
    }
    console.log("挖矿结束！", this.hash);
  }
}

// 区块的链上生成第一个区块
class BlockChain {
  constructor(difficulty) {
    this.chain = [this.firstBlock()];
    // 挖矿的难度
    this.difficulty = difficulty;
    this.transactionPool = [];
    this.minerReward = 50; // 没挖出一个区块奖励50个coin
  }
  // 添加交易到交易池里
  addTransaction(transaction) {
    this.transactionPool.push(transaction);
  }

  // 旷工挖矿奖励的交易
  mineTransactionPool(minerRewardAddress) {
    // 发放旷工奖励
    const minerRewardTransaction  = new Transaction(
      '',
      minerRewardAddress,
      this.minerReward
    );
    this.transactionPool.push(minerRewardTransaction);

    // console.log('aaa:',this.getLastBlock.hash)
    // 挖矿
    const newBlock = new Block(this.transactionPool, this.getLastBlock().hash);
    newBlock.mine(this.difficulty);

    // 添加区块
    this.chain.push(newBlock);
    this.transactionPool = [];
  }
  //生成第一个区块
  firstBlock() {
    const firstBlock = new Block("我是第一个区块", "");
    return firstBlock;
  }
  // 获取当前最后一个区块
  getLastBlock() {
    const lastBlock = this.chain[this.chain.length - 1];
    return lastBlock;
  }
  // // 把区块链接到链上
  // linkBlockToChain(newBlock) {
  //   // 1.把前一个区块的hash赋值给当前区块的 prevHash
  //   // 2.从新计算当前区块的hash
  //   newBlock.prevHash = this.getLastBlock().hash;
  //   // newBlock.hash = newBlock.computeHash();
  //   newBlock.mine(this.difficulty);
  //   this.chain.push(newBlock);
  // }
  verifyChain() {
    // 验证第一个区块
    if (this.chain.length === 1) {
      if (this.chain[0].hash !== this.chain[0].computeHash()) {
        return false;
      }
      return true;
    }
    // 验证第二个到最后一个区块
    for (let i = 1; i <= this.chain.length - 1; i++) {
      const verifiedBlock = this.chain[i];
      if (verifiedBlock.hash !== verifiedBlock.computeHash()) {
        console.log(`第${i + 1}个区块被篡改了！`);
        return false;
      }
      if (this.chain[i - 1].hash !== verifiedBlock.prevHash) {
        console.log("区块断裂");
        return false;
      }
    }
    return true;
  }
}

const andyCoin = new BlockChain(4);
const transaction1 = new Transaction("addrSender1", "addrReceiver1", 10);
const transaction2 = new Transaction("addrSender2", "addrReceiver2", 20);
andyCoin.addTransaction(transaction1);
andyCoin.addTransaction(transaction2);

console.log(andyCoin)
andyCoin.mineTransactionPool('addr3');
console.log(andyCoin)
console.log(andyCoin.chain[1])
console.log(andyCoin.chain[1].transactions)

// const bitChain = new BlockChain(4);
// const block1 = new Block("交易数据1", "");
// bitChain.linkBlockToChain(block1);
// const block2 = new Block("交易数据2", "");
// bitChain.linkBlockToChain(block2);

// console.log(bitChain);


// 测试篡改数据
// bitChain.chain[1].data = '篡改交易数据';
// 测试篡改hash
// bitChain.chain[1].hash = bitChain.chain[1].computeHash();
// console.log(bitChain);
// console.log(bitChain.verifyChain())
