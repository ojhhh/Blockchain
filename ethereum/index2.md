# 이더리움

- 만든사람 : 비탈릭 부테린
- 비트코인의 단점을 보완하여 만든 느낌
- 비트코인은 결제에 포커스가 맞춰져 있지만 이더리움은 탈 중앙화 어플리케이션을 제안 했다고 보면 됨
- 이더리움은 탈중앙화한 어플리케이션을 제안
- 이더리움은 결제에 포커스가 맞춰져 있지는 않음
- 블록체인 기술을 사용한 대안적인 어플리케인션이 두가지 있음
- 첫번째는 사용자 정의 화폐와 금융 상품을 블록체인 위로 표현하기 위한 컬러드 코인
- 두번째는 물리적 대상의 소유권을 표현하는 스마트 자산
- 도메인 이름과 같은 비동질적 자산을 기록하는 네임코드
- 임의적인 계약의 규칙을 구현한 코드에 의해 디지털 자산을 관리하는게 편하도록 스마트 컨트랙트를 만들고 블록체인을 기반으로 한 자율조직 DAO
- 이더리움은 완벽한 튜링완전 프로그래밍 언어가 심어진 블록체인(엘런 튜링이 만듬)
- 튜링완전은 간단하게 말하면 계산 가능한 문제를 해결할 수 있는 모든 기계의 공통된 능력을 말함
- 이더리움은 2가지 작업증명 문제를 동시에 해결
- 1. 합의 알고리즘 제공
- 2. 누구나 합의 프로세스에 참여 가능

- 이후 지분증명(POS) 라는 새로운 방식의 합의 알고리즘 등장
- POW : 각 노드가 가진 계산 능력을 통해서 nonce를 증가시켜 hash를 찾음
- POS : 화폐의 보유량에 따라 각 노드의 결정된 정도를 계산

# 상태 변환 시스템으로 비트코인

- 이더리움 백서에서는 비트코인의 트랜잭션을 상태변환 시스템이라고 말함
- 비트코인의 트랜잭션은 UTXO인데 이더리움은 트랜잭션 내용을 상태 처리라고 말함
- 상태에 대해 간단히 설명하면 쇼핑몰을 만들었는데 상품을 구매하는 프로세스에서 상품의 현재 상태를 나타낼 테이블을 하나 만듬. 상품테이블에 주문이라는 상태가 있을떄
- 주문 접수 -> 결제확인 -> 상품준비 -> 상품발송 -> 배송완료 -> 상품수령
- order -> state -> UTXO -> Transaction -> UTXO
- 새로운 트랜잭션 처리가 되면 새로운 UTXO를 만들어주는 것을 상태에 비유

# 스크립팅

- 비트코인이 정말 낮은 수준의 스마트 컨트랙트가 존재하는데 비탈릭 부테린은 서명에 관련된 로직을 스마트 컨트랙트라는 시점으로 바라보고 있음
- 비트코인의 UTXO는 공개키만으로 해당 계정의 잔액을 조회 할 수 있는데 단순 스택의 기반으로 프로그래밍 언어로 표현되어 있으며 토이 비트코인을 만들어서 한명의 서명을 만들어 트랜잭션 생성 처리
- 비트코인에서 2, 3개의 개인키를 가지고 서명을 만들어서 검증을 할 수 있도록 간단한 스크립팅을 작성 할 수 있음
- 근데 이걸 실제로 사용한 플랫폼이 없음

- 이더리움은 이내용을 스마트 컨트랙트 개념으로 보고 있음

- 문제점
- 튜링 불안정성
- 가치가 없음
- 다양한 상태 표현 불가
- 블록체인의 해독할 방이 없음

# 이더리움

- 이더리움을 짧게 서술하면 분산 어플리케이션 제작을 위한 대체 프로토콜

- 이렇게 생산하는 이유
- 1. 비트코인을 가지고 예금, 보험 및 금융상품에 대한 것을 구현 할 수 없음 (이자 구현 불가)
- 2. 사이트 및 게임에 적용하기 힘들 부분이 많음(상품 및 게임 아이템 매칭 불가)

- 탈중앙화된 통신을 할 수 있는 프로토콜을 쉽게 구현 할 수 있도록 도와줌
- 탈중앙화에 데이터를 저장할 수 있음 === 스마트 컨트랙트

- 그로 인해 비트코인의 UTXO 형식적인 데이터 아닌 상태 변화를 만들어서 다양한 데이터를 저장하고 사용할 수 있도록 트랜잭션의 구조를 바꾼것

# 이더리움 어카운트

- 이더리움에서 상태(state)는 account라고 하는 객체로 구성

```javascript
interface Account {
  nonce: number; // 트랜잭션의 횟수 카운터(이중지불 방지 용도)
  balance: string; // 가지고 있는 잔액(ether)
  storageRoot: string; // 계정 어카운트의 상태 저장 공간 초기에는 비워져 있음
  codeHash: string; // 스마트 컨트랙트 계약의 코드가 저장되는 곳
}
```

- 이더 라는 이더리움 플랫폼의 화폐 단위
- 트랜잭션을 발생 시킬떄 수수료를 지불하는데 이더리움 네트워크는 이더라는 친구가 없으면 코드를 실행할 수 없게 하기 위해서 데이터도 저장 할 수 없음

## account의 두가지 개념

- EOA : private key에 의해 통제되는 외부 소유 어카운트
- CA : 컨트랙트 코드에 의해 통제되는 컨트랙트 어카운트

### EOA

- 쉽게 말해 EOA는 비트코인의 Account 개념을 말함
- 다른 Account에 이더를 주고 받을 수 있는 개인키가 존재하고 개인키를 가지고 서명을 하여 트랜잭션을 생성
- 트랜잭션을 이더리움 백서에서는 메시지라고 말함

```javascript
// EOA
interface Account {
  nonce: number; // 트랜잭션의 횟수 카운터(이중지불 방지 용도)
  balance: string; // 가지고 있는 잔액(ether)
  storageRoot: string; // EOA에서는 사용하지 않음
  codeHash: string; // EOA에서는 사용하지 않음
}
```

### CA

- CA 계정은 Account 객체 구조에 있는 모든 속성을 사용
- 추후 스마트 컨트랙트 코드를 솔리디티 언어를 사용해서 코드를 작성할 예정

```
pragma solidity ^0.8.0

contract testCountract {
  uint256 value;  // 상태 변수 선언
  function setValue(uint256 newValue) public {
    value = newValue; // 상태 변수 변경
  }

  function getValue() public view returns (uint256) {
    return value; // 상태 변수 조회
  }
}
```

- 이떄 codeHash 들은 코드를 컴파일해서 결과를 저장
- storageRoot에는 value 상태 변수를 키와 값의 형태로 데이터 저장

- CA는 개인키가 없기 때문에 메시지를 발생 시 킬 수 없음

- Message를 받으면 CA가 자신의 코드를 활성화 시키고 Message가 어떤 값인지를 보고 읽거나 상태변수의 내용을 변경하게 되거나 Message를 보낼 수 있게 됨

# 메시지와 트랜잭션

- 이더리움에서 서명이 이는 영수증 트랜잭션이라 말함
- 서명이 없는 영수증은 Message라고 함

- EOA -> Transaction
- CA -> Message

```javascript
interface Message {
  from: string; // 메시지를 보내는 어카운트 또는 컨트랙트 주소
  to: string; // 메시지를 받는 어카운트 또는 컨트랙트 주소
  gas: string; // 메시지를 처리하기 위해 사용할 가스량
  gasPrice: number; // 가스당 가격
  value: number; // 메시지와 함께 전송할 이더의 량
  data: string; // 메시지 데이터
  nonce: number; // 메시지를 전송한 어카운트의 nonce
}

interface Transaction extends Message {
  v : number; // 서명 v값
  r : string: // 서명 r값
  s : string; // 서명 s값
}

```