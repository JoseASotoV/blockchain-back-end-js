const EC = require("elliptic").ec;
//standards of efficiet cryptography prime 256 bytes
const ec = new EC("secp256k1");

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }
}

module.exports = ChainUtil;
