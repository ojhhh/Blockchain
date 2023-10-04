# 솔리디티

1. 절차적 프로그래밍 언어
2. 컴파일 언어

# SPDX Licence Identifier

- 스마트 컨트랙트 신뢰성
- 저작권 문제를 방지하기 위해 코드에 최상단에 주석으로 표시 작성

# Pragma

- 컴파일러의 기능을 사용하기위해 작성하는 구문
- 솔리디티 버전 작성 명시

# Contract

- 객체 지향 언어의 class와 유사
- Contract의 내부에 상태 변수를 보관
- 상태변수를 조회 또는 변경을 하기 위한 함수도 포함

# 솔리디티 코드를 작성할때

# import

- 외부 파일의 코드를 가져올 수 있음(모듈화)
- 선언한 Contract를 바로 사용가능 하여 export 할 필요 없음

```javascript
import "파일 경로";
import {"Contract이름"} from "파일 경로";
```

# 상태 변수

- Contract 내부에 선언한 변수
- Contract storage에 저장

1. Storage : 블록체인에 기록되는 영구적인 값이 유지되는 공간
2. Memory : 프로그램이 동작하는 동안에만 값을 기억, 동작하고 종료되면 해제시키는 데이터 공간

# 데이터의 타입

```javascript
contract Counter {
  // boolean 타입의 기본은 true
  bool _bool;

  // uint 부호가 없는 정수형
  // -가 안붙는 정수 (음수가 될 수 없음)
  // 정수형 타입 uint는 uint 자료형 뒤에 숫자를 붙이면 메모리 영역의 크기를 지정
  uint256 _uint;

  // 부호가 있는 정수형 (음수가 될 수 있음)
  // 정수형 타입 int는 int자료형 뒤에 숫자를 붙이면 메모리 영역 크기 지정
  // int, uint의 데이터 범위를 지정 할 수 있는 이유는 작업을 할때 어떤 코드를 작성하느냐에 따라 데이터 공간을 효율적으로 줄이기 위해 지정하여 사용
  int256 _int;

  // enum은 개발자의 가독성을 높히기 위해 사용되는 자료형
  // 상수를 사용하면서 가독성을 높히기 위해서 사용
  enum Status {
    Pending,  // 0
    Accapted, // 1
    Rejected, // 2
  }

  // status의 초기값은 0
  // status.Pending === 0
  // status.Accapted === 1
  // status.Rejected === 2
  Status public status;

  // enum 상태 조회
  function get() public view returns (Status) {
    return status;
  }

  // enum 상태 변경
  function set(status _status) public {
    status = _status;
  }

  // 문자열 자료형
  string Str = "hello sol";

  // address 주소형
  // 주소의 크기는 20바이트 크기의 자료형
  // 컨트랙트 주소를 저장 할 때 사용하는 변수
  address sender = 0x0000000000000000000000000000000000000000;

  // balance property가 있어서 주소의 이더 잔액 확인 가능
  // 메소드 transfer, send 메소드를 사용하여 이더 전송 가능
  // sender.balance : 해당 주소가 가지고 있는 이더 잔액 조회
  // sender.transfer("보낼 금액");
  // sender.send("보낼 금액");

  // 배열의 타입
  string[] strArr = ["1","2","3"];

  // 배열의 크기 지정
  string[2] strArr2 = ["1","2"];

  // 구조체 struct
  // 구조 정의
  struct Struct {
    string name;
    uint number;
  }

  // 매핑 key-value를 저장할때 사용하는 데이터 타입
  // address : key
  // uint256 : value
  mapping (address => uint256) tokens;

  tokens {
    address : 10000;
  }

  // string : key
  // mapping : value
  mapping (string => mapping(address => uint256)) token2;

  token2 {
    string : {
      address : 10000
      address2 : 20000
    }
    string2 : {
      address : 10000
      address2 : 20000
    }
  }

  // 글로벌 변수
  // address payable : 타입 선언식
  // 매개변수명 : _to
  function a(address payable _to) public payable {
    // payable : 이더리움을 보낼건지 결제를 할건지에 대한 처리문

    // 이더리움 블록체인 정보
    // block
    block.coinbase; // 현재 블록을 채굴한 account의 주소
    block.difficulty; // 현재 블록의 난이도
    block.gaslimit; // 현재 블록이 사용 가능한 최대 gas 값
    block.number; // 블록의 높이
    block.timestamp;  // 블록 생성 시간

    // msg 컨트랙트에서 messgae call 했을때 컨트랙트에 전달된 메시지 정보를 가지고 있는 객체
    msg.sender; // 컨트랙트를 호출한 account의 주소
    msg.value;  // 메시지로 전달받은 이더리움의 단위 (wei 단위)
    msg.data; // 컨트랙트 call로 실행할때 보낸 데이터의 내용
    msg.sig;  // 전달받은 데이터의 첫 4바이트를 뽑아 어떤 메소드를 실행시켰는지 확인

    // address
    _to.balance;  // 계정의 잔고 조회
    uint amount = 10**18;
    _to.transfer(amount); // 이더를 해당 주소에 보냄
    _to.send(amount); // 이더를 해당 주소에 보냄
  }

  // 함수의 구조
    function name(uint a) public view returns (uint){}
  // 접근자 타입
  // public : 외부에서 호출 가능. 외부 컨트랙트나 계정에서 호출 가능 EOA나 CA에서 호출 가능
  // private : 현재 컨트랙트에서만 호출 가능
  // Internal : 내부 함수는 컨트랙트에서 접근을 할 수 있고, 외부에서는 접근 불가. 다른 컨트랙트에서 상속받아 호출 가능
  // External : public과 같음

  // 접근 지정자
  // view : 상태변수 읽기전용. 변경 불가
  // pure : 상태변수 읽기 및 변경 불가. 전달받은 매개변수로만 함수를 동작 시키고 싶을 때 사용
  // payable : 결제 처리 선언. payable을 선언하지 않으면 이더 전송시 오류 발생

  // 조건문
  // require : 주어진 조건을 검사해서 만족이 되면 구문 통과 reject 발생. 이전상태로 되돌림
  // gas 반환
  // if문 같이 조건을 처리할때 사용
  require(조건문);

  // 컨트랙트 배포자가 계약을 파기하고 싶을떄

  // sender 배포자의 주소를 받을 변수. payable이 있기 때문에 이더를 전송 받을 수 있음
  address payable sender;

  // 배포자와 요청한 사람이 맞는지 확인
  require(msg.sender == sender);
  // selfdestruct(지갑 주소) : 현재 계약을 파기하고 전달받은 매개변수 주소로 CA의 잔액 전송
  // selfdestruct(CA 주소) : 계약을 파기하고 전달된 CA에 잔액을 전송
  selfdestruct(sender)
}
```

# Truffle

- Dapps 개발을 쉽게 개발할 수 있도록 도와주는 프레임워크
- 스마트 컨트랙트 컴파일, 배포 및 테스트 기능을 쉽게 할 수 있도록 도와줌

1. contracts : 솔리디티 코드를 작성한 sol 파일들을 담을 폴더. 컴파일을 진행하면 이 폴더에 있는 sol 파일을 읽어서 컴파일을 진행. build 폴더가 생기고 컴파일된 내용이 json파일로 생성
2. migrations : 컨트랙트 배포를 진행할 js 코드 작성. 이더리움 네트워크에 배포하는 내용을 작성할 js를 이 폴더에 작성
3. test : 테스트

# 컴파일

- 솔리디티 코드 작성
- contract 폴더에 sol파일 생성

```sh
npx truffle compile
```

- 컴파일하면 build 폴더가 생기며 컴파일된 내용이 생성된 json파일에 작성

# 배포

- ganache-cli

```sh
npm i ganache-cli
npx ganache-cli
```

- migrations 폴더안에 배포 코드 작성
- 파일명에 규칙 존재
- 파일명 : [번호]\_[내용]\_[컨트랙트 이름].js
- 1_deploy_Counter.js

- 배포 명령어

```sh
npx truffle migrate
```

- 배포한 CA 확인
- 0xFE2c8DEE8B7aC1D73FBDCbA7450A786a417DC3D2

- CA로 요청을 보내서 call send 통해 원격 프로시저 실행을 할 수 있음

- truffle 콘솔 활성화

```sh
npx truffle console
```

```javascript
// Counter 라는 컨트랙트가 배포된것에서 마지막으로 배포된 컨트랙를 접근
// 접근하는 동안 비동기 처리
// instance === 배포한 Counter 컨트랙트에 접근해서 인스턴스를 매개변수로 받음
// counter 변수를 선언하고 instance를 담음
Counter.deployed().then((instance) => (counter = instance));
// counter 변수에는 배포된 컨트랙트의 인스턴스가 담겨있고 call과 send 메소드를 포함
// call 요청
// BN 객체는 매우 큰 숫자를 명시하여 매우 큰 숫자를 다룰떄 사용
counter.getValue(); // BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
// send 요청
counter.setValue(20);
// {
//   tx: '0xae5dbb5e42a62a85970a90cc70e1b130f65d0a4eccc86a1928c543bdd7308827',
//   receipt: {
//     transactionHash: '0xae5dbb5e42a62a85970a90cc70e1b130f65d0a4eccc86a1928c543bdd7308827',
//     transactionIndex: 0,
//     blockHash: '0xe2178fd208c05fc5738edf936c9675801ca9af1b926bcd70793c9a81453a06a1',
//     blockNumber: 3,
//     from: '0xedc45f9024c57164591d6f40832108b4bb3d2572',
//     to: '0xe6f8f15b4853b6dd7b9ab7f4730622f92e640267',
//     gasUsed: 41646,
//     cumulativeGasUsed: 41646,
//     contractAddress: null,
//     logs: [],
//     status: true,
//     logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//     rawLogs: []
//   },
//   logs: []
// }
```

# 테스트 코드 작성

```sh
# 테스트 코드 실행
npx truffle test
```
