const EC = require("elliptic").ec;
const uuidV1 = require("uuid/v1");
//standards of efficiet cryptography prime 256 bytes
const ec = new EC("secp256k1");

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id() {
    return uuidV1();
  }
}

module.exports = ChainUtil;
