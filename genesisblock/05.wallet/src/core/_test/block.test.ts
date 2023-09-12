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

// 지갑 구성
// 개인키, 공개키, 서명
// 지갑 주소 / 계정 만들기

// 개인키와 공개키와 서명을 이용한 신원 인증 방식은 분산원장이라는 이해가 필요

// 분산원장 : 장부를 모두가 관리 하는 것

// crypto, elliptic, crypto-js

// npm install -D crypto
// npm install -D @types/elliptic elliptic
// npm install -D @types/crypto-js crypto-js

import { randomBytes } from "crypto";
import elliptic from "elliptic";
import { SHA256 } from "crypto-js";

// secp256k1 : 비트코인과 이더리움에서 사용되는 알고리즘. 타원 곡선의 별명
// 키 생성 및 디지털 서명
const ec = new elliptic.ec("secp256k1");

// 전달하는 사람과 받는 사람 모두 공통적으로 알고 있는 하나의 점을 기준점 G 라고 함
// 타원곡선의 기준점 좌표가 무엇이냐에 따라 타원곡선의 별명을 붙여줌
// 비트코인과 이더리움에서 사용되는 타원곡선의 별명은 secp256k1

// y^2 = x^3 + ax + b

// 전자 서명을 만들땐 2개의 서명이 필요
// 서명 r : 트랜잭션을 보낼때 개인키 처럼 정수를 뽑은 값을 k라고 지정. r = k * G(기준점)
// 서명 s : k^-1 = (z + r * private key) mod n
// k = 서명 r을 만들때 뽑은 랜덤 값
// z = 만든 트랜잭션 정보
// r = 서명 r
// 개인키 = 범위에서 지정하고 본인만 알고 있는 개인키
// mod n = n으로 나눈 나머지

// 중요한건 서명 s를 만드는데 개인키를 사용했다는 개념
// U1 * G + U2 + 공개키 값을 구해서 서명 r과 같은지 비교해서 검증
// U1 = z * w mod n
// U2 = r * w mod n
// w = s^-1 mod n
// w : 동일한 서명을 만들지 않기 위해서 임의의 값을 추가 nonce 값이라고 보면됨

// 데이터 전송
// 1. 트랜잭션 생성
// 2. 개인키 생성
// 3. 서명 r, 서명 s 생성

// 데이터 수신
// 1. U1 * G + U2 + 공개키 <- 이 식으로 값을 구해서 서명 r과 비교 검증

describe("create wallet", () => {
  let privKey: string;
  let pubKey: string;
  // BN 타입 : 엄청 큰 숫자
  let signature: elliptic.ec.Signature;

  // 개인키 생성
  it("create privateKey", () => {
    // 2진수의 랜덤값을 만들어 16진수로 나타냄
    // randomBytes(32).toString("hex"); 32바이트의 16진수 값 생성
    // 32바이트는 256비트. 1바이트에 2자리의 16진수(8비트)를 사용할 수 있기 때문에 총 64자리의 16진수 문자열을 생성
    privKey = randomBytes(32).toString("hex");

    console.log("privateKey : " + privKey);
    console.log("privateKey.length : " + privKey.length);
  });

  // 공개키 생성
  it("create publicKey", () => {
    const keyPair = ec.keyFromPrivate(privKey);
    // 두번째 매개변수 : 문자열 압축 여부. true 압축, false 압축하지 않음
    pubKey = keyPair.getPublic().encode("hex", false);
    console.log("publicKey : " + pubKey);
    console.log("publicKey.length : " + pubKey.length);
  });

  // 서명 만들기
  it("create signature", () => {
    //
    const keyPair = ec.keyFromPrivate(privKey);
    // 임시 트랜잭션 내용
    const hash = SHA256("transaction data").toString();
    // 서명 생성
    signature = keyPair.sign(hash, "hex");
    console.log("signature : ", signature);
  });

  // 검증하기
  it("verify", () => {
    const hash = SHA256("transaction data").toString();
    const verify = ec.verify(hash, signature, ec.keyFromPublic(pubKey, "hex"));
    console.log("verify : ", verify);
  });

  // 지갑주소 생성
  it("create wallet address", () => {
    // 계정을 만드는 방법 : 만든 공개키의 값에서 26개의 문자열을 앞에서 잘라서 40자리만큼 남겨서 주소로 사용
    // 불필요한 부분을 제거한 후 앞에 0x를 붙여 16진수 주소라는 것을 표시
    const address = pubKey.slice(26).toString();
    console.log("address : ", `0x${address}`);
  });
});
