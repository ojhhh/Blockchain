import {
  TransactionData,
  TransactionRow,
  TxIn,
  TxOut,
  UnspentTxOut,
  UnspentTxOutPool,
} from "./transaction.interface";

// UTXO
// 각 노드의 UTXO 데이터베이스
// 각 주소별로 가지고 있는 잔액 금액을 가지고 있는 객체의 내용이 포함

// 시나리오
// A가 B에게 1비트를 보낼때
// txIn에 이전 트랜잭션에서 남은 미사용 객체 UTXO를 참조 (A가 얼마 가지고 있는지 확인)
// txOut 결과물의 UTXO 객체 생성
// 보내는 금액보다 많이 가지고 있으면 트랜잭션 승인
// UTXO에 결과로 생성된 잔액과 주소를 포함한 객체 추가

class Unspent {
  // UTXO 객체 목록
  // 누가 얼마의 금액을 가지고 있는지 배열로 담김 (미사용 객체가 담김)
  private readonly unspentTxOuts: UnspentTxOutPool = [];
  constructor() {}

  // UTXO 내용 반환
  getUnspentTxPool() {
    return this.unspentTxOuts;
  }

  // 미사용 객체를 txIn에서 참조할때 조회된 객체들은 수정이 되는것이 아니라 새로 생성되는 것이기 떄문에 사용하면 제거
  delate(txin: TxIn) {
    const { txOutId, txOutIndex } = txin;
    const index = this.unspentTxOuts.findIndex((unspentTxOut: UnspentTxOut) => {
      return (
        // utxo가 포함된 트랜잭션 아이디와 인덱스가 같은지 비교
        unspentTxOut.txOutId === txOutId &&
        unspentTxOut.txOutIndex === txOutIndex
      );
    });
    // unspentTxOuts에서 찾은 값을 제거(사용한 객체 제거)
    if (index !== -1) this.unspentTxOuts.splice(index, 1);
  }

  // 새로운 객체 생성
  // txout 정보를 가지고 UTXO에 생성 목록에 추가
  create(hash: string) {
    return (txout: TxOut, txOutIndex: number) => {
      const { amount, account } = txout;
      this.unspentTxOuts.push({
        txOutId: hash, // 트랜잭션의 해시값
        txOutIndex, // 트랜잭션의 인덱스
        account,
        amount,
      });
    };
  }

  // UTXO 내용 업데이트
  update(transaction: TransactionRow) {
    // 처리되는 트랜잭션 내용
    // txIns : 누가 누구에게 송금하는지 내용 (잔액 확인)
    // txOuts : 누가 받았는지 account, amount 잔액, 주소
    // hash : 트랜잭션 식별자 고유값
    const { txIns, txOuts, hash } = transaction;

    if (!hash) throw new Error("hash error");

    // 트랜잭션 출력 값을 UTXO에 추가
    // 목록에 추가
    txOuts.forEach(this.create(hash));

    // 사용한 객체 제거
    // UTXO 목록에서 사용한 객체 제거
    // bind : 현재 작성된 위치의 객체를 참조
    txIns.forEach(this.delate.bind(this));
  }

  // 특정 계정 (account)의 객체를 UTXO에서 조회
  getUTXO(account: string): UnspentTxOut[] {
    // 계정의 잔액 정보를 가지고 있는 객체를 모두 조회
    const myUnspentTxOuts = this.unspentTxOuts.filter(
      (utxo) =>
        // utxo 안에 있는 요소들을 돌면서 account 매개변수 값과 같은 값 찾기
        utxo.account === account
    );
    return myUnspentTxOuts;
  }

  // 특정 계정의 잔액 금액의 총합을 조회하는 메소드
  getAmount(myUnspentTxOuts: UnspentTxOut[]) {
    // reduce
    // 초기값은 0으로 지정
    // 콜백 함수의 첫번째 매개변수 : 누적값
    // 콜백 함수의 두번째 매개변수 : 현재 순회하는 요소
    // 값의 총합을 반환
    return myUnspentTxOuts.reduce((acc, utxo) => acc + utxo.amount, 0);
  }

  // 소지금 보다 많은 금액을 보내는지 검증
  isAmount(account: string, sendAmount: number) {
    // 내 주소가 포함된 사용되지 않은 객체 조회
    const myUnspentTxOuts = this.getUTXO(account);
    // 내가 가지고 있는 금액 총액
    const totalAmount = this.getAmount(myUnspentTxOuts);

    if (totalAmount > sendAmount) return true;
    return false;
  }
}

export default Unspent;
