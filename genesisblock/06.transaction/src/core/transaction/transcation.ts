import {
  TransactionData,
  TransactionPool,
  TransactionRow,
  TxIn,
  TxOut,
  UnspentTxOut,
} from "./transaction.interface";

import { SignatureInput } from "elliptic";
import { SHA256 } from "crypto-js";

class Sender {
  account: string; // 보낼 사람의 계정 주소
}

// 영수증
class Receipt {
  sender: Sender; // 보내는 사람의 정보
  received: string; // 받는 사람의 계정
  amount: number; // 보낸 금액
  signature: SignatureInput; // 서명 정보
}

class Transaction {
  // 블록 채굴
  // 블록 생성 권한을 얻음 트랜잭션을 처리
  // 첫번째 트랜잭션으로 트랜잭션이 하나 추가
  // 채굴한 사람의 주소, 전달되는 금액 보상이 첫번째 트랜잭션에 들어감
  private readonly REWARD = 50; // 코인베이스 트랜잭션 보상
  private readonly transactionPool: TransactionPool = []; // 트랜잭션이 처리되지 않는 내용이 있는 공간

  constructor() {}

  // 트랜잭션 목록을 확인 조회하는 함수
  getPool() {
    return this.transactionPool;
  }

  // 트랜잭션 추가
  create(receipt: Receipt, unspentTxOuts: UnspentTxOut[]) {
    // 트랜잭션의 output 내용의 객체를 UTXO에 추가
    // 서명을 확인
    if (!receipt.signature) throw new Error("signature error");

    // 잔액 계산
    const [txIns, amount] = this.createInput(
      unspentTxOuts,
      receipt.amount,
      receipt.signature
    );

    // 출력 트랜잭션 객체 생성
    const txOuts = this.createOutput(
      receipt.received,
      receipt.amount,
      receipt.sender.account,
      amount
    );

    // 트랜잭션 객체 생성
    const transaction: TransactionRow = {
      txIns, // 누가 누구에게 전송한 금액의 내용이 포함되어 있는지 잔액 확인
      txOuts, // 최종적으로 결과물 누구의 주소에 얼마가 포함되는지 객체 생성
    };

    // 트랜잭션 객체에 hash 값 추가
    transaction.hash = this.serializeRow(transaction);

    this.transactionPool.push(transaction);

    // 트랜잭션이 바로 처리되는게 아니라 pool에 담긴 후 대기상태로 있다가 블록이 채굴되면 검증하고 승인 되면 트랜잭션을 처리하고 하나의 블록에 여러개의 트랜잭션 내용을 기록

    return transaction;
  }

  // 잔액 계산
  createInput(
    myUnspentTxOuts: UnspentTxOut[],
    receiptAmount: number,
    signature: SignatureInput
  ): [TxIn[], number] {
    // 잔액이 0 보다 큰지 비교
    let targetAmount = 0;
    const txins = myUnspentTxOuts.reduce(
      (acc: TxIn[], unspentTxOut: UnspentTxOut) => {
        // 현재 순회하는 요소(본인의 UTXO)의 잔액과 트랜잭션 hash값, 트랜잭션 Index를 구조 분해 할당
        const { amount, txOutId, txOutIndex } = unspentTxOut;

        // 0원을 보낼 경우
        if (targetAmount >= receiptAmount) return acc;

        //
        targetAmount += amount;
        acc.push({ txOutIndex, txOutId, signature });
        return acc;
        // TxIn[] 타입은 추론이 안됌
      },
      [] as TxIn[]
    );
    return [txins, targetAmount];
  }

  createOutput(
    received: string,
    amount: number,
    sender: string,
    sendAmount: number
  ) {
    const txouts: TxOut[] = [];
    // txout 받는 사람
    txouts.push({ account: received, amount });

    // 잔액은 보낸사람으로 다시 새로운 객체를 만들어 목록에 추가
    if (sendAmount - amount > 0) {
      txouts.push({ account: sender, amount: sendAmount - amount });
    }

    // 잔액을 비교 검증
    const outAmount = txouts.reduce(
      (acc, txout: TxOut) => acc + txout.amount,
      0
    );

    console.log("outAmount", outAmount);
    console.log("sendAmount", sendAmount);

    // 전체 금액 검증
    // 내가 가지고 있는 금액에서 보낸 금액과 남은 잔액이 가지고 있는 총 금액과 같은지 검증
    if (outAmount !== sendAmount) throw new Error("금액이 안맞음");

    return txouts;
  }

  // 출력 트랜잭션을 문자열로 반환
  serializeTxOut(txOut: TxOut): string {
    const { account, amount } = txOut;
    const text = [account, amount].join("");
    return SHA256(text).toString();
  }

  // 입력 트랜잭션을 문자열로 반환
  serializeTxIn(txIn: TxIn): string {
    const { txOutIndex } = txIn;
    const text = [txOutIndex].join("");
    return SHA256(text).toString();
  }

  // 트랜잭션을 직열화한 문자열로 반환
  serializeTx<T>(data: T[], callback: (item: T) => string) {
    // 데이터를 배열로 문자열 반환
    return data.reduce((acc: string, item: T) => acc + callback(item), "");
  }

  // 트랜잭션 row를 전부 직열화 해서 반환하는 함수
  serializeRow(row: TransactionRow) {
    const { txIns, txOuts } = row;
    // 직열화된 문자열로 변환
    const txOutsText = this.serializeTx<TxOut>(txOuts, (item) =>
      this.serializeTxOut(item)
    );
    const txInsText = this.serializeTx<TxIn>(txIns, (item) =>
      this.serializeTxIn(item)
    );

    return SHA256(txOutsText + txInsText).toString();
  }

  // 코인베이스 트랜잭션
  // 블록을 채굴하면 채굴자가 보상을 받음
  // 그때 생기는 특수한 트랜잭션이 블록에 첫번째로 기록
  createCoinbase(account: string, latestBlockHeight: number) {
    // 채굴자의 경우 트랜잭션 해시와 서명이 없음
    const txin = this.createTxIn(latestBlockHeight + 1);
    const txout = this.createTxOut(account, this.REWARD);
    return this.createRow([txin], [txout]);
  }

  createRow(txIns: TxIn[], txOuts: TxOut[]) {
    // txIns과 txOuts을 hash화
    const transactionRow = new TransactionRow();
    transactionRow.txIns = txIns;
    transactionRow.txOuts = txOuts;
    transactionRow.hash = this.serializeRow(transactionRow);
    return transactionRow;
  }

  createTxIn(
    txOutIndex: number,
    txOutId?: string,
    signature?: SignatureInput
  ): TxIn {
    // 단순한 입력 트랜잭션 생성
    const txIn = new TxIn();
    txIn.txOutIndex = txOutIndex;
    txIn.txOutId = txOutId;
    txIn.signature = signature;
    return txIn;
  }

  createTxOut(account: string, amount: number): TxOut {
    // 받는 계정 주소랑 출력 트랜잭션 생성
    if (account.length !== 40) throw new Error("정상적인 주소가 아님");
    const txout = new TxOut();
    txout.account = account;
    txout.amount = amount;
    return txout;
  }

  // 트랜잭션 pool 처리
  update(transaction: TransactionRow) {
    const findCallback = (tx: TransactionRow) => transaction.hash == tx.hash;
    const index = this.transactionPool.findIndex(findCallback);
    if (index !== -1) this.transactionPool.splice(index, 1);
  }

  // 트랜잭션 목록 업데이트
  sync(transactions: TransactionData) {
    if (typeof transactions === "string") return;

    transactions.forEach(this.update.bind(this));
  }
}

export default Transaction;
