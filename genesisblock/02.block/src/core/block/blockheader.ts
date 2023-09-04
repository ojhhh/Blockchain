import { IBlock, IBlockHeader } from "@core/interface/block.interface";

class BlockHeader implements IBlockHeader {
  version: string;
  height: number;
  timestamp: number;
  previoushash: string;
  constructor(_previousBlock: IBlock) {
    this.version = BlockHeader.getVersion();
    this.timestamp = BlockHeader.getTimestamp();
    this.height = _previousBlock.height + 1;
    this.previoushash = _previousBlock.hash;
  }

  static getVersion() {
    return "1.0.0";
  }

  static getTimestamp() {
    return new Date().getTime();
  }
}

export default BlockHeader;
