// 테스트 코드를 작성하면 시간이 걸리기는 하지만 코드의 품질을 올릴 수 있음
// 단위 테스트를 진행하기 때문에 디버깅을 하고 코드를 작성 할 수 있음
// 단위 테스트기 때문에 절차적으로 테스트 진행

import Block from "@core/block/block";
import Chain from "@core/chain/chain";
import { GENESIS } from "@core/config";

// describe : 테스트 그룹 지정
// 첫번째 매개변수 : 테스트 그룹 명
// 두번째 매개변수 : 테스트들을 실행시키는 콜백 함수
// describe("block test code group", () => {
//   it("GENESIS BLOCK TEST", () => {
//     console.log(GENESIS);
//   });
// });

describe("block verify", () => {
  let newBlock: Block;
  let newChain: Chain;
  let newChain2: Chain;
  // 테스트할 코드의 최소 단위
  it("add block", () => {
    const data = ["Block 1"];
    newBlock = Block.generateBlock(GENESIS, data, GENESIS);
    // 블록의 난이도에 따른 마이닝을 동작
    // 조건에 맞을 떄까지 연산을 반복한 뒤에 생성된 블록을 newBlock에 받아옴
    // 이전 블록은 GENESIS(최초 블록)
    console.log("newBlock : ", newBlock);
  });

  it("block validation", () => {
    console.log("newBlock : ", newBlock);
    const isValidNewBlock = Block.isValidNewBlock(newBlock, GENESIS);
    // expect : toBe의 값이 맞는지 확인
    // 결과가 성공한게 맞는지 확인
    if (isValidNewBlock.isError) return expect(true).toBe(false);
    expect(isValidNewBlock.isError).toBe(false);
  });

  // 블록 체인 추가
  it("Add Block chain", () => {
    newChain = new Chain();
    newChain.addToChain(newBlock);

    console.log(newChain.get());

    console.log(newChain.getBlockByHash(newBlock.hash));
  });

  //
  it("Longest Chain Rule", () => {
    newChain2 = new Chain();
    newChain2.replaceChain(newChain.get());
    console.log(newChain2);
  });

  // 블록 생성 주기를 계산해서 정해 놓은 생명 주기보다 빠른지 느린지 판단
  it("before 10 block or genesis block", () => {
    for (let i = 0; i < 2; i++) {
      let block = Block.generateBlock(
        newChain.lastestBlock(),
        ["block"],
        newChain.getAdjustmentBlock()
      );
      newChain.addToChain(block);
    }
    // 마지막에서 10번째 블록을 가져옴
    console.log(newChain.getAdjustmentBlock());
    // 마지막 블록을 가져옴
    console.log(newChain.lastestBlock());
  });
});
