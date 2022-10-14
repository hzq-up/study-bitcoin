const sha256 = require('crypto-js/sha256')
// 区块 block
class Block {
  constructor(data, prevHash) {
    this.prevHash = prevHash;
    this.data = data;
    this.hash = this.computeHash();
  }
  computeHash() {
    return sha256(this.data + this.prevHash).toString();
  }
}

// 区块的链上生成第一个区块
class BlockChain {
  constructor() {
    this.chain = [this.firstBlock()]
  }
  //生成第一个区块
  firstBlock() {
    const firstBlock = new Block('我是第一个区块', '');
    return firstBlock;
  }
  // 获取当前最后一个区块
  getLastBlock() {
    const lastBlock = this.chain[this.chain.length - 1].hash;
    return lastBlock;
  }
  // 把区块链接到链上
  linkBlockToChain(newBlock) {
    // 1.把前一个区块的hash赋值给当前区块的 prevHash
    // 2.从新计算当前区块的hash
    newBlock.prevHash = this.getLastBlock();
    newBlock.hash = newBlock.computeHash();
    this.chain.push(newBlock)
  }
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
        console.log(`第${i + 1}个区块被篡改了！`)
        return false;
      }
      if (this.chain[i - 1].hash !== verifiedBlock.prevHash) {
        console.log('区块断裂')
        return false;
      }
    }
    return true;
  }
}

// const bitChain = new BlockChain();

// const block1 = new Block('交易数据1', '');
// bitChain.linkBlockToChain(block1)
// const block2 = new Block('交易数据2', '');
// bitChain.linkBlockToChain(block2)

// console.log(bitChain)
// console.log(bitChain.verifyChain())

const bitChain = new BlockChain();

const block1 = new Block('交易数据1', '');
bitChain.linkBlockToChain(block1)
const block2 = new Block('交易数据2', '');
bitChain.linkBlockToChain(block2)

// 测试篡改数据
bitChain.chain[1].data = '篡改交易数据';
// 测试篡改hash
bitChain.chain[1].hash = bitChain.chain[1].computeHash();
console.log(bitChain)
console.log(bitChain.verifyChain())
