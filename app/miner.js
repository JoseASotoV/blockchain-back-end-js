const Transaction = require("../wallet/libs/transaction");
const Wallet = require("../wallet/libs/wallet");

class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions();
    //include reward for the miner
    validTransactions.push(
      Transaction.rewardTransaction(wallet, Wallet.blockchainWallet())
    );
    //create a block consisting of the valid transactions
    const block = this.blockchain.addBlock(validTransactions);
    //synchronize chains in the p2p server
    this.p2pServer.syncChains();
    //clear Transaction Pool
    this.transactionPool.clear();
    //broadcast to every miner to clear their transaction pools
    this.p2pServer.broadcastClearTransactions();

    return block;
  }
}

module.exports = Miner;
