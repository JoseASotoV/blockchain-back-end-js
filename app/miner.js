class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions();
    //TODO: include reward for the miner

    //TODO: create a block consisting of the valid transactions

    //TODO: synchronize chains in the p2p server

    //TODO: clear Transaction Pool

    //TODO: broadcast to every miner to clear their transaction pools
  }
}

module.exports = Miner;
