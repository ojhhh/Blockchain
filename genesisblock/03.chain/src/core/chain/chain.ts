import Block from "@core/block/block";
import { GENESIS } from "@core/config";
import { Failable } from "@core/interface/failable.interface";

class Chain {
  private chain: Block[] = [GENESIS];
  private readonly INTERVAL = 10;

  // 현재 체인을 반환하는 함수
  get() {
    return this.chain;
  }

  // 길이를 반환하는 함수
  length() {
    return this.chain.length;
  }

  // 체인에 마지막 블록 반환 함수
  lastestBlock() {
    return this.chain[this.length() - 1];
  }

  // 블록 추가 메소드
  addToChain(receivedBlock: Block) {
    this.chain.push(receivedBlock);
    return this.lastestBlock();
  }

  // 블록 조회 메소드
  getBlock(callbackFn: (block: Block) => boolean) {
    const findBlock = this.chain.find(callbackFn);
    if (!findBlock) throw new Error("block not find");
    return findBlock;
  }

  // 블록의 높이로 블록을 조회
  getBlockByHeight(height: number) {
    return this.getBlock((block: Block) => block.height === height);
  }

  // 블록의 해시로 찾는 함수
  getBlockByHash(hash: string) {
    return this.getBlock((block: Block) => block.hash === hash);
  }

  // 현재 위치에서 10번째 블록들을 찾는 함수
  getAdjustBlock() {
    const { height } = this.lastestBlock();
    const findHeight =
      height < this.INTERVAL
        ? 1
        : Math.floor(height / this.INTERVAL) * this.INTERVAL;
    // 10번 블록의 높이 조회해서 반환
    return this.getBlockByHeight(findHeight);
  }

  // 다른 네트워크로 체인을 보냄
  serialze() {
    return JSON.stringify(this.chain);
  }

  // 다른 네트워크에서 체인을 받음
  deserialize(chunk: string) {
    return JSON.parse(chunk);
  }

  // 상대방 체인과 본인의 체인을 비교
  replaceChain(receivedChain: Block[]): Failable<undefined, string> {
    // 본인의 체이놔 상대방의 체인을 검사하는 로직
    // 체인의 길이를 비교하는 로직 구현 (롱기스트 체인 룰)
    // 실제 네트워크에서는 더 복잡한 로직 사용

    // 상대방 체인의 마지막 블록
    const lastestReceivedBlock: Block = receivedChain[receivedChain.length - 1];

    // 본인의 마지막 블록
    const lastestBlock: Block = this.lastestBlock();

    // 상대방 체인의 마지막 블록과 본인의 마지막 블록의 길이가 같을 경우
    if (lastestReceivedBlock.height === 0)
      return {
        isError: true,
        value: "The last block of the other network chain is the first block",
      };

    // 상대방 체인의 마지막 블록이 본인의 마지막 블록의 길이보다 크거나 같을 경우
    if (lastestReceivedBlock.height <= lastestBlock.height)
      return {
        isError: true,
        value: "The last block of the other network chain is large or the same",
      };

    // 상대방의 체인이 본인의 체인보다 길면 본인의 체인을 업데이트
    this.chain = receivedChain;

    return { isError: false, value: undefined };
  }

  // 현재 블록 생성 시점에서 이전 10번째 블록 구하기
  // 현재 높이값 < 10 : 최초블록을 반환
  // 현재 높이 > 10 : -10번째 블록을 반환
  // 이전 10번째 블록의 생성 시간의 차이를 구하여 그 차이가 블록 생성 주기 보다 빠르면 난이도 증가
  // 생성 주기가 느리면 난이도 하락
  // 비트코인 기준으로 블록의 생성 시간은 10분
  getAdjustmentBlock() {
    const currentLength = this.length();
    const adjustmentBlock: Block =
      this.length() < this.INTERVAL
        ? GENESIS
        : this.chain[currentLength - this.INTERVAL];
    // 반환값은 최초블록 아니면 -10번째 블록
    return adjustmentBlock;
  }
}

export default Chain;
