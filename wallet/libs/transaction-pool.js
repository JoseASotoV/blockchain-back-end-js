const Transaction = require("./transaction");

class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction) {
    let transactionWithId = this.transactions.find(
      t => t.id === transaction.id
    );

    if (transactionWithId) {
      this.transactions[
        this.transactions.indexOf(transactionWithId)
      ] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }

  existingTransaction(address) {
    return this.transactions.find(t => t.input.address === address);
  }

  validTransactions() {
    //Two aspects will be verified
    //1.- its total output meets the original amount they started with
    //2.- verify signature of each transaction, to ensure it has not been tampered

    return this.transactions.filter(transaction => {
      //1.- check if total output meets the original amount they started with
      const outputTotal = transaction.outputs.reduce((total, output) => {
        return total + output.amount;
      }, 0);

      if (transaction.input.amount !== outputTotal) {
        console.log(`Invalid transaction from ${transaction.input.address}`);
        return;
      }

      //2.- verify signature of each transaction, to ensure it has not been tampered
      if (!Transaction.verifyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.input.address}.`);
        return;
      }

      return transaction;
    });
  }
}

module.exports = TransactionPool;
