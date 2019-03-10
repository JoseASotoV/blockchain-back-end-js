const SHA256 = require("crypto-js/sha256");
const { DIFFICULTY } = require("../../config");

class Block {
  constructor(timestamp, lastHash, hash, data, nonce) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }

  toString() {
    return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substring(0, 10)}
            Hash: ${this.hash.substring(0, 10)}
            Nonce: ${this.nonce}
            Data: ${this.data}`;
  }

  static genesis() {
    return new this("Genesis time", "----", "GenesisHash", [], 0);
  }

  static mineBlock(lastBlock, data) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let nonce = 0;

    timestamp = Date.now();
    hash = Block.hash(timestamp, lastHash, data, nonce);

    while (hash.substring(0, DIFFICULTY) !== "0".repeat(DIFFICULTY)) {
      nonce++;
      timestamp = Date.now();
      hash = Block.hash(timestamp, lastHash, data, nonce);
    }

    do {
      nonce++;
      timestamp = Date.now();
      hash = Block.hash(timestamp, lastHash, data, nonce);
    } while (hash.substring(0, DIFFICULTY) !== "0".repeat(DIFFICULTY));

    return new this(timestamp, lastHash, hash, data, nonce);
  }

  static hash(timestamp, lastHash, data, nonce) {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce } = block;
    return this.hash(timestamp, lastHash, data, nonce);
  }
}

module.exports = Block;
