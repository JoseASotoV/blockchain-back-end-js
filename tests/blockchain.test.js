const Blockchain = require("../libs/blockchain");
const Block = require("../libs/block");

describe("Blockchain", () => {
  let bc, bc2;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it("starts with genesis block", () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it("adds new block", () => {
    const data = "foo";
    bc.addBlock(data);

    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it("validates a valid chain", () => {
    bc2.addBlock("foo");

    expect(Blockchain.isValidChain(bc2.chain)).toBe(true);
  });

  it("invalidate chain with incorrect genesis block", () => {
    bc2.chain[0].data = "Bad Data";

    expect(Blockchain.isValidChain(bc2.chain)).toBe(false);
  });

  it("invalidates a corrupt chain", () => {
    bc2.addBlock("foo");
    bc2.chain[1].data = "not-foo";

    expect(Blockchain.isValidChain(bc2.chain)).toBe(false);
  });
});
