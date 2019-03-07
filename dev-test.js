const Block = require("./libs/block");

const fooBlock = Block.mineBlock(Block.genesis(), "foo");
console.log(fooBlock.toString());
