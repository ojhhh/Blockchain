import { SHA256 } from "crypto-js";
import merkle from "merkle";
import BlockHeader from "./blockheader";
import { IBlock } from "@core/interface/block.interface";
import { Failable } from "@core/interface/failable.interface";
import CryptoModule from "@core/crypto/crypto.module";

// 난이도 조절용 변수 선언
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
const BLOCK_GENERATION_INTERVAL = 10 * 60;

// block 형태를 클래스로 정의
// 이렇게 보면 직관적으로 이해가 쉬움
// class Block extends BlockHeader
// class Block implements IBlock
class Block extends BlockHeader implements IBlock {
  hash: string;
  merkleRoot: string;
  nonce: number;
  difficulty: number;
  data: string[];
  constructor(_previousBlock: Block, _data: string[], _adjustmentBlock: Block) {
    // 부모 클래스 생성자 호출
    super(_previousBlock);
    this.merkleRoot = Block.getMerkleRoot(_data);
    // 블록 본인의 데이터를 해시화. 블록의 해시값
    // createBlockHash는 정적(static) 메소드이기 떄문에 this 키워드를 통해 인스턴스의 속성에 접근할 수 없기 때문에 블록의 내용을 처리하려면 Block객체를 인자로 전달 받아야함
    // this는 Block 클래스의 인스턴스를 참조하기 때문에 모든 속성을 가지고 있음
    this.hash = Block.createBlockHash(this);
    this.nonce = 0;
    this.difficulty = Block.getDifficulty(
      this,
      _adjustmentBlock,
      _previousBlock
    );
    this.data = _data;
  }

  // 블록 추가
  static generateBlock(
    _previousBlock: Block,
    _data: string[],
    _adjustmentBlock: Block
  ): Block {
    const generateBlock = new Block(_previousBlock, _data, _adjustmentBlock);
    console.log("generateBlock : ", generateBlock);
    // 마이닝을 통해 블록의 생성 권한을 받은 블록을 만듬
    const newBlock = Block.findBlock(generateBlock);
    return newBlock;
  }

  // 마이닝 작업 코드
  // 블록 채굴
  // 연산을 통해 난이도의 값에 따른 정답을 찾는 동작?
  // POW : 작업 증명 블록의 난이도에 충족하는 값을 구하기 위해서 연산작업을 계쏙 진행해서 조건에 충족하는 값을 구하면 보상으로 블록의 생성 권한을 얻음
  static findBlock(generateBlock: Block) {
    let hash: string;
    // nonce는 블록을 채굴하는데 연산 작업을 몇번 진행했는지 값을 담음
    let nonce: number = 0;

    while (true) {
      generateBlock.nonce = nonce;
      // nonce 값을 증가시켜 hash 값을 계속 바뀜
      nonce++;
      hash = Block.createBlockHash(generateBlock);

      // 16진수를 2진수로 변환
      // 2진 값이 바뀌는 이유 : 0의 개수가 난이도의 개수에 충족하는지 체크해서 맞추면 블록 채굴의 권한을 얻고 블록 생성
      const binary: string = CryptoModule.hashToBinary(hash);
      console.log("binary : ", binary);
      // 연산의 값이 난이도에 충족했는지 체크
      // startWith : 문자열의 시작이 매개변수로 전달된 문자열로 시작하는지 체크
      const result: boolean = binary.startsWith(
        "0".repeat(generateBlock.difficulty)
      );
      console.log("result : ", result);

      // 조건에 충족했으면 블록을 채굴 할 수 있는 권한 부여
      if (result) {
        // 연산을 통해 완성된 hash값
        generateBlock.hash = hash;
        // 완성된 블록을 내보냄
        return generateBlock;
      }
    }
  }

  static createBlockHash(_block: Block): string {
    const {
      version,
      timestamp,
      height,
      merkleRoot,
      previoushash,
      difficulty,
      nonce,
    } = _block;
    const value: string = `${version}${timestamp}${height}${merkleRoot}${previoushash}${difficulty}${nonce}`;
    return SHA256(value).toString();
  }

  // merkleRoot 반환값 구하기
  // merkle root는 merkle tree 최상단에 있는 노드의 해시 값
  // merkle tree는 데이터 블록을 효율적으로 저장하고 검증하기 위한 이진 트리 구조를 말함
  // 트랜잭션들을 대표하는 단일 값이 merkle root이기 때문에 중간에 데이터가 바뀌게 되면 merkle root 해시값이 바뀌게 되기 떄문에 데이터 조작을 감지
  static getMerkleRoot<T>(_data: T[]) {
    const merkleTree = merkle("sha256").sync(_data);
    return merkleTree.root();
  }

  // 블록 유효성 검사
  static isValidNewBlock(
    _newBlock: Block,
    _previousBlock: Block
  ): Failable<Block, string> {
    // 블록의 높이가 정상인지 판단 (정상이라면 이전 블록보다 1이 증가)
    if (_previousBlock.height + 1 !== _newBlock.height)
      return { isError: true, value: "Previous height error" };

    // 이전 블록의 해시 값이 새로운 블록의 이전 해시값이 동일한지 확인
    if (_previousBlock.hash !== _newBlock.previoushash)
      return { isError: true, value: "Previous hash error" };

    // 생성된 블록의 정보가 변조되었는지 확인
    if (Block.createBlockHash(_newBlock) !== _newBlock.hash)
      return { isError: true, value: "block hash error" };

    // 블록 유효성 검사 통과
    return { isError: false, value: _newBlock };
  }

  static getDifficulty(
    _newBlock: Block,
    _adustmentBlock: Block,
    _previousBlock: Block
  ): number {
    // 보통 일주일 주기(2016개 이전 블록을 보고)로 난이도를 바꾸지만 실습에선 10개 이전의 블록을 확인
    if (_newBlock.height <= 0) throw new Error("height : 0");
    if (_newBlock.height < 10) return 0;
    // 블록의 높이가 20이하 일 경우 체크 하지 않음
    if (_newBlock.height < 21) return 1;
    // 블록의 높이가 10의 배수가 아닐떄 이전 블록의 난이도를 내보냄
    // 목표시간 : 1블록당 10분
    if (_newBlock.height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0)
      return _previousBlock.difficulty;

    // 현재 블록의 생성 시간과 10개 이전 블록의 생성 시간의 차를 구함
    const timeToken: number = _newBlock.timestamp - _adustmentBlock.timestamp;

    const TimeExprected: number =
      BLOCK_GENERATION_INTERVAL * 10 * DIFFICULTY_ADJUSTMENT_INTERVAL;

    // 난이도 증가
    // 생성시간이 빨르면 총걸린시간 < 목표시간 /2 = 이전블록 난이도 + 1
    if (timeToken < TimeExprected / 2) return _previousBlock.difficulty + 1;

    // 난이도 감소
    // 생성시간이 더 걸리면 난이도 - 1
    if (timeToken > TimeExprected * 2) return _previousBlock.difficulty - 1;

    return _previousBlock.difficulty;
  }
}

export default Block;
