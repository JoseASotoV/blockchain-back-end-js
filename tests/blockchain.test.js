const Blockchain = require("../libs/blockchain");
const Block = require("../libs/block");

describe("Blockchain", () => {
  let bc;

  beforeEach(() => {
    bc = new Blockchain();
  });

  it("starts with genesis block", () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it("adds new block", () => {
    const data = "foo";
    bc.addBlock(data);

    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it("validates a chain");
});
