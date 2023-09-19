// 제네시스 블록
// 최초 블록은 하드 코딩

import { IBlock } from "./interface/block.interface";

export const GENESIS: IBlock = {
  version: "1.0.0",
  height: 0,
  timestamp: new Date().getTime(),
  hash: "0".repeat(64),
  previoushash: "0".repeat(64),
  merkleRoot: "0".repeat(64),
  // 블록을 채굴할 떄 이전 블록 난이도로 마이닝
  // 블록의 생성 주기를 검사해서 생성주기가 빠르면 블록 난이도 상승
  // 생성 주기가 느리면 블록 난이도 하락
  difficulty: 0,
  nonce: 0,
  data: ["Hello, world"],
};
