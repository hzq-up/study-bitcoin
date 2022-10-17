const andyCoin = new BlockChain(4);
const transaction1 = new Transaction("addrSender1", "addrReceiver1", 10);
const transaction2 = new Transaction("addrSender2", "addrReceiver2", 20);
andyCoin.addTransaction(transaction1);
andyCoin.addTransaction(transaction2);

console.log(andyCoin)
andyCoin.mineTransactionPool('addr4');
console.log(andyCoin)