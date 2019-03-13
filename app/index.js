const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("../blockchain/libs/blockchain");
const P2pServer = require("./p2p-server");
const Wallet = require("../wallet/libs/wallet");
const TransactionPool = require("../wallet/libs/transaction-pool");
const Miner = require("./miner");

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, wallet, p2pServer);

app.use(bodyParser.json());

app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.post("/mine", (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);

  p2pServer.syncChains();

  res.redirect("/blocks");
});

//Transactions
app.get("/transactions", (req, res) => {
  res.json(tp.transactions);
});

app.post("/transact", (req, res) => {
  const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, bc, tp);
  p2pServer.broadcastTransaction(transaction);
  res.redirect("/transactions");
});

app.get("/mine-transactions", (req, res) => {
  const block = miner.mine();
  console.log(`block has been added ${block.toString()}`);
  res.redirect("/blocks");
});

// allowing users to get their own public key, so that they can share it with other people
app.get("/public-key", (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});
p2pServer.listen();
